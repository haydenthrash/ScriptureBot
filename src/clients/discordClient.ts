
import { DiscordWebhookMessage } from "../types/models";

export function sendDiscordWebhookMessage(message: DiscordWebhookMessage, discordUrl: string | undefined): void {    
    if (discordUrl) {
        fetch(discordUrl, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        }).catch((error) => {
            console.error('Error sending webhook message:', error);
        });
    } else {
        console.error('Discord URL is not defined.');
    }
}