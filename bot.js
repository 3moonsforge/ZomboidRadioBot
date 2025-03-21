const { Client, GatewayIntentBits } = require('discord.js');
const { Rcon } = require('rcon-client');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

const CHANNEL_ID = 'your-channel-id-here';
const RCON_HOST = 'localhost'; // Change to server IP if remote
const RCON_PORT = 27015;
const RCON_PASSWORD = 'your-rcon-password';
const FREQUENCY = '93.0 MHz';

client.once('ready', () => {
    console.log('Bot is ready!');
});

async function sendToGame(message) {
    try {
        const rcon = new Rcon({ host: RCON_HOST, port: RCON_PORT, password: RCON_PASSWORD });
        await rcon.connect();
        await rcon.send(`servermsg "${message}"`);
        await rcon.end();
        console.log(`Sent to game: ${message}`);
    } catch (error) {
        console.error('RCON Error:', error);
    }
}

client.on('messageCreate', async message => {
    if (message.channel.id !== CHANNEL_ID || message.author.bot) return;
    const gameMessage = `[${FREQUENCY}] ${message.author.username}: ${message.content}`;
    await sendToGame(gameMessage);
});

client.login('your-bot-token-here');
