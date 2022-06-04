// Creditos a tutitoos por su contribución

import ExtendedClient from '..';

module.exports = {
	name: 'rateLimit',
	run: async (client: ExtendedClient, request: any) => {
		client.catchError('error', `{RateLimit} [Global]: ${request.global} | [Method]: ${request.method} | [Path]: ${request.path} | [Limit]: ${request.limit} | [Timeout]: ${request.timeout}`);
	},
};
