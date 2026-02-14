// =====================
// LIGHTBOX CARRUSEL
// =====================

const lightbox = document.createElement("div");
lightbox.className = "lightbox";
lightbox.innerHTML = `
  <button class="lightbox-close" aria-label="Cerrar">✕</button>
  <div class="lightbox-content">
    <img class="lightbox-img" src="" alt="Imagen ampliada" />
  </div>
`;
document.body.appendChild(lightbox);

const lightboxImg = lightbox.querySelector(".lightbox-img");
const closeLightbox = () => lightbox.classList.remove("is-visible");
const openLightbox = (src, alt) => {
  lightboxImg.src = src;
  lightboxImg.alt = alt || "Imagen ampliada";
  lightbox.classList.add("is-visible");
};

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox || event.target.closest(".lightbox-close")) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLightbox();
  }
});

const timelineImages = document.querySelectorAll("#timelineList img");
timelineImages.forEach((imageEl) => {
  imageEl.classList.add("cursor-zoom-in");
  imageEl.addEventListener("click", () => openLightbox(imageEl.src, imageEl.alt));
});

// =====================
// ANIMACIONES SCROLL
// =====================

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));

// =====================
// CONTADOR TIEMPO JUNTOS
// =====================

const loveCounter = document.getElementById("loveCounter");
const startDate = new Date(2020, 2, 11, 0, 0, 0); // 11 Mar 2020 (mes 2 = marzo)

const updateCounter = () => {
  if (!loveCounter) return;
  const now = new Date();
  let diffMs = now - startDate;
  if (diffMs < 0) diffMs = 0;

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  loveCounter.textContent = `${days} dias · ${hours} horas · ${minutes} minutos · ${seconds} segundos`;
};

updateCounter();
setInterval(updateCounter, 1000);
