
import { Client as CoreClient, GatewayDispatchEvents } from "@discordjs/core";
import { REST } from "@discordjs/rest";
import { WebSocketManager } from "@discordjs/ws";
import { EventEmitter } from "events";

export { GatewayDispatchEvents };

export class Client extends EventEmitter {
    #coreClient = null;
    #api = {url: null, version: null};

    constructor(options = {}) {
        super();
        this.options = options;
        this.#api.url = options.api_url || "https://api.fluxer.app";
        this.#api.version = options.api_version || "1";
    }

    login(token) {
        if (!token) {
            throw new Error("An invalid token was provided.");
        }

        const rest = new REST({
            api: this.#api.url,
            version: this.#api.version,
        }).setToken(token);

        const gateway = new WebSocketManager({
            token,
            intents: this.options.intents ?? 0,
            rest,
            version: this.#api.version,
        });
        this.#coreClient = new CoreClient({ rest, gateway });

        if (this.#coreClient.on) {
            this.#coreClient.onAny?.((event, ...args) => {
                this.emit(event, ...args);
            });

            for (const event of Object.values(GatewayDispatchEvents)) {
                this.#coreClient.on(event, (...args) => {
                    this.emit(event, ...args);
                });
            }
        }

        return gateway.connect();
    }

    on(event, listener) {
        return super.on(event, listener);
    }

    once(event, listener) {
        return super.once(event, listener);
    }

    off(event, listener) {
        return super.off(event, listener);
    }
}
