import { DiscordWebhookMessage } from "../models";

export interface RecurringDiscordReading {
    getDiscordWebhookMessage(): Promise<DiscordWebhookMessage>
}