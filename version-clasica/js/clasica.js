const WHATSAPP_NUMBER = "56999977567";
const HERO_AUTOPLAY_MS = 5500;

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
  const toggle = document.getElementById("cmenu-toggle");
  const nav = document.getElementById("ctabs");
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

function wireHeroCarousel() {
  const slides = Array.from(document.querySelectorAll(".chero__slide"));
  const dotsWrap = document.getElementById("chero-dots");
  if (slides.length === 0 || !dotsWrap) return;

  let activeIndex = slides.findIndex((slide) => slide.classList.contains("is-active"));
  if (activeIndex < 0) activeIndex = 0;

  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("role", "tab");
    dot.setAttribute("aria-label", `Ir al slide ${index + 1}`);
    if (index === activeIndex) dot.classList.add("is-active");
    dot.addEventListener("click", () => goToSlide(index));
    dotsWrap.appendChild(dot);
  });

  const dots = Array.from(dotsWrap.children);

  function goToSlide(index) {
    slides[activeIndex].classList.remove("is-active");
    dots[activeIndex].classList.remove("is-active");
    activeIndex = index;
    slides[activeIndex].classList.add("is-active");
    dots[activeIndex].classList.add("is-active");
  }

  function nextSlide() {
    goToSlide((activeIndex + 1) % slides.length);
  }

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    setInterval(nextSlide, HERO_AUTOPLAY_MS);
  }
}

function wireDestacadosCarousel() {
  const track = document.getElementById("destacados-track");
  const prevBtn = document.querySelector("[data-carousel-prev]");
  const nextBtn = document.querySelector("[data-carousel-next]");
  if (!track || !prevBtn || !nextBtn) return;

  function scrollByCard(direction) {
    const card = track.querySelector(".cproduct-card");
    const step = card ? card.getBoundingClientRect().width + 24 : 260;
    track.scrollBy({ left: step * direction, behavior: "smooth" });
  }

  prevBtn.addEventListener("click", () => scrollByCard(-1));
  nextBtn.addEventListener("click", () => scrollByCard(1));
}

wireWhatsappLinks();
wireMobileNav();
wireHeroCarousel();
wireDestacadosCarousel();
