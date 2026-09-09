/* eslint-env node */
// Заявка с формы → сообщение в Telegram.
// Токен и chat_id лежат в переменных окружения Netlify
// (Site configuration → Environment variables), в код не попадают.

const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;' };
const esc = (s) => String(s || '').replace(/[&<>]/g, (c) => ESC[c]);
const clip = (s, n) => String(s || '').trim().slice(0, n);

export default async (req) => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return new Response('Not configured', { status: 500 });

  let data;
  try { data = await req.json(); } catch { return new Response('Bad request', { status: 400 }); }

  const name = clip(data.name, 100);
  const email = clip(data.email, 120);
  const message = clip(data.message, 2000);
  const type = clip(data.sessionType, 40);
  if (!name || !message) return new Response('Bad request', { status: 400 });

  const text = `📸 Новая заявка на фотосессию от <b>${esc(name)}</b>\n`
    + `email: ${esc(email) || '—'}\n`
    + `Тип съёмки: ${esc(type) || '—'}\n`
    + `Идеи клиента: ${esc(message)}`;

  const tg = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
  });

  if (!tg.ok) return new Response('Telegram error', { status: 502 });
  return Response.json({ ok: true });
};

export const config = { path: '/api/send' };
