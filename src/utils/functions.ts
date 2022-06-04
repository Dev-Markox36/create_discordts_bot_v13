import { Routes } from 'discord-api-types/v9';
import { REST } from '@discordjs/rest';
import { readdirSync } from 'fs';
import ExtendedClient from '../index';

interface registerData {
	all: number;
	included: string[];
	excluded: string[];
}

async function registerApi(client: ExtendedClient) {
	await new REST({ version: '9' })
		.setToken(process.env.BOT_TOKEN as string)
		.put(Routes.applicationCommands(client?.user?.id as string), { body: client.slashCommands })
		.then(() => client.catchError('success', 'Agregados comandos a la API'));
}

async function registerCommands(client: ExtendedClient) {
	let fileCommands: registerData = { all: 0, included: [], excluded: [] };
	readdirSync(`${__dirname}/../commands/messageCommands/`).forEach((dir) => {
		const commands = readdirSync(`${__dirname}/../commands/messageCommands/${dir}/`).filter((file) => file.endsWith('.ts'));
		fileCommands.all += commands.length;
		for (let file of commands) {
			let pull = require(`${__dirname}/../commands/messageCommands/${dir}/${file}`);
			if (pull.name) {
				fileCommands.included.push(pull.name);
				client.commands.set(pull.name, pull);
				pull.aliases.forEach((alias) => client.aliases.set(alias, pull.name));
			} else {
				fileCommands.excluded.push(file.split('.')[0]);
				continue;
			}
			if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach((alias: string) => client.aliases.set(alias, pull.name));
		}
	});
	client.catchError('success', `Modulo: commands: ${fileCommands.included.length} / ${fileCommands.all}`);
	if (fileCommands.included.length !== fileCommands.all) client.catchError('error', `Error en el archivo: ${fileCommands.excluded}.ts`);
}

async function registerSlashCommands(client: ExtendedClient) {
	let fileCommands: registerData = { all: 0, included: [], excluded: [] };
	readdirSync(`${__dirname}/../commands/slashCommands/`).forEach((dir) => {
		const commands = readdirSync(`${__dirname}/../commands/slashCommands/${dir}/`).filter((file: string) => file.endsWith('.ts') || file.endsWith('.js'));
		fileCommands.all += commands.length;
		for (const file of commands) {
			const pull = require(`${__dirname}/../commands/slashCommands/${dir}/${file}`);
			if (!pull.name) fileCommands.excluded.push(file.split('/').pop()?.split('.')[0] as string);
			client.slashCommands.set(pull.name, pull);
			fileCommands.included.push(pull.name);
		}
	});
	client.catchError('success', `Modulo: slashCommands: ${fileCommands.included.length} / ${fileCommands.all}`);
	if (fileCommands.included.length !== fileCommands.all) client.catchError('error', `Error en el archivo: ${fileCommands.excluded}.ts`);
}

async function registerEvents(client: ExtendedClient) {
	let fileEvents: registerData = { all: 0, included: [], excluded: [] };

	const commands = readdirSync(`${__dirname}/../events`).filter((file) => file.endsWith('.ts') || file.endsWith('.js'));
	fileEvents.all = commands.length;
	for (const file of commands) {
		const pull = require(`../events/${file}`);
		if (!pull.name) fileEvents.excluded.push(file.split('/').pop()?.split('.')[0] as string);
		client.events.set(pull.name, pull);
		client.on(pull.name, pull.run.bind(null, client));
		fileEvents.included.push(pull.name);
	}
	client.catchError('success', `Modulo: eventos: ${fileEvents.included.length} / ${fileEvents.all}`);
	if (fileEvents.included.length !== fileEvents.all) client.catchError('error', `Error en ${fileEvents.excluded}`);
}

export { registerApi, registerSlashCommands, registerCommands, registerEvents };
