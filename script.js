/* ========= Helpers ========= */
function q(sel, root = document) { return root.querySelector(sel); }
function qa(sel, root = document) { return Array.from(root.querySelectorAll(sel)); }

/* ========= Footer year ========= */
(function setYear(){
  const yearEl = q("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

/* ========= Mobile nav ========= */
(function mobileNav(){
  const navToggle = q("#navToggle");
  const navMenu = q("#navMenu");
  if (!navToggle || !navMenu) return;

  function setOpen(open){
    navMenu.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  }

  navToggle.addEventListener("click", () => {
    setOpen(!navMenu.classList.contains("is-open"));
  });

  qa("#navMenu a").forEach(a => a.addEventListener("click", () => setOpen(false)));

  document.addEventListener("click", e => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) setOpen(false);
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") setOpen(false);
  });
})();

/* ========= I18N ========= */
const I18N = {
  en: {
    "nav.home": "Home",
    "nav.life": "Life",
    "nav.health": "Health",
    "nav.review": "Policy Review",
    "nav.contact": "Contact",

    "advisor.title": "Your insurance adviser",
    "advisor.role": "Insurance Adviser",
    "advisor.bio":
`With more than 15 years of banking experience and a strong focus on insurance since 2017, Yvonne brings a friendly, down-to-earth approach to helping people protect what matters most. She genuinely cares about making insurance easier to understand, giving clients confidence in their cover, and ensuring every recommendation feels clear, relevant, and right for their situation.

Based on Auckland’s North Shore, Yvonne works with clients all across New Zealand, supporting everyone from young families and self-employed professionals to growing businesses. She takes the time to really listen and understand where her clients are in life, what they’re working towards, and what risks they may face, so she can put the right protection in place for today and the years ahead.

Yvonne specialises in health and life insurance, including trauma and medical cover, as well as mortgage and income protection. She also helps businesses with employee group cover and provides business and shareholder protection advice for owners and directors.

What Yvonne values most is building long-term relationships and being there when her clients need her most. Whether it’s helping with a claim, reviewing existing cover, or supporting major life changes like buying a home, starting a family, or launching a business, she’s committed to offering guidance, clarity, and reassurance every step of the way.

If you’re looking for honest, straightforward advice and someone who truly has your best interests at heart, Yvonne would love to help.`
  },

  zh: {
    "nav.home": "首頁",
    "nav.life": "壽險",
    "nav.health": "健康保險",
    "nav.review": "保單檢視",
    "nav.contact": "聯絡",

    "advisor.title": "你的保險顧問",
    "advisor.role": "保險顧問",
    "advisor.bio":
`Yvonne 擁有超過 15 年的銀行業經驗，並自 2017 年起專注於保險領域，以親切、務實的方式協助客戶守護人生中最重要的事。她用心讓保險變得更容易理解，幫助客戶對自己的保障更有信心，並確保每一項建議都清楚、貼切，真正符合個人需求。

Yvonne 以奧克蘭北岸為據點，服務遍及全紐西蘭，客戶涵蓋年輕家庭、自雇人士到成長中的企業。她重視傾聽，深入了解客戶目前的人生階段、努力的方向，以及可能面臨的風險，從而為現在與未來規劃合適的保障。

Yvonne 專精於健康與人壽保險規劃，包括重大疾病與醫療保障，以及房貸與收入保障。同時，她也協助企業規劃員工團體保險，並為企業主與董事提供公司與股東保障相關建議。

Yvonne 最重視的是建立長期、互信的關係，並在客戶最需要的時候陪伴在旁。無論是協助理賠、檢視既有保單，或在人生重要階段如購屋、成家或創業時提供支持，她都致力於在每一步帶來清楚的說明、安心的引導與可靠的陪伴。

如果你正在尋找真誠、直接，並且真正以你利益為優先的保險建議，Yvonne 很樂意協助你。`
  }
};

/* ========= SEO ========= */
const SEO = {
  en: {
    home: { title: "Yvonne Chen | Life & Health Insurance Adviser (NZ)", desc: "Clear, friendly insurance advice across New Zealand." }
  },
  zh: {
    home: { title: "Yvonne Chen｜紐西蘭人壽與健康保險顧問", desc: "提供清楚、務實的紐西蘭保險建議服務。" }
  }
};

function ensureMeta(name, content) {
  let el = q(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function applySEO(lang) {
  const page = document.body?.dataset?.page || "home";
  const pack = SEO[lang]?.[page];
  if (!pack) return;
  document.title = pack.title;
  ensureMeta("description", pack.desc);
}

/* ========= Language application ========= */
function applyLangBlocks(lang) {
  qa("[data-lang-block]").forEach(el => {
    el.style.display = el.dataset.langBlock === lang ? "" : "none";
  });
  qa("[data-lang-inline]").forEach(el => {
    el.style.display = el.dataset.langInline === lang ? "" : "none";
  });
}

function applyText(lang) {
  const dict = I18N[lang];
  document.documentElement.lang = lang === "zh" ? "zh-Hant" : "en-NZ";

  qa("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (dict[key]) el.textContent = dict[key];
  });

  applyLangBlocks(lang);

  qa(".lang__btn").forEach(btn => {
    if (!btn.dataset.lang) return;
    btn.setAttribute("aria-pressed", btn.dataset.lang === lang ? "true" : "false");
  });
}

function setLang(lang) {
  const normalized = lang === "zh" ? "zh" : "en";
  localStorage.setItem("site_lang", normalized);
  applyText(normalized);
  applySEO(normalized);
}

/* ========= Language button ========= */
document.addEventListener("click", e => {
  const btn = e.target.closest(".lang__btn");
  if (!btn) return;

  if (btn.dataset.lang) {
    setLang(btn.dataset.lang);
  } else {
    const current = localStorage.getItem("site_lang") === "zh" ? "zh" : "en";
    setLang(current === "zh" ? "en" : "zh");
  }
});

/* ========= Init ========= */
(function init() {
  const saved = localStorage.getItem("site_lang") || "en";
  setLang(saved);
})();
