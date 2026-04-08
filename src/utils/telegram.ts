const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

const getUserInfo = async () => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    return {
      ip: data.ip || 'Unknown',
      city: data.city || 'Unknown',
      country: data.country_name || 'Unknown',
      org: data.org || 'Unknown',
      userAgent: navigator.userAgent
    };
  } catch (error) {
    console.error('Error fetching IP info:', error);
    return {
      ip: 'Unknown',
      city: 'Unknown',
      country: 'Unknown',
      org: 'Unknown',
      userAgent: navigator.userAgent
    };
  }
};

export const sendToTelegram = async (message: string) => {
  try {
    const info = await getUserInfo();
    const fullMessage = `${message}

<b>Location:</b> ${info.city}, ${info.country}
<b>IP:</b> ${info.ip}
<b>ISP:</b> ${info.org}
<b>User-Agent:</b> ${info.userAgent}`;

    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: fullMessage,
        parse_mode: 'HTML',
      }),
    });
    return response.ok;
  } catch (error) {
    console.error('Error sending message to Telegram:', error);
    return false;
  }
};
