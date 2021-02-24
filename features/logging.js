const { getChannelId } = require('@commands/admin/setlog')
const Embed = require('@configurations/embed-construct')

module.exports = async (client) => {
    client.on('messageDelete', async (message) => {
        const { guild } = message
        if (!message.author || !guild || !message.content) { return }

        const channelId = await getChannelId(guild.id)
        if (!channelId) {
            return
        }

        const channel = await guild.channels.cache.get(channelId)
        if (!channel) { return }
        await channel.send(await Embed.deletedMessage(message))
        console.log('message logged');

    })

    console.log(`WOKCommands > Feature "logging" is set up.`);
}