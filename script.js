const carouselContainer = document.querySelector(".carousel-container");
const carouselItems = document.querySelectorAll(".carousel-item");
const prevBtn = document.querySelector(".carousel-prev");
const nextBtn = document.querySelector(".carousel-next");
const indicators = document.querySelectorAll(".carousel-indicator");

let currentIndex = 0;
const itemWidth = carouselItems[0].offsetWidth;

function moveCarousel(index) {
  carouselContainer.style.transform = `translateX(-${index * itemWidth}px)`;
  indicators.forEach((indicator, i) => {
    indicator.classList.toggle("active", i === index);
  });
}

prevBtn.addEventListener("click", () => {
  currentIndex =
    (currentIndex - 1 + carouselItems.length) % carouselItems.length;
  moveCarousel(currentIndex);
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % carouselItems.length;
  moveCarousel(currentIndex);
});

indicators.forEach((indicator, index) => {
  indicator.addEventListener("click", () => {
    currentIndex = index;
    moveCarousel(currentIndex);
  });
});

// Automatically move the carousel every 5 seconds
setInterval(() => {
  currentIndex = (currentIndex + 1) % carouselItems.length;
  moveCarousel(currentIndex);
}, 5000);

function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const sliderImages = document.querySelectorAll(".slide-in");

function checkSlide(e) {
  sliderImages.forEach((sliderImage) => {
    //half way through the image
    const slideInAt =
      window.scrollY + window.innerHeight - sliderImage.height / 2;
    // bottom thrpught the image
    const imageBottom = sliderImage.offsetTop + sliderImage.height;
    const isHalfShown = slideInAt > sliderImage.offsetTop;
    const isNotScrolledPast = window.scrollY < imageBottom;
    if (isHalfShown && isNotScrolledPast) {
      sliderImage.classList.add("active");
    } else {
      sliderImage.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", debounce(checkSlide));
