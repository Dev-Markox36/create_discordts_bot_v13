import { Message, MessageEmbed } from 'discord.js';
import ExtendedClient from '../../..';

module.exports = {
	name: 'ping',
	category: 'util',
	aliases: ['pinga'],
	description: 'Configuration settings',
	memberPermissions: ['SEND_MESSAGES'],
	clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
	run: async (client: ExtendedClient, msg: Message, args: string[], prefix: string) => {
		msg.channel.send('Cargando datos....').then((resultMessage) => {
			setTimeout(async function () {
				const embed = new MessageEmbed()
					.addField('📡 API Latencia', `*${client.ws.ping}* **ms**`)
					.addField('🛰 Bot Latencia', `*${resultMessage.createdTimestamp - msg.createdTimestamp}* **ms**`)
					.setColor('#34ace0');
				msg.channel.send({ embeds: [embed] });
			}, 3980);
		});
	},
};
