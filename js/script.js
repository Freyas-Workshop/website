document.addEventListener("DOMContentLoaded", () => {
  new WOW().init();

  // Header START
  $(".hamburger").on("click", function () {
    if ($(this).hasClass("is-active")) {
      $(this).removeClass("is-active");
      $(".header-mobile-wrap").slideUp(500);
    } else {
      $(this).addClass("is-active");
      $(".header-mobile-wrap").slideDown(500);
    }
  });

  function scrollHeader() {
    let headerTopHeight = $(".header-top").height();
    if ($(this).scrollTop() > headerTopHeight) {
      $(".header-bottom").addClass("is-fixed");
    } else {
      $(".header-bottom").removeClass("is-fixed");
    }
  }
  function showArrowUp() {
    if ($(this).scrollTop() > 1500) {
      $(".go-up").addClass("is-active");
    } else {
      $(".go-up").removeClass("is-active");
    }
  }

  // Number counter START
  function animateCounter(element, targetValue, duration) {
    jQuery({ count: jQuery(element).text() }).animate(
      {
        count: targetValue,
      },
      {
        duration: duration,
        easing: "linear",
        step: function () {
          jQuery(element).text(Math.floor(this.count));
        },
        complete: function () {
          jQuery(element).text(targetValue);
        },
      }
    );
  }

  function isElementInViewport(elem) {
    if (!elem) return false;
    var rect = elem.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  jQuery(window).on("scroll", function () {
    if (isElementInViewport(jQuery(".num-scroll")[0])) {
      jQuery(".num-js").each(function () {
        var targetValue = parseInt(jQuery(this).data("count"));
        var duration = 2000;
        animateCounter(this, targetValue, duration);
      });

      jQuery(window).off("scroll");
    }
  });

  jQuery(window).trigger("scroll");
  // Number counter END

  $(window).on("scroll", function () {
    scrollHeader();
    showArrowUp();
  });
  scrollHeader();
  showArrowUp();

  $(".anchor-link").on("click", function () {
    let href = $(this).attr("href");

    $("html, body").animate(
      {
        scrollTop: $(href).offset().top,
      },
      {
        duration: 700,
      }
    );
    $(".header-mobile-wrap").slideUp(500);
    $(".hamburger").removeClass("is-active");
    return false;
  });

  $(".go-up").on("click", function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      {
        duration: 700,
      }
    );
    return false;
  });
  // Header END

  // Banner START
  const bannerSwiper = new Swiper(".banner-swiper", {
    speed: 1000,
    spaceBetween: 0,
    autoHeight: true,
    navigation: {
      nextEl: ".banner-swiper .swiper-button-next",
      prevEl: ".banner-swiper .swiper-button-prev",
    },
    pagination: {
      el: ".banner-swiper .swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  });
  // Banner END

  // Services START
  $(".services-btn").magnificPopup({
    type: "inline",
    showCloseBtn: false,
    removalDelay: 500,
    callbacks: {
      beforeOpen: function () {
        this.st.mainClass = this.st.el.attr("data-effect");
      },
    },
  });
  $(".modal-form-close").on("click", function () {
    $.magnificPopup.close();
  });
  // Services END

  // Gallery START
  $(".gallery-wrap a").magnificPopup({
    type: "image",
    gallery: {
      enabled: true,
    },
    callbacks: {
      beforeOpen: function () {
        this.st.image.markup = this.st.image.markup.replace(
          "mfp-figure",
          "mfp-figure mfp-with-anim"
        );
        this.st.mainClass = this.st.el.attr("data-effect");
      },
    },
  });

  $(".gallery-btn a").on("click", function (e) {
    e.preventDefault();
    var galleryItem = $(".gallery-item");

    if ($(this).hasClass("is-active")) {
      $(this).removeClass("is-active");
      $(this).text("Show more");
      galleryItem.each(function () {
        if ($(this).hasClass("is-active")) {
          $(this).removeClass("is-active");
          $(this).slideUp();
        }
      });
    } else {
      $(this).addClass("is-active");
      $(this).text("Hide");
      galleryItem.each(function () {
        if (!$(this).is(":visible")) {
          $(this).addClass("is-active");
          $(this).slideDown();
        }
      });
    }
  });
  // Gallery END

  // Reviews START
  const reviewsSwiper = new Swiper(".reviews-swiper", {
    speed: 1000,
    spaceBetween: 20,
    pagination: {
      el: ".reviews-swiper .swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      575: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
    },
  });
  // Reviews END

  //  bio accordeon

  class Accordion {
    constructor(el) {
      this.el = el;
      this.summary = el.querySelector("summary");
      this.content = el.querySelector(".accordion-content");
      this.expandIcon = this.summary.querySelector(".accordion-icon");
      this.animation = null;
      this.isClosing = false;
      this.isExpanding = false;
      this.summary.addEventListener("click", (e) => this.onClick(e));
    }

    onClick(e) {
      e.preventDefault();
      this.el.style.overflow = "hidden";

      if (this.isClosing || !this.el.open) {
        this.open();
      } else if (this.isExpanding || this.el.open) {
        this.shrink();
      }
    }

    shrink() {
      this.isClosing = true;

      const startHeight = `${this.el.offsetHeight}px`;
      const endHeight = `${this.summary.offsetHeight}px`;

      if (this.animation) {
        this.animation.cancel();
      }

      this.animation = this.el.animate(
        {
          height: [startHeight, endHeight],
        },
        {
          duration: 400,
          easing: "ease-out",
        }
      );
      this.animation.onfinish = () => {
        this.expandIcon.setAttribute(
          "src",
          "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'/></svg>"
        );
        return this.onAnimationFinish(false);
      };

      this.animation.oncancel = () => {
        this.expandIcon.setAttribute(
          "src",
          "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'/></svg>"
        );
        return (this.isClosing = false);
      };
    }

    open() {
      this.el.style.height = `${this.el.offsetHeight}px`;
      this.el.open = true;
      window.requestAnimationFrame(() => this.expand());
    }

    expand() {
      this.isExpanding = true;

      const startHeight = `${this.el.offsetHeight}px`;
      const endHeight = `${
        this.summary.offsetHeight + this.content.offsetHeight
      }px`;

      if (this.animation) {
        this.animation.cancel();
      }

      this.animation = this.el.animate(
        {
          height: [startHeight, endHeight],
        },
        {
          duration: 350,
          easing: "ease-out",
        }
      );

      this.animation.onfinish = () => {
        this.expandIcon.setAttribute(
          "src",
          "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'/></svg>"
        );
        return this.onAnimationFinish(true);
      };
      this.animation.oncancel = () => {
        this.expandIcon.setAttribute(
          "src",
          "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'/></svg>"
        );
        return (this.isExpanding = false);
      };
    }

    onAnimationFinish(open) {
      this.el.open = open;
      this.animation = null;
      this.isClosing = false;
      this.isExpanding = false;
      this.el.style.height = this.el.style.overflow = "";
    }
  }

  document.querySelectorAll("details").forEach((el) => {
    new Accordion(el);
  });
});
