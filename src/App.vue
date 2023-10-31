<script setup>
import { ref, computed } from "vue";
// import { useMagicKeys } from "@vueuse/core";
import { IconTrash, IconSettings, IconArrowBigUp, IconArrowBigDown, IconTextPlus, IconWand } from '@tabler/icons-vue';

const vFocus = {
  mounted: (el) => el.focus()
}

const effectsInfo = {
  position: {
    description: "位置移動(position)",
    attrs: {
      x: {
        type: "number",
        description: "X座標",
        default: 0,
      },
      y: {
        type: "number",
        description: "Y座標",
        default: 0,
      },
    },
  },
  scale: {
    description: "拡大縮小(scale)",
    attrs: {
      x: {
        type: "number",
        description: "X倍率",
        default: 1,
      },
      y: {
        type: "number",
        description: "Y倍率",
        default: 1,
      },
    },
  },
  rotate: {
    description: "回転(rotate)",
    attrs: {
      deg: {
        type: "number",
        description: "角度",
        default: 0,
      },
    },
  },
  fg: {
    description: "文字色(fg)",
    attrs: {
      color: {
        type: "color",
        description: "色",
        default: "#000000",
      },
    },
  },
  bg: {
    description: "背景色(bg)",
    attrs: {
      color: {
        type: "color",
        description: "色",
        default: "#ffffff",
      },
    },
  },
  decoration: {
    description: "装飾(** / * / ~~)",
    attrs: {
      bold: {
        type: "checkbox",
        description: "太字",
        default: false,
      },
      italic: {
        type: "checkbox",
        description: "斜体",
        default: false,
      },
      strike: {
        type: "checkbox",
        description: "打ち消し線",
        default: false,
      },
    },
  },
  center: {
    description: "中央揃え(center)",
    attrs: {},
  },
}

const objects = ref([]);

function addObject() {
  objects.value.push({
    id: objects.value.length,
    displayEffects: true,
    text: "",
    effects: [
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
        type: "center",
        attrs: {},
        deletable: true,
        changable: true,
        swappable: true,
      }
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

const preview = computed(() => {
  let result = "";
  for (const object of objects.value) {
    result += object.text + "<br>";
  }
  return result;
});

addObject();
</script>

<template>
  <main>
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
          <a class="block-link button" style="background-color: #c53b12"
            @click="deleteObject(object)">
            <IconTrash size="19" />
          </a>
        </div>
        <div class="object-effect-controls" v-show="object.displayEffects">
          <div class="object-effect" v-for="(effect, index) in object.effects" :key="index">
            <div class="object-effect-normal-controls inner-round-h">
              <a class="block-link button" v-if="effect.swappable" @click="effectOrderUp(object, effect)">
                <IconArrowBigUp size="19" />
              </a>
              <a class="block-link button" v-if="effect.swappable"
                @click="effectOrderDown(object, effect)">
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
                <label>{{ attr.description }}: <input :type="attr.type" v-model="effect.attrs[index]" /></label>
              </div>
            </div>
          </div>
          <a class="block-link button" @click="addEffect(object)"><IconWand size="19" style="margin-right: 10px;" />エフェクトを追加</a>
        </div>
      </div>
      <a class="block-link button" @click="addObject"><IconTextPlus size="19" style="margin-right: 10px;" />オブジェクトを追加</a>
    </div>
    <div id="left-pane">
      <div id="preview" v-html="preview"></div>
      <a class="block-link button">MFMをみる</a>
    </div>
  </main>
</template>

<style>
* {
  box-sizing: border-box;
}

#app {
  margin: 0;
}

main {
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  gap: 10px;
  padding: 10px;
  height: 100vh;
}

@media screen and (max-width: 600px) {
  main {
    flex-direction: column;
  }
}

main>* {
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
    height: 50svh;
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
  height: 400px;
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

#left-pane {
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
  font-size: .95em;
  line-height: 1.35;
  font-family: Hiragino Maru Gothic Pro,BIZ UDGothic,Roboto,HelveticaNeue,Arial,sans-serif;
  padding: 10px;
  overflow: auto;
  scrollbar-gutter: stable;
}

/***********/
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

::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-thumb {
  background-color: rgb(0 0 0 / 30%);
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgb(0 0 0 / 45%);
}

::-webkit-scrollbar-thumb:active {
  background-color: rgb(0 0 0 / 60%);
}
</style>
