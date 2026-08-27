// ==========================================================
// MOBILE NAV TOGGLE
// ==========================================================
const navToggle = document.getElementById("navToggle");
const navList = document.getElementById("navList");

navToggle.addEventListener("click", () => {
  const isOpen = navList.classList.toggle("open");
  navToggle.classList.toggle("open", isOpen);
  navToggle.setAttribute("aria-expanded", isOpen);
});

navList.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navList.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;

function applyTheme(theme) {
  if (theme === "dark") {
    root.setAttribute("data-theme", "dark");
    themeToggle.setAttribute("aria-pressed", "true");
  } else {
    root.removeAttribute("data-theme");
    themeToggle.setAttribute("aria-pressed", "false");
  }
}

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  applyTheme(savedTheme);
} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  applyTheme("dark");
}

themeToggle.addEventListener("click", () => {
  const isDark = root.getAttribute("data-theme") === "dark";
  const next = isDark ? "light" : "dark";
  applyTheme(next);
  localStorage.setItem("theme", next);
});

const typewriterEl = document.getElementById("typewriter");
const roles = ["Web Developer", "Entrepreneur", "Photo Editor","Prompt Engineer"];
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const current = roles[roleIndex];

  if (!deleting) {
    charIndex++;
    typewriterEl.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    charIndex--;
    typewriterEl.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeLoop, deleting ? 45 : 90);
}

typeLoop();

// ==========================================================
// SCROLL REVEAL
// ==========================================================
const revealEls = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealEls.forEach((el) => revealObserver.observe(el));

// ==========================================================
// ACTIVE NAV LINK ON SCROLL
// ==========================================================
const navLinks = document.querySelectorAll(".nav-link");
const trackedSections = document.querySelectorAll("#home, #about, #skills, #projects, #contact");

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  },
  { rootMargin: "-45% 0px -45% 0px" }
);

trackedSections.forEach((el) => navObserver.observe(el));

// ==========================================================
// BACK TO TOP
// ==========================================================
const backToTop = document.getElementById("backToTop");

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ==========================================================
// FOOTER YEAR
// ==========================================================
document.getElementById("year").textContent = new Date().getFullYear();

// ==========================================================
// CONTACT FORM
// Static site, no backend — this opens the visitor's own
// email app with the message pre-filled and addressed to you.
// Swap for Formspree or EmailJS later if you want silent
// submission without opening an email app.
// ==========================================================
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const submitBtn = contactForm.querySelector(".btn-submit");
const CONTACT_EMAIL = "chalawadajo@gmail.com";

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!fullName || !email || !message) {
    formStatus.textContent = "Please fill in all fields.";
    formStatus.className = "form-status error";
    return;
  }

  submitBtn.classList.add("sending");
  formStatus.textContent = "Opening your email app...";
  formStatus.className = "form-status success";

  const subject = encodeURIComponent(`Portfolio message from ${fullName}`);
  const body = encodeURIComponent(`${message}\n\n— ${fullName} (${email})`);
  const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

  setTimeout(() => {
    window.location.href = mailtoLink;
    submitBtn.classList.remove("sending");
    contactForm.reset();
  }, 400);
});
