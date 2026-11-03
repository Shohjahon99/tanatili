# Tana tili — interaktiv qo‘llanma

Navarro, Ekman, Pease, Morris, Vrij kitoblari va ilmiy meta-tahlillar (Bond & DePaulo 2006, DePaulo 2003, Barrett 2019) asosida tuzilgan o‘zbek tilidagi interaktiv sayt.

Bitta fayl: `index.html` (HTML + CSS + JS, hech qanday kutubxona kerak emas).

## GitHub’ga yuklash
```bash
git init
git add .
git commit -m "Tana tili qo‘llanmasi"
git branch -M main
git remote add origin https://github.com/USERNAME/tana-tili.git
git push -u origin main
```

## Vercel’ga joylash
1. vercel.com → **Add New → Project** → GitHub’dagi `tana-tili` repozitoriyasini tanlang.
2. Framework Preset: **Other**. Build Command va Output Directory bo‘sh qoladi.
3. **Deploy** tugmasini bosing.

Yoki terminaldan: `npx vercel` (papka ichida).

## Tahrirlash
Matnlar `index.html` ichidagi `<script>` qismida: `ZONES` (tana qismlari), `STATES` va `PRESETS` (kombinatsiya tahlilchisi, jumladan ovoz va nutq), `LOCAL` va `SITS` (vaziyatlar bo‘limi), `BOOKS` (kitoblar), `MYTHS` (afsonalar), `QUIZ` (test).

## Audio misollar
`audio/` papkasida 6 ta fayl bo‘lishi kerak: `1-xotirjam.mp3`, `2-asabiy.mp3`, `3-iliq.mp3`, `4-sovuq.mp3`, `5-sokin.mp3`, `6-gazab.mp3` (ElevenLabs, “Shohjahon” ovozi, eleven_v4). Fayl bo‘lmasa, saytda “Audio fayl hali yuklanmagan” yozuvi chiqadi.

## Rasmlar
`images/` papkasida 14 ta rasm (ElevenLabs, gpt-image-2.5): tana xaritasi paneli, “Vaziyatlar” va “Mashq rejimi”da ishlatiladi. Rasmlar sun’iy intellekt yaratgan — real odamlar emas.

## Yangi bo‘limlar
- **Mashq rejimi** — `DRILL` (rasm/audio + savol)
- **Suhbat simulyatori** — `SIMS` (3 ta stsenariy, har qadamda 3 tanlov)
- **Lug‘at** — `GLOSS`
- Tana xaritasida **Erkak / Ayol** tanlovi (ayol figurasi JS orqali `#figArt` dan yasaladi)
