module.exports = {
    commands: ["say", "echo"],
    minArgs: 1,
    expectedArgs: '[Message]',
    ownerOnly: true,
    callback: ({message, text}) => {
        message.channel.send(text)
    }
}