const loggingSchema = require('@models/logging-schema')

const cache = new Map()

const loadData = async () => {
    const results = await loggingSchema.find()

    for (const result of results) {
        cache.set(result._id, result.channelId)
    }
}
loadData()

module.exports = {
    category: 'Configuration',
    description: 'Sets the current channel as the logging channel',
    requiredPermissions: [
        'ADMINISTRATOR'
    ],
    callback: async ({ message }) => {
        const { guild, channel } = message

        await loggingSchema.findOneAndUpdate({
            _id: guild.id
        }, {
            _id: guild.id,
            channelId: channel.id,
            channelName: channel.name
        }, {
            upsert: true
        })

        cache.set(guild.id, channel.id, channel.name)

        message.reply(`Logging channel set!`)
    }
}

module.exports.getChannelId = (guildId) => {
    return cache.get(guildId)
}