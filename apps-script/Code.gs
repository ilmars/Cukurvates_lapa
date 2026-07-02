// ============================================================
//  CUKURVATES PIETEIKUMU SKRIPTS (Google Apps Script)
//
//  Ko tas dara: saņem pieteikumu no mājaslapas formas,
//  izveido kalendārā visas dienas notikumu "PIETEIKUMS: ..."
//  un atsūta tev e-pastu.
//
//  Notikums tiek izveidots ar pieejamību "Brīvs", tāpēc tas
//  NEBLOĶĒ datumu lapas kalendārā. Kad apstiprini rezervāciju —
//  atver notikumu, nomaini nosaukumu un "Rādīt kā" uz "Aizņemts".
//
//  Kā uzstādīt — skaties README.md sadaļu "Pieteikumi uzreiz kalendārā".
// ============================================================

// Tava nomas kalendāra ID (tas pats, kas lapas config.js failā)
var CALENDAR_ID = "f28fa9b3cf56366baba91ef0ab227ffe34d7f7f12f4f61a9ab8bdfa731098258@group.calendar.google.com";

function doPost(e) {
  try {
    var p = (e && e.parameter) || {};
    var name = (p.name || "").toString().slice(0, 100).trim();
    var phone = (p.phone || "").toString().slice(0, 40).trim();
    var date = (p.date || "").toString().trim();      // formāts: 2026-07-15
    var message = (p.message || "").toString().slice(0, 500).trim();

    if (!name || !phone) {
      return respond({ ok: false, error: "missing-fields" });
    }

    var title = "PIETEIKUMS: " + name + ", " + phone;
    var description = "Pieteikums no mājaslapas\n\nVārds: " + name +
      "\nTālrunis: " + phone +
      (message ? "\nZiņa: " + message : "");

    // Ieliekam notikumu kalendārā (ja norādīts derīgs datums)
    var eventInfo = "";
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      var parts = date.split("-");
      var day = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
      CalendarApp.getCalendarById(CALENDAR_ID)
        .createAllDayEvent(title, day, { description: description });
      eventInfo = "Notikums ielikts kalendārā: " + date;
    } else {
      eventInfo = "Datums nebija norādīts — notikums kalendārā NAV ielikts.";
    }

    // E-pasts tev (uz kontu, kuram pieder šis skripts)
    MailApp.sendEmail(
      Session.getEffectiveUser().getEmail(),
      "🍭 Jauns cukurvates pieteikums: " + name + (date ? " (" + date + ")" : ""),
      description + "\n\n" + eventInfo +
      "\n\nAtceries: notikums ir ar statusu 'Brīvs'. Lai diena lapā kļūtu aizņemta,\n" +
      "atver notikumu kalendārā un nomaini 'Rādīt kā' uz 'Aizņemts'."
    );

    return respond({ ok: true });
  } catch (err) {
    return respond({ ok: false, error: String(err) });
  }
}

function respond(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
