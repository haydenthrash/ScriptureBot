import { DiscordWebhookMessage } from "../models";

export interface RecurringDiscordReading {
    getWebhookMessage(): Promise<DiscordWebhookMessage>
}