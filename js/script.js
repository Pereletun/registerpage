// Тексты для двух языков
const texts = {
    uz: {
        heading: "Ingliz tilini o'rganmoqchimisiz?",
        description: "U holda raqamingizni qoldiring va biz barcha savollaringizga javob beramiz.",
        namePlaceholder: "Ismingiz",
        phonePlaceholder: "+998 (__) ___-____",
        submitBtn: "Yuborish",
        note: "*Darslar Chirchiq shahrida offline olib boriladi.",
    },
    ru: {
        heading: "Хотите изучать английский язык?",
        description: "Оставьте свой номер, и мы ответим на все ваши вопросы.",
        namePlaceholder: "Ваше имя",
        phonePlaceholder: "+998 (__) ___-____",
        submitBtn: "Отправить",
        note: "*Занятия проводятся оффлайн в Чирчике.",
    },
};

// Элементы страницы для изменения текста
const elements = {
    heading: document.getElementById("heading"),
    description: document.getElementById("description"),
    namePlaceholder: document.getElementById("name"),
    phonePlaceholder: document.getElementById("phone"),
    submitBtn: document.getElementById("submit-btn"),
    note: document.getElementById("note"),
};

// Кнопки переключения языка
const uzbekBtn = document.getElementById("uzbek-btn");
const russianBtn = document.getElementById("russian-btn");

// Функция для смены языка
function changeLanguage(lang) {
    const langData = texts[lang];

    elements.heading.textContent = langData.heading;
    elements.description.textContent = langData.description;
    elements.namePlaceholder.placeholder = langData.namePlaceholder;
    elements.phonePlaceholder.placeholder = langData.phonePlaceholder;
    elements.submitBtn.textContent = langData.submitBtn;
    elements.note.textContent = langData.note;

    if (lang === "uz") {
        uzbekBtn.classList.add("active");
        russianBtn.classList.remove("active");
    } else {
        russianBtn.classList.add("active");
        uzbekBtn.classList.remove("active");
    }
}

// События для смены языка
uzbekBtn.addEventListener("click", () => changeLanguage("uz"));
russianBtn.addEventListener("click", () => changeLanguage("ru"));

// Всплывающее окно
const confirmationMessage = document.getElementById("confirmation-message");
const closePopupBtn = document.getElementById("close-popup-btn");

// Обработчик отправки формы
document.querySelector(".form").addEventListener("submit", function (e) {
    e.preventDefault();  // Отменяем стандартное поведение формы

    const formData = new FormData(e.target);  // Собираем данные формы

    const name = formData.get("name");
    const phone = formData.get("phone");

    // Проверка, что поля не пустые
    if (!name || !phone) {
        alert("Пожалуйста, заполните все поля!");
        return;
    }
    // Определяем базовый URL для API
    const apiUrl = "https://your-app-name.herokuapp.com/api"; // твой серверный URL

    // Отправка данных на сервер
    fetch("/send-message", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",  // Указываем правильный заголовок
        },
        body: JSON.stringify({
            name: name,
            phone: phone,
        }),
    })
        .then((response) => {
            if (response.ok) {
                console.log("Message sent successfully!");
                confirmationMessage.classList.remove("hidden");
                document.getElementById("name").value = "";  // Очищаем поле имени
                document.getElementById("phone").value = "";  // Очищаем поле телефона
            } else {
                console.error("Error sending message.");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
});

// Закрытие всплывающего окна
closePopupBtn.addEventListener("click", () => {
    confirmationMessage.classList.add("hidden");
});
