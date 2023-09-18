addEventListener("DOMContentLoaded", () => {
  const domainElem = document.getElementById("domain");
  const goElem = document.getElementById("go");
  const domainWrapperElem = document.getElementById("domain-wrapper");
  const mainWrapperElem = document.getElementById("main-wrapper");
  const messageElem = document.getElementById("message");
  let domain;
  let emojis;
  let objects = {};
  scene1();

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

  function scene2() {
    const addElem = document.getElementById("add");
    const objectsElem = document.getElementById("objects");

    let id = 0;
    addElem.addEventListener("click", () => {
      objectsElem.insertAdjacentHTML("beforeend",
        `<div class="object" data-id="${id}">
          <div class="object-controls-wrapper"><input type="text" class="object-input" placeholder="テキスト">
            <a class="button block-link object-setting">設定</a>
            <a class="button block-link object-delete">削除</a>
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
                <label>デフォルトを使用する:<input type="checkbox" class="setting-fg-default" checked></label>
              </div>
              <div class="object-setting-group">
                <div>文字色:<input type="color" value="#2d2d2d" class="setting-bg"></div>
                <label>デフォルトを使用する:<input type="checkbox" class="setting-bg-default" checked></label>
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

      render();
      generateMFM();
      id++;
    });
  }

  function render() {
    console.log(objects);
    const defaultFont = "Hiragino Maru Gothic Pro, BIZ UDGothic, Roboto, HelveticaNeue, Arial, sans-serif";
    const defaultFg = "#c7d1d8";
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
      objectElem = nestAndSetStyle(objectElem, [["color", value.fgDefault ? defaultFg : value.fg]]);
      objectElem = nestAndSetStyle(objectElem, [["backgroundColor", value.bgDefault ? null : value.bg]]);
      objectElem = nestAndSetStyle(objectElem, [["transform", `scale(${value.sizeX}, ${value.sizeY})`]]);
      objectElem = nestAndSetStyle(objectElem, [["transform", `translate(${value.x}em, ${value.y}em)`]]);
      objectElem = nestAndSetStyle(objectElem, [["fontWeight", value.isBold ? "bold" : null]]);
      objectElem = nestAndSetStyle(objectElem, [["textDecoration", value.isStrike ? "line-through" : null]]);
      objectElem = nestAndSetStyle(objectElem, [["fontStyle", value.isItalic ? "italic" : null]]);
      objectElem = nestAndSetStyle(objectElem, [["fontFamily", value.font || defaultFont]]);
      objectElem = nestAndSetStyle(objectElem, [["textAlign", value.isCenter ? "center" : null], ["display", "block"]]);
      previewElem.appendChild(objectElem);
      console.log(objectElem);
    });
  }

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
      if (value.font) thisObjectMFM = addMFM("font", [[value.font]], thisObjectMFM);
      if (value.isCenter) thisObjectMFM = addNestLikeHTML("center", thisObjectMFM);
      allMFM += thisObjectMFM + "\n";
    });
    resultElem.innerText = allMFM;
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

  function addMFM(name, properties, innerText) {
    let res = `$[${name}.`;
    properties.forEach((property, index) => {
      res += property[0];
      if (property?.[1] !== undefined) res += `=${property[1]}`;
      if (index < properties.length - 1) res += ",";
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

  // removeEventListenerがうまく動いてくれなかったので、代わりにelement.onclick
  function onEventAll(elems, event, listener) {
    elems.forEach((elem) => {
      elem["on" + event] = listener;
    });
  }
});
