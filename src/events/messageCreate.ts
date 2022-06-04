import { Message, MessageEmbed } from 'discord.js';
import ExtendedClient from '..';

module.exports = {
	name: 'messageCreate',
	run: async (client: ExtendedClient, msg: Message) => {
		const prefix = client.config.prefix;

		const args = msg.content.slice(prefix.length).trim().split(/ +/g);
		const cmd = args.shift()?.toLowerCase();
		let command: any = client.commands.get(cmd);

		/* ---------------------------- CONDITIONS ----------------------------*/
		if (msg.author.bot) return;
		if (!msg.content.startsWith(prefix)) return;
		if (cmd?.length === 0) return;

		if (command) {
			try {
				command.run(client, msg, args, prefix);
			} catch (error) {
				console.log(error);
				return msg.reply(`Algo salió mal mientras se ejecutaba: \`${command.name}\` comando.`);
			}
		}
	},
};
