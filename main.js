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
          {"fontSize": "150%", "animation": `tada ${attrs.speed}s ${attrs.delay}s linear infinite`},
        ];
      },
      MFM: (text, attrs) => {
        return addMFM("tada", {
          "speed": attrs.speed === effectsData.tada.defaults.speed ? false : attrs.speed + "s",
          "delay": attrs.delay === effectsData.tada.defaults.delay ? false : attrs.delay + "s",
        }, text);
      },
      attrSettingHTMLs: {
        speed: () => {
          return `<div>速さ:<input type="number" class="speed" placeholder="速さ" min="0" value="${effectsData.tada.defaults.speed}" step="any"></div>`;
        },
        delay: () => {
          return `<div>遅延:<input type="number" class="delay" placeholder="遅延" min="0" value="${effectsData.tada.defaults.delay}" step="any"></div>`;
        }
      },
      defaults: {
        speed: 1,
        delay: 0,
      }
    },
    jelly: {
      description: "もちもち(jelly)",
      cssList: (attrs) => {
        return [
          { "animation": `jelly ${attrs.speed}s ${attrs.delay}s linear infinite` },
        ];
      },
      MFM: (text, attrs) => {
        return addMFM("jelly", {
          "speed": attrs.speed === effectsData.jelly.defaults.speed ? false : attrs.speed + "s",
          "delay": attrs.delay === effectsData.tada.defaults.delay ? false : attrs.delay + "s",
        }, text);
      },
      attrSettingHTMLs: {
        speed: () => {
          return `<div>速さ:<input type="number" class="speed" placeholder="速さ" min="0" value="${effectsData.jelly.defaults.speed}" step="any"></div>`;
        },
        delay: () => {
          return `<div>遅延:<input type="number" class="delay" placeholder="遅延" min="0" value="${effectsData.tada.defaults.delay}" step="any"></div>`;
        }
      },
      defaults: {
        speed: 1,
        delay: 0,
      }
    },
    twitch: {
      description: "がたがた(twitch)",
      cssList: (attrs) => {
        return [
          { "animation": `twitch ${attrs.speed}s ${attrs.delay}s linear infinite` },
        ];
      },
      MFM: (text, attrs) => {
        return addMFM("twitch", {
          "speed": attrs.speed === effectsData.twitch.defaults.speed ? false : attrs.speed + "s",
          "delay": attrs.delay === effectsData.tada.defaults.delay ? false : attrs.delay + "s",
        }, text);
      },
      attrSettingHTMLs: {
        speed: () => {
          return `<div>速さ:<input type="number" class="speed" placeholder="速さ" min="0" value="${effectsData.twitch.defaults.speed}" step="any"></div>`;
        },
        delay: () => {
          return `<div>遅延:<input type="number" class="delay" placeholder="遅延" min="0" value="${effectsData.tada.defaults.delay}" step="any"></div>`;
        }
      },
      defaults: {
        speed: 0.5,
        delay: 0,
      }
    },
    shake: {
      description: "ぶるぶる(shake)",
      cssList: (attrs) => {
        return [
          { "animation": `shake ${attrs.speed}s ${attrs.delay}s linear infinite` },
        ];
      },
      MFM: (text, attrs) => {
        return addMFM("shake", {
          "speed": attrs.speed === effectsData.shake.defaults.speed ? false : attrs.speed + "s",
          "delay": attrs.delay === effectsData.tada.defaults.delay ? false : attrs.delay + "s",
        }, text);
      },
      attrSettingHTMLs: {
        speed: () => {
          return `<div>速さ:<input type="number" class="speed" placeholder="速さ" min="0" value="${effectsData.shake.defaults.speed}" step="any"></div>`;
        },
        delay: () => {
          return `<div>遅延:<input type="number" class="delay" placeholder="遅延" min="0" value="${effectsData.tada.defaults.delay}" step="any"></div>`;
        }
      },
      defaults: {
        speed: 0.5,
        delay: 0,
      }
    },
    spin: {
      description: "くるくる(spin)",
      cssList: (attrs) => {
        return [
          { "animation": `spin-${attrs.direction} ${attrs.speed}s ${attrs.delay}s linear infinite ${attrs.behavior} ` },
        ];
      },
      MFM: (text, attrs) => {
        return addMFM("spin", {
          "speed": attrs.speed === effectsData.spin.defaults.speed ? false : attrs.speed + "s",
          "x": attrs.direction === "x",
          "y": attrs.direction === "y",
          "z": false,
          "left": attrs.behavior === "reverse",
          "alternate": attrs.behavior === "alternate",
          "delay": attrs.delay === effectsData.tada.defaults.delay ? false : attrs.delay + "s",
        }, text);
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
        delay: () => {
          return `<div>遅延:<input type="number" class="delay" placeholder="遅延" min="0" value="${effectsData.tada.defaults.delay}" step="any"></div>`;
        }
      },
      defaults: {
        speed: 1.5,
        direction: "z",
        behavior: "normal",
        delay: 0,
      },
    },
    jump: {
      description: "ぴょんぴょん(jump)",
      cssList: (attrs) => {
        return [
          { 'animation': `jump ${attrs.speed}s ${attrs.delay}s linear infinite` }
        ];
      },
      MFM: (text, attrs) => {
        return addMFM("jump", {
          "speed": attrs.speed === effectsData.jump.defaults.speed ? false : attrs.speed + "s",
          "delay": attrs.delay === effectsData.tada.defaults.delay ? false : attrs.delay + "s",
        }, text);
      },
      attrSettingHTMLs: {
        speed: () => {
          return `<div>速さ:<input type="number" class="speed" placeholder="速さ" min="0" value="${effectsData.jump.defaults.speed}" step="any"></div>`;
        },
        delay: () => {
          return `<div>遅延:<input type="number" class="delay" placeholder="遅延" min="0" value="${effectsData.tada.defaults.delay}" step="any"></div>`;
        }
      },
      defaults: {
        speed: 0.75,
        delay: 0,
      },
    },
    bounce: {
      description: "ぴょんもち(bounce)",
      cssList: (attrs) => {
        return [
          { "animation": `bounce ${attrs.speed}s ${attrs.delay}s linear infinite` },
        ];
      },
      MFM: (text, attrs) => {
        return addMFM("bounce", {
          "speed": attrs.speed === effectsData.bounce.defaults.speed ? false : attrs.speed + "s",
          "delay": attrs.delay === effectsData.tada.defaults.delay ? false : attrs.delay + "s",
        }, text);
      },
      attrSettingHTMLs: {
        speed: () => {
          return `<div>速さ:<input type="number" class="speed" placeholder="速さ" min="0" value="${effectsData.bounce.defaults.speed}" step="any"></div>`;
        },
        delay: () => {
          return `<div>遅延:<input type="number" class="delay" placeholder="遅延" min="0" value="${effectsData.tada.defaults.delay}" step="any"></div>`;
        }
      },
      defaults: {
        speed: 0.75,
        delay: 0,
      },
    },
    sparkle: {
      description: "きらきら(sparkle)",
      cssList: (attrs) => {
        return [
          { "animation": `sparkle ${attrs.speed}s ${attrs.delay}s linear infinite` },
        ];
      },
      MFM: (text, attrs) => {
        return addMFM("sparkle", {
          "speed": attrs.speed === effectsData.sparkle.defaults.speed ? false : attrs.speed + "s",
          "delay": attrs.delay === effectsData.tada.defaults.delay ? false : attrs.delay + "s",
        }, text);
      },
      attrSettingHTMLs: {
        speed: () => {
          return `<div>速さ:<input type="number" class="speed" placeholder="速さ" min="0" value="${effectsData.sparkle.defaults.speed}" step="any"></div>`;
        },
        delay: () => {
          return `<div>遅延:<input type="number" class="delay" placeholder="遅延" min="0" value="${effectsData.tada.defaults.delay}" step="any"></div>`;
        }
      },
      defaults: {
        speed: 1,
        delay: 0,
      },
    },
    rainbow: {
      description: "ゲーミング(rainbow)",
      cssList: (attrs) => {
        return [
          { "animation": `rainbow ${attrs.speed}s ${attrs.delay}s linear infinite` },
        ];
      },
      MFM: (text, attrs) => {
        return addMFM("rainbow", {
          "speed": attrs.speed === effectsData.rainbow.defaults.speed ? false : attrs.speed + "s",
          "delay": attrs.delay === effectsData.tada.defaults.delay ? false : attrs.delay + "s",
        }, text);
      },
      attrSettingHTMLs: {
        speed: () => {
          return `<div>速さ:<input type="number" class="speed" placeholder="速さ" min="0" value="${effectsData.rainbow.defaults.speed}" step="any"></div>`;
        },
        delay: () => {
          return `<div>遅延:<input type="number" class="delay" placeholder="遅延" min="0" value="${effectsData.tada.defaults.delay}" step="any"></div>`;
        }
      },
      defaults: {
        speed: 1,
        delay: 0,
      }
    },
    parallel: {
      description: "平行移動(spin + position)",
      cssList: (attrs) => {
        let res = [];
        res = res.concat(effectsData.spin.cssList({ speed: attrs.speed, behavior: "reverse", direction: "z", delay: attrs.delay }));
        res = res.concat(effectsData.position.cssList({ x: attrs.distance, y: 0 }));
        res = res.concat(effectsData.spin.cssList({ speed: attrs.speed / 2, behavior: "normal", direction: "z", delay: attrs.delay }));
        res = res.concat(effectsData.position.cssList({ x: attrs.distance, y: 0 }));
        res = res.concat(effectsData.spin.cssList({ speed: attrs.speed, behavior: "reverse", direction: "z", delay: attrs.delay }));
        return res;
      },
      MFM: (text, attrs) => {
        let res = text;
        res = effectsData.spin.MFM(res, { speed: attrs.speed, behavior: "reverse", direction: "z", delay: attrs.delay });
        res = effectsData.position.MFM(res, { x: attrs.distance, y: 0 });
        res = effectsData.spin.MFM(res, { speed: attrs.speed / 2, behavior: "normal", direction: "z", delay: attrs.delay });
        res = effectsData.position.MFM(res, { x: attrs.distance, y: 0 });
        res = effectsData.spin.MFM(res, { speed: attrs.speed, behavior: "reverse", direction: "z", delay: attrs.delay });
        return res;
      },
      attrSettingHTMLs: {
        speed: () => {
          return `<div>速さ:<input type="number" class="speed" placeholder="速さ" min="0" value="${effectsData.parallel.defaults.speed}" step="any"></div>`;
        },
        distance: () => {
          return `<div>距離:<input type="number" class="distance" placeholder="距離" value="${effectsData.parallel.defaults.distance}" step="any"></div>`;
        },
        delay: () => {
          return `<div>遅延:<input type="number" class="delay" placeholder="遅延" min="0" value="${effectsData.tada.defaults.delay}" step="any"></div>`;
        }
      },
      defaults: {
        speed: 1,
        distance: 1,
        delay: 0,
      }
    },
    blink: {
      description: "点滅(bounce + flip + position)",
      cssList: (attrs) => {
        let res = [];
        res = res.concat(effectsData.position.cssList({ x: 0, y: 999999 }));
        res = res.concat(effectsData.bounce.cssList({ speed: attrs.speed, delay: attrs.delay }));
        res = res.concat(effectsData.position.cssList({ x: 0, y: -999999 }));
        res = res.concat(effectsData.flip.cssList({ h: false, v: true }));
        res = res.concat(effectsData.bounce.cssList({ speed: attrs.speed, delay: attrs.delay }));
        res = res.concat(effectsData.flip.cssList({ h: false, v: true }));
        return res;
      },
      MFM: (text, attrs) => {
        let res = text;
        res = effectsData.position.MFM(res, { x: 0, y: 999999 });
        res = effectsData.bounce.MFM(res, { speed: attrs.speed, delay: attrs.delay });
        res = effectsData.position.MFM(res, { x: 0, y: -999999 });
        res = effectsData.flip.MFM(res, { h: false, v: true });
        res = effectsData.bounce.MFM(res, { speed: attrs.speed, delay: attrs.delay });
        res = effectsData.flip.MFM(res, { h: false, v: true });
        return res;
      },
      attrSettingHTMLs: {
        speed: () => {
          return `<div>速さ:<input type="number" class="speed" placeholder="速さ" min="0" value="${effectsData.blink.defaults.speed}" step="any"></div>`;
        },
        delay: () => {
          return `<div>遅延:<input type="number" class="delay" placeholder="遅延" min="0" value="${effectsData.tada.defaults.delay}" step="any"></div>`;
        }
      },
      defaults: {
        speed: 0.75,
        delay: 0,
      }
    },
    blur: {
      description: "ぼわぼわ(blur)",
      cssList: (attrs) => {
        let res = [];
        res = res.concat(effectsData.scale.cssList({ x: 1 / attrs.strength, y: 1 / attrs.strength }));
        res = res.concat([{ "filter": "blur(6px)" }]);
        res = res.concat(effectsData.scale.cssList({ x: attrs.strength, y: attrs.strength }));
        return res;
      },
      MFM: (text, attrs) => {
        let res = text;
        if (attrs.strength !== effectsData.blur.defaults.strength) res = effectsData.scale.MFM(res, { x: Math.round(1 / attrs.strength * 10) / 10, y: Math.round(1 / attrs.strength * 10) / 10 });
        res = addMFM("blur", {
          "speed": attrs.speed === effectsData.blur.defaults.speed ? false : attrs.speed + "s"
        }, res);
        if (attrs.strength !== effectsData.blur.defaults.strength) res = effectsData.scale.MFM(res, { x: attrs.strength, y: attrs.strength });
        return res;
      },
      attrSettingHTMLs: {
        strength: () => {
          return `<div>強さ:<input type="number" class="strength" placeholder="強さ" min="0.1" value="${effectsData.blur.defaults.strength}" step="0.1"></div>`;
        },
      },
      defaults: {
        strength: 1,
      }
    },
    flip: {
      description: "反転(flip)",
      cssList: (attrs) => {
        return [
          { "transform": `scaleX(${attrs.h ? -1 : attrs.v ? 1 : -1}) scaleY(${attrs.v ? -1 : 1})` },
        ];
      },
      MFM: (text, attrs) => {
        return addMFM("flip", {
          "h": attrs.h,
          "v": attrs.v
        }, text);
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
        h: false,
        v: false
      }
    },
    rotate: {
      description: "回転(rotate)",
      cssList: (attrs) => {
        return [
          { "transform": `rotate(${attrs.deg}deg)` },
        ];
      },
      MFM: (text, attrs) => {
        return addMFM("rotate", {
          "deg": attrs.deg === effectsData.rotate.defaults.deg ? false : attrs.deg
        }, text);
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
          { "fontSize": "200%" },
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
          { "fontSize": "400%" },
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
          { "fontSize": "600%" },
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
          { "transform": `translate(${attrs.x}em, ${attrs.y}em)` },
        ];
      },
      MFM: (text, attrs) => {
        return addMFM("position", {
          "x": attrs.x === effectsData.position.defaults.x ? false : attrs.x,
          "y": attrs.y === effectsData.position.defaults.y ? false : attrs.y
        }, text);
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
          { "transform": `scale(${attrs.x}, ${attrs.y})` },
        ];
      },
      MFM: (text, attrs) => {
        return addMFM("scale", {
          "x": attrs.x === effectsData.scale.defaults.x ? false : attrs.x,
          "y": attrs.y === effectsData.scale.defaults.y ? false : attrs.y
        }, text);
      },
      attrSettingHTMLs: {
        x: () => {
          return `<div>大きさx:<input type="number" class="x" placeholder="大きさx" max="5" value="${effectsData.scale.defaults.x}" step="any"></div>`;
        },
        y: () => {
          return `<div>大きさy:<input type="number" class="y" placeholder="大きさy" max="5" value="${effectsData.scale.defaults.y}" step="any"></div>`;
        }
      },
      defaults: {
        x: 1,
        y: 1
      }
    },
    border: {
      description: "枠線(border)",
      cssList: (attrs) => {
        return [
          { "border": `${attrs.width}px ${attrs.style} ${attrs.color}`, "border-radius": `${attrs.radius}px`, "overflow": `${attrs.noclip ? "visible" : "clip" }` },
        ];
      },
      MFM: (text, attrs) => {
        return addMFM("border", {
          "width": attrs.width === effectsData.border.defaults.width ? false : attrs.width,
          "style": attrs.style === effectsData.border.defaults.style ? false : attrs.style,
          "color": attrs.color === effectsData.border.defaults.color ? false : attrs.color.slice(1, undefined),
          "radius": attrs.radius === effectsData.border.defaults.radius ? false : attrs.radius,
          "noclip": attrs.noclip === effectsData.border.defaults.noclip ? false : attrs.noclip,
        }, text);
      },
      attrSettingHTMLs: {
        width: () => {
          return `<div>幅:<input type="number" class="width" placeholder="幅" min="0" value="${effectsData.border.defaults.width}" step="any"></div>`;
        },
        style: () => {
          return `<select class="style">
            <option value="solid" ${effectsData.border.defaults.style === "solid" ? "selected" : ""}>実線</option>
            <option value="dashed" ${effectsData.border.defaults.style === "dashed" ? "selected" : ""}>破線</option>
            <option value="dotted" ${effectsData.border.defaults.style === "dotted" ? "selected" : ""}>点線</option>
            <option value="double" ${effectsData.border.defaults.style === "double" ? "selected" : ""}>二重線</option>
            <option value="groove" ${effectsData.border.defaults.style === "groove" ? "selected" : ""}>浮き出し1</option>
            <option value="ridge" ${effectsData.border.defaults.style === "ridge" ? "selected" : ""}>浮き出し2</option>
            <option value="inset" ${effectsData.border.defaults.style === "inset" ? "selected" : ""}>浮き出し3</option>
            <option value="outset" ${effectsData.border.defaults.style === "outset" ? "selected" : ""}>浮き出し4</option>
          </select>`;
        },
        color: () => {
          return `<input type="text" class="color pickr" placeholder="色" value="${effectsData.border.defaults.color}">`;
        },
        radius: () => {
          return `<div>角丸:<input type="number" class="radius" placeholder="角丸" min="0" value="${effectsData.border.defaults.radius}" step="any"></div>`;
        },
        noclip: () => {
          return `<label><input type="checkbox" class="noclip">はみ出す</label>`;
        },
      },
      defaults: {
        width: 1,
        style: "solid",
        color: "#86b300",
        radius: 0,
        noclip: false,
      }
    }
  };
  let domain;
  let emojis;
  let objects = {};
  scene1();

  // -------------------------------シーン1--------------------------------
  function scene1() {
    goElem.addEventListener("click", async () => {
      messageElem.innerText = "読み込み中...";
      goElem.inert = true;
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
        goElem.inert = false;
      }
    });
    domainElem.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        goElem.click();
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
          <div class="object-controls-wrapper">
            <a class="button block-link object-up"><i class="ti ti-arrow-badge-up"></i></a>
            <a class="button block-link object-down"><i class="ti ti-arrow-badge-down"></i></a>
            <input type="text" class="object-input" placeholder="テキスト" data-linkattr="text">
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
              <div>文字色:<input type="text" class="setting-fg pickr" data-linkattr="fg" value="#c7d1d8"></div>
              <label><input type="checkbox" class="setting-fg-default" data-linkattr="fgDefault" checked>デフォルトを使用する</label>
            </div>
            <div class="object-setting-group">
              <div>背景色:<input type="text" class="setting-bg pickr" data-linkattr="bg" value="#c7d1d8"></div>
              <label><input type="checkbox" class="setting-bg-default" data-linkattr="bgDefault" checked>デフォルトを使用する</label>
            </div>
            <div class="object-effects-wrapper">
              <a class="block-link button add-effect"><i class="ti ti-wand"></i>エフェクトを追加</a>
            </div>
          </div>
        </div>`);

      const objectDeleteElem = document.querySelectorAll(".object-delete");
      const objectSettingElem = document.querySelectorAll(".object-setting");
      const objectUpElem = document.querySelectorAll(".object-up");
      const objectDownElem = document.querySelectorAll(".object-down");
      const addEffectElem = document.querySelectorAll(".add-effect");
      const pickrElems = document.querySelectorAll(".pickr");
      initPickr(pickrElems);

      objects[id] = {
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
        bg: "#c7d1d8",
        bgDefault: true,
        effects: [],
      };

      onEventAll(objectDeleteElem, "click", (e) => {
        const pickrElems = document.querySelectorAll(".pickr");
        initPickr(pickrElems);
        const thisObjectElem = e.target.closest(".object");
        delete objects[thisObjectElem.dataset.id];
        thisObjectElem.remove();
        render(objects);
        generateMFM(objects);
      });
      onEventAll(objectSettingElem, "click", (e) => {
        e.target.closest(".object").querySelector(".object-settings-wrapper").toggleAttribute("hidden");
      });
      onEventAll(objectUpElem, "click", (e) => {
        const thisObjectElem = e.target.closest(".object");
        const thisObjectId = thisObjectElem.dataset.id;
        const thisObject = objects[thisObjectId];
        const prevObjectElem = thisObjectElem.closest(".object").previousElementSibling;
        const prevObjectId = prevObjectElem.dataset.id;
        const prevObject = objects[prevObjectId];
        [objects[thisObjectId], objects[prevObjectId]] = [prevObject, thisObject];
        objectsElem.insertBefore(thisObjectElem, prevObjectElem);
        [prevObjectElem.dataset.id, thisObjectElem.dataset.id] = [thisObjectId, prevObjectId];
        render();
        generateMFM();
      });
      onEventAll(objectDownElem, "click", (e) => {
        const thisObjectElem = e.target.closest(".object");
        const thisObjectId = thisObjectElem.dataset.id;
        const thisObject = objects[thisObjectId];
        const nextObjectElem = thisObjectElem.closest(".object").nextElementSibling;
        const nextObjectId = nextObjectElem.dataset.id;
        const nextObject = objects[nextObjectId];
        [objects[thisObjectId], objects[nextObjectId]] = [nextObject, thisObject];
        objectsElem.insertBefore(nextObjectElem, thisObjectElem);
        [nextObjectElem.dataset.id, thisObjectElem.dataset.id] = [thisObjectId, nextObjectId];
        render();
        generateMFM();
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
        const effectSelectHTML = Object.entries(effectsData).map(([prop, val]) => `<option value="${prop}">${val.description}</option>`).join("");
        e.target.closest(".object-effects-wrapper").querySelector(".add-effect").insertAdjacentHTML("beforebegin",
          `<div class="object-effect" data-id="${effectId}">
            <div class="object-effect-input">
              <a class="button block-link effect-up"><i class="ti ti-arrow-badge-up"></i></a>
              <a class="button block-link effect-down"><i class="ti ti-arrow-badge-down"></i></a>
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

        const effectUpElem = document.querySelectorAll(".effect-up");
        const effectDownElem = document.querySelectorAll(".effect-down");
        const effectDeleteElem = document.querySelectorAll(".effect-delete");
        const effectTypeElem = document.querySelectorAll(".effect-type");

        onEventAll(effectUpElem, "click", (e) => {
          const thisEffectElem = e.target.closest(".object-effect");
          const thisEffectId = thisEffectElem.dataset.id;
          const thisEffect = objects[e.target.closest(".object").dataset.id].effects[thisEffectId];
          const prevEffectElem = thisEffectElem.closest(".object-effect").previousElementSibling;
          const prevEffectId = prevEffectElem.dataset.id;
          const prevEffect = objects[e.target.closest(".object").dataset.id].effects[prevEffectId];
          [objects[e.target.closest(".object").dataset.id].effects[thisEffectId], objects[e.target.closest(".object").dataset.id].effects[prevEffectId]] = [prevEffect, thisEffect];
          thisEffectElem.closest(".object-effects-wrapper").insertBefore(thisEffectElem, prevEffectElem);
          [prevEffectElem.dataset.id, thisEffectElem.dataset.id] = [thisEffectId, prevEffectId];
          const pickrElems = document.querySelectorAll(".pickr");
          initPickr(pickrElems);
          render();
          generateMFM();
        });
        onEventAll(effectDownElem, "click", (e) => {
          const thisEffectElem = e.target.closest(".object-effect");
          const thisEffectId = thisEffectElem.dataset.id;
          const thisEffect = objects[e.target.closest(".object").dataset.id].effects[thisEffectId];
          const nextEffectElem = thisEffectElem.closest(".object-effect").nextElementSibling;
          const nextEffectId = nextEffectElem.dataset.id;
          const nextEffect = objects[e.target.closest(".object").dataset.id].effects[nextEffectId];
          [objects[e.target.closest(".object").dataset.id].effects[thisEffectId], objects[e.target.closest(".object").dataset.id].effects[nextEffectId]] = [nextEffect, thisEffect];
          thisEffectElem.closest(".object-effects-wrapper").insertBefore(nextEffectElem, thisEffectElem);
          [nextEffectElem.dataset.id, thisEffectElem.dataset.id] = [thisEffectId, nextEffectId];
          const pickrElems = document.querySelectorAll(".pickr");
          initPickr(pickrElems);
          render();
          generateMFM();
        });
        onEventAll(effectDeleteElem, "click", (e) => {
          delete objects[e.target.closest(".object").dataset.id].effects[e.target.closest(".object-effect").dataset.id];
          e.target.closest(".object-effect").remove();
          const pickrElems = document.querySelectorAll(".pickr");
          initPickr(pickrElems);
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
          Object.values(effectsData[effectType]?.attrSettingHTMLs || []).forEach((attrSettingHTML) => {
            thisEffectSettingElem.insertAdjacentHTML("beforeend", attrSettingHTML());
          });

          const pickrElems = document.querySelectorAll(".pickr");
          initPickr(pickrElems);

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
      if (!value.fgDefault) objectElem = nestAndSetStyle(objectElem, [{ "color": value.fg }]);
      if (!value.bgDefault) objectElem = nestAndSetStyle(objectElem, [{ "backgroundColor": value.bg }]);
      value.effects.forEach((effect) => {
        objectElem = nestAndSetStyle(objectElem, effectsData[effect.type]?.cssList(effect.values));
      });
      if (value.isBold) objectElem = nestAndSetStyle(objectElem, [{ "fontWeight": "bold" }]);
      if (value.isStrike) objectElem = nestAndSetStyle(objectElem, [{ "textDecoration": "line-through" }]);
      if (value.isItalic) objectElem = nestAndSetStyle(objectElem, [{ "fontStyle": "italic" }]);
      objectElem = nestAndSetStyle(objectElem, [{ "transform": `scale(${value.sizeX}, ${value.sizeY})` }]);
      objectElem = nestAndSetStyle(objectElem, [{ "transform": `translate(${value.x}em, ${value.y}em)` }]);
      if (value.font !== "default") objectElem = nestAndSetStyle(objectElem, [{ "fontFamily": value.font }]);
      if (value.isCenter) objectElem = nestAndSetStyle(objectElem, [{ "textAlign": "center", "display": "block" }]);
      previewElem.appendChild(objectElem);
    });
    twemoji.parse(previewElem);
  }



  function nestAndSetStyle(elem, styles) {
    if (!styles) return elem;
    for (const style of styles) {
      elem = nest(elem);
      Object.entries(style).forEach((style) => {
        elem.style[style[0]] = style[1];
      });
    }
    return elem;
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
    let allMFM = Object.values(objects).map((value) => {
      let thisObjectMFM = value.text;
      if (!value.fgDefault) thisObjectMFM = addMFM("fg", { "color": value.fg.slice(1, undefined) }, thisObjectMFM);
      if (!value.bgDefault) thisObjectMFM = addMFM("bg", { "color": value.bg.slice(1, undefined) }, thisObjectMFM);
      value.effects.forEach((effect) => {
        thisObjectMFM = effectsData[effect.type]?.MFM(thisObjectMFM, effect.values) || thisObjectMFM;
      });
      if (value.isBold) thisObjectMFM = addNest("**", thisObjectMFM);
      if (value.isStrike) thisObjectMFM = addNest("~~", thisObjectMFM);
      if (value.isItalic) thisObjectMFM = addNestLikeHTML("i", thisObjectMFM);
      if (value.sizeX !== 1 || value.sizeY !== 1) thisObjectMFM = addMFM("scale", { "x": value.sizeX == 1 ? false : value.sizeX, "y": value.sizeY == 1 ? false : value.sizeY }, thisObjectMFM);
      if (value.x !== 0 || value.y !== 0) thisObjectMFM = addMFM("position", { "x": value.x == 0 ? false : value.x, "y": value.y == 0 ? false : value.y }, thisObjectMFM);
      if (value.font != "default") thisObjectMFM = addMFM("font", { [value.font]: true }, thisObjectMFM);
      if (value.isCenter) thisObjectMFM = addNestLikeHTML("center", thisObjectMFM);
      return thisObjectMFM;
    }).join("\n");
    resultElem.innerText = allMFM;

    const copyBtnElem = document.createElement("a");
    copyBtnElem.classList.add("button");
    copyBtnElem.classList.add("block-link");
    copyBtnElem.classList.add("copy-button");
    copyBtnElem.innerText = "コピー";
    copyBtnElem.addEventListener("click", () => {
      navigator.clipboard.writeText(allMFM);
      copyBtnElem.innerText = "コピーしました";
      setTimeout(() => {
        copyBtnElem.innerText = "コピー";
      }, 1000);
    });
    resultElem.appendChild(copyBtnElem);
  }

  function addMFM(name, properties, innerText) {
    if (!name) {
      return innerText;
    }
    const attrs = Object.entries(properties)
      .filter(([_, value]) => value !== false)
      .map(([key, value]) => (value === true ? key : `${key}=${value}`))
      .join(",");
    return `$[${name}${attrs === "" ? "" : "."}${attrs} ${innerText}]`;
  }

  function addNest(text, innerText) {
    return `${text}${innerText}${text}`;
  }

  function addNestLikeHTML(text, innerText) {
    return `<${text}>${innerText}</${text}>`;
  }

  function initPickr(pickrElems) {
    pickrElems.forEach((pickrElem) => {
      pickrElem.dispatchEvent(new Event("destroy"));
      const pickrObj = Pickr.create({
        el: pickrElem,
        theme: "nano",
        useAsButton: true,
        default: pickrElem.value,
        components: {
          preview: true,
          opacity: true,
          hue: true,
          interaction: {
            hex: true,
            hsva: true,
            input: true,
            clear: false,
            save: false,
          },
        },
      });
      pickrObj.on("change", (color) => {
        const HEXA = color.toHEXA();
        const HSVA = color.toHSVA();
        pickrElem.value = HEXA[3] ? ("#" + HEXA.map(value => value.slice(0, 1)).join("").toLowerCase()) : (HEXA.toString().toLowerCase());
        pickrElem.style.backgroundColor = pickrElem.value;
        pickrElem.style.color = HSVA[2] < 70 * HSVA[3] ? "var(--white)" : "var(--black)";
        pickrElem.dispatchEvent(new Event("input"));
      });
      pickrElem.addEventListener("destroy", () => {
        pickrObj.destroyAndRemove();
      });
    });
  }

  // -------------------------------ユーティリティ--------------------------------
  // removeEventListenerがうまく動いてくれなかったので、代わりにelement.onclick
  function onEventAll(elems, event, listener) {
    elems.forEach((elem) => {
      elem["on" + event] = listener;
    });
  }
});
