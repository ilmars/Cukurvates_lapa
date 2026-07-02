// ============================================================
//  ATSAUKSMES no Google Sheets
//  Izklājlapai jābūt publiskai ("Ikviens, kam ir saite, var skatīt").
//  Kolonnu secība izklājlapā (1. rinda — virsraksti):
//    A: Vārds | B: Zvaigznes (1-5) | C: Pasākums LV | D: Pasākums EN
//    E: Atsauksme LV | F: Atsauksme EN
//  Ja Sheets nav pieslēgts vai nav sasniedzams — rāda config
//  reviewsFallback atsauksmes.
// ============================================================

window.REVIEWS = (function () {
  var cfg = window.SITE_CONFIG;
  var CACHE_KEY = "reviews-cache";
  var CACHE_TTL = 30 * 60 * 1000; // 30 minūtes
  var reviews = null;

  function gvizUrl(sheetId) {
    return "https://docs.google.com/spreadsheets/d/" + sheetId + "/gviz/tq?tqx=out:json";
  }

  // gviz atbilde ir JS "apvalkā" — izgriežam tīro JSON no vidus
  function parseGviz(text) {
    var start = text.indexOf("{");
    var end = text.lastIndexOf("}");
    if (start === -1 || end === -1) throw new Error("Negaidīts gviz formāts");
    var data = JSON.parse(text.substring(start, end + 1));
    var rows = (data.table && data.table.rows) || [];
    function cell(row, i) {
      var c = row.c && row.c[i];
      return c && c.v != null ? String(c.v) : "";
    }
    return rows
      .map(function (row) {
        return {
          name: cell(row, 0),
          stars: Math.max(1, Math.min(5, parseInt(cell(row, 1), 10) || 5)),
          event: { lv: cell(row, 2), en: cell(row, 3) || cell(row, 2) },
          text: { lv: cell(row, 4), en: cell(row, 5) || cell(row, 4) }
        };
      })
      .filter(function (r) { return r.name && r.text.lv; });
  }

  function readCache() {
    try {
      var raw = localStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      var obj = JSON.parse(raw);
      if (Date.now() - obj.time > CACHE_TTL) return null;
      return obj.reviews;
    } catch (e) { return null; }
  }

  function writeCache(list) {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ time: Date.now(), reviews: list }));
    } catch (e) { /* localStorage var būt atspējots — nekas */ }
  }

  function render() {
    var grid = document.getElementById("reviews-grid");
    if (!grid) return;
    var lang = window.I18N.lang;
    var list = reviews || cfg.reviewsFallback || [];
    grid.innerHTML = "";
    list.forEach(function (r) {
      var card = document.createElement("div");
      card.className = "review";
      var stars = "★".repeat(r.stars) + "☆".repeat(5 - r.stars);
      var eventText = (r.event && (r.event[lang] || r.event.lv)) || "";
      var bodyText = (r.text && (r.text[lang] || r.text.lv)) || "";
      card.innerHTML =
        '<div class="review__stars">' + stars + "</div>" +
        '<p class="review__text"></p>' +
        '<span class="review__author"></span>' +
        '<span class="review__event"></span>';
      card.querySelector(".review__text").textContent = "“" + bodyText + "”";
      card.querySelector(".review__author").textContent = r.name;
      card.querySelector(".review__event").textContent = eventText;
      grid.appendChild(card);
    });
  }

  function init() {
    render(); // uzreiz rādām fallback, lai lapa nav tukša

    var sheetId = cfg.google && cfg.google.reviewsSheetId;
    if (sheetId) {
      var cached = readCache();
      if (cached) {
        reviews = cached;
        render();
      } else {
        fetch(gvizUrl(sheetId))
          .then(function (res) {
            if (!res.ok) throw new Error("HTTP " + res.status);
            return res.text();
          })
          .then(function (text) {
            var list = parseGviz(text);
            if (list.length) {
              reviews = list;
              writeCache(list);
              render();
            }
          })
          .catch(function (err) {
            console.warn("Neizdevās ielādēt atsauksmes no Google Sheets:", err);
          });
      }
    }

    document.addEventListener("langchange", render);
  }

  return { init: init };
})();
