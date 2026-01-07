const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const year = document.getElementById("year");

const miniForm = document.getElementById("miniForm");
const contactForm = document.getElementById("contactForm");
const copyBox = document.getElementById("copyBox");
const copyText = document.getElementById("copyText");
const copyBtn = document.getElementById("copyBtn");

year.textContent = new Date().getFullYear();

// Mobile nav
navToggle?.addEventListener("click", () => {
  const open = navMenu.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", open ? "true" : "false");
});
navMenu?.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => {
    navMenu.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

// Mini form -> quick message (alert)
miniForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(miniForm);
  const name = data.get("name");
  const topic = data.get("topic");
  const time = data.get("time");

  const msg =
`Hello Yvonne,
I'd like to request a call.

Company: ICARE FINANCE SOLUTION LIMITED
Name: ${name}
Topic: ${topic}
Preferred time: ${time}

You can reach me here: (please reply with your preferred contact)

Thanks,
${name}

Email: yvonnechen@me.com
WeChat: yvonne_wechat`;

  alert("Message generated (copy & send):\n\n" + msg);
  miniForm.reset();
});

// Contact form -> copy box
contactForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(contactForm);

  const name = data.get("name");
  const contact = data.get("contact");
  const topic = data.get("topic");
  const notes = data.get("notes");
  const time = data.get("time");
  const location = data.get("location") || "(not provided)";

  const msg =
`Hello Yvonne,
I'd like to request a call regarding insurance advice.

Company: ICARE FINANCE SOLUTION LIMITED
Name: ${name}
Preferred contact: ${contact}
Topic: ${topic}
Location: ${location}
Best time to call: ${time}

Notes:
${notes}

Thank you,
${name}

Email: yvonnechen@me.com
WeChat: yvonne_wechat`;

  copyText.textContent = msg;
  copyBox.hidden = false;
  copyBox.scrollIntoView({ behavior: "smooth", block: "start" });
});

copyBtn?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(copyText.textContent);
    copyBtn.textContent = "Copied";
    setTimeout(() => (copyBtn.textContent = "Copy"), 1200);
  } catch {
    alert("Clipboard copy blocked. Please select and copy manually.");
  }
});
