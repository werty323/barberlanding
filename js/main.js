document.addEventListener("DOMContentLoaded", () => {
  /* --- 1. ЛОГИКА БУРГЕРА (Меню) --- */
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".header__nav");

  if (burger) {
    burger.addEventListener("click", () => {
      nav.classList.toggle("header__nav--active");
      burger.classList.toggle("burger--active");
    });
  }

  /* --- 2. ЛОГИКА МОДАЛЬНОГО ОКНА --- */
  const modal = document.getElementById("modal");
  const closeBtn = document.querySelector(".modal__close");
  const overlay = document.querySelector(".modal__overlay");

  // Находим ВСЕ кнопки, которые должны открывать модалку
  // (Ищем кнопки с href="#booking" или классом js-open-modal, если добавишь)
  const openBtns = document.querySelectorAll(
    'a[href="#booking"], .btn--primary',
  );

  // Функция открытия
  const openModal = (e) => {
    e.preventDefault(); // Запрещаем переход по ссылке
    modal.classList.add("open");
    document.body.style.overflow = "hidden"; // Блокируем скролл сайта
  };

  // Функция закрытия
  const closeModal = () => {
    modal.classList.remove("open");
    document.body.style.overflow = ""; // Возвращаем скролл
  };

  // Вешаем клик на все кнопки
  openBtns.forEach((btn) => {
    btn.addEventListener("click", openModal);
  });

  // Закрытие по крестику и фону
  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);

  // Закрытие по клавише ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) {
      closeModal();
    }
  });

  /* --- 3. ОБРАБОТКА ФОРМЫ (Имитация отправки) --- */
  const form = document.getElementById("bookingForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Не перезагружаем страницу

    // Тут можно добавить отправку в Telegram или на почту
    // Пока просто имитируем успех:

    const btn = form.querySelector(".modal__btn");
    const originalText = btn.innerText;

    btn.innerText = "Відправлено! ✔";
    btn.style.backgroundColor = "#2ecc71"; // Зеленый цвет
    btn.style.color = "#fff";

    setTimeout(() => {
      closeModal();
      // Возвращаем кнопку в исходное состояние
      setTimeout(() => {
        btn.innerText = originalText;
        btn.style.backgroundColor = "";
        btn.style.color = "";
        form.reset(); // Очищаем поля
      }, 500);
    }, 2000);
  });
});
