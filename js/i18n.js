// ============================================================
//  VALODU PĀRSLĒGŠANA (LV / EN)
//  Teksti nāk no config.js "texts" sadaļas.
// ============================================================

window.I18N = (function () {
  var cfg = window.SITE_CONFIG;
  var lang = localStorage.getItem("lang") || cfg.defaultLang || "lv";
  if (!cfg.texts[lang]) lang = "lv";

  // Atrod tekstu pēc ceļa, piem., t("hero.title")
  function t(path) {
    var parts = path.split(".");
    var node = cfg.texts[lang];
    for (var i = 0; i < parts.length; i++) {
      if (node == null) return "";
      node = node[parts[i]];
    }
    return node == null ? "" : node;
  }

  // Aizpilda visus elementus ar data-i18n atribūtu
  function applyStatic() {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var value = t(el.getAttribute("data-i18n"));
      if (typeof value === "string" && value) el.textContent = value;
    });
    document.documentElement.lang = lang;
  }

  function setLang(newLang) {
    if (!cfg.texts[newLang]) return;
    lang = newLang;
    localStorage.setItem("lang", lang);
    applyStatic();
    updateSwitch();
    // Paziņo pārējiem moduļiem, lai tie pārzīmē savu saturu
    document.dispatchEvent(new CustomEvent("langchange", { detail: { lang: lang } }));
  }

  function updateSwitch() {
    document.querySelectorAll("#lang-switch button").forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
    });
  }

  function init() {
    document.querySelectorAll("#lang-switch button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setLang(btn.getAttribute("data-lang"));
      });
    });
    applyStatic();
    updateSwitch();
  }

  return {
    t: t,
    init: init,
    setLang: setLang,
    get lang() { return lang; }
  };
})();
