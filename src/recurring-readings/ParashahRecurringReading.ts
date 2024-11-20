import { RecurringDiscordReading } from "../types/interfaces";
import { DiscordWebhookMessage, ParashahReading } from "../types/models";
import { getPreviousSaturdayFormattedDate } from "../helpers/date.helpers"

export class ParashahRecurringReading implements RecurringDiscordReading {
    private parashahUrl: string = "https://www.hebcal.com/hebcal?v=1&cfg=json&s=on&start=DATE_HERE&end=DATE_HERE";

    ParashahReading() {

    }

    async getDiscordWebhookMessage(): Promise<DiscordWebhookMessage> {
        var parashah = await this.getParashah();
        let parsedParashah = this.parseParashah(parashah);
        return this.buildWebhookMessage(parsedParashah);
    }

    private async getParashah(): Promise<any> {
        let satFormatted = getPreviousSaturdayFormattedDate();
        
        let completeUrl = this.parashahUrl.replaceAll("DATE_HERE", satFormatted)
        
        const response = await fetch(completeUrl);
        
        return await response.json();
    }

    private parseParashah(parashah: any): ParashahReading {
        let firstItem = parashah.items != null ? parashah.items[0] : null;

        if(firstItem != null && firstItem.title && firstItem.leyning)
        {
            return {
                title: firstItem.title,
                torahReading: firstItem.leyning.torah,
                haftarahReading: firstItem.leyning.haftarah
            }
        }

        return {
            title: "No Parashah readings found for today",
            torahReading: "N/A",
            haftarahReading: "N/A"
        };
    }

    private buildWebhookMessage(obj: ParashahReading) : DiscordWebhookMessage {
        return {
            embeds: [
                {
                    color: 65331,
                    author: {
                        name: "This Week's Parashah Readings"
                    },
                    title: obj.title,
                    fields: [
                        {
                            name: "Torah",
                            value: obj.torahReading,
                            inline: true
                        },
                        {
                            name: "Haftarah",
                            value: obj.haftarahReading,
                            inline: true
                        }
                    ]
                }
            ]
        };
    }
}