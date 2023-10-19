# Clevermegle

This project uses [Cleverbot](https://www.cleverbot.com/) to talk with people in [Omegle](https://www.omegle.com/).

This consists of a script running in Omegle, another running in Cleverbot and a NodeJS which is the middleman. The middleman was necessary because I couldn't find a way to send messages between the wesbites. All the messaging is done with websockets.

The flow starts by reading a message from Omegle, sending the message to the middleman, and the middleman forwards the message to Cleverbot. Then the response from Cleverbot is collected, send through the middleman again, and finally its typed in Omegle. This keeps going until the other person realizes its talking to a bot.

The YouTube video for this is [here](https://www.youtube.com/watch?v=FzZtJbPj2Dw).
