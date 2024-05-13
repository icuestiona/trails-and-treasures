document.addEventListener("DOMContentLoaded", function () {
  const carouselContainer = document.querySelector(".carousel-container");
  const carouselItems = document.querySelectorAll(".carousel-item");
  const prevButton = document.querySelector(".carousel-prev");
  const nextButton = document.querySelector(".carousel-next");
  const indicators = document.querySelectorAll(".carousel-indicator");

  let currentIndex = 0;

  function showSlide(index) {
    carouselItems.forEach((item, i) => {
      if (i === index) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
    indicators.forEach((indicator, i) => {
      if (i === index) {
        indicator.classList.add("active");
      } else {
        indicator.classList.remove("active");
      }
    });
  }

  showSlide(currentIndex);

  prevButton.addEventListener("click", function () {
    currentIndex =
      (currentIndex - 1 + carouselItems.length) % carouselItems.length;
    showSlide(currentIndex);
  });

  nextButton.addEventListener("click", function () {
    currentIndex = (currentIndex + 1) % carouselItems.length;
    showSlide(currentIndex);
  });

  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      currentIndex = index;
      showSlide(currentIndex);
    });
  });

  let slideInterval;

  // Remove the previous interval to prevent conflicts
  function startAutoSlide() {
    slideInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % carouselItems.length;
      showSlide(currentIndex);
    }, 5000);
  }
  startAutoSlide();

  // Clear the interval when interacting with the carousel
  carouselContainer.addEventListener("mouseover", () => {
    clearInterval(slideInterval);
  });

  carouselContainer.addEventListener("mouseout", () => {
    startAutoSlide();
  });
});

// Add event listener to the "More info" button
const moreInfoButton = document.querySelector("#info a");
moreInfoButton.addEventListener("click", function (event) {
  event.preventDefault();
  window.location.href = moreInfoButton.getAttribute("href");
});

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

const mapContainers = document.querySelectorAll(".map-container");

mapContainers.forEach((container) => {
  container.addEventListener("click", () => {
    container.classList.toggle("expanded");
  });
});
