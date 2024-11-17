const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = 3000;

// Указываем папку со статическими файлами
app.use(express.static(path.join(__dirname, "public")));

// Токен вашего бота и Chat ID
const TOKEN = "7756662510:AAGVp31vi-GvcvSeTP_O2UsNN6EjRMGdS9w";
const CHAT_ID = "1648456491";

// URL для API Telegram
const TELEGRAM_URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

// Middleware для обработки данных формы
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Функция для получения реального IP
function getClientIP(req) {
    return req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
}

// Обработка POST-запроса
app.post("/send-message", async (req, res) => {
    const { name, phone } = req.body;

    // Получаем IP клиента
    const clientIP = getClientIP(req);

    console.log(`Received body:`, req.body);
    console.log(`Name: ${name}, Phone: ${phone}, IP: ${clientIP}`);

    if (!name || !phone) {
        return res.status(400).send("Имя и телефон обязательны");
    }

    const message = `📝 Новая заявка:\n\n👤 Имя: ${name}\n📞 Телефон: ${phone}\n🌐 IP: ${clientIP}`;

    try {
        // Отправка сообщения в Telegram
        const response = await axios.post(TELEGRAM_URL, {
            chat_id: CHAT_ID,
            text: message,
        });

        console.log("Response from Telegram:", response.data);
        res.status(200).send("Сообщение отправлено успешно!");
    } catch (error) {
        console.error("Ошибка отправки сообщения:", error.response ? error.response.data : error.message);
        res.status(500).send("Ошибка отправки сообщения.");
    }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
