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
    const open = !navMenu.classList.contains("is-open");
    setOpen(open);
  });

  // Close when clicking a link
  qa("#navMenu a").forEach(a => {
    a.addEventListener("click", () => setOpen(false));
  });

  // Close when clicking outside (mobile)
  document.addEventListener("click", (e) => {
    const clickedInside = navMenu.contains(e.target) || navToggle.contains(e.target);
    if (!clickedInside) setOpen(false);
  });

  // Close on ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });
})();

/* ========= i18n content ========= */
const I18N = {
  en: {
    "nav.home": "Home",
    "nav.life": "Life",
    "nav.health": "Health",
    "nav.review": "Policy Review",
    "nav.contact": "Contact",

    "home.kicker": "Life & Health Insurance • Clear & Personal Advice",
    "home.h1": "Insurance advice that fits your life — not generic policies.",
    "home.lead": "ICARE FINANCE SOLUTION LIMITED provides clear, structured insurance advice for individuals and families in New Zealand. Work directly with insurance broker Yvonne Chen.",
    "home.ctaContact": "Contact Yvonne",
    "home.ctaServices": "View Services",
    "home.trust1.t": "Independent",
    "home.trust1.d": "Client-first advice",
    "home.trust2.t": "Transparent",
    "home.trust2.d": "Clear explanations",
    "home.trust3.t": "Supportive",
    "home.trust3.d": "From advice to claims",
    "home.panel.title": "Get in touch",
    "home.panel.desc": "Email or WeChat for enquiries, reviews, or general questions.",
    "home.panel.email": "Email",
    "home.panel.wechat": "WeChat",

    "solutions.title": "Insurance services",
    "solutions.subtitle": "Clear guidance across key protection areas.",
    "solutions.life.t": "Life Insurance",
    "solutions.life.d": "Financial protection for family and dependants.",
    "solutions.life.btn": "Learn more",
    "solutions.health.t": "Health Insurance",
    "solutions.health.d": "Access private healthcare with confidence.",
    "solutions.health.btn": "Learn more",
    "solutions.review.t": "Policy Review",
    "solutions.review.d": "Already insured? Review and optimise your cover.",
    "solutions.review.btn": "Start a review",

    "advisor.title": "Your insurance broker",
    "advisor.role": "Insurance Broker",
    "advisor.bio": "With more than 15 years of banking experience and a strong focus on insurance since 2017, Yvonne brings a friendly, down-to-earth approach to helping people protect what matters most. She genuinely cares about making insurance easier to understand, giving clients confidence in their cover, and ensuring every recommendation is clear, relevant, and right for their situation. Based on Auckland’s North Shore, Yvonne works with clients across New Zealand, supporting everyone from young families and self-employed professionals to growing businesses. She takes the time to really listen and understand where her clients are in life, what they’re working towards, and the risks they may face, so she can put the right protection in place for today and the years ahead. Yvonne specialises in health and life insurance, including trauma and medical cover, as well as mortgage and income protection. She also supports businesses with employee group cover and provides business and shareholder protection advice for owners and directors. What Yvonne values most is building long-term relationships and being there when her clients need her most. Whether it’s helping with a claim, reviewing existing cover, or supporting major life changes like buying a home, starting a family, or launching a business, she is committed to offering guidance, clarity, and reassurance every step of the way. If you’re looking for honest, straightforward advice and someone who truly has your best interests at heart, Yvonne would love to help.",

    "contact.title": "Contact",
    "contact.subtitle": "Direct contact — no forms required.",
    "contact.email": "Email",
    "contact.wechat": "WeChat",
    "contact.services": "Services",
    "contact.providers": "Providers",
    "contact.disclaimer": "Disclaimer: This website provides general information only and does not consider your personal circumstances. Insurance acceptance, terms, and conditions are subject to the insurer’s underwriting and policy wording.",

    "disc.title": "Financial advice disclosure (NZ)",
    "disc.note": "This information is provided to help you decide whether to seek, obtain, or act on our financial advice service.",
    "disc.licensing": "Licensing & provider details",
    "disc.scope": "Nature & scope of advice",
    "disc.remuneration": "Fees, commissions & incentives",
    "disc.conflicts": "Conflicts of interest",
    "disc.complaints": "Complaints & dispute resolution",
    "disc.disclaimer": "Disclaimer",
    "disc.licensing.body": "FAP: ICARE FINANCE SOLUTION LIMITED. FSP number: ABCD1234. Adviser: Yvonne Chen. Contact: yvonnechen@me.com • WeChat: yvonne_wechat.",
    "disc.scope.body": "We provide insurance advice relating to Life and Health insurance. Providers we commonly advise on include AIA, Southern Cross, Partners Life, and Chubb Life. Availability and policy terms are subject to insurer underwriting and policy wording.",
    "disc.remuneration.body": "We may receive commission from product providers if you proceed with a policy. If any fees are payable by you, they will be disclosed before you decide whether to act on the advice.",
    "disc.conflicts.body": "We manage conflicts of interest by prioritising your needs and objectives, disclosing relevant commissions or incentives, and applying internal processes to ensure advice is suitable for your circumstances.",
    "disc.complaints.body": "If you have a complaint, please contact us first (email: yvonnechen@me.com). We aim to respond within 5 working days. If we cannot resolve your complaint, you can contact our external dispute resolution scheme: Financial Services Complaints Limited (FSCL). Phone 0800 347 257. Website: fscl.org.nz.",
    "disc.disclaimer.body": "This website provides general information only and does not take into account your personal circumstances. Insurance acceptance, terms, and conditions are subject to the insurer’s underwriting and policy wording.",
    "disc.updated": "Last updated: 2026",

    "privacy.title": "Privacy Policy",
    "privacy.subtitle": "This policy explains how ICARE FINANCE SOLUTION LIMITED collects, uses, discloses, and protects personal information.",
    "privacy.collect.h": "What we collect",
    "privacy.collect.b": "We may collect information you provide to us such as your name, contact details, and information relevant to life/health insurance advice (for example, basic circumstances and policy information).",
    "privacy.use.h": "How we use your information",
    "privacy.use.b": "We use personal information to respond to enquiries, provide insurance advice, assist with applications, and support claims and ongoing policy reviews.",
    "privacy.share.h": "Who we share it with",
    "privacy.share.b": "We may share relevant information with insurers and service providers where needed to provide advice or progress an application/claim. We do not sell personal information.",
    "privacy.storage.h": "Storage & security",
    "privacy.storage.b": "We take reasonable steps to protect personal information against loss, unauthorised access, use, modification, or disclosure. We retain information only as long as needed for the purposes described (and to meet legal or compliance obligations).",
    "privacy.rights.h": "Access & correction",
    "privacy.rights.b": "You may request access to, or correction of, your personal information. Contact us using the details below.",
    "privacy.contact.h": "Contact",
    "privacy.contact.b": "Privacy enquiries: yvonnechen@me.com (Yvonne Chen, ICARE FINANCE SOLUTION LIMITED). We aim to respond within a reasonable timeframe.",
    "privacy.updated": "Last updated: 2026",

    "subpages.kicker.life": "Life Insurance • Protection for what matters most",
    "subpages.h1.life": "Life insurance that supports your family, debt, and long-term plans.",
    "subpages.lead.life": "We help you estimate an appropriate sum insured and structure cover in a way that fits your budget and priorities.",
    "subpages.kicker.health": "Health Insurance • Faster access, clearer choices",
    "subpages.h1.health": "Health cover designed around what you actually use and value.",
    "subpages.lead.health": "We guide you through plan types, limits, exclusions, and how to keep premiums sensible.",
    "subpages.kicker.review": "Policy Review • Reduce waste, fix gaps, stay aligned",
    "subpages.h1.review": "Review your existing cover and make sure it still fits your life today.",
    "subpages.lead.review": "Identify coverage gaps, duplicated benefits, and cost-saving opportunities — while keeping protection strong where it matters."
  },

  zh: {
    "nav.home": "首頁",
    "nav.life": "壽險",
    "nav.health": "醫療險",
    "nav.review": "保單健檢",
    "nav.contact": "聯絡",

    "home.kicker": "壽險 / 醫療險 • 清楚、務實、以你為主",
    "home.h1": "符合你人生需求的保險建議，而不是制式方案。",
    "home.lead": "ICARE FINANCE SOLUTION LIMITED 提供紐西蘭壽險與醫療險建議服務。由保險顧問 Yvonne Chen 直接協助你做出清楚、務實的保障選擇。",
    "home.ctaContact": "聯絡 Yvonne",
    "home.ctaServices": "查看服務",
    "home.trust1.t": "以客為先",
    "home.trust1.d": "站在你的需求",
    "home.trust2.t": "透明清楚",
    "home.trust2.d": "用白話說明",
    "home.trust3.t": "全程支援",
    "home.trust3.d": "從建議到理賠",
    "home.panel.title": "直接聯絡",
    "home.panel.desc": "Email 或 WeChat 諮詢、健檢或一般問題。",
    "home.panel.email": "Email",
    "home.panel.wechat": "WeChat",

    "solutions.title": "服務項目",
    "solutions.subtitle": "針對重要保障領域提供清楚建議。",
    "solutions.life.t": "壽險",
    "solutions.life.d": "保障家庭與負擔的財務安全。",
    "solutions.life.btn": "了解更多",
    "solutions.health.t": "醫療險",
    "solutions.health.d": "更安心地使用私立醫療資源。",
    "solutions.health.btn": "了解更多",
    "solutions.review.t": "保單健檢",
    "solutions.review.d": "已有保單？協助檢視與優化。",
    "solutions.review.btn": "開始健檢",

    "advisor.title": "保險顧問",
    "advisor.role": "Insurance Broker（保險顧問）",
    "advisor.bio": "我會用清楚的方式協助你理解保障內容，並依你的生活階段、重點與預算，規劃合適的保障。",

    "contact.title": "聯絡方式",
    "contact.subtitle": "直接聯絡，不使用表單。",
    "contact.email": "Email",
    "contact.wechat": "WeChat",
    "contact.services": "服務範圍",
    "contact.providers": "合作保險公司",
    "contact.disclaimer": "免責聲明：本網站內容僅提供一般資訊，未考量你的個人狀況。是否承保、條款與保障內容以保險公司核保結果及保單條款為準。",

    "disc.title": "紐西蘭理財建議揭露（Disclosure）",
    "disc.note": "以下資訊用於協助你判斷是否要尋求、取得或採納我們提供的理財/保險建議服務。",
    "disc.licensing": "牌照與提供者資訊",
    "disc.scope": "建議範圍",
    "disc.remuneration": "費用、佣金與其他報酬",
    "disc.conflicts": "利益衝突管理",
    "disc.complaints": "申訴與爭議處理",
    "disc.disclaimer": "免責聲明",
    "disc.licensing.body": "FAP（理財建議提供者）：ICARE FINANCE SOLUTION LIMITED。FSP 註冊號：ABCD1234。顧問：Yvonne Chen。聯絡：yvonnechen@me.com • WeChat：yvonne_wechat。",
    "disc.scope.body": "我們提供與「壽險」與「醫療險」相關的保險建議服務。常見合作保險公司包含 AIA、Southern Cross、Partners Life、Chubb Life。實際承保、條款與核保結果以保險公司核保與保單條款為準。",
    "disc.remuneration.body": "若你選擇投保，我們可能會從保險公司取得佣金或相關報酬；如有你需支付的費用（如適用），會在你決定是否採納建議之前清楚揭露。",
    "disc.conflicts.body": "我們透過以下方式管理利益衝突：以你的需求與目標為優先、揭露可能的佣金/獎勵、並使用內部流程確保建議適合你的情況。",
    "disc.complaints.body": "若你要提出申訴，請先聯絡我們（Email：yvonnechen@me.com），我們目標在 5 個工作天內回覆。若無法解決，你可聯絡外部爭議處理機構：Financial Services Complaints Limited（FSCL）。電話 0800 347 257；網站 fscl.org.nz。",
    "disc.disclaimer.body": "本網站內容僅提供一般資訊，未考量你的個人財務狀況。是否承保、條款與保障內容以保險公司核保結果及保單條款為準。",
    "disc.updated": "更新日期：2026",

    "privacy.title": "隱私權政策",
    "privacy.subtitle": "本政策說明 ICARE FINANCE SOLUTION LIMITED 如何蒐集、使用、揭露與保護個人資訊。",
    "privacy.collect.h": "我們蒐集哪些資訊",
    "privacy.collect.b": "我們可能蒐集你提供的個人資訊，例如姓名、聯絡方式，以及與壽險/醫療險建議相關的資訊（例如基本狀況與保單資訊）。",
    "privacy.use.h": "我們如何使用資訊",
    "privacy.use.b": "我們使用個人資訊以回覆諮詢、提供保險建議、協助投保申請、支援理賠與後續保單檢視。",
    "privacy.share.h": "我們可能與誰分享",
    "privacy.share.b": "為提供建議或處理投保/理賠所需，我們可能與保險公司及相關服務提供者分享必要資訊。我們不販售個人資訊。",
    "privacy.storage.h": "保存與安全",
    "privacy.storage.b": "我們採取合理措施保護個人資訊，避免遺失、未授權存取、使用、修改或揭露。資訊僅在達成上述目的及符合法規/合規需求所需期間內保存。",
    "privacy.rights.h": "查詢與更正",
    "privacy.rights.b": "你可以申請查詢或更正你的個人資訊，請透過下方方式聯絡我們。",
    "privacy.contact.h": "聯絡方式",
    "privacy.contact.b": "隱私相關諮詢：yvonnechen@me.com（Yvonne Chen，ICARE FINANCE SOLUTION LIMITED）。我們會在合理時間內回覆。",
    "privacy.updated": "更新日期：2026",

    "subpages.kicker.life": "壽險 • 守護最重要的人",
    "subpages.h1.life": "依家庭、負債與目標規劃合適的壽險保障。",
    "subpages.lead.life": "協助估算保額、安排保障結構，讓保障與預算更平衡。",
    "subpages.kicker.health": "醫療險 • 更快取得醫療資源",
    "subpages.h1.health": "選擇適合你需求的醫療險，而不是堆滿不需要的項目。",
    "subpages.lead.health": "協助你理解方案差異、限額與除外責任，並控制保費。",
    "subpages.kicker.review": "保單健檢 • 找缺口、減浪費、對齊現況",
    "subpages.h1.review": "檢視你現有保單，確保仍然適合你現在的生活。",
    "subpages.lead.review": "找出保障缺口、重複保障與保費效益，保留該保留的保障。"
  }
};

// SEO packs
const SEO = {
  en: {
    home: { title: "ICARE FINANCE SOLUTION LIMITED | Insurance Broker Yvonne Chen", desc: "ICARE FINANCE SOLUTION LIMITED — Life & Health insurance advice in New Zealand. Work with insurance broker Yvonne Chen for tailored cover and clear guidance." },
    life: { title: "Life Insurance Advice | ICARE FINANCE SOLUTION LIMITED | Yvonne Chen", desc: "Life insurance advice in NZ. Work with Yvonne Chen to structure cover for family, debt, and long-term security." },
    health:{ title: "Health Insurance Advice | ICARE FINANCE SOLUTION LIMITED | Yvonne Chen", desc: "Health insurance advice in NZ. Compare options, understand limits/exclusions, and choose cover that fits your needs." },
    review:{ title: "Insurance Policy Review | ICARE FINANCE SOLUTION LIMITED | Yvonne Chen", desc: "Policy review in NZ. Identify gaps, remove duplicates, and optimise premiums while keeping protection strong." },
    disclosure:{ title: "Disclosure Statement | ICARE FINANCE SOLUTION LIMITED", desc: "Financial advice disclosure: scope of advice, remuneration, conflicts of interest, and complaints process." },
    privacy:{ title: "Privacy Policy | ICARE FINANCE SOLUTION LIMITED", desc: "Privacy policy: how we collect, use, store, and protect personal information." }
  },
  zh: {
    home: { title: "ICARE FINANCE SOLUTION LIMITED｜保險顧問 Yvonne Chen", desc: "ICARE 提供紐西蘭壽險與醫療險建議服務。由保險顧問 Yvonne Chen 協助你以清楚、務實方式選擇合適保障。" },
    life: { title: "壽險建議｜ICARE FINANCE SOLUTION LIMITED｜Yvonne Chen", desc: "紐西蘭壽險規劃：協助估算保額、安排保障結構，兼顧家庭、負債與長期目標。" },
    health:{ title: "醫療險建議｜ICARE FINANCE SOLUTION LIMITED｜Yvonne Chen", desc: "紐西蘭醫療險規劃：比較方案、理解限額與除外責任，選擇適合你需求與預算的保障。" },
    review:{ title: "保單健檢｜ICARE FINANCE SOLUTION LIMITED｜Yvonne Chen", desc: "檢視保障缺口、重複保障與保費效益，讓保單更符合你現在的生活與需求。" },
    disclosure:{ title: "揭露聲明（Disclosure）｜ICARE FINANCE SOLUTION LIMITED", desc: "理財/保險建議揭露：建議範圍、報酬/佣金、利益衝突管理與申訴流程。" },
    privacy:{ title: "隱私權政策｜ICARE FINANCE SOLUTION LIMITED", desc: "說明我們如何蒐集、使用、保存與保護個人資訊，以及你如何申請查詢與更正。" }
  }
};

function ensureMeta(nameOrProp, value, isProperty=false){
  const selector = isProperty ? `meta[property="${nameOrProp}"]` : `meta[name="${nameOrProp}"]`;
  let el = q(selector);
  if (!el) {
    el = document.createElement("meta");
    if (isProperty) el.setAttribute("property", nameOrProp);
    else el.setAttribute("name", nameOrProp);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

function applySEO(lang){
  const page = document.body?.dataset?.page || "home";
  const pack = (SEO[lang] && SEO[lang][page]) ? SEO[lang][page] : SEO.en.home;

  document.title = pack.title;
  ensureMeta("description", pack.desc, false);

  // OpenGraph
  ensureMeta("og:title", pack.title, true);
  ensureMeta("og:description", pack.desc, true);
}

function applyText(lang){
  const dict = I18N[lang] || I18N.en;

  // html lang tag
  document.documentElement.setAttribute("lang", lang === "zh" ? "zh-Hant" : "en-NZ");

  // text nodes
  qa("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (!key) return;
    if (dict[key] != null) el.textContent = dict[key];
  });

  // language buttons UI state
  qa(".lang__btn").forEach(btn => {
    const isActive = (btn.getAttribute("data-lang") === lang);
    btn.setAttribute("aria-pressed", isActive ? "true" : "false");
  });
}

function setLang(lang){
  const normalized = (lang === "zh") ? "zh" : "en";
  localStorage.setItem("site_lang", normalized);
  applyText(normalized);
  applySEO(normalized);
}

// Handle language button click
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".lang__btn");
  if (!btn) return;
  const lang = btn.getAttribute("data-lang") || "en";
  setLang(lang);
});

// Init language
(function initLang(){
  const saved = localStorage.getItem("site_lang");
  setLang(saved || "en");
})();
