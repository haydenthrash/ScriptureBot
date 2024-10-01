const schedule = require('node-schedule')
require('dotenv').config()

const parashahUrl = "https://www.hebcal.com/hebcal?v=1&cfg=json&s=on&start=DATE_HERE&end=DATE_HERE"
const discordUrl = process.env.DISCORD_URL

 schedule.scheduleJob('0 12 * * 0', () => {
     doWork();
 });

function doWork() {
    getParashah()
        .then((parashah) => {
            let parsedParashah = parseParashah(parashah);
            sendWebhookMessage(parsedParashah)
        })
}

async function getParashah() {
    let satFormatted = getSaturdayFormattedDate();
    
    let completeUrl = parashahUrl.replaceAll("DATE_HERE", satFormatted)
    
    const response = await fetch(completeUrl);
    
    return await response.json();
}

function sendWebhookMessage(message) {
    const discordMessage = getWebHookMessage(message);
    fetch(discordUrl, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(discordMessage), // data can be `string` or {object}!
      })
}

function parseParashah(parashah) {
    let firstItem = parashah.items != null ? parashah.items[0] : null;

    if(firstItem != null && firstItem.title && firstItem.leyning)
    {
        return {
            title: firstItem.title,
            torahReading: firstItem.leyning.torah,
            haftarahReading: firstItem.leyning.haftarah
        }
    }

    return null;
}

function getSaturdayFormattedDate() {
    let d = new Date();

    if(d.getUTCDay() != 6) {
        const diff = d.getUTCDay() + 1
        d.setUTCDate(d.getUTCDate() - diff);
    }

    //ISO String converts to UTC. Fine for now
    return d.toISOString().split('T')[0]
}

function getWebHookMessage(obj) {
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
