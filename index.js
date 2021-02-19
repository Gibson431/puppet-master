// configure .env file
try {
    const envResult = require('dotenv').config();
    if (envResult.error) {
        if (process.env.EXTERNAL == 'true') { console.log('Heroku environment loaded successfully.') }
        else { console.log(`Environment loading failed:\n` + envResult.error) }
    } else {
        console.log(`Local environment loaded successfully.`)
    };
} catch (err) { console.log(err.name + ': ' + err.message) };

// Configure module aliases
require('module-alias/register')

// Import Discord.js
const Discord = require('discord.js')
const WOKCommands = require('wokcommands')

// Create client object
const client = new Discord.Client({
    partials: ['REACTION', 'MESSAGE'],
    presence: {
        status: process.env.EXTERNAL === 'true' ? 'online' : 'dnd',
        activity: {
            type: process.env.EXTERNAL === 'PLAYING',
            name: process.env.EXTERNAL === 'true' ? 'with new features' : `'Development'`,
        }
    },
    fetchAllMembers: false
})

// Create 'ready' event listener
client.on('ready', () => {
    console.log(`Client ready as ${client.user.tag}`)

    // create wokcommands instance
    new WOKCommands(client, {
        commandsDir: 'commands',
        featureDir: 'features',
        messagesPath: 'configurations/messages.json',
        testServers: [process.env.TBA_ID]
    })
        .setDefaultPrefix('#')
        .setBotOwner(process.env.OWNER_ID)
        .setDefaultLanguage('english')
        .setMongoPath(process.env.MONGO_URI)
        .setColor(0x0000FF)
})

// Start bot
client.login(process.env.CLIENT_TOKEN)