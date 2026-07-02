// ============================================================
//  PIEEJAMĪBAS KALENDĀRS no Google Calendar
//  Rāda mēneša režģi; dienas, kurās kalendārā ir notikums,
//  tiek atzīmētas kā aizņemtas. Klikšķis uz brīvas dienas
//  ieraksta datumu pieteikuma formā.
//  Ja calendarId/apiKey nav norādīti config failā — kalendāra
//  vietā tiek rādīts paziņojums ar aicinājumu sazināties.
// ============================================================

window.CAL = (function () {
  var cfg = window.SITE_CONFIG;
  var MONTHS_AHEAD = 6; // cik mēnešus uz priekšu var šķirstīt
  var busyDays = {};    // { "2026-07-15": true, ... }
  var loaded = false;
  var today = new Date();
  var view = { year: today.getFullYear(), month: today.getMonth() };
  var selectedDate = null;

  function pad(n) { return n < 10 ? "0" + n : "" + n; }
  function dayKey(y, m, d) { return y + "-" + pad(m + 1) + "-" + pad(d); }

  // ---- Google Calendar API (freeBusy) ----
  // Izmantojam freeBusy vaicājumu, nevis notikumu sarakstu:
  //  * strādā arī tad, ja kalendārs publiskots tikai "brīvs/aizņemts" režīmā
  //  * neatklāj notikumu nosaukumus — tikai aizņemtos laikus
  function fetchEvents() {
    var id = cfg.google && cfg.google.calendarId;
    var key = cfg.google && cfg.google.calendarApiKey;
    if (!id || !key) return Promise.reject(new Error("Kalendārs nav konfigurēts"));

    var url = "https://www.googleapis.com/calendar/v3/freeBusy?key=" + encodeURIComponent(key);

    // freeBusy neatļauj pārāk garu posmu vienā vaicājumā,
    // tāpēc dalām pa 2 mēnešiem
    var chunks = [];
    for (var m = 0; m < MONTHS_AHEAD + 1; m += 2) {
      chunks.push({
        timeMin: new Date(today.getFullYear(), today.getMonth() + m, 1).toISOString(),
        timeMax: new Date(today.getFullYear(), today.getMonth() + Math.min(m + 2, MONTHS_AHEAD + 1), 1).toISOString()
      });
    }

    return Promise.all(chunks.map(function (chunk) {
      return fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ timeMin: chunk.timeMin, timeMax: chunk.timeMax, items: [{ id: id }] })
      }).then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      }).then(function (data) {
        var cal = data.calendars && data.calendars[id];
        if (!cal || cal.errors) throw new Error("Kalendārs nav publiski pieejams");
        (cal.busy || []).forEach(markBusyRange);
      });
    })).then(function () {
      loaded = true;
    });
  }

  // Atzīmē visas dienas, ko aizņemtais laika posms skar
  function markBusyRange(range) {
    var s = new Date(range.start);
    var e = new Date(range.end);
    if (isNaN(s) || isNaN(e)) return;
    var d = new Date(s.getFullYear(), s.getMonth(), s.getDate());
    while (d < e) {
      busyDays[dayKey(d.getFullYear(), d.getMonth(), d.getDate())] = true;
      d.setDate(d.getDate() + 1);
    }
  }

  // ---- Renderēšana ----
  function render() {
    var t = window.I18N.t;
    var monthEl = document.getElementById("cal-month");
    var weekdaysEl = document.getElementById("cal-weekdays");
    var gridEl = document.getElementById("cal-grid");
    if (!monthEl || !gridEl) return;

    monthEl.textContent = t("calendar.months")[view.month] + " " + view.year;

    weekdaysEl.innerHTML = "";
    t("calendar.weekdays").forEach(function (w) {
      var s = document.createElement("span");
      s.textContent = w;
      weekdaysEl.appendChild(s);
    });

    gridEl.innerHTML = "";
    var firstDay = new Date(view.year, view.month, 1);
    var daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
    // Nedēļa sākas ar pirmdienu
    var offset = (firstDay.getDay() + 6) % 7;

    for (var i = 0; i < offset; i++) {
      var empty = document.createElement("span");
      empty.className = "cal-day cal-day--empty";
      gridEl.appendChild(empty);
    }

    var todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    for (var d = 1; d <= daysInMonth; d++) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "cal-day";
      btn.textContent = d;
      var key = dayKey(view.year, view.month, d);
      var date = new Date(view.year, view.month, d);

      if (date < todayStart) {
        btn.className += " cal-day--past";
        btn.disabled = true;
      } else if (busyDays[key]) {
        btn.className += " cal-day--busy";
        btn.disabled = true;
      } else {
        if (key === selectedDate) btn.className += " cal-day--selected";
        btn.addEventListener("click", selectDay.bind(null, key));
      }
      gridEl.appendChild(btn);
    }

    updateNavButtons();
  }

  function selectDay(key) {
    selectedDate = key;
    var input = document.getElementById("form-date");
    if (input) input.value = key;
    render();
    var form = document.getElementById("contact-form");
    if (form) form.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function updateNavButtons() {
    var prev = document.getElementById("cal-prev");
    var next = document.getElementById("cal-next");
    var minIndex = today.getFullYear() * 12 + today.getMonth();
    var maxIndex = minIndex + MONTHS_AHEAD;
    var current = view.year * 12 + view.month;
    if (prev) prev.disabled = current <= minIndex;
    if (next) next.disabled = current >= maxIndex;
  }

  function shiftMonth(delta) {
    var index = view.year * 12 + view.month + delta;
    view.year = Math.floor(index / 12);
    view.month = index % 12;
    render();
  }

  function showUnavailable() {
    var widget = document.getElementById("calendar-widget");
    var msg = document.getElementById("cal-unavailable");
    if (widget) widget.classList.add("hidden");
    if (msg) msg.classList.remove("hidden");
  }

  function init() {
    var prev = document.getElementById("cal-prev");
    var next = document.getElementById("cal-next");
    if (prev) prev.addEventListener("click", function () { shiftMonth(-1); });
    if (next) next.addEventListener("click", function () { shiftMonth(1); });

    render(); // rādām tukšu (visu brīvu) režģi uzreiz

    fetchEvents()
      .then(render)
      .catch(function (err) {
        console.warn("Kalendārs nav pieejams:", err.message);
        // Ja konfigurēts, bet neizdevās ielādēt — rādām paziņojumu.
        // Ja vispār nav konfigurēts — arī rādām paziņojumu.
        if (!loaded) showUnavailable();
      });

    document.addEventListener("langchange", render);
  }

  return { init: init };
})();
