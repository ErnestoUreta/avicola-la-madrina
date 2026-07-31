const WHATSAPP_NUMBER = "56999977567";

function wireWhatsappLinks() {
  document.querySelectorAll(".js-whatsapp").forEach((link) => {
    const message = link.dataset.waMsg || "Hola, quiero hacer una consulta";
    link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    link.target = "_blank";
    link.rel = "noopener";
  });

  const numberDisplay = document.querySelector(".js-whatsapp-number");
  if (numberDisplay) {
    const formatted = WHATSAPP_NUMBER.replace(/^56(\d)(\d{4})(\d{4})$/, "+56 $1 $2 $3");
    numberDisplay.textContent = formatted;
  }
}

function wireMobileNav() {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("site-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function wireHeaderShadow() {
  const header = document.getElementById("site-header");
  if (!header) return;
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function wireRevealOnScroll() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || items.length === 0) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
  );
  items.forEach((item) => {
    const alreadyInView = item.getBoundingClientRect().top < window.innerHeight;
    if (alreadyInView) {
      item.classList.add("is-visible");
    } else {
      observer.observe(item);
    }
  });
}

wireWhatsappLinks();
wireMobileNav();
wireHeaderShadow();
wireRevealOnScroll();
