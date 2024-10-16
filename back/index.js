import { token } from "./secret.js";
import TelegramBot from "node-telegram-bot-api";

const bot = new TelegramBot(token, { polling: true });
const webAppUrl = "https://fc41-5-18-235-231.ngrok-free.app";

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === "/start") {
    await bot.sendMessage(chatId, "Ниже есть кнопка, и форму заполни", {
      reply_markup: {
        keyboard: [
          [{ text: "Заполни форму", web_app: { url: `${webAppUrl}/form` } }],
        ],
      },
    });

    await bot.sendMessage(chatId, "ya", {
      reply_markup: {
        inline_keyboard: [
          [{ text: "сделать заказ", web_app: { url: `${webAppUrl}` } }],
        ],
      },
    });
  }

  if (msg?.web_app_data?.data) {
    try {
      const data = JSON.parse(msg?.web_app_data?.data);
      console.log(data);
      await bot.sendMessage(
        chatId,
        `Спасибо, ${data?.name}!\nНа Ваш номер телефона: ${data?.phone} Поступит звонок`
      );
    } catch (error) {
      console.log(error);
    }
  }
});
