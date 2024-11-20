
import { RecurringDiscordReading } from "../types/interfaces";
import { DiscordWebhookMessage, LectionaryReading } from "../types/models";
import { getNextSundayFormattedDate } from "../helpers/date.helpers"

export class LectionaryRecurringReading implements RecurringDiscordReading {
    private lectionaryUrl: string = "https://www.lectserve.com/date/DATE_HERE";

    LectionaryRecurringReading() {

    }

    async getDiscordWebhookMessage(): Promise<DiscordWebhookMessage> {
        var lectionary = await this.getSundayLectionaryReading();
        let parsedLectionary = this.parseLectionary(lectionary);
        return this.buildWebhookMessage(parsedLectionary);
    }

    private async getSundayLectionaryReading(): Promise<any> {
        let sunFormatted = getNextSundayFormattedDate();
        let completeUrl = this.lectionaryUrl.replaceAll("DATE_HERE", sunFormatted)
        
        const response = await fetch(completeUrl);
        
        return await response.json();
    }

    private parseLectionary(reading: any): LectionaryReading {
        let sundayItem = reading.sunday;

        if(sundayItem != null && sundayItem.services != null && sundayItem.services.length > 0)
        {
            let service = sundayItem.services[0];

            if(service.readings != null && service.readings.length == 4 && service.name != null)
            {
                return {
                    title: service.name,
                    oldTestamentReading: service.readings[0],
                    psalm: service.readings[1],
                    newTestamentReading: service.readings[2],
                    gospelReading: service.readings[3]
                }
            }
        }

        return {
            title: "No Lectionary readings found for today",
            oldTestamentReading: "N/A",
            psalm: "N/A",
            newTestamentReading: "N/A",
            gospelReading: "N/A"
        };
    }

    private buildWebhookMessage(obj: LectionaryReading) : DiscordWebhookMessage {
        return {
            embeds: [
                {
                    color: 8522444,
                    author: {
                        name: "Next Week's Lectionary Readings"
                    },
                    title: obj.title,
                    fields: [
                        {
                            name: "Old Testament",
                            value: obj.oldTestamentReading,
                            inline: true
                        },
                        {
                            name: "Psalm",
                            value: obj.psalm,
                            inline: true
                        },
                        {
                            name: "New Testament",
                            value: obj.newTestamentReading,
                            inline: true
                        },
                        {
                            name: "Gospel",
                            value: obj.gospelReading,
                            inline: true
                        }
                    ]
                }
            ]
        };
    }
}
