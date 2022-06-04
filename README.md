<div align="center">
<h1> TEMPLATE_DISCORDTS_BOT_V13 </h1>
<strong><i> NPX TEMPLATE FOR DISCORD V13 IN TYPESCRIPT</i></strong>
</div>

## Installation

npx:

```js
// Creates a folder inside the route
npx create_discordts_bot_v13 folder_name
// Clone in the actual route without creating a new folder
npx create_discordts_bot_v13 .
```

## Execution

```js
npm start //run aplication with ts
// or
npm tsc //compile typescript to javascript
npm start //run index.js compiled file
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
	prefix: '!', // prefix of your bot
	devs: ['403917639673577482'], // this is for the commands in the category of dev
	colors: {
		// Values for colors for embeds
		default: '#00AE86',
		error: '#eb4034',
	},
	emotes: {
		// Values of emotes
		error: '⚠️',
		success: '✅',
	},
};
```
