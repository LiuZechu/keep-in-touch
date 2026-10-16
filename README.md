# Keep in touch · 保持联系

A small bilingual (English + 中文) contact page — WeChat, WhatsApp, Telegram, Instagram and LinkedIn — hosted on GitHub Pages.

## Update your details

Edit [`config.js`](config.js). Leave a value empty (`""`) to hide that row.

- **WeChat** — your WeChat ID, plus `qr` pointing at the QR image (`wechat-qr.jpg`) shown in a pop-up when the card is tapped.
- **WhatsApp** — your number with country code.
- **Telegram / Instagram** — username without the `@`.
- **LinkedIn** — the part after `linkedin.com/in/`.

Then commit and push — GitHub Pages redeploys in about a minute.

## Run locally

```bash
python3 -m http.server 8000
```

Open http://localhost:8000.

No build step and no external fonts or scripts, so it also loads fine in WeChat's in-app browser and in mainland China.
