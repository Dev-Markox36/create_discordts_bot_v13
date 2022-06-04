import { Client, Intents, Collection } from 'discord.js';
import { registerApi, registerCommands, registerSlashCommands, registerEvents } from './utils/functions';
import { config } from 'dotenv';
config();

export default class ExtendedClient extends Client {
	commands = new Collection();
	aliases = new Collection();
	slashCommands = new Collection();
	events = new Collection();
	config = require('./config/config');

	constructor() {
		super({
			intents: [
				Intents.FLAGS.GUILDS,
				Intents.FLAGS.GUILD_MEMBERS,
				Intents.FLAGS.GUILD_BANS,
				Intents.FLAGS.GUILD_MESSAGES,
				Intents.FLAGS.GUILD_MESSAGE_TYPING,
				Intents.FLAGS.GUILD_PRESENCES,
				Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
				Intents.FLAGS.GUILD_INTEGRATIONS,
				Intents.FLAGS.GUILD_VOICE_STATES,
				Intents.FLAGS.DIRECT_MESSAGES,
				Intents.FLAGS.DIRECT_MESSAGE_TYPING,
			],
		});
	}
	async run() {
		if (!process.env.BOT_TOKEN) return this.catchError('error', 'Token no configurado');
		await this.login(process.env.BOT_TOKEN);
		await registerEvents(this);
		await registerCommands(this);
		await registerSlashCommands(this);
		await registerApi(this);
	}
	catchError(type: string, error: Error | string) {
		if (type === 'success') console.log('🟢 [SUCCESS] =>', error);
		if (type === 'warning') console.log('🟠 [WARNING] =>', error);
		if (type === 'error') return console.log('🔴 [ERROR] =>', error);
	}
}

const client = new ExtendedClient();
client.run();

process.on('uncaughtException', async (error: Error) => client.catchError('error', error));
process.on('unhandledRejection', async (error: Error) => client.catchError('error', error));
