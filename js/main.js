document.addEventListener("DOMContentLoaded", () => {
  /* --- 1. ЛОГИКА МЕНЮ (БУРГЕР) --- */
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".header__nav");
  const navLinks = document.querySelectorAll(".nav__link"); // Знаходимо всі посилання

  if (burger) {
    // Відкрити/Закрити по кліку на бургер
    burger.addEventListener("click", () => {
      nav.classList.toggle("header__nav--active");
      burger.classList.toggle("burger--active");

      // Блокуємо скрол сайту, коли меню відкрите
      if (nav.classList.contains("header__nav--active")) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    });

    // Закрити меню при кліку на будь-яке посилання
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("header__nav--active");
        burger.classList.remove("burger--active");
        document.body.style.overflow = ""; // Повертаємо скрол
      });
    });
  }

  /* --- 2. ЛОГИКА МОДАЛЬНОГО ОКНА --- */
  const modal = document.getElementById("modal");
  const closeBtn = document.querySelector(".modal__close");
  const overlay = document.querySelector(".modal__overlay");
  const openBtns = document.querySelectorAll(
    'a[href="#booking"], .btn--primary',
  );

  const openModal = (e) => {
    e.preventDefault();
    if (modal) {
      modal.classList.add("open");
      document.body.style.overflow = "hidden";

      // Якщо ми відкрили модалку з мобільного меню, то меню треба закрити
      if (nav.classList.contains("header__nav--active")) {
        nav.classList.remove("header__nav--active");
        burger.classList.remove("burger--active");
      }
    }
  };

  const closeModal = () => {
    if (modal) {
      modal.classList.remove("open");
      document.body.style.overflow = "";
    }
  };

  openBtns.forEach((btn) => {
    btn.addEventListener("click", openModal);
  });

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (overlay) overlay.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && modal.classList.contains("open")) {
      closeModal();
    }
  });

  /* --- 3. ФОРМА --- */
  const form = document.getElementById("bookingForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = form.querySelector(".modal__btn");
      const originalText = btn.innerText;

      btn.innerText = "Відправлено! ✔";
      btn.style.backgroundColor = "#2ecc71";
      btn.style.color = "#fff";

      setTimeout(() => {
        closeModal();
        setTimeout(() => {
          btn.innerText = originalText;
          btn.style.backgroundColor = "";
          btn.style.color = "";
          form.reset();
        }, 500);
      }, 2000);
    });
  }
});
