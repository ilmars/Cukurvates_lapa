# 🍭 Saldā Vate — cukurvates aparāta nomas lapa

One-page mājaslapa cukurvates aparāta nomai. Bez servera, bez būvēšanas rīkiem —
tīrs HTML, CSS un JavaScript, ko var hostēt GitHub Pages bez maksas.

## Kā apskatīt lapu savā datorā

Vienkārši atver `index.html` pārlūkā (dubultklikšķis uz faila). Viss strādās,
izņemot Google integrācijas, kurām vajag internetu.

## Kā mainīt lapas saturu

**Viss saturs ir vienā failā: `js/config.js`** — atver to ar teksta redaktoru un maini:

| Ko gribi mainīt | Kur config failā |
|---|---|
| Lapas nosaukumu | `siteName` |
| Tālruni, WhatsApp, e-pastu, Instagram | `contacts` |
| Cenas un komplektus | `pricing` |
| Visus tekstus (LV un EN) | `texts` |
| Rezerves atsauksmes | `reviewsFallback` |
| Attēlus | `images` |

Pēc saglabāšanas atjaunini lapu pārlūkā (F5).

**Krāsas** var mainīt `css/style.css` faila pašā augšā (`:root` sadaļā).

## Kā nomainīt bildes pret īstām fotogrāfijām

Pašlaik lapā ir stock bildes no Unsplash (bezmaksas licence). Kad būs fotogrāfa bildes:

1. Pārsauc tās par `hero.jpg`, `gallery-1.jpg`, `gallery-2.jpg`, `gallery-3.jpg`
2. Iekopē `assets/` mapē (aizstājot vecās)
3. Gatavs! (Vai arī ieliec citus failu nosaukumus un nomaini ceļus `config.js` → `images`)

Ieteikums: hero bilde ~1600px plata, galerijas ~1200px, lai lapa ielādējas ātri.

## Google Sheets — atsauksmes

1. Izveido jaunu Google izklājlapu: https://sheets.new
2. Pirmajā rindā ieraksti virsrakstus: `Vārds | Zvaigznes | Pasākums LV | Pasākums EN | Atsauksme LV | Atsauksme EN`
3. Zem tiem raksti atsauksmes (katra atsauksme — sava rinda; EN kolonnas var atstāt tukšas)
4. Spied **Kopīgot** → "Ikviens, kam ir saite" → **Skatītājs**
5. No izklājlapas adreses izkopē ID (garā virkne starp `/d/` un `/edit`):
   `https://docs.google.com/spreadsheets/d/`**`ŠIS_IR_ID`**`/edit`
6. Ieliec to `config.js` → `google.reviewsSheetId`

Ja izklājlapa nav pieslēgta vai nav sasniedzama, lapa rāda `reviewsFallback` atsauksmes.

## Google Calendar — aizņemtie datumi

1. Google kalendārā izveido **jaunu, atsevišķu kalendāru** (piem., "Cukurvates noma") —
   Iestatījumi → Pievienot kalendāru. **Nelieto savu personīgo kalendāru**, jo notikumi būs publiski!
2. Kalendāra iestatījumos ieslēdz **Padarīt pieejamu publiski** (pietiek ar "Rādīt tikai brīvs/aizņemts")
3. Turpat atrodi **Kalendāra ID** (izskatās kā `xxx@group.calendar.google.com`) → ieliec `config.js` → `google.calendarId`
4. Izveido API atslēgu:
   - Ej uz https://console.cloud.google.com → izveido projektu
   - **APIs & Services → Library** → atrodi **Google Calendar API** → Enable
   - **APIs & Services → Credentials → Create credentials → API key**
   - ⚠️ **Obligāti:** atver atslēgas iestatījumus un ierobežo to:
     - *Application restrictions* → **Websites** → pievieno savu lapas adresi (piem., `https://tavslietotajvards.github.io/*`)
     - *API restrictions* → **Restrict key** → tikai **Google Calendar API**
   - Ieliec atslēgu `config.js` → `google.calendarApiKey`
5. Kad kāds rezervē aparātu — ieliec kalendārā notikumu uz visu dienu, un lapā tā diena kļūs rozā (aizņemta)

Atslēga būs redzama lapas kodā — tas ir normāli šādai lapai, ja tai ir uzlikti
abi ierobežojumi (tikai tava lapa + tikai Calendar API).

## Pieteikuma forma

Pēc noklusējuma forma atver WhatsApp ar aizpildītu ziņu. Lai pieteikumi nāktu uz e-pastu:

1. Reģistrējies https://formspree.io (bezmaksas — 50 pieteikumi mēnesī)
2. Izveido jaunu formu, nokopē tās adresi (piem., `https://formspree.io/f/abcdwxyz`)
3. Ieliec to `config.js` → `form.formspreeEndpoint`

## Kā publicēt GitHub Pages

1. Izveido kontu https://github.com un jaunu repozitoriju (piem., `cukurvate`)
2. Augšupielādē visus projekta failus (vai izmanto `git push`)
3. Repozitorijā: **Settings → Pages** → *Source*: **Deploy from a branch** → *Branch*: `main`, mape `/ (root)` → Save
4. Pēc ~1 minūtes lapa būs pieejama: `https://tavslietotajvards.github.io/cukurvate/`

Katru reizi, kad izmaini failus un aizsūti uz GitHub, lapa atjaunosies automātiski.

## Failu struktūra

```
index.html        lapas struktūra (sekcijas)
css/style.css     izskats (krāsas, fonti, izmēri)
js/config.js      ⭐ VISS SATURS — teksti, cenas, kontakti, iestatījumi
js/i18n.js        LV/EN valodu pārslēgšana
js/reviews.js     atsauksmju ielāde no Google Sheets
js/calendar.js    aizņemto datumu kalendārs no Google Calendar
js/main.js        pārējā lapas loģika (forma, BUJ, sekciju zīmēšana)
assets/           bildes un favicon
```
