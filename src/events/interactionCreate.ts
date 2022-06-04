import { Interaction } from 'discord.js';
import ExtendedClient from '..';

module.exports = {
	name: 'interactionCreate',
	run: async (client: ExtendedClient, int: Interaction) => {
		if (int.isCommand()) {
			const command: any = client.slashCommands.get(int.commandName);
			const args = [];
			if (!command) return;
			for (const option of int.options.data) {
				if (option.type === 'SUB_COMMAND') {
					if (option.name) args.push(option.name);
					option.options?.forEach((x) => {
						if (x.value) args.push(x.value);
					});
				} else if (option.value) args.push(option.value);
			}
			command.run(client, int, args);
		}
	},
};
