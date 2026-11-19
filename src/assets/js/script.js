const slides = Array.from(document.querySelectorAll(".hero__slide"));
const dots = Array.from(document.querySelectorAll(".carousel-dot"));
const previousButton = document.querySelector(".carousel-button--prev");
const nextButton = document.querySelector(".carousel-button--next");
const currentCount = document.querySelector(".slide-count__current");
const caption = document.querySelector(".hero__caption");
const hero = document.querySelector(".hero");
const captions = [
  "PERFORMANCE, REDEFINED",
  "DESIGN WITHOUT LIMITS",
  "ENGINEERED TO INSPIRE",
  "THE ART OF ARRIVAL",
  "POWER MEETS PRECISION"
];

let activeIndex = 0;
let autoplayTimer;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function showSlide(index) {
  activeIndex = (index + slides.length) % slides.length;

  slides.forEach((slide, slideIndex) => {
    const isActive = slideIndex === activeIndex;
    slide.classList.toggle("is-active", isActive);
    slide.setAttribute("aria-hidden", String(!isActive));
  });

  dots.forEach((dot, dotIndex) => {
    const isActive = dotIndex === activeIndex;
    dot.classList.toggle("is-active", isActive);
    if (isActive) {
      dot.setAttribute("aria-current", "true");
    } else {
      dot.removeAttribute("aria-current");
    }
  });

  currentCount.textContent = String(activeIndex + 1).padStart(2, "0");
  caption.innerHTML = `<span>${String(activeIndex + 1).padStart(2, "0")}</span> / ${captions[activeIndex]}`;
}

function stopAutoplay() {
  window.clearInterval(autoplayTimer);
}

function startAutoplay() {
  stopAutoplay();
  if (!reducedMotion.matches) {
    autoplayTimer = window.setInterval(() => showSlide(activeIndex + 1), 6000);
  }
}

previousButton.addEventListener("click", () => {
  showSlide(activeIndex - 1);
  startAutoplay();
});

nextButton.addEventListener("click", () => {
  showSlide(activeIndex + 1);
  startAutoplay();
});

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showSlide(index);
    startAutoplay();
  });
});

hero.addEventListener("mouseenter", stopAutoplay);
hero.addEventListener("mouseleave", startAutoplay);
hero.addEventListener("focusin", stopAutoplay);
hero.addEventListener("focusout", (event) => {
  if (!hero.contains(event.relatedTarget)) {
    startAutoplay();
  }
});

reducedMotion.addEventListener("change", startAutoplay);
startAutoplay();
