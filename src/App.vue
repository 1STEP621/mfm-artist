<script setup>
import { ref, computed, watch } from "vue";
import { /* useMagicKeys, */ useStorage, useFetch } from "@vueuse/core";
import { IconTrash, IconSettings, IconArrowBigUp, IconArrowBigDown, IconTextPlus, IconWand, IconLoader } from '@tabler/icons-vue';
import unknown from "./assets/unknown.png";

const vFocus = {
  mounted: (el) => el.focus()
}

const objects = ref([]);
const serverDomain = ref(useStorage("serverDomain", "misskey.io"));
const serverModalOpened = ref(false);

const effectsInfo = {
  position: {
    description: "位置移動(position)",
    attrs: {
      x: {
        description: "X座標",
        props: {
          type: "number",
          step: "any",
        },
      },
      y: {
        description: "Y座標",
        props: {
          type: "number",
          step: "any",
        },
      },
    },
    css: (attrs) => {
      return {
        display: "inline-block",
        position: "relative",
        left: `${attrs.x}em`,
        top: `${attrs.y}em`,
      };
    },
  },
  scale: {
    description: "拡大縮小(scale)",
    attrs: {
      x: {
        description: "X倍率",
        props: {
          type: "number",
          step: "any",
        },
      },
      y: {
        description: "Y倍率",
        props: {
          type: "number",
          step: "any",
        },
      },
    },
    css: (attrs) => {
      return {
        display: "inline-block",
        transform: `scale(${attrs.x}, ${attrs.y})`,
      };
    },
  },
  rotate: {
    description: "回転(rotate)",
    attrs: {
      deg: {
        description: "角度",
        props: {
          type: "number",
          step: "any",
        },
      },
    },
    css: (attrs) => {
      return {
        display: "inline-block",
        transform: `rotate(${attrs.deg}deg)`,
      };
    },
  },
  fg: {
    description: "文字色(fg)",
    attrs: {
      color: {
        description: "色",
        props: {
          type: "color",
        },
      },
    },
    css: (attrs) => {
      return {
        color: attrs.color,
      };
    },
  },
  bg: {
    description: "背景色(bg)",
    attrs: {
      color: {
        description: "色",
        props: {
          type: "color",
        },
      },
    },
    css: (attrs) => {
      return {
        display: "inline-block",
        backgroundColor: attrs.color,
      };
    },
  },
  decoration: {
    description: "装飾(** / * / ~~)",
    attrs: {
      bold: {
        description: "太字",
        props: {
          type: "checkbox",
        },
      },
      italic: {
        description: "斜体",
        props: {
          type: "checkbox",
        },
      },
      strike: {
        description: "打ち消し線",
        props: {
          type: "checkbox",
        },
      },
    },
    css: (attrs) => {
      return {
        display: "inline-block",
        fontWeight: attrs.bold ? "bold" : "normal",
        fontStyle: attrs.italic ? "italic" : "normal",
        textDecoration: attrs.strike ? "line-through" : "none",
      };
    },
  },
  center: {
    description: "中央揃え(center)",
    attrs: {},
    css: () => {
      return {
        display: "block",
        textAlign: "center",
      };
    },
  },
}


function addObject() {
  objects.value.push({
    id: objects.value.length,
    displayEffects: true,
    text: "",
    effects: [
      {
        type: "scale",
        attrs: {
          x: 1,
          y: 1,
        },
        deletable: false,
        changable: false,
        swappable: false,
      },
      {
        type: "rotate",
        attrs: {
          deg: 0,
        },
        deletable: false,
        changable: false,
        swappable: false,
      },
      {
        type: "position",
        attrs: {
          x: 0,
          y: 0,
        },
        deletable: false,
        changable: false,
        swappable: false,
      },
      {
        type: "center",
        attrs: {},
        deletable: true,
        changable: true,
        swappable: true,
      },
    ],
  });
}

function deleteObject(target) {
  const index = objects.value.indexOf(target);
  objects.value.splice(index, 1);
}

function objectOrderUp(target) {
  const index = objects.value.indexOf(target);
  if (index === 0) return;
  objects.value.splice(index, 1);
  objects.value.splice(index - 1, 0, target);
}

function objectOrderDown(target) {
  const index = objects.value.indexOf(target);
  if (index === objects.value.length - 1) return;
  objects.value.splice(index, 1);
  objects.value.splice(index + 1, 0, target);
}

function addEffect(target) {
  target.effects.push({
    type: "position",
    attrs: {
      x: 0,
      y: 0,
    },
    deletable: true,
    changable: true,
    swappable: true,
  });
}

function deleteEffect(target) {
  const index = target.effects.indexOf(target);
  target.effects.splice(index, 1);
}

function effectOrderUp(target) {
  const index = objects.value.indexOf(target);
  if (index === 0) return;
  objects.value.splice(index, 1);
  objects.value.splice(index - 1, 0, target);
}

function effectOrderDown(target) {
  const index = objects.value.indexOf(target);
  if (index === objects.value.length - 1) return;
  objects.value.splice(index, 1);
  objects.value.splice(index + 1, 0, target);
}

watch(serverDomain, () => {
  useStorage("serverDomain", serverDomain.value);
});

const { isFetching: emojiLoading, data: serverEmojis } = 
useFetch(
  computed(() => `https://${serverDomain.value}/api/emojis`), 
  {
    updateDataOnError: true,
    refetch: true,
    immediate: true,
    timeout: 500,
    afterFetch: (ctx) => {
      ctx.data = ctx.data?.emojis;
      return ctx;
    },
  }
).get().json();

const preview = computed(() => {
  let result = document.createElement("span");
  for (const object of objects.value) {
    let objElem = document.createElement("span");
    let innerContent = object.text.split(":").reduce((acm, value, index) => {
      if (index % 2 === 0) {
        let textElem = document.createTextNode(value);
        return [...acm, textElem];
      } else {
        const emoji = serverEmojis.value?.find((emoji) => emoji.name === value);
        let emojiElem = document.createElement("img");
        emojiElem.classList.add("emoji");
        emojiElem.src = emoji?.url ?? unknown;
        emojiElem.alt = emoji?.name ?? "絵文字ショートコードが不正です";
        return [...acm, emojiElem];
      }
    }, []);
    innerContent.forEach((elem) => objElem.appendChild(elem));

    for (const effect of object.effects) {
      let tmp = document.createElement("span");
      tmp.appendChild(objElem);
      objElem = tmp;
      for (const [key, value] of Object.entries(effectsInfo[effect.type].css(effect.attrs))) {
        objElem.style[key] = value;
      }
    }

    result.appendChild(objElem);
    result.appendChild(document.createElement("br"));
  }
  return result.outerHTML;
});

addObject();
</script>

<template>
  <main>
    <div id="sub">
      <div id="server-info" @click="serverModalOpened = true" role="button">
        サーバー: <span :class="{ invalid: serverEmojis === null }">{{ serverDomain }}</span>
      </div>
    </div>
    <div id="main">
      <div id="objects">
        <div class="object inner-round-v" v-for="object in objects" :key="object.id">
          <div class="object-normal-controls inner-round-h">
            <a class="block-link button" @click="objectOrderUp(object)">
              <IconArrowBigUp size="19" />
            </a>
            <a class="block-link button" @click="objectOrderDown(object)">
              <IconArrowBigDown size="19" />
            </a>
            <input type="text" class="object-text" v-model="object.text" v-focus />
            <a class="block-link button" @click="object.displayEffects = !object.displayEffects">
              <IconSettings size="19" />
            </a>
            <a class="block-link button" style="background-color: #c53b12" @click="deleteObject(object)">
              <IconTrash size="19" />
            </a>
          </div>
          <div class="object-effect-controls" v-show="object.displayEffects">
            <div class="object-effect" v-for="(effect, index) in object.effects" :key="index">
              <div class="object-effect-normal-controls inner-round-h">
                <a class="block-link button" v-if="effect.swappable" @click="effectOrderUp(object, effect)">
                  <IconArrowBigUp size="19" />
                </a>
                <a class="block-link button" v-if="effect.swappable" @click="effectOrderDown(object, effect)">
                  <IconArrowBigDown size="19" />
                </a>
                <select class="object-effect-text" v-model="effect.type" :inert="!effect.changable">
                  <option v-for="(info, type) in effectsInfo" :key="type" :value="type">{{ info.description }}</option>
                </select>
                <a class="block-link button" style="background-color: #c53b12" v-if="effect.deletable"
                  @click="deleteEffect(object, effect)">
                  <IconTrash size="19" />
                </a>
              </div>
              <div class="object-effect-attr-controls" v-if="Object.keys(effectsInfo[effect.type].attrs).length">
                <div v-for="(attr, index) in effectsInfo[effect.type].attrs" :key="index">
                  <label>{{ attr.description }}: <input v-bind="attr.props" v-model="effect.attrs[index]" /></label>
                </div>
              </div>
            </div>
            <a class="block-link button" @click="addEffect(object)">
              <IconWand size="19" style="margin-right: 10px;" />エフェクトを追加
            </a>
          </div>
        </div>
        <a class="block-link button" @click="addObject">
          <IconTextPlus size="19" style="margin-right: 10px;" />オブジェクトを追加
        </a>
      </div>
      <div id="right-pane">
        <div id="preview" v-html="preview"></div>
        <a class="block-link button">MFMをみる</a>
      </div>
    </div>
  </main>

  <Teleport to="main">
    <div id="server-modal" v-if="serverModalOpened" @click.self="serverModalOpened = false">
      <form id="server-input" @submit.prevent="serverModalOpened = false">
        <label>サーバー: <input type="text" :class="{ invalid: serverEmojis === null }" v-model="serverDomain" v-focus /></label>
        <IconLoader size="30" class="spin" :class="{ hidden: !emojiLoading }" />
      </form>
    </div>
  </Teleport>
</template>

<style>
* {
  box-sizing: border-box;
}

#app {
  margin: 0;
}

#server-info {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

#server-modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100dvw;
  height: 100dvh;
  backdrop-filter: blur(10px);
}

main {
  display: flex;
  flex-direction: column;
  height: 100dvh;
  gap: 10px;
  padding: 10px;
}

#sub {
  display: flex;
  justify-content: center;
  background-color: #dfdfdf;
  width: 100%;
  max-width: 1200px;
  height: 50px;
  margin: auto;
  border-radius: 10px;
}

#server-input {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 50px;
  filter: drop-shadow(0px 0px 10px var(--primary-deep));
  background-color: var(--white);
  border-radius: 10px;
}

#main {
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex: 1;
  gap: 10px;
  max-width: 1200px;
  margin: 0 auto;
}

@media screen and (max-width: 600px) {
  #main {
    flex-direction: column;
  }
}

#main>* {
  border-radius: 10px;
}

#objects {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 40%;
  min-width: 300px;
  background-color: var(--primary-light);
  padding: 10px;
  overflow: auto;
  scrollbar-gutter: stable both-edges;
  resize: horizontal;
}

@media screen and (max-width: 600px) {
  #objects {
    width: 100%;
    height: 50dvh;
    min-width: unset;
    resize: none;
  }
}

.object-normal-controls {
  display: flex;
  height: 55px;
  padding: 10px;
  background-color: var(--white);
}

.object-text {
  flex-grow: 1;
  min-width: 0;
  border-right: 0;
  border-left: 0;
}

.object-normal-controls>:is(a, input) {
  padding: 0 10px;
}

.object-effect-controls {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 10px 10px 10px;
  background-color: var(--white);
  height: 300px;
  resize: vertical;
  overflow-y: auto;
  scrollbar-gutter: stable;
}

.object-effect {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: var(--primary-light);
  border-radius: 10px;
  padding: 10px;
}

.object-effect-normal-controls {
  display: flex;
  justify-content: space-between;
}

.object-effect-attr-controls {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: space-evenly;
}

.object-effect-text {
  width: 100%;
}

#add-object-button {
  position: sticky;
  bottom: 0;
  filter: drop-shadow(0px 0px 10px var(--white));
}

#right-pane {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 10px;
}

#preview {
  flex: 1;
  border-radius: 10px;
  background-color: #2d2d2d;
  color: rgb(199, 209, 216);
  font-size: 14.7px;
  line-height: 19.845px;
  font-family: Hiragino Maru Gothic Pro, BIZ UDGothic, Roboto, HelveticaNeue, Arial, sans-serif;
  padding: 10px;
  overflow: auto;
  scrollbar-gutter: stable;
  word-break: break-word;
  text-wrap: wrap;
}

#preview * {
  line-height: inherit;
}

.emoji {
  height: 29.3906px;
}

/***********/
.hidden {
  opacity: 0;
}

.invalid {
  color: #c53b12;
}

.spin {
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(359deg);
  }
}

.button,
select {
  padding: 5px 10px;
}

input[type="number"] {
  width: 100px;
  border: 0;
  background-color: var(--white);
  text-align: center;
  border-radius: 10px;
  padding: 5px 10px;
}

input[type="radio"] {
  accent-color: var(--white);
  cursor: pointer;
}

select {
  width: 100px;
  border: 0;
  background-color: var(--white);
  text-align: center;
  border-radius: 10px;
}

label {
  user-select: none;
  cursor: pointer;
}

:is(input, select):focus-visible {
  outline: solid 2px var(--primary-deep);
}

.inner-round-h>* {
  border-radius: 0;
}

.inner-round-h>*:first-child {
  border-radius: 10px 0 0 10px;
}

.inner-round-h>*:last-child {
  border-radius: 0 10px 10px 0;
}

.inner-round-h>*:only-child {
  border-radius: 10px;
}

.inner-round-v>* {
  border-radius: 0;
}

.inner-round-v>*:first-child {
  border-radius: 10px 10px 0 0;
}

.inner-round-v>*:last-child {
  border-radius: 0 0 10px 10px;
}

.inner-round-v>*:only-child {
  border-radius: 10px;
}
</style>
