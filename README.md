# FluxerjsWrapper
A very simple "drop in replacement" for [discord.js](https://github.com/discordjs/discord.js) to use with [Fluxer](https://github.com/fluxerapp/fluxer)


### Example usage
```js
import { Client, GatewayDispatchEvents } from "fluxerjswrapper"; // Instead of discord.js

const client = new Client({ intents: 0 });

client.on(GatewayDispatchEvents.MessageCreate, async ({ api, data }) => {
    if (data.content === "ping") {
        await api.channels.createMessage(data.channel_id, { content: "pong" });
    }
});

client.on(GatewayDispatchEvents.Ready, ({ data }) => {
    console.log(`Logged in as ${data.user.username}`);
});

await client.login(process.env.FLUXER_BOT_TOKEN);
```
