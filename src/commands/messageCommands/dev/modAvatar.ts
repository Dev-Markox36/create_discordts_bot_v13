import { Message } from 'discord.js';
import ExtendedClient from '../../..';

module.exports = {
	name: 'modavatar',
	category: 'dev',
	aliases: ['mda'],
	cooldown: 2,
	usage: 'c',
	description: 'asfg',
	run: async (client: ExtendedClient, msg: Message, args: string[], prefix: string) => {
		if (!client.config.devs.includes(msg.author.id)) return msg.reply('No tienes permisos para ejecutar este comando.');
		if (!args[0]) return msg.channel.send('Especifica un link.');
		await client.user?.setAvatar(args[0]).then(() => {
			msg.reply('✅ Avatar cambiado.');
		});
	},
};
