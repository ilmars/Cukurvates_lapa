// ============================================================
//  GALVENAIS SKRIPTS — savieno visu kopā:
//  kontaktu saites, dinamiskās sekcijas, formu, BUJ.
// ============================================================

(function () {
  var cfg = window.SITE_CONFIG;
  var t = function (p) { return window.I18N.t(p); };

  // ---- Kontaktu saites un teksti ----
  function applyContacts() {
    var c = cfg.contacts;
    var links = {
      phone: "tel:" + c.phoneLink,
      whatsapp: "https://wa.me/" + c.whatsapp + "?text=" + encodeURIComponent(t("contact.whatsappText")),
      email: "mailto:" + c.email,
      instagram: c.instagram
    };
    document.querySelectorAll("[data-contact]").forEach(function (el) {
      var kind = el.getAttribute("data-contact");
      if (links[kind]) el.href = links[kind];
    });
    document.querySelectorAll("[data-contact-label]").forEach(function (el) {
      var kind = el.getAttribute("data-contact-label");
      if (kind === "phone") el.textContent = c.phone;
      if (kind === "email") el.textContent = c.email;
    });
  }

  // ---- Lapas nosaukums un attēli ----
  function applyBasics() {
    document.getElementById("site-name").textContent = cfg.siteName;
    document.getElementById("footer-name").textContent = cfg.siteName;
    document.getElementById("footer-year").textContent = new Date().getFullYear();
    document.title = cfg.siteName + " — " + (window.I18N.lang === "lv"
      ? "cukurvates aparāta noma"
      : "cotton candy machine rental");
    var hero = document.getElementById("hero-img");
    if (hero && cfg.images && cfg.images.hero) hero.src = cfg.images.hero;
  }

  // ---- "Kā tas notiek" soļi ----
  function renderSteps() {
    var grid = document.getElementById("steps-grid");
    grid.innerHTML = "";
    t("steps.items").forEach(function (item) {
      // Ja solim ir "link" — visa kartīte ir klikšķināma saite
      var el = document.createElement(item.link ? "a" : "div");
      el.className = "step";
      if (item.link) el.href = item.link;
      el.innerHTML = '<div class="step__icon"></div><h3></h3><p></p>';
      el.querySelector(".step__icon").textContent = item.icon;
      el.querySelector("h3").textContent = item.title;
      el.querySelector("p").textContent = item.text;
      grid.appendChild(el);
    });
  }

  // ---- Galerija ----
  function renderGallery() {
    var gallery = document.getElementById("gallery");
    if (!gallery || !cfg.images || !cfg.images.gallery) return;
    gallery.innerHTML = "";
    cfg.images.gallery.forEach(function (src) {
      var img = document.createElement("img");
      img.src = src;
      img.alt = "";
      img.loading = "lazy";
      gallery.appendChild(img);
    });
  }

  // ---- Cenu kartītes ----
  function renderPricing() {
    var grid = document.getElementById("pricing-grid");
    var lang = window.I18N.lang;
    grid.innerHTML = "";
    cfg.pricing.forEach(function (plan) {
      var card = document.createElement("div");
      card.className = "price-card" + (plan.featured ? " price-card--featured" : "");
      if (plan.featured && plan.badge) {
        var badge = document.createElement("span");
        badge.className = "price-card__badge";
        badge.textContent = plan.badge[lang] || plan.badge.lv;
        card.appendChild(badge);
      }
      var h3 = document.createElement("h3");
      h3.textContent = plan.name[lang] || plan.name.lv;
      var price = document.createElement("div");
      price.className = "price-card__price";
      price.textContent = plan.price;
      var ul = document.createElement("ul");
      (plan.includes[lang] || plan.includes.lv).forEach(function (line) {
        var li = document.createElement("li");
        li.textContent = line;
        ul.appendChild(li);
      });
      card.appendChild(h3);
      card.appendChild(price);
      card.appendChild(ul);
      grid.appendChild(card);
    });
  }

  // ---- Kas iekļauts ----
  function renderIncluded() {
    var grid = document.getElementById("included-grid");
    grid.innerHTML = "";
    t("included.items").forEach(function (item) {
      var el = document.createElement("div");
      el.className = "included-item";
      el.innerHTML = '<div class="included-item__icon"></div><div><h3></h3><p></p></div>';
      el.querySelector(".included-item__icon").textContent = item.icon;
      el.querySelector("h3").textContent = item.title;
      el.querySelector("p").textContent = item.text;
      grid.appendChild(el);
    });
  }

  // ---- BUJ ----
  function renderFaq() {
    var list = document.getElementById("faq-list");
    list.innerHTML = "";
    t("faq.items").forEach(function (item) {
      var details = document.createElement("details");
      details.className = "faq-item";
      var summary = document.createElement("summary");
      summary.textContent = item.q;
      var p = document.createElement("p");
      p.textContent = item.a;
      details.appendChild(summary);
      details.appendChild(p);
      list.appendChild(details);
    });
  }

  // ---- Pieteikuma forma ----
  function initForm() {
    var form = document.getElementById("contact-form");
    var status = document.getElementById("form-status");

    // Datuma laukā nevar izvēlēties pagājušu dienu
    var dateInput = document.getElementById("form-date");
    if (dateInput) {
      var now = new Date();
      dateInput.min = now.getFullYear() + "-" +
        ("0" + (now.getMonth() + 1)).slice(-2) + "-" +
        ("0" + now.getDate()).slice(-2);
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var appsScript = cfg.form && cfg.form.appsScriptEndpoint;
      var formspree = cfg.form && cfg.form.formspreeEndpoint;

      if (appsScript) {
        // Google Apps Script — ieliek pieteikumu uzreiz kalendārā
        var btn = form.querySelector("button[type=submit]");
        btn.disabled = true;
        fetch(appsScript, { method: "POST", body: data })
          .then(function (res) { return res.json(); })
          .then(function (json) {
            if (!json.ok) throw new Error(json.error || "kļūda");
            showStatus(t("contact.formSuccess"), true);
            form.reset();
          })
          .catch(function () {
            showStatus(t("contact.formError"), false);
          })
          .then(function () { btn.disabled = false; });
      } else if (formspree) {
        fetch(formspree, {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" }
        })
          .then(function (res) {
            if (res.ok) {
              showStatus(t("contact.formSuccess"), true);
              form.reset();
            } else {
              throw new Error("HTTP " + res.status);
            }
          })
          .catch(function () {
            showStatus(t("contact.formError"), false);
          });
      } else {
        // Ja Formspree nav pieslēgts — sūtām pieteikumu caur WhatsApp
        var msg = t("contact.whatsappText") +
          "\n" + data.get("name") + ", " + data.get("phone");
        if (data.get("date")) msg += "\n" + t("contact.whatsappDate") + " " + data.get("date");
        if (data.get("message")) msg += "\n" + data.get("message");
        window.open("https://wa.me/" + cfg.contacts.whatsapp + "?text=" + encodeURIComponent(msg), "_blank");
      }
    });

    function showStatus(text, ok) {
      status.textContent = text;
      status.className = "contact__status " + (ok ? "contact__status--ok" : "contact__status--err");
    }
  }

  function renderAll() {
    applyBasics();
    applyContacts();
    renderSteps();
    renderGallery();
    renderPricing();
    renderIncluded();
    renderFaq();
  }

  // ---- Palaišana ----
  document.addEventListener("DOMContentLoaded", function () {
    window.I18N.init();
    renderAll();
    initForm();
    window.REVIEWS.init();
    window.CAL.init();
    document.addEventListener("langchange", renderAll);
  });
})();
