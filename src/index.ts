import { ParashahRecurringReading } from "./recurring-readings";
import { LectionaryRecurringReading } from "./recurring-readings/LectionaryRecurringReading";
import { DiscordWebhookMessage } from "./types/models";
const schedule = require('node-schedule')
require('dotenv').config()

const discordUrl: string | undefined = process.env.DISCORD_URL;
const recurringParashahReading = new ParashahRecurringReading();
const recurringLectionaryReading = new LectionaryRecurringReading();

schedule.scheduleJob('0 12 * * 0', () => {
    recurringParashahReading.getWebhookMessage()
      .then((message) => {
        sendWebhookMessage(message)
      });
});

schedule.scheduleJob('0 12 * * 1', () => {
  recurringLectionaryReading.getWebhookMessage()
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
