import ExtendedClient from '..';

module.exports = {
	name: 'ready',
	run: async (client: ExtendedClient) => {
		client.catchError('success', `Logeado como: ${client?.user?.username}`);
		client?.user?.setActivity(`!help | ${client?.user?.username}`, {
			type: 'WATCHING',
		});
	},
};
