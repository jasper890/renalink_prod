const images = [
  "/assets/FinalsRenalinkWebsite/machines.jpg",
  "/assets/FinalsRenalinkWebsite/renalinkView.jpg",
  "/assets/FinalsRenalinkWebsite/renalink_store.jpg",
];

class Carousel {
  constructor(element) {
    this.carousel = element;
    this.track = this.carousel.querySelector(".carousel-track");
    this.dotsContainer = this.carousel.querySelector(".carousel-dots");
    this.currentIndex = 0;

    this.init();
  }

  init() {
    this.renderSlides();
    this.renderDots();
    this.addEventListeners();
    this.startAutoPlay();
  }

  renderSlides() {
    this.track.innerHTML = images
      .map(
        (src) =>
          `<div class="carousel-slide"><img src="${src}" alt="Carousel Image"></div>`
      )
      .join("");
  }

  renderDots() {
    this.dotsContainer.innerHTML = images
      .map(
        (_, index) =>
          `<button class="dot ${
            index === 0 ? "active" : ""
          }" data-index="${index}"></button>`
      )
      .join("");
  }

  addEventListeners() {
    this.carousel
      .querySelector(".prev")
      .addEventListener("click", () => this.goToPrevious());
    this.carousel
      .querySelector(".next")
      .addEventListener("click", () => this.goToNext());
    this.dotsContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("dot")) {
        this.goToSlide(Number(e.target.dataset.index));
      }
    });
  }

  goToSlide(index) {
    this.currentIndex = index;
    this.track.style.transform = `translateX(-${index * 100}%)`;
    this.updateDots();
    this.resetAutoPlay();
  }

  goToNext() {
    this.goToSlide((this.currentIndex + 1) % images.length);
  }

  goToPrevious() {
    this.goToSlide((this.currentIndex - 1 + images.length) % images.length);
  }

  updateDots() {
    this.dotsContainer.querySelectorAll(".dot").forEach((dot, index) => {
      dot.classList.toggle("active", index === this.currentIndex);
    });
  }

  startAutoPlay() {
    this.interval = setInterval(() => this.goToNext(), 3000);
  }

  resetAutoPlay() {
    clearInterval(this.interval);
    this.startAutoPlay();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const carouselElement = document.querySelector(".carousel");
  if (carouselElement) new Carousel(carouselElement);
});
//test
