import { ParashahRecurringReading } from "./recurring-readings";
import { DiscordWebhookMessage } from "./types/models";
const schedule = require('node-schedule')
require('dotenv').config()

const discordUrl: string | undefined = process.env.DISCORD_URL;
const recurringParashahReading = new ParashahRecurringReading();

schedule.scheduleJob('0 13 * * 0', () => {
    recurringParashahReading.getWebhookMessage()
      .then((message) => {
        sendWebhookMessage(message)
      });
});


function sendWebhookMessage(message: DiscordWebhookMessage): void {    
    fetch(discordUrl ?? "", {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      })
}