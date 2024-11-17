// api/sendMessage.js
const axios = require("axios");

const TOKEN = "7756662510:AAGVp31vi-GvcvSeTP_O2UsNN6EjRMGdS9w";
const CHAT_ID = "1652055931";
const TELEGRAM_URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

// Функция для получения IP клиента
function getClientIP(req) {
    return req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
}

// Главная функция, обрабатывающая запросы
module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const { name, phone } = req.body;

        // Получаем IP клиента
        const clientIP = getClientIP(req);

        if (!name || !phone) {
            return res.status(400).json({ error: "Имя и телефон обязательны" });
        }

        const message = `📝 Новая заявка:\n\n👤 Имя: ${name}\n📞 Телефон: ${phone}\n🌐 IP: ${clientIP}`;

        try {
            // Отправка сообщения в Telegram
            const response = await axios.post(TELEGRAM_URL, {
                chat_id: CHAT_ID,
                text: message,
            });

            console.log("Response from Telegram:", response.data);
            return res.status(200).json({ success: "Сообщение отправлено успешно!" });
        } catch (error) {
            console.error("Ошибка отправки сообщения:", error.response ? error.response.data : error.message);
            return res.status(500).json({ error: "Ошибка отправки сообщения." });
        }
    } else {
        return res.status(405).json({ error: "Метод не разрешен" });
    }
};
