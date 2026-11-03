// Vercel serverless funksiya: fikr-mulohaza formasini Telegram'ga yuboradi.
// Vercel → Project → Settings → Environment Variables bo'limida ikkita o'zgaruvchi kerak:
//   TELEGRAM_BOT_TOKEN  — @BotFather bergan token
//   TELEGRAM_CHAT_ID    — xabar boradigan chat (shaxsiy chat, guruh yoki kanal) ID si

const LIMITS = { ism: 80, kasb: 60, tashkilot: 120, bolim: 60, fikr: 3000, aloqa: 120 };

const esc = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const clip = (s, n) => String(s ?? "").trim().slice(0, n);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Faqat POST" });
  }

  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  body = body || {};

  // Spam tuzog'i: odam ko'rmaydigan maydon to'ldirilgan bo'lsa — jim qabul qilamiz
  if (body.website) return res.status(200).json({ ok: true });

  const d = {};
  for (const [k, n] of Object.entries(LIMITS)) d[k] = clip(body[k], n);
  const baho = Number.isInteger(+body.baho) && +body.baho >= 1 && +body.baho <= 5 ? +body.baho : null;
  const rozilik = body.rozilik === true;

  if (d.fikr.length < 10) {
    return res.status(400).json({ ok: false, error: "Fikr kamida 10 belgidan iborat bo‘lsin." });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    return res.status(500).json({ ok: false, error: "Server sozlanmagan (Telegram o‘zgaruvchilari yo‘q)." });
  }

  const text = [
    "<b>🧠 Tana tili — yangi fikr</b>",
    "",
    `<b>Ism:</b> ${esc(d.ism) || "—"}`,
    `<b>Kasbi:</b> ${esc(d.kasb) || "—"}`,
    `<b>Tashkilot:</b> ${esc(d.tashkilot) || "—"}`,
    `<b>Bo‘lim:</b> ${esc(d.bolim) || "Umumiy"}`,
    `<b>Baho:</b> ${baho ? "★".repeat(baho) + "☆".repeat(5 - baho) : "—"}`,
    `<b>Aloqa:</b> ${esc(d.aloqa) || "—"}`,
    `<b>Ismini saytda ko‘rsatishga rozi:</b> ${rozilik ? "Ha" : "Yo‘q"}`,
    "",
    `<b>Fikr:</b>\n${esc(d.fikr)}`,
  ].join("\n");

  try {
    const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML", disable_web_page_preview: true }),
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok || !j.ok) {
      return res.status(502).json({ ok: false, error: "Telegram xabarni qabul qilmadi." });
    }
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(502).json({ ok: false, error: "Telegram bilan bog‘lanib bo‘lmadi." });
  }
}
