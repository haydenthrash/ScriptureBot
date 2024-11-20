import { ParashahRecurringReading, LectionaryRecurringReading } from "./recurring-readings";
import { sendDiscordWebhookMessage } from "./clients/discordClient";
const schedule = require('node-schedule')
require('dotenv').config()

const discordUrl: string | undefined = process.env.DISCORD_URL;
const recurringParashahReading = new ParashahRecurringReading();
const recurringLectionaryReading = new LectionaryRecurringReading();

schedule.scheduleJob('0 12 * * 0', () => {
    recurringParashahReading.getDiscordWebhookMessage()
      .then((message) => {
        sendDiscordWebhookMessage(message, discordUrl)
      });
});

schedule.scheduleJob('0 12 * * 1', () => {
  recurringLectionaryReading.getDiscordWebhookMessage()
    .then((message) => {
      sendDiscordWebhookMessage(message, discordUrl)
    });
});