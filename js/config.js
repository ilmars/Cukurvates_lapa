// ============================================================
//  LAPAS IESTATĪJUMI — šeit var mainīt VISU lapas saturu!
//  Pēc izmaiņu saglabāšanas atjaunini lapu pārlūkā (F5).
// ============================================================

window.SITE_CONFIG = {

  // Lapas nosaukums (redzams headerī un pārlūka cilnē)
  siteName: "Cukurvate ",

  // Noklusējuma valoda: "lv" vai "en"
  defaultLang: "lv",

  // ---- KONTAKTI ----
  contacts: {
    phone: "+37127068747",          // rādāmais numurs
    phoneLink: "+37127068747",          // numurs bez atstarpēm (zvana saitei)
    whatsapp: "37127068747",            // numurs WhatsApp saitei (bez + zīmes)
    // email: "info@saldavate.lv",
    // instagram: "https://www.instagram.com/#"
  },

  // ---- PIETEIKUMA FORMA ----
  // Forma sūta pieteikumu pirmajā konfigurētajā vietā šādā secībā:
  //  1) appsScriptEndpoint — pieteikums UZREIZ nonāk Google kalendārā
  //     (kā "PIETEIKUMS: ..." notikums) + tev pienāk e-pasts.
  //     Kā uzstādīt: README.md sadaļa "Pieteikumi uzreiz kalendārā".
  //  2) formspreeEndpoint — pieteikums pienāk tev e-pastā (formspree.io)
  //  3) ja abi tukši — forma atver WhatsApp ar aizpildītu ziņu
  form: {
    appsScriptEndpoint: "",
    formspreeEndpoint: "https://formspree.io/f/mwvdwoen"
  },

  // ---- GOOGLE INTEGRĀCIJAS ----
  // Instrukcija, kā tās iestatīt, ir README.md failā.
  google: {
    // Publiskas Google Sheets izklājlapas ID (atsauksmēm). Tukšs = rāda reviewsFallback.
    reviewsSheetId: "",
    // Publiska Google kalendāra ID (piem., xxx@group.calendar.google.com)
    calendarId: "f28fa9b3cf56366baba91ef0ab227ffe34d7f7f12f4f61a9ab8bdfa731098258@group.calendar.google.com",
    // Google Cloud API atslēga (tikai Calendar API, ar referrer ierobežojumu!)
    calendarApiKey: "AIzaSyA2S19N7XkkiVO5n6JN4-TeTOuRHqfBV9I"
  },

  // ---- ATTĒLI ----
  // Kad būs fotogrāfa bildes — vienkārši aizstāj failus assets/ mapē
  // (ar tiem pašiem nosaukumiem) vai nomaini ceļus šeit.
  images: {
    hero: "assets/hero.jpg",
    gallery: [
      "assets/gallery-1.jpg",
      "assets/gallery-2.jpg",
      "assets/gallery-3.jpg"
    ]
  },

  // ---- CENAS (piedāvājumi) ----
  pricing: [
    {
      featured: false,
      name: { lv: "Standarts", en: "Standard" },
      price: "€40",
      priceNote: { lv: "diennakts", en: "per 24 hours" },
      includes: {
        lv: ["Cukurvates aparāts", "1 kg krāsainā cukura (~50 porcijas)", "50 kociņi", "Instruktāža saņemot", "Saņemšana Mārupē"],
        en: ["Cotton candy machine", "1 kg of colored sugar (~50 servings)", "50 sticks", "Instructions at pickup", "Pick up in Mārupe"]
      }
    },
    {
      featured: true,
      badge: { lv: "Viss iekļauts", en: "All inclusive" },
      name: { lv: "All inclusive", en: "All inclusive" },
      price: "€100",
      priceNote: { lv: "pasākumam", en: "per event" },
      includes: {
        lv: ["Cukurvates meistars gatavo vati taviem viesiem (līdz 6 h)", "Cukurvates aparāts", "2 kg krāsainā cukura (~100 porcijas)", "100 kociņi", "Piegāde Mārupē, Babītē un Āgenskalnā", "Citur — pēc vienošanās"],
        en: ["Our cotton candy master serves your guests (up to 6 h)", "Cotton candy machine", "2 kg of colored sugar (~100 servings)", "100 sticks", "Delivery in Mārupe, Babīte and Āgenskalns", "Elsewhere — by arrangement"]
      }
    }
  ],

  // ---- REZERVES ATSAUKSMES ----
  // Tiek rādītas, ja Google Sheets nav pieslēgts vai nav sasniedzams.
  reviewsFallback: [
    {
      name: "Anita",
      stars: 5,
      event: { lv: "Dzimšanas diena Rīgā", en: "Birthday party in Riga" },
      text: {
        lv: "Bērni bija pilnīgā sajūsmā! Aparāts vienkārši lietojams, viss bija skaidri izstāstīts.",
        en: "The kids were absolutely thrilled! The machine was easy to use and everything was clearly explained."
      }
    },
    {
      name: "Juris",
      stars: 5,
      event: { lv: "Uzņēmuma vasaras pasākums", en: "Company summer event" },
      text: {
        lv: "Precīzi laikā, viss komplektā. Cukurvate bija pasākuma zvaigzne!",
        en: "Right on time, everything included. The cotton candy was the star of the event!"
      }
    },
    {
      name: "Linda",
      stars: 5,
      event: { lv: "Kāzas Jūrmalā", en: "Wedding in Jūrmala" },
      text: {
        lv: "Viesi stāvēja rindā visu vakaru. Noteikti ņemsim vēlreiz!",
        en: "Guests were lining up all evening. We will definitely rent it again!"
      }
    }
  ],

  // ---- VISI LAPAS TEKSTI ----
  texts: {
    lv: {
      nav: { pricing: "Cenas", calendar: "Kalendārs", faq: "BUJ", contact: "Kontakti" },
      hero: {
        title: "Cukurvate tavai ballītei!",
        subtitle: "Cukurvates aparāta noma dzimšanas dienām, kāzām un pasākumiem — cukurs, kociņi un instruktāža jau iekļauta cenā.",
        ctaBook: "Rezervēt datumu",
        ctaCall: "Zvanīt"
      },
      steps: {
        title: "Kā tas notiek?",
        items: [
          { icon: "📅", title: "Rezervē datumu", text: "Apskati kalendāru un piesaki brīvu dienu.", link: "#calendar" },
          { icon: "🚗", title: "Saņem aparātu", text: "Saņem Mārupē norunātajā vietā un laikā — parādīsim, kā viss darbojas." },
          { icon: "🍭", title: "Gatavo vati", text: "Pieslēdz parastai rozetei un priecē viesus!" },
          { icon: "↩️", title: "Atdod atpakaļ", text: "Nākamajā dienā atdod aparātu — tīrīšana iekļauta." }
        ]
      },
      pricing: { title: "Piedāvājumi", note: "Papildu krāsainais cukurs: +€8 par kg (~50 porcijas, +50 kociņi iekļauti). Drošības nauda €30, ko atgriežam, saņemot aparātu atpakaļ." },
      included: {
        title: "Kas iekļauts un kas jāzina",
        items: [
          { icon: "🍬", title: "Krāsainais cukurs", text: "1 kg ≈ 50 porcijas. Rozā, zila krāsa." },
          { icon: "🥢", title: "Kociņi", text: "Komplektā porcijām atbilstošs kociņu skaits." },
          { icon: "🎓", title: "Instruktāža", text: "Saņemot parādīsim, kā gatavot vati — tas ir vienkārši!" },
          { icon: "🔌", title: "Parasta rozete", text: "Vajag tikai 220V rozeti — der jebkura mājas rozete." },
          { icon: "📏", title: "Neliela vieta", text: "Pietiek ar galdu ~1×1 m un vietu, kur stāvēt." },
          { icon: "🏠", title: "Iekštelpās un ārā", text: "Ārā — zem nojumes un bez stipra vēja." }
        ]
      },
      calendar: {
        title: "Pieejamība",
        subtitle: "Rozā dienas jau aizņemtas. Klikšķini uz brīvas dienas, lai to ierakstītu pieteikumā!",
        legendFree: "Brīvs",
        legendBusy: "Aizņemts",
        unavailable: "Kalendārs īslaicīgi nav pieejams — zvani vai raksti, un pateiksim brīvos datumus!",
        weekdays: ["P", "O", "T", "C", "Pk", "S", "Sv"],
        months: ["Janvāris", "Februāris", "Marts", "Aprīlis", "Maijs", "Jūnijs", "Jūlijs", "Augusts", "Septembris", "Oktobris", "Novembris", "Decembris"]
      },
      reviews: { title: "Atsauksmes" },
      faq: {
        title: "Biežāk uzdotie jautājumi",
        items: [
          { q: "Cik daudz vietas vajag aparātam?", a: "Pietiek ar stabilu galdu apmēram 1×1 metrs un parastu 220V rozeti tuvumā. Aparāts sver ap 15 kg." },
          { q: "Cik porciju sanāk no 1 kg cukura?", a: "Apmēram 50 porcijas — katrai vatei vajag apmēram 20 gramus cukura." },
          { q: "Vai aparātu var lietot ārā?", a: "Jā, bet zem nojumes vai teltī un bez stipra vēja — vate ir viegla un lidojoša!" },
          { q: "Vai ir vajadzīgas īpašas prasmes?", a: "Nē! Saņemot aparātu, 10 minūtēs parādīsim, kā viss darbojas. Pirmā vate sanāk jau ar otro mēģinājumu." },
          { q: "Kā notiek rezervācija un samaksa?", a: "Piesakies pa tālruni, WhatsApp vai ar formu. Rezervējot lūgsim €10 avansu, pārējo — saņemot aparātu. Drošības nauda €30 tiek atgriezta, kad aparātu atdod." },
          { q: "Kas notiek, ja aparāts saplīst?", a: "Ja tas notiek parastā lietošanā — tā ir mūsu atbildība. Ja bojājums radies neuzmanības dēļ, to sedz drošības nauda." }
        ]
      },
      contact: {
        title: "Sazinies ar mums",
        subtitle: "Atbildam parasti stundas laikā!",
        formName: "Tavs vārds",
        formPhone: "Tālrunis",
        formDate: "Vēlamais datums",
        formMessage: "Ziņa (neobligāti)",
        formSubmit: "Nosūtīt pieteikumu",
        formSuccess: "Paldies! Pieteikums nosūtīts — drīz sazināsimies!",
        formError: "Neizdevās nosūtīt. Lūdzu, piezvani vai uzraksti WhatsApp!",
        whatsappText: "Sveiki! Vēlos rezervēt cukurvates aparātu.",
        whatsappDate: "Vēlamais datums:"
      },
      footer: { tagline: "Saldas ballītes visai Latvijai" }
    },

    en: {
      nav: { pricing: "Pricing", calendar: "Calendar", faq: "FAQ", contact: "Contact" },
      hero: {
        title: "Cotton candy for your party!",
        subtitle: "Cotton candy machine rental for birthdays, weddings and events — sugar, sticks and instructions included in the price.",
        ctaBook: "Book a date",
        ctaCall: "Call us"
      },
      steps: {
        title: "How it works",
        items: [
          { icon: "📅", title: "Book a date", text: "Check the calendar and request a free day.", link: "#calendar" },
          { icon: "🚗", title: "Pick up the machine", text: "Meet us in Marupe at the agreed place and time — we'll show you how it works." },
          { icon: "🍭", title: "Make cotton candy", text: "Plug it into a regular outlet and delight your guests!" },
          { icon: "↩️", title: "Return it", text: "Bring the machine back the next day — cleaning is included." }
        ]
      },
      pricing: { title: "Our offers", note: "Extra colored sugar: +€8 per kg (~50 servings, +50 sticks included). A €30 deposit is returned when the machine is brought back." },
      included: {
        title: "What's included and what to know",
        items: [
          { icon: "🍬", title: "Colored sugar", text: "1 kg ≈ 50 servings. Pink or blue." },
          { icon: "🥢", title: "Sticks", text: "Enough sticks for all servings included." },
          { icon: "🎓", title: "Instructions", text: "We'll show you how to make cotton candy — it's easy!" },
          { icon: "🔌", title: "Regular outlet", text: "Only a 220V outlet needed — any home socket works." },
          { icon: "📏", title: "Small footprint", text: "A ~1×1 m table and room to stand is enough." },
          { icon: "🏠", title: "Indoors and outdoors", text: "Outdoors — under a canopy and without strong wind." }
        ]
      },
      calendar: {
        title: "Availability",
        subtitle: "Pink days are already booked. Click a free day to add it to your request!",
        legendFree: "Free",
        legendBusy: "Booked",
        unavailable: "The calendar is temporarily unavailable — call or message us and we'll tell you the free dates!",
        weekdays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
      },
      reviews: { title: "Reviews" },
      faq: {
        title: "Frequently asked questions",
        items: [
          { q: "How much space does the machine need?", a: "A sturdy table about 1×1 meters and a regular 220V outlet nearby. The machine weighs about 15 kg." },
          { q: "How many servings from 1 kg of sugar?", a: "About 50 servings — each cotton candy needs roughly 20 grams of sugar." },
          { q: "Can the machine be used outdoors?", a: "Yes, but under a canopy or tent and without strong wind — cotton candy is light and flies away!" },
          { q: "Do I need special skills?", a: "No! When you pick up the machine, we'll show you everything in 10 minutes. You'll master it by your second try." },
          { q: "How do booking and payment work?", a: "Book by phone, WhatsApp or the form. We ask for a €10 advance, the rest on pickup. The €30 deposit is returned when you bring the machine back." },
          { q: "What if the machine breaks?", a: "If it happens during normal use — that's on us. Damage caused by carelessness is covered by the deposit." }
        ]
      },
      contact: {
        title: "Get in touch",
        subtitle: "We usually reply within an hour!",
        formName: "Your name",
        formPhone: "Phone",
        formDate: "Preferred date",
        formMessage: "Message (optional)",
        formSubmit: "Send request",
        formSuccess: "Thank you! Your request has been sent — we'll be in touch soon!",
        formError: "Could not send. Please call us or write on WhatsApp!",
        whatsappText: "Hi! I would like to rent the cotton candy machine.",
        whatsappDate: "Preferred date:"
      },
      footer: { tagline: "Sweet parties all over Latvia" }
    }
  }
};
