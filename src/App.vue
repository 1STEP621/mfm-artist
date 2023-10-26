<script setup>
import { ref } from "vue";
import { IconTrash, IconSettings, IconArrowBigUp, IconArrowBigDown } from '@tabler/icons-vue';

const vFocus = {
  mounted: (el) => el.focus()
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
      },
      {
        type: "scale",
        attrs: {
          x: 1,
          y: 1,
        },
        deletable: false,
      },
      {
        type: "rotate",
        attrs: {
          deg: 0,
        },
        deletable: false,
      },
      {
        type: "decoration",
        attrs: {
          bold: false,
          italic: false,
          strike: false,
        },
        deletable: false,
      },
      {
        type: "center",
        attrs: {
          enabled: false,
        },
        deletable: false,
        pinnedBottom: true,
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
</script>

<template>
  <main>
    <div id="objects">
      <div class="object" v-for="object in objects" :key="object.id">
        <div class="object-normal-controls">
          <a class="block-link button object-order-up" @click="objectOrderUp(object)">
            <IconArrowBigUp size="19" />
          </a>
          <a class="block-link button object-order-down" @click="objectOrderDown(object)">
            <IconArrowBigDown size="19" />
          </a>
          <input type="text" class="object-text" v-model="object.text" v-focus />
          <a class="block-link button object-settings" @click="object.displayEffects = !object.displayEffects">
            <IconSettings size="19" />
          </a>
          <a class="block-link button delete-object-button" style="background-color: #c53b12"
            @click="deleteObject(object)">
            <IconTrash size="19" />
          </a>
        </div>
        <div class="object-effect-controls" v-show="object.displayEffects">
          <div class="object-effect" v-for="(effect, index) in object.effects" :key="index">
            <div class="object-effect-normal-controls">
              <a class="block-link button effect-order-up" @click="effectOrderUp(object, effect)">
                <IconArrowBigUp size="19" />
              </a>
              <a class="block-link button effect-order-down" @click="effectOrderDown(object, effect)">
                <IconArrowBigDown size="19" />
              </a>
              <select v-model="effect.type" :inert="!effect.deletable">
                <option value="position">位置</option>
                <option value="scale">拡大縮小</option>
                <option value="rotate">回転</option>
                <option value="decoration">装飾</option>
                <option value="center">中央揃え</option>
              </select>
              <a class="block-link button delete-effect-button" style="background-color: #c53b12" v-if="effect.deletable"
                @click="deleteEffect(object, effect)">
                <IconTrash size="19" />
              </a>
            </div>
          </div>
          <a class="block-link button add-effect-button" @click="addEffect(object)">エフェクトを追加</a>
        </div>
      </div>
      <a class="block-link button" id="add-object-button" @click="addObject">オブジェクトを追加</a>
    </div>
    <div id="preview"></div>
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

#objects {
  flex: 1;
  padding: 10px;
  background-color: var(--primary-light);
  border-radius: 10px;
  overflow: auto;
  scrollbar-gutter: stable;
}

.object {
  padding: 10px;
  background-color: var(--white);
  border-radius: 10px;
  margin-bottom: 10px;
}

.object-normal-controls {
  display: flex;
  padding: 10px;
  background-color: var(--primary-light);
  border-radius: 10px 10px 0 0;
}

.object-text {
  flex-grow: 1;
  min-width: 0;
  border-right: 0;
  border-left: 0;
}

.object-normal-controls>:is(a, input) {
  border-radius: 0;
  padding: 0 10px;
}

.object-normal-controls>:is(a, input):first-child {
  border-radius: 10px 0 0 10px;
}

.object-normal-controls>:is(a, input):last-child {
  border-radius: 0 10px 10px 0
}

.object-effect-controls {
  padding: 0 10px 10px 10px;
  background-color: var(--primary-light);
  border-radius: 0 0 10px 10px;
}

.object-effect {
  background-color: var(--white);
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
}

.object-effect-normal-controls {
  display: flex;
  justify-content: space-between;
}

.object-effect-normal-controls>:is(a, select) {
  border-radius: 0;
  padding: 5px 10px;
}

.object-effect-normal-controls>:is(a, select):first-child {
  border-radius: 10px 0 0 10px;
}

.object-effect-normal-controls>:is(a, select):last-child {
  border-radius: 0 10px 10px 0;
}

.add-effect-button {
  width: 100%;
  padding: 5px 0;
}

select {
  border: 0;
  background-color: var(--primary-light);
  text-align: center;
  border-radius: 10px;
  padding: 5px 10px;
  width: 100%;
}

#preview {
  flex: 1;
  background-color: #2d2d2d;
  border-radius: 10px;
  overflow: auto;
  scrollbar-gutter: stable;
}

#add-object-button {
  width: 100%;
  padding: 5px 0;
  position: sticky;
  bottom: 0;
  filter: drop-shadow(0px 0px 10px var(--white));
}

/***********/
[inert] {
  opacity: 0.5;
}

:is(input, select):focus-visible {
  outline: solid 2px var(--primary-deep);
}
</style>
