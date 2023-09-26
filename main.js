// TODO: 一般設定とエフェクトで同じ処理でも別々の実装をしているのを直す
// TODO: 一般設定の情報があちこちに散らばっているのを直す
addEventListener("DOMContentLoaded", () => {
  const domainElem = document.getElementById("domain");
  const goElem = document.getElementById("go");
  const domainWrapperElem = document.getElementById("domain-wrapper");
  const mainWrapperElem = document.getElementById("main-wrapper");
  const messageElem = document.getElementById("message");
  const effectsData = {
    tada: {
      description: "ばーん(tada)",
      cssList: (attrs) => {
        return [
          ["font-size", "150%"],
          ["animation", `tada ${attrs.speed}s linear infinite`],
        ];
      },
      MFM: (text, attrs) => {
        return addMFM("tada", [["speed", attrs.speed === effectsData.tada.defaults.speed ? false : attrs.speed + "s"]], text);
      },
      attrSettingHTMLs: {
        speed: () => {
          return `<div>速さ:<input type="number" class="speed" placeholder="速さ" min="0" value="${effectsData.tada.defaults.speed}" step="any"></div>`;
        },
      },
      defaults: {
        speed: 1,
      }
    },
    jelly: {
      description: "もちもち(jelly)",
      cssList: (attrs) => {
        return [
          ["animation", `jelly ${attrs.speed}s linear infinite`],
        ];
      },
      MFM: (text, attrs) => {
        return addMFM("jelly", [["speed", attrs.speed === effectsData.jelly.defaults.speed ? false : attrs.speed + "s"]], text);
      },
      attrSettingHTMLs: {
        speed: () => {
          return `<div>速さ:<input type="number" class="speed" placeholder="速さ" min="0" value="${effectsData.jelly.defaults.speed}" step="any"></div>`;
        },
      },
      defaults: {
        speed: 1,
      }
    },
    twitch: {
      description: "がたがた(twitch)",
      cssList: (attrs) => {
        return [
          ["animation", `twitch ${attrs.speed}s linear infinite`],
        ];
      },
      MFM: (text, attrs) => {
        return addMFM("twitch", [["speed", attrs.speed === effectsData.twitch.defaults.speed ? false : attrs.speed + "s"]], text);
      },
      attrSettingHTMLs: {
        speed: () => {
          return `<div>速さ:<input type="number" class="speed" placeholder="速さ" min="0" value="${effectsData.twitch.defaults.speed}" step="any"></div>`;
        },
      },
      defaults: {
        speed: 0.5,
      }
    },
    shake: {
      description: "ぶるぶる(shake)",
      cssList: (attrs) => {
        return [
          ["animation", `shake ${attrs.speed}s linear infinite`],
        ];
      },
      MFM: (text, attrs) => {
        return addMFM("shake", [["speed", attrs.speed === effectsData.shake.defaults.speed ? false : attrs.speed + "s"]], text);
      },
      attrSettingHTMLs: {
        speed: () => {
          return `<div>速さ:<input type="number" class="speed" placeholder="速さ" min="0" value="${effectsData.shake.defaults.speed}" step="any"></div>`;
        },
      },
      defaults: {
        speed: 0.5,
      }
    },
    spin: {
      description: "くるくる(spin)",
      cssList: (attrs) => {
        return [
          ["animation", `spin-${attrs.direction} ${attrs.speed}s linear infinite ${attrs.behavior} `],
        ];
      },
      MFM: (text, attrs) => {
        return addMFM("spin", [
          ["speed", attrs.speed === effectsData.spin.defaults.speed ? false : attrs.speed + "s"],
          ["x", attrs.direction === "x"],
          ["y", attrs.direction === "y"],
          ["z", false],
          ["left", attrs.behavior === "reverse"],
          ["alternate", attrs.behavior === "alternate"]
        ], text);
      },
      attrSettingHTMLs: {
        speed: () => {
          return `<div>速さ:<input type="number" class="speed" placeholder="速さ" min="0" value="${effectsData.spin.defaults.speed}" step="any"></div>`;
        },
        direction: () => {
          return `<select class="direction">
            <option value="x" ${effectsData.spin.defaults.direction === "x" ? "selected" : ""}>x</option>
            <option value="y" ${effectsData.spin.defaults.direction === "y" ? "selected" : ""}>y</option>
            <option value="z" ${effectsData.spin.defaults.direction === "z" ? "selected" : ""}>z</option>
          </select>`;
        },
        behavior: () => {
          return `<select class="behavior">
            <option value="normal" ${effectsData.spin.defaults.behavior === "normal" ? "selected" : ""}>時計回り</option>
            <option value="reverse" ${effectsData.spin.defaults.behavior === "reverse" ? "selected" : ""}>反時計回り</option>
            <option value="alternate" ${effectsData.spin.defaults.behavior === "selected" ? "selected" : ""}>往復</option>
          </select>`;
        },
      },
      defaults: {
        speed: 1.5,
        direction: "z",
        behavior: "normal",
      },
    },
    jump: {
      description: "ぴょんぴょん(jump)",
      cssList: (attrs) => {
        return [
          ["animation", `jump ${attrs.speed}s linear infinite`],
        ];
      },
      MFM: (text, attrs) => {
        return addMFM("jump", [["speed", attrs.speed === effectsData.jump.defaults.speed ? false : attrs.speed + "s"]], text);
      },
      attrSettingHTMLs: {
        speed: () => {
          return `<div>速さ:<input type="number" class="speed" placeholder="速さ" min="0" value="${effectsData.jump.defaults.speed}" step="any"></div>`;
        },
      },
      defaults: {
        speed: 0.75,
      },
    },
    bounce: {
      description: "ぴょんもち(bounce)",
      cssList: (attrs) => {
        return [
          ["animation", `bounce ${attrs.speed}s linear infinite`],
        ];
      },
      MFM: (text, attrs) => {
        return addMFM("bounce", [["speed", attrs.speed === effectsData.bounce.defaults.speed ? false : attrs.speed + "s"]], text);
      },
      attrSettingHTMLs: {
        speed: () => {
          return `<div>速さ:<input type="number" class="speed" placeholder="速さ" min="0" value="${effectsData.bounce.defaults.speed}" step="any"></div>`;
        },
      },
      defaults: {
        speed: 0.75,
      },
    },
    sparkle: {
      description: "きらきら(sparkle)",
      cssList: (attrs) => {
        return [
          ["animation", `sparkle ${attrs.speed}s linear infinite`],
        ];
      },
      MFM: (text, attrs) => {
        return addMFM("sparkle", [["speed", attrs.speed === effectsData.sparkle.defaults.speed ? false : attrs.speed + "s"]], text);
      },
      attrSettingHTMLs: {
        speed: () => {
          return `<div>速さ:<input type="number" class="speed" placeholder="速さ" min="0" value="${effectsData.sparkle.defaults.speed}" step="any"></div>`;
        },
      },
      defaults: {
        speed: 1,
      },
    },
    rainbow: {
      description: "ゲーミング(rainbow)",
      cssList: (attrs) => {
        return [
          ["animation", `rainbow ${attrs.speed}s linear infinite`],
        ];
      },
      MFM: (text, attrs) => {
        return addMFM("rainbow", [["speed", attrs.speed === effectsData.rainbow.defaults.speed ? false : attrs.speed + "s"]], text);
      },
      attrSettingHTMLs: {
        speed: () => {
          return `<div>速さ:<input type="number" class="speed" placeholder="速さ" min="0" value="${effectsData.rainbow.defaults.speed}" step="any"></div>`;
        },
      },
      defaults: {
        speed: 1,
      }
    },
    parallel : {
      description: "平行移動(spin + position)",
      cssList: (attrs) => {
        let res = [];
        res = res.concat(effectsData.spin.cssList({speed: attrs.speed, behavior: "reverse", direction: "z"}));
        res = res.concat(effectsData.position.cssList({x: attrs.distance, y: 0}));
        res = res.concat(effectsData.spin.cssList({speed: attrs.speed / 2, behavior: "normal", direction: "z"}));
        res = res.concat(effectsData.position.cssList({x: attrs.distance, y: 0}));
        res = res.concat(effectsData.spin.cssList({speed: attrs.speed, behavior: "reverse", direction: "z"}));
        console.log(res);
        return res;
      },
      MFM: (text, attrs) => {
        let res = text;
        res = effectsData.spin.MFM(res, {speed: attrs.speed, behavior: "reverse", direction: "z"});
        res = effectsData.position.MFM(res, {x: attrs.distance, y: 0});
        res = effectsData.spin.MFM(res, {speed: attrs.speed / 2, behavior: "normal", direction: "z"});
        res = effectsData.position.MFM(res, {x: attrs.distance, y: 0});
        res = effectsData.spin.MFM(res, {speed: attrs.speed, behavior: "reverse", direction: "z"});
        return res;
      },
      attrSettingHTMLs: {
        speed: () => {
          return `<div>速さ:<input type="number" class="speed" placeholder="速さ" min="0" value="${effectsData.parallel.defaults.speed}" step="any"></div>`;
        },
        distance: () => {
          return `<div>距離:<input type="number" class="distance" placeholder="距離" value="${effectsData.parallel.defaults.distance}" step="any"></div>`;
        },
      },
      defaults: {
        speed: 1,
        distance: 1,
      }
    },
    blink: {
      description: "点滅(bounce + flip + position)",
      cssList: (attrs) => {
        let res = [];
        res = res.concat(effectsData.position.cssList({x: 0, y: 999999}));
        res = res.concat(effectsData.bounce.cssList({speed: attrs.speed}));
        res = res.concat(effectsData.position.cssList({x: 0, y: -999999}));
        res = res.concat(effectsData.flip.cssList({h: false, v: true}));
        res = res.concat(effectsData.bounce.cssList({speed: attrs.speed}));
        res = res.concat(effectsData.flip.cssList({h: false, v: true}));
        console.log(res);
        return res;
      },
      MFM: (text, attrs) => {
        let res = text;
        res = effectsData.position.MFM(res, {x: 0, y: 999999});
        res = effectsData.bounce.MFM(res, {speed: attrs.speed});
        res = effectsData.position.MFM(res, {x: 0, y: -999999});
        res = effectsData.flip.MFM(res, {h: false, v: true});
        res = effectsData.bounce.MFM(res, {speed: attrs.speed});
        res = effectsData.flip.MFM(res, {h: false, v: true});
        return res;
      },
      attrSettingHTMLs: {
        speed: () => {
          return `<div>速さ:<input type="number" class="speed" placeholder="速さ" min="0" value="${effectsData.blink.defaults.speed}" step="any"></div>`;
        },
      },
      defaults: {
        speed: 0.75,
      }
    },
    blur: {
      description: "ぼわぼわ(blur)",
      cssList: (attrs) => {
        return [
          ["filter", "blur(6px)"],
        ];
      },
      MFM: (text, attrs) => {
        return addMFM("blur", [["speed", attrs.speed === effectsData.blur.defaults.speed ? false : attrs.speed + "s"]], text);
      },
      attrSettingHTMLs: {
      },
      defaults: {
      }
    },
    flip: {
      description: "反転(flip)",
      cssList: (attrs) => {
        return [
          ["transform", `scaleX(${attrs.h ? -1 : 1}) scaleY(${attrs.v ? -1 : 1})`],
        ];
      },
      MFM: (text, attrs) => {
        return addMFM("flip", [
          ["h", attrs.h],
          ["v", attrs.v],
        ], text);
      },
      attrSettingHTMLs: {
        h: () => {
          return `<label>横:<input type="checkbox" class="h"></label>`;
        },
        v: () => {
          return `<label>縦:<input type="checkbox" class="v"></label>`;
        }
      },
      defaults: {
        h: true,
        v: false
      }
    },
    rotate: {
      description: "回転(rotate)",
      cssList: (attrs) => {
        return [
          ["transform", `rotate(${attrs.deg}deg)`],
        ];
      },
      MFM: (text, attrs) => {
        return addMFM("rotate", [["deg", attrs.deg === effectsData.rotate.defaults.deg ? false : attrs.deg]], text);
      },
      attrSettingHTMLs: {
        deg: () => {
          return `<div>角度:<input type="number" class="deg" placeholder="角度" value="${effectsData.rotate.defaults.deg}" step="any""></div>`;
        },
      },
      defaults: {
        deg: 0,
      }
    },
    x2: {
      description: "文字サイズ2倍(x2)",
      cssList: (attrs) => {
        return [
          ["font-size", "200%"],
        ];
      },
      MFM: (text, attrs) => {
        return addMFM("x2", [], text);
      },
      attrSettingHTMLs: {
      },
      defaults: {
      }
    },
    x3: {
      description: "文字サイズ3倍(x3)",
      cssList: (attrs) => {
        return [
          ["font-size", "300%"],
        ];
      },
      MFM: (text, attrs) => {
        return addMFM("x3", [], text);
      },
      attrSettingHTMLs: {
      },
      defaults: {
      }
    },
    x4: {
      description: "文字サイズ4倍(x4)",
      cssList: (attrs) => {
        return [
          ["font-size", "400%"],
        ];
      },
      MFM: (text, attrs) => {
        return addMFM("x4", [], text);
      },
      attrSettingHTMLs: {
      },
      defaults: {
      }
    },
    position: {
      description: "移動(position)",
      cssList: (attrs) => {
        return [
          ["transform", `translate(${attrs.x}em, ${attrs.y}em)`],
        ];
      },
      MFM: (text, attrs) => {
        return addMFM("position", [
          ["x", attrs.x === effectsData.position.defaults.x ? false : attrs.x],
          ["y", attrs.y === effectsData.position.defaults.y ? false : attrs.y],
        ], text);
      },
      attrSettingHTMLs: {
        x: () => {
          return `<div>x:<input type="number" class="x" placeholder="x" value="${effectsData.position.defaults.x}" step="any"></div>`;
        },
        y: () => {
          return `<div>y:<input type="number" class="y" placeholder="y" value="${effectsData.position.defaults.y}" step="any"></div>`;
        },
      },
      defaults: {
        x: 0,
        y: 0
      }
    },
    scale: {
      description: "拡大(scale)",
      cssList: (attrs) => {
        return [
          ["transform", `scale(${attrs.x}, ${attrs.y})`],
        ];
      },
      MFM: (text, attrs) => {
        return addMFM("scale", [
          ["x", attrs.x === effectsData.scale.defaults.x ? false : attrs.x],
          ["y", attrs.y === effectsData.scale.defaults.y ? false : attrs.y],
        ], text);
      },
      attrSettingHTMLs: {
        x: () => {
          return `<div>大きさx:<input type="number" class="x" placeholder="大きさx" max="5" value="${effectsData.scale.defaults.x}" step="any"></div>`;
        },
      },
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
          <div class="object-controls-wrapper"><input type="text" class="object-input" placeholder="テキスト" data-linkattr="text">
            <a class="button block-link object-setting"><i class="ti ti-settings"></i></a>
            <a class="button block-link object-delete"><i class="ti ti-x"></i></a>
          </div>
          <div class="object-settings-wrapper" hidden>
            <div class="object-setting-group">
              <div>x:<input type="number" class="setting-x" placeholder="x" value="0" data-linkattr="x" step="any"></div>
              <div>y:<input type="number" class="setting-y" placeholder="y" value="0" data-linkattr="y" step="any"></div>
            </div>
            <div class="object-setting-group">
              <div>大きさx:<input type="number" class="setting-size-x" placeholder="大きさx" value="1" max="5" data-linkattr="sizeX" step="any"></div>
              <div>大きさy:<input type="number" class="setting-size-y" placeholder="大きさy" value="1" max="5" data-linkattr="sizeY" step="any"></div>
            </div>
            <div class="object-setting-group">
              <label><input type="checkbox" class="setting-bold" data-linkattr="isBold"><b>太字</b></label>
              <label><input type="checkbox" class="setting-strike" data-linkattr="isStrike"><s>打ち消し</s></label>
              <label><input type="checkbox" class="setting-italic" data-linkattr="isItalic"><i>斜体</i></label>
              <label><input type="checkbox" class="setting-center" data-linkattr="isCenter">中央揃え</label>
            </div>
            <div class="object-setting-group">
              <div>
                フォント:
                <select class="setting-font" data-linkattr="font">
                  <option value="default">デフォルト</option>
                  <option value="serif">明朝</option>
                  <option value="monospace">等幅</option>
                  <option value="cursive">筆記体</option>
                  <option value="fantasy">ファンタジー</option>
                </select>
              </div>
            </div>
            <div class="object-setting-group">
              <div>文字色:<input type="color" value="#c7d1d8" class="setting-fg" data-linkattr="fg"></div>
              <label><input type="checkbox" class="setting-fg-default" data-linkattr="fgDefault" checked>デフォルトを使用する</label>
            </div>
            <div class="object-setting-group">
              <div>背景色:<input type="color" value="#2d2d2d" class="setting-bg" data-linkattr="bg"></div>
              <label><input type="checkbox" class="setting-bg-default" data-linkattr="bgDefault" checked>デフォルトを使用する</label>
            </div>
            <div class="object-effects-wrapper">
              <a class="block-link button add-effect"><i class="ti ti-wand"></i>エフェクトを追加</a>
            </div>
          </div>
        </div>`);

      const objectDeleteElem = document.querySelectorAll(".object-delete");
      const objectSettingElem = document.querySelectorAll(".object-setting");
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
        font: "default",
        fg: "#c7d1d8",
        fgDefault: true,
        bg: "#2d2d2d",
        bgDefault: true,
        effects: [],
      };

      onEventAll(objectDeleteElem, "click", (e) => {
        e.target.closest(".object").remove();
        delete objects[e.target.closest(".object").dataset.id];
        render(objects);
        generateMFM(objects);
      });
      onEventAll(objectSettingElem, "click", (e) => {
        e.target.closest(".object").querySelector(".object-settings-wrapper").toggleAttribute("hidden");
      });
      onEventAll(document.querySelectorAll(".object :is(input, select)"), "input", (e) => {
        switch (e.target?.type || e.target.tagName) {
          case "checkbox":
            objects[e.target.closest(".object").dataset.id][e.target.dataset.linkattr] = e.target.checked;
            break;
          case "number":
            objects[e.target.closest(".object").dataset.id][e.target.dataset.linkattr] = Number(e.target.value);
            break;
          default:
            objects[e.target.closest(".object").dataset.id][e.target.dataset.linkattr] = e.target.value;
            break;
        }
        render();
        generateMFM();
      });
      onEventAll(addEffectElem, "click", (e) => {
        const effectSelectHTML = Object.entries(effectsData).map((effect) => `<option value="${effect[0]}">${effect[1].description}</option>`).join("");
        e.target.closest(".object-effects-wrapper").querySelector(".add-effect").insertAdjacentHTML("beforebegin",
          `<div class="object-effect" data-id="${effectId}">
            <div class="object-effect-input">
              <select class="effect-type">
                <option value="none" selected>none</option>
                ${effectSelectHTML}
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
            values: structuredClone(effectsData[effectType]?.defaults) || {},
          };

          const thisEffectElem = e.target.closest(".object").querySelector(`.object-effect[data-id="${e.target.closest(".object-effect").dataset.id}"]`);
          thisEffectElem.querySelector(".object-effect-setting")?.remove();
          thisEffectElem.insertAdjacentHTML("beforeend", `<div class="object-effect-setting"></div>`);
          const thisEffectSettingElem = thisEffectElem.querySelector(".object-effect-setting");
          Object.values(effectsData[effectType]?.attrSettingHTMLs || {}).forEach((attrSettingHTML) => {
            thisEffectSettingElem.insertAdjacentHTML("beforeend", attrSettingHTML());
          });

          onEventAll(thisEffectSettingElem.querySelectorAll("input, select"), "input", (e) => {
            const thisObjectId = e.target.closest(".object").dataset.id;
            const thisEffectId = e.target.closest(".object-effect").dataset.id;
            const thisEffect = objects[thisObjectId].effects[thisEffectId];
            switch (e.target?.type || e.target.tagName) {
              case "checkbox":
                thisEffect.values[e.target.classList[0]] = e.target.checked;
                break;
              case "number":
                thisEffect.values[e.target.classList[0]] = Number(e.target.value);
                break;
              default:
                thisEffect.values[e.target.classList[0]] = e.target.value;
                break;
            }
            render();
            generateMFM();
          });

          render();
          generateMFM();
          effectId++;
        });

        render();
        generateMFM();
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
      objectElem = nestAndSetStyle(objectElem, [["color", value.fgDefault ? null : value.fg]]);
      objectElem = nestAndSetStyle(objectElem, [["backgroundColor", value.bgDefault ? null : value.bg]]);
      value.effects.forEach((effect) => {
        objectElem = nestAndSetStyle(objectElem, effectsData[effect.type]?.cssList(effect.values));
      });
      objectElem = nestAndSetStyle(objectElem, [["fontWeight", value.isBold ? "bold" : null]]);
      objectElem = nestAndSetStyle(objectElem, [["textDecoration", value.isStrike ? "line-through" : null]]);
      objectElem = nestAndSetStyle(objectElem, [["fontStyle", value.isItalic ? "italic" : null]]);
      objectElem = nestAndSetStyle(objectElem, [["transform", `scale(${value.sizeX}, ${value.sizeY})`]]);
      objectElem = nestAndSetStyle(objectElem, [["transform", `translate(${value.x}em, ${value.y}em)`]]);
      objectElem = nestAndSetStyle(objectElem, [["fontFamily", value.font || null]]);
      objectElem = nestAndSetStyle(objectElem, [["textAlign", value.isCenter ? "center" : null]]);
      previewElem.appendChild(objectElem);
    });
    twemoji.parse(previewElem);
  }

  function nestAndSetStyle(elem, styles) {
    if (!styles) return elem;
    let res = document.createElement("span");
    res.appendChild(elem);
    for (const style of styles) {
      const [prop, val] = style;
      let styleElem = document.createElement("span");
      styleElem.style[prop] = val;
      styleElem.appendChild(res);
      res = styleElem;
    }
    return res;
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
      if (!value.fgDefault) thisObjectMFM = addMFM("fg", [["color", value.fg.substring(1, 7)]], thisObjectMFM);
      if (!value.bgDefault) thisObjectMFM = addMFM("bg", [["color", value.bg.substring(1, 7)]], thisObjectMFM);
      value.effects.forEach((effect) => {
        thisObjectMFM = effectsData[effect.type]?.MFM(thisObjectMFM, effect.values) || thisObjectMFM;
      });
      if (value.isBold) thisObjectMFM = addNest("**", thisObjectMFM);
      if (value.isStrike) thisObjectMFM = addNest("~~", thisObjectMFM);
      if (value.isItalic) thisObjectMFM = addNestLikeHTML("i", thisObjectMFM);
      if (value.sizeX !== 1 || value.sizeY !== 1) thisObjectMFM = addMFM("scale", [["x", value.sizeX == 1 ? false : value.sizeX], ["y", value.sizeY == 1 ? false: value.sizeY]], thisObjectMFM);
      if (value.x !== 0 || value.y !== 0) thisObjectMFM = addMFM("position", [["x", value.x == 0 ? false: value.x], ["y", value.y == 0 ? false : value.y]], thisObjectMFM);
      if (value.font != "default") thisObjectMFM = addMFM("font", [[value.font, true]], thisObjectMFM);
      if (value.isCenter) thisObjectMFM = addNestLikeHTML("center", thisObjectMFM);
      allMFM += thisObjectMFM + "\n";
      resultElem.innerText = allMFM;
    });
  }

  function addMFM(name, properties, innerText) {
    // 値がfalse: 完全に省略
    // 値がtrue: プロパティ名のみ
    if (name !== undefined) {
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
    } else {
      return innerText;
    }
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
