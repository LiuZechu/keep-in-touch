(function () {
  "use strict";

  var SITE = window.SITE || {};
  var C = SITE.contacts || {};

  var ICONS = {
    wechat:
      '<svg viewBox="0 0 24 24" aria-hidden="true">' +
      '<path fill="currentColor" d="M9.3 4C5.3 4 2 6.7 2 10.1c0 1.9 1 3.6 2.7 4.7l-.6 2 2.3-1.2c.9.3 1.9.4 2.9.4h.4a5.4 5.4 0 0 1-.2-1.5c0-3.3 3.1-6 7-6h.4C16.3 5.8 13.1 4 9.3 4Z"/>' +
      '<ellipse fill="currentColor" cx="16.2" cy="14.8" rx="5.8" ry="4.8"/>' +
      '<path fill="currentColor" d="M19.4 18.3l1.5 2.4-3.2-1.4z"/>' +
      '<circle class="cut" cx="6.6" cy="8.4" r="1"/><circle class="cut" cx="11.4" cy="8.4" r="1"/>' +
      '<circle class="cut" cx="14.2" cy="13.9" r=".8"/><circle class="cut" cx="18.2" cy="13.9" r=".8"/>' +
      "</svg>",
    whatsapp:
      '<svg viewBox="0 0 24 24" aria-hidden="true">' +
      '<path fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round" d="M12 3.2a8.8 8.8 0 0 0-7.6 13.2L3.2 20.8l4.5-1.2A8.8 8.8 0 1 0 12 3.2Z"/>' +
      '<path fill="currentColor" d="M8.9 7.6c.2-.4.5-.5.8-.5h.6c.2 0 .4.1.5.4l.8 1.9c.1.2 0 .5-.1.7l-.6.7c-.1.2-.2.4 0 .6.4.7 1 1.4 1.6 2 .7.6 1.4 1 2.1 1.3.2.1.4.1.6-.1l.8-.9c.2-.2.4-.3.6-.2l1.9.9c.3.1.4.3.4.5 0 .6-.2 1.3-.7 1.7-.6.5-1.5.7-2.4.5-1.3-.3-2.8-1.1-4.2-2.4-1.4-1.3-2.4-2.8-2.8-4.1-.3-1-.2-2.1.3-2.9Z"/>' +
      "</svg>",
    telegram:
      '<svg viewBox="0 0 24 24" aria-hidden="true">' +
      '<path fill="currentColor" d="M20.6 4.2 3.2 10.9c-1.1.4-1.1 1.3 0 1.6l4.4 1.4 1.7 5.1c.2.6.5.8 1 .8.4 0 .6-.2.9-.5l2.2-2.1 4.5 3.3c.8.5 1.4.2 1.6-.8L22.4 5.6c.3-1.2-.5-1.8-1.8-1.4Z"/>' +
      '<path fill="none" style="stroke:var(--brand)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" d="M7.7 13.9 17.6 7.6l-7.4 7-.5 4.2"/>' +
      "</svg>",
    instagram:
      '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2">' +
      '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/>' +
      '<circle cx="12" cy="12" r="4"/>' +
      '<circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none"/>' +
      "</svg>",
    linkedin:
      '<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">' +
      '<circle cx="6.6" cy="6.4" r="1.8"/>' +
      '<rect x="5.1" y="9.3" width="3" height="9.4" rx=".4"/>' +
      '<path d="M10.4 9.3h2.9v1.3c.5-.9 1.7-1.6 3.1-1.6 2.5 0 3.6 1.6 3.6 4.3v5.4h-3v-4.8c0-1.3-.4-2.2-1.7-2.2-1.3 0-1.9 1-1.9 2.3v4.7h-3z"/>' +
      "</svg>"
  };

  var COPY_ICON =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="3"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg>';
  var CHEVRON = '<svg class="chev" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg>';

  function digits(s) { return String(s || "").replace(/[^\d]/g, ""); }
  function clean(s) { return String(s || "").trim().replace(/^@/, ""); }

  var PLATFORMS = [
    {
      key: "wechat", en: "WeChat", brand: "#07C160",
      value: function (c) { return clean(c.id); },
      handle: function (c) { return clean(c.id); },
      copy: function (c) { return clean(c.id); },
      action: "wechat"
    },
    {
      key: "whatsapp", en: "WhatsApp", brand: "#25D366",
      value: function (c) { return digits(c.number); },
      handle: function (c) { return String(c.number).trim(); },
      copy: function (c) { return String(c.number).trim(); },
      href: function (c) { return "https://wa.me/" + digits(c.number); }
    },
    {
      key: "telegram", en: "Telegram", brand: "#2AABEE",
      value: function (c) { return clean(c.username); },
      handle: function (c) { return "@" + clean(c.username); },
      copy: function (c) { return "@" + clean(c.username); },
      href: function (c) { return "https://t.me/" + clean(c.username); }
    },
    {
      key: "instagram", en: "Instagram",
      brand: "linear-gradient(45deg, #FEC564 0%, #F9733E 30%, #E1306C 60%, #A537B8 100%)",
      value: function (c) { return clean(c.username); },
      handle: function (c) { return "@" + clean(c.username); },
      copy: function (c) { return "@" + clean(c.username); },
      href: function (c) { return "https://www.instagram.com/" + clean(c.username) + "/"; }
    },
    {
      key: "linkedin", en: "LinkedIn", brand: "#0A66C2",
      value: function (c) { return clean(c.slug); },
      handle: function (c) { return "in/" + clean(c.slug); },
      copy: function (c) { return "https://www.linkedin.com/in/" + clean(c.slug) + "/"; },
      href: function (c) { return "https://www.linkedin.com/in/" + clean(c.slug) + "/"; }
    }
  ];

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }

  /* ---------- contact cards ---------- */
  var list = document.getElementById("contacts");
  var i = 0;

  PLATFORMS.forEach(function (p) {
    var c = C[p.key];
    if (!c || !p.value(c)) return;

    var label = '<span class="label">' + p.en + "</span>";
    var inner =
      '<span class="tile">' + ICONS[p.key] + "</span>" +
      '<span class="meta">' + label + '<span class="handle">' + esc(p.handle(c)) + "</span></span>" +
      CHEVRON;

    var main = p.href
      ? '<a class="contact-main" href="' + esc(p.href(c)) + '" target="_blank" rel="noopener noreferrer">' + inner + "</a>"
      : '<button class="contact-main" type="button">' + inner + "</button>";

    var li = document.createElement("li");
    li.className = "contact";
    li.style.setProperty("--brand", p.brand);
    li.style.setProperty("--i", i++);
    if (p.key === "instagram") li.style.setProperty("--cut", "#E1306C");
    li.innerHTML =
      main +
      '<button class="copy" type="button" aria-label="Copy ' + p.en + ' · 复制">' + COPY_ICON + "</button>";

    li.querySelector(".copy").addEventListener("click", function () { copy(p.copy(c)); });
    if (p.action === "wechat") {
      li.querySelector(".contact-main").addEventListener("click", function () { openWeChat(c); });
    }
    list.appendChild(li);
  });

  /* ---------- WeChat: QR dialog if provided, else copy the ID ---------- */
  var dialog = document.getElementById("qr-dialog");
  function openWeChat(c) {
    var id = clean(c.id);
    if (!c.qr || !dialog || typeof dialog.showModal !== "function") {
      copy(id, "WeChat ID copied! · 微信号已复制！\nSearch it in WeChat · 去微信搜索添加");
      return;
    }
    document.getElementById("qr-img").src = c.qr;
    document.getElementById("qr-id").textContent = id;
    document.getElementById("qr-copy").onclick = function () { copy(id); };
    dialog.showModal();
  }
  if (dialog) {
    document.getElementById("qr-close").addEventListener("click", function () { dialog.close(); });
    dialog.addEventListener("click", function (e) { if (e.target === dialog) dialog.close(); });
  }

  /* ---------- copy + toast ---------- */
  function copy(text, message) {
    var ok = function () { toast(message || "Copied! · 已复制！"); };
    var fail = function () { toast("Couldn't copy · 复制失败\nLong-press to select · 请长按选择"); };

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(ok, function () { fallbackCopy(text) ? ok() : fail(); });
    } else {
      fallbackCopy(text) ? ok() : fail();
    }
  }

  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.top = "0";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    ta.setSelectionRange(0, text.length);
    var done = false;
    try { done = document.execCommand("copy"); } catch (e) {}
    document.body.removeChild(ta);
    return done;
  }

  var toastEl = document.getElementById("toast");
  var toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("show"); }, 2200);
  }
})();
