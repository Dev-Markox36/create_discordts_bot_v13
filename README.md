<div align="center">
<h1> TEMPLATE_DISCORDTS_BOT_V13 </h1>
<strong><i> NPX TEMPLATE FOR DISCORD V13 IN TYPESCRIPT</i></strong>
</div>

## Installation

npx:
```js
// Si queremos que se cree una carpte en la ubicación
npx create_discordts_bot_v13 nombre_carpeta
// Si no queremos que se cree carpeta y se clone en la carpeta actual
npx create_discordts_bot_v13 .
```

## Usage

.env:
```js
BOT_TOKEN= //fill with the token of your bot
```

.config:
```js
// Modify this parameter as you want
module.exports = {
	prefix: '!',                    // prefix of your bot
	devs: ['403917639673577482'],   // this is for the commands in the category of dev
	colors: {                       // Values for colors for embeds
		default: '#00AE86', 
		error: '#eb4034',
	},
	emotes: {                       // Values of emotes
		error: '⚠️',
		success: '✅',
	},
};
```
