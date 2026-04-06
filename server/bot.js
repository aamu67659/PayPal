require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

// Replace 'YOUR_TELEGRAM_BOT_TOKEN' with your bot's token from BotFather
const token = process.env.TELEGRAM_BOT_TOKEN || 'YOUR_TELEGRAM_BOT_TOKEN';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Listen for any kind of message. There are different kinds of messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  // Handle non-command messages, e.g., payment amounts
  if (text && !text.startsWith('/')) {
    const amount = parseFloat(text);
    if (!isNaN(amount)) {
      bot.sendMessage(chatId, `Payment of $${amount} processed successfully!`);
    } else {
      bot.sendMessage(chatId, 'Please enter a valid amount or use /help for commands.');
    }
  }
});

// Handle /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Welcome to the PayPal Bot! Use /help for commands.');
});

// Handle /help command
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Available commands:\n/start - Start the bot\n/help - Show this help\n/pay - Simulate a payment');
});

// Handle /pay command
bot.onText(/\/pay/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Payment simulation: Enter amount to pay.');
});

console.log('Bot is running...');