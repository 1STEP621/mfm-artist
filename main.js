addEventListener("DOMContentLoaded", () => {
  const domainElem = document.getElementById("domain");
  const goElem = document.getElementById("go");
  const domainWrapperElem = document.getElementById("domain-wrapper");
  const mainWrapperElem = document.getElementById("main-wrapper");
  const messageElem = document.getElementById("message");
  const effectsData = {
    tada: {
      cssProp: "animation",
      cssVal: "tada {speed}s linear infinite",
      attrs: ["speed"],
      defaults: {
        speed: 1,
      }
    },
    jelly: {
      cssProp: "animation",
      cssVal: "jelly {speed}s linear infinite",
      attrs: ["speed"],
      defaults: {
        speed: 1,
      }
    },
    twitch: {
      cssProp: "animation",
      attrs: ["speed"],
      cssVal: "twitch {speed}s linear infinite",
      defaults: {
        speed: 0.5,
      }
    },
    shake: {
      cssProp: "animation",
      attrs: ["speed"],
      cssVal: "shake {speed}s linear infinite",
      defaults: {
        speed: 0.5,
      }
    },
    spin: {
      cssProp: "animation",
      cssVal: "spin-{direction} {speed}s linear infinite {alternate}",
      attrs: ["speed", "x", "y", "z", "alternate"],
      defaults: {
        speed: 1.5,
        x: true,
        y: false,
        z: false,
        alternate: false,
      },
    },
    jump: {
      cssProp: "animation",
      cssVal: "jump {speed}s linear infinite",
      attrs: ["speed"],
      defaults: {
        speed: 0.75,
      },
    },
    bounce: {
      cssProp: "animation",
      cssVal: "bounce {speed}s linear infinite",
      attrs: ["speed"],
      defaults: {
        speed: 0.75,
      },
    },
    sparkle: {
      cssProp: "animation",
      cssVal: "sparkle {speed}s linear infinite",
      attrs: ["speed"],
      defaults: {
        speed: 1,
      },
    },
    rainbow: {
      cssProp: "animation",
      cssVal: "rainbow {speed}s linear infinite",
      attrs: ["speed"],
      defaults: {
        speed: 1,
      }
    },
    blur: {
      cssProp: "filter",
      cssVal: "blur(6px)",
      attrs: [],
      defaults: {
      }
    },
    flip: {
      cssProp: "transform",
      cssVal: "scaleX({h}) scaleY({v})",
      attrs: ["h", "v"],
      defaults: {
        h: false,
        v: false
      }
    },
    rotate: {
      cssProp: "transform",
      cssVal: "rotate({deg}deg)",
      attrs: ["deg"],
      defaults: {
        deg: 0,
      }
    },
    x2: {
      cssProp: "font-size",
      cssVal: "200%",
      attrs: [],
      defaults: {
      }
    },
    x3: {
      cssProp: "font-size",
      cssVal: "300%",
      attrs: [],
      defaults: {
      }
    },
    x4: {
      cssProp: "font-size",
      cssVal: "400%",
      attrs: [],
      defaults: {
      }
    },
    position: {
      cssProp: "transform",
      cssVal: "translate({x}em, {y}em)",
      attrs: ["x", "y"],
      defaults: {
        x: 0,
        y: 0
      }
    },
    scale: {
      cssProp: "transform",
      cssVal: "scale({x}, {y})",
      attrs: ["x", "y"],
      defaults: {
        x: 1,
        y: 1
      }
    }
  }
  let domain;
  let emojis;
  let objects = {};
  scene1();

  // -------------------------------シーン1--------------------------------
  function scene1() {
    goElem.addEventListener("click", async () => {
      messageElem.innerText = "読み込み中...";
      try {
        domain = domainElem.value;
        const emojisRequest = await fetch(`https://${domain}/api/emojis`);
        if (emojisRequest.ok) {
          const emojisRequestJson = await emojisRequest.json();
          emojis = emojisRequestJson.emojis;
          console.log(emojis);
          domainWrapperElem.remove();
          mainWrapperElem.hidden = false;
          scene2();
        } else {
          throw new Error();
        }
      } catch {
        messageElem.innerText = "読み込みに失敗しました。";
      }
    });
  }

  // -------------------------------シーン2--------------------------------
  function scene2() {
    const addObjectElem = document.getElementById("add-object");
    const objectsElem = document.getElementById("objects");

    let id = 0;
    let effectId = 0;
    addObjectElem.addEventListener("click", () => {
      objectsElem.insertAdjacentHTML("beforeend",
        `<div class="object" data-id="${id}">
          <div class="object-controls-wrapper"><input type="text" class="object-input" placeholder="テキスト">
            <a class="button block-link object-setting"><i class="ti ti-settings"></i></a>
            <a class="button block-link object-delete"><i class="ti ti-x"></i></a>
          </div>
          <div class="object-settings-wrapper" hidden>
            <div class="object-setting-group">
              <div>x:<input type="number" class="setting-x" placeholder="x" value="0" step="0.5"></div>
              <div>y:<input type="number" class="setting-y" placeholder="y" value="0" step="0.5"></div>
            </div>
            <div class="object-setting-group">
              <div>大きさx:<input type="number" class="setting-size-x" placeholder="大きさx" value="1" step="0.1" min="-5" max="5"></div>
              <div>大きさy:<input type="number" class="setting-size-y" placeholder="大きさy" value="1" step="0.1" min="-5" max="5"></div>
            </div>
            <div class="object-setting-group">
              <label><input type="checkbox" class="setting-bold"><b>太字</b></label>
              <label><input type="checkbox" class="setting-strike"><s>打ち消し</s></label>
              <label><input type="checkbox" class="setting-italic"><i>斜体</i></label>
              <label><input type="checkbox" class="setting-center">中央揃え</label>
            </div>
            <div class="object-setting-group">
              <div>
                フォント:
                <select class="setting-font">
                  <option>デフォルト</option>
                  <option>明朝</option>
                  <option>等幅</option>
                  <option>筆記体</option>
                  <option>ファンタジー</option>
                </select>
              </div>
            </div>
            <div class="object-setting-group">
              <div>文字色:<input type="color" value="#c7d1d8" class="setting-fg"></div>
              <label><input type="checkbox" class="setting-fg-default" checked>デフォルトを使用する</label>
            </div>
            <div class="object-setting-group">
              <div>背景色:<input type="color" value="#2d2d2d" class="setting-bg"></div>
              <label><input type="checkbox" class="setting-bg-default" checked>デフォルトを使用する</label>
            </div>
            <div class="object-effects-wrapper">
              <a class="block-link button add-effect"><i class="ti ti-wand"></i>エフェクトを追加</a>
            </div>
          </div>
        </div>`);

      const objectElem = document.querySelectorAll(".object");
      const objectDeleteElem = document.querySelectorAll(".object-delete");
      const objectSettingElem = document.querySelectorAll(".object-setting");
      const settingXElem = document.querySelectorAll(".setting-x");
      const settingYElem = document.querySelectorAll(".setting-y");
      const settingSizeXElem = document.querySelectorAll(".setting-size-x");
      const settingSizeYElem = document.querySelectorAll(".setting-size-y");
      const settingBoldElem = document.querySelectorAll(".setting-bold");
      const settingStrikeElem = document.querySelectorAll(".setting-strike");
      const settingItalicElem = document.querySelectorAll(".setting-italic");
      const settingCenterElem = document.querySelectorAll(".setting-center");
      const settingFgElem = document.querySelectorAll(".setting-fg");
      const settingFgDefaultElem = document.querySelectorAll(".setting-fg-default");
      const settingBgElem = document.querySelectorAll(".setting-bg");
      const settingBgDefaultElem = document.querySelectorAll(".setting-bg-default");
      const settingFontElem = document.querySelectorAll(".setting-font");
      const objectInputElem = document.querySelectorAll(".object-input");
      const addEffectElem = document.querySelectorAll(".add-effect");

      objects[id] = {
        id: id,
        text: "",
        x: 0,
        y: 0,
        sizeX: 1,
        sizeY: 1,
        isBold: false,
        isStrike: false,
        isItalic: false,
        isCenter: false,
        font: null,
        fg: "c7d1d8",
        fgDefault: true,
        bg: "2d2d2d",
        bgDefault: true,
        effects: [],
      };

      // TODO: 短くする
      onEventAll(objectDeleteElem, "click", (e) => {
        e.target.closest(".object").remove();
        delete objects[e.target.closest(".object").dataset.id];
        render(objects);
        generateMFM(objects);
      });
      onEventAll(objectSettingElem, "click", (e) => {
        e.target.closest(".object").querySelector(".object-settings-wrapper").toggleAttribute("hidden");
      });
      onEventAll(settingXElem, "input", (e) => {
        objects[e.target.closest(".object").dataset.id].x = e.target.value;
        render();
        generateMFM();
      });
      onEventAll(settingYElem, "input", (e) => {
        objects[e.target.closest(".object").dataset.id].y = e.target.value;
        render();
        generateMFM();
      });
      onEventAll(settingSizeXElem, "input", (e) => {
        if (e.target.value < -5) e.target.value = -5;
        if (e.target.value > 5) e.target.value = 5;
        objects[e.target.closest(".object").dataset.id].sizeX = e.target.value;
        render();
        generateMFM();
      });
      onEventAll(settingSizeYElem, "input", (e) => {
        if (e.target.value < -5) e.target.value = -5;
        if (e.target.value > 5) e.target.value = 5;
        objects[e.target.closest(".object").dataset.id].sizeY = e.target.value;
        render();
        generateMFM();
      });
      onEventAll(settingBoldElem, "input", (e) => {
        objects[e.target.closest(".object").dataset.id].isBold = e.target.checked;
        render();
        generateMFM();
      });
      onEventAll(settingStrikeElem, "input", (e) => {
        objects[e.target.closest(".object").dataset.id].isStrike = e.target.checked;
        render();
        generateMFM();
      });
      onEventAll(settingItalicElem, "input", (e) => {
        objects[e.target.closest(".object").dataset.id].isItalic = e.target.checked;
        render();
        generateMFM();
      });
      onEventAll(settingCenterElem, "input", (e) => {
        objects[e.target.closest(".object").dataset.id].isCenter = e.target.checked;
        render();
        generateMFM();
      });
      onEventAll(settingFontElem, "change", (e) => {
        const fontsNameJp = ["明朝", "等幅", "筆記体", "ファンタジー"];
        const fontsNameEn = ["serif", "monospace", "cursive", "fantasy"];
        objects[e.target.closest(".object").dataset.id].font = fontsNameEn?.[fontsNameJp.indexOf(e.target.value)] || null;
        render();
        generateMFM();
      });
      onEventAll(settingFgElem, "input", (e) => {
        objects[e.target.closest(".object").dataset.id].fg = e.target.value;
        render();
        generateMFM();
      });
      onEventAll(settingFgDefaultElem, "input", (e) => {
        objects[e.target.closest(".object").dataset.id].fgDefault = e.target.checked;
        render();
        generateMFM();
      });
      onEventAll(settingBgElem, "input", (e) => {
        objects[e.target.closest(".object").dataset.id].bg = e.target.value;
        render();
        generateMFM();
      });
      onEventAll(settingBgDefaultElem, "input", (e) => {
        objects[e.target.closest(".object").dataset.id].bgDefault = e.target.checked;
        render();
        generateMFM();
      });
      onEventAll(objectInputElem, "input", (e) => {
        objects[e.target.closest(".object").dataset.id].text = e.target.value;
        render();
        generateMFM();
      });
      onEventAll(addEffectElem, "click", (e) => {
        e.target.closest(".object-effects-wrapper").querySelector(".add-effect").insertAdjacentHTML("beforebegin",
          `<div class="object-effect" data-id="${effectId}">
            <div class="object-effect-input">
              <select class="effect-type">
                <option value="none" selected>none</option>
                <option value="tada">ばーん(tada)</option>
                <option value="jelly">もちもち(jelly)</option>
                <option value="twitch">がたがた(twitch)</option>
                <option value="shake">ぶるぶる(shake)</option>
                <option value="spin">くるくる(spin)</option>
                <option value="jump">ぴょんぴょん(jump)</option>
                <option value="bounce">ぴょんもち(bounce)</option>
                <option value="sparkle">きらきら(sparkle)</option>
                <option value="rainbow">ゲーミング(rainbow)</option>
                <option value="blur">ぼわぼわ(blur)</option>
                <option value="flip">反転(flip)</option>
                <option value="rotate">回転(rotate)</option>
                <option value="x2">文字サイズ2倍(x2)</option>
                <option value="x3">文字サイズ3倍(x3)</option>
                <option value="x4">文字サイズ4倍(x4)</option>
                <option value="position">移動(position)</option>
                <option value="scale">拡大(scale)</option>
              </select>
              <a class="button block-link effect-delete"><i class="ti ti-x"></i></a>
            </div>
          </div>`);

        objects[e.target.closest(".object").dataset.id].effects.push({
          type: null,
          values: {},
        });

        const effectDeleteElem = document.querySelectorAll(".effect-delete");
        const effectTypeElem = document.querySelectorAll(".effect-type");

        onEventAll(effectDeleteElem, "click", (e) => {
          delete objects[e.target.closest(".object").dataset.id].effects[e.target.closest(".object-effect").dataset.id];
          e.target.closest(".object-effect").remove();
          render();
          generateMFM();
        });

        onEventAll(effectTypeElem, "change", (e) => {
          const effectType = e.target.value === "none" ? null : e.target.value;
          objects[e.target.closest(".object").dataset.id].effects[e.target.closest(".object-effect").dataset.id] = {
            type: effectType,
            values: {},
          };
          const thisEffectElem = e.target.closest(".object").querySelector(`.object-effect[data-id="${e.target.closest(".object-effect").dataset.id}"]`);
          thisEffectElem.querySelector(".object-effect-setting")?.remove();
          thisEffectElem.insertAdjacentHTML("beforeend", `<div class="object-effect-setting"></div>`);
          const thisEffectSettingElem = thisEffectElem.querySelector(".object-effect-setting");

          if (["tada", "jelly", "twitch", "shake", "spin", "jump", "bounce", "sparkle", "rainbow"].includes(effectType)) {
            thisEffectSettingElem.insertAdjacentHTML("beforeend",
              `<div>速さ:<input type="number" class="speed" placeholder="速さ" step="0.1" min="0" value="${effectsData[effectType].defaults.speed}"></div>`);
          }
          if (effectType === "spin") {
            thisEffectSettingElem.insertAdjacentHTML("beforeend",
              `<label>x:<input type="radio" class="x" name="direction${effectId}" data-other="y,z" checked></label>
            <label>y:<input type="radio" class="y" name="direction${effectId}" data-other="x,z"></label>
            <label>z:<input type="radio" class="z" name="direction${effectId}" data-other="x,y"></label>
            <label>往復:<input type="checkbox" class="alternate"></label>`);
          }
          if (effectType === "flip") {
            thisEffectSettingElem.insertAdjacentHTML("beforeend",
              `<label>縦:<input type="checkbox" class="v"></label>
            <label>横:<input type="checkbox" class="h"></label>`);
          }
          if (effectType === "rotate") {
            thisEffectSettingElem.insertAdjacentHTML("beforeend",
              `<div>角度:<input type="number" class="deg" placeholder="角度" step="1" value="0" data-default="0"></div>`);
          }
          if (effectType === "position") {
            thisEffectSettingElem.insertAdjacentHTML("beforeend",
              `<div>x:<input type="number" class="x" placeholder="x" step="0.5" value="0"></div>
            <div>y:<input type="number" class="y" placeholder="y" step="0.5" value="0"></div>`);
          }
          if (effectType === "scale") {
            thisEffectSettingElem.insertAdjacentHTML("beforeend",
              `<div>大きさx:<input type="number" class="x" placeholder="大きさx" step="0.1" min="-5" max="5" value="1"></div>
            <div>大きさy:<input type="number" class="y" placeholder="大きさy" step="0.1" min="-5" max="5" value="1"></div>`);
          }

          onEventAll(thisEffectSettingElem.querySelectorAll("input"), "input", (e) => {
            const thisEffect = objects[e.target.closest(".object").dataset.id].effects[e.target.closest(".object-effect").dataset.id];
            switch (e.target.type) {
              case "radio":
                if (e.target.checked) {
                  e.target.dataset.other.split(",").forEach((other) => {
                    thisEffect.values[other] = false;
                  });
                  thisEffect.values[e.target.classList[0]] = true;
                }
                break;
              case "checkbox":
                thisEffect.values[e.target.classList[0]] = e.target.checked;
                break;
              default:
                thisEffect.values[e.target.classList[0]] = Number(e.target.value);
                break;
            }
            render();
            generateMFM();
          });

          dispatchEventAll(thisEffectSettingElem.querySelectorAll("input"), "input");
          render();
          generateMFM();
        });

        render();
        generateMFM();
        effectId++;
      });

      render();
      generateMFM();
      id++;
    });
  }

  // -------------------------------プレビューレンダリング--------------------------------
  function render() {
    console.log(objects);
    const previewElem = document.getElementById("preview");
    previewElem.innerHTML = "";
    Object.values(objects).forEach((value) => {
      const splittedText = value.text.split(":");
      let objectElem = document.createElement("span");
      splittedText.forEach((text, index) => {
        if (index % 2 === 0) {
          const elem = document.createElement("span");
          elem.innerText = text;
          objectElem.appendChild(elem);
        } else {
          const elem = document.createElement("img");
          elem.src = emojis.find(emoji => emoji.name == text)?.url || "unknown.png";
          elem.alt = text;
          elem.classList.add("emoji");
          objectElem.appendChild(elem);
        }
      });
      value.effects.forEach((effect) => {
        const prop = effectsData[effect.type]?.cssProp;
        let val = effectsData[effect.type]?.cssVal;
        switch (effect.type) {
          case "tada":
            val = val.replace("{speed}", effect.values.speed);
            break;
          case "jelly":
            val = val.replace("{speed}", effect.values.speed);
            break;
          case "twitch":
            val = val.replace("{speed}", effect.values.speed);
            break;
          case "shake":
            val = val.replace("{speed}", effect.values.speed);
            break;
          case "spin":
            val = val.replace("{speed}", effect.values.speed);
            val = val.replace("{direction}", effect.values.x ? "x" : effect.values.y ? "y" : "z");
            val = val.replace("{alternate}", effect.values.alternate ? "alternate" : "");
            break;
          case "jump":
            val = val.replace("{speed}", effect.values.speed);
            break;
          case "bounce":
            val = val.replace("{speed}", effect.values.speed);
            break;
          case "sparkle":
            val = val.replace("{speed}", effect.values.speed);
            break;
          case "rainbow":
            val = val.replace("{speed}", effect.values.speed);
            break;
          case "blur":
            break;
          case "flip":
            val = val.replace("{h}", effect.values.h ? -1 : 1);
            val = val.replace("{v}", effect.values.v ? -1 : 1);
            break;
          case "rotate":
            val = val.replace("{deg}", effect.values.deg);
            break;
          case "x2":
            break;
          case "x3":
            break;
          case "x4":
            break;
          case "position":
            val = val.replace("{x}", effect.values.x);
            val = val.replace("{y}", effect.values.y);
            break;
          case "scale":
            val = val.replace("{x}", effect.values.x);
            val = val.replace("{y}", effect.values.y);
            break;
          default:
            return;
        }
        objectElem = nestAndSetStyle(objectElem, [[prop, val]]);
      });
      objectElem = nestAndSetStyle(objectElem, [["color", value.fgDefault ? null : value.fg]]);
      objectElem = nestAndSetStyle(objectElem, [["backgroundColor", value.bgDefault ? null : value.bg]]);
      objectElem = nestAndSetStyle(objectElem, [["transform", `scale(${value.sizeX}, ${value.sizeY})`]]);
      objectElem = nestAndSetStyle(objectElem, [["transform", `translate(${value.x}em, ${value.y}em)`]]);
      objectElem = nestAndSetStyle(objectElem, [["fontWeight", value.isBold ? "bold" : null]]);
      objectElem = nestAndSetStyle(objectElem, [["textDecoration", value.isStrike ? "line-through" : null]]);
      objectElem = nestAndSetStyle(objectElem, [["fontStyle", value.isItalic ? "italic" : null]]);
      objectElem = nestAndSetStyle(objectElem, [["fontFamily", value.font || null]]);
      objectElem = nestAndSetStyle(objectElem, [["textAlign", value.isCenter ? "center" : null], ["display", "block"]]);
      objectElem = nest(objectElem);
      previewElem.appendChild(objectElem);
    });
  }
  
  function nestAndSetStyle(elem, styles) {
    const tmp = document.createElement("span");
    tmp.appendChild(elem);
    styles.forEach((style) => {
      tmp.style[style[0]] = style[1];
    });
    elem = tmp;
    return tmp;
  }

  function nest(elem) {
    const tmp = document.createElement("span");
    tmp.appendChild(elem);
    elem = tmp;
    return tmp;
  }

  // -------------------------------MFM生成--------------------------------
  function generateMFM() {
    const resultElem = document.getElementById("result");
    resultElem.innerText = "";
    let allMFM = "";
    Object.values(objects).forEach((value) => {
      let thisObjectMFM = value.text;
      if (value.isBold) thisObjectMFM = addNest("**", thisObjectMFM);
      if (value.isStrike) thisObjectMFM = addNest("~~", thisObjectMFM);
      if (value.isItalic) thisObjectMFM = addNestLikeHTML("i", thisObjectMFM);
      if (!value.fgDefault) thisObjectMFM = addMFM("fg", [["color", value.fg.substring(1, 7)]], thisObjectMFM);
      if (!value.bgDefault) thisObjectMFM = addMFM("bg", [["color", value.bg.substring(1, 7)]], thisObjectMFM);
      thisObjectMFM = addMFM("scale", [["x", value.sizeX], ["y", value.sizeY]], thisObjectMFM);
      thisObjectMFM = addMFM("position", [["x", value.x], ["y", value.y]], thisObjectMFM);
      if (value.font) thisObjectMFM = addMFM("font", [[value.font, true]], thisObjectMFM);
      value.effects.forEach((effect) => {
        if (effect.type) thisObjectMFM = addMFM(effect.type, Object.entries(effect.values).map(entry => {
          let res = entry;
          if (entry[1] === effectsData[effect.type].defaults[entry[0]]) {
            res[1] = false;
          } else if (res[0] === "speed") {
            res[1] += "s";
          }
          return res;
        }), thisObjectMFM);
      });
      if (value.isCenter) thisObjectMFM = addNestLikeHTML("center", thisObjectMFM);
      allMFM += thisObjectMFM + "\n";
      resultElem.innerText = allMFM;
    });
  }

  function addMFM(name, properties, innerText) {
    // 値がfalse: 完全に省略
    // 値がtrue: プロパティ名のみ
    let res = `$[${name}`;
    let firstAttrPrinted = false;
    properties.forEach((property) => {
      if (property[1] !== false) {
        res += (firstAttrPrinted ? "," : ".") + `${property[0]}`;
        if (property[1] !== true) {
          res += `=${property[1]}`;
        }
        firstAttrPrinted = true;
      }
    });
    res += ` ${innerText}]`;
    return res;
  }

  function addNest(text, innerText) {
    return `${text}${innerText}${text}`;
  }

  function addNestLikeHTML(text, innerText) {
    return `<${text}>${innerText}</${text}>`;
  }

  // -------------------------------ユーティリティ--------------------------------
  // removeEventListenerがうまく動いてくれなかったので、代わりにelement.onclick
  function onEventAll(elems, event, listener) {
    elems.forEach((elem) => {
      elem["on" + event] = listener;
    });
  }

  function dispatchEventAll(elems, event) {
    elems.forEach((elem) => {
      elem.dispatchEvent(new Event(event));
    });
  }
});
