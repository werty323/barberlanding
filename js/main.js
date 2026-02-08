document.addEventListener("DOMContentLoaded", () => {
  /* --- 1. ЛОГИКА МЕНЮ (БУРГЕР) --- */
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".header__nav");
  const navLinks = document.querySelectorAll(".nav__link");

  if (burger) {
    burger.addEventListener("click", () => {
      nav.classList.toggle("header__nav--active");
      burger.classList.toggle("burger--active");

      if (nav.classList.contains("header__nav--active")) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("header__nav--active");
        burger.classList.remove("burger--active");
        document.body.style.overflow = "";
      });
    });
  }

  /* --- 2. ЛОГИКА МОДАЛЬНОГО ОКНА (ЗАПИСЬ) --- */
  const modal = document.getElementById("modal");
  const closeBtn = document.querySelector(".modal__close");
  const overlay = document.querySelector(".modal__overlay");

  // Ищем кнопки для модалки, НО исключаем кнопку "Показать все"
  const openBtns = document.querySelectorAll(
    'a[href="#booking"], .btn--primary',
  );

  const openModal = (e) => {
    // ВАЖНЫЙ ФИКС: Если это кнопка "loadMoreBtn", мы НЕ открываем модалку
    if (e.currentTarget.id === "loadMoreBtn") return;

    e.preventDefault();
    if (modal) {
      modal.classList.add("open");
      document.body.style.overflow = "hidden";

      if (nav && nav.classList.contains("header__nav--active")) {
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

  /* --- 3. ФОРМА (ОТПРАВКА) --- */
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

  /* --- 4. ЛОГИКА КНОПКИ "ПЕРЕГЛЯНУТИ ВСЕ" (АККОРДЕОН) --- */
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  const hiddenItems = document.querySelectorAll(".price-list__item--hidden");
  let isExpanded = false;

  if (loadMoreBtn && hiddenItems.length > 0) {
    loadMoreBtn.addEventListener("click", (e) => {
      e.preventDefault();
      // Останавливаем всплытие, чтобы модалка точно не перехватила (на всякий случай)
      e.stopPropagation();

      if (!isExpanded) {
        // ПОКАЗАТЬ
        hiddenItems.forEach((item) => {
          item.style.display = "flex";
        });
        loadMoreBtn.innerText = "Згорнути";
        isExpanded = true;
      } else {
        // СКРЫТЬ
        hiddenItems.forEach((item) => {
          item.style.display = "none";
        });
        loadMoreBtn.innerText = "Переглянути все";

        // Скролл обратно к заголовку прайса
        const servicesSection = document.getElementById("services");
        if (servicesSection) {
          servicesSection.scrollIntoView({ behavior: "smooth" });
        }

        isExpanded = false;
      }
    });
  }
});
