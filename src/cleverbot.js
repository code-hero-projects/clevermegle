// ==UserScript==
// @name         CleverMegle Cleverbot
// @version      1.0
// @description  CleverMegle Cleverbot script
// @author       Code Hero
// @match        https://www.cleverbot.com/*
// ==/UserScript==

(function () {
  "use strict";

  window.addEventListener('load', () => {
    // DOM elements

    const understoodFormSubmitButton = document.getElementById('noteb').childNodes[1];
    understoodFormSubmitButton.submit();

    const messageForm = document.getElementById('avatarform');
    const input = messageForm.childNodes[0];
    const messageFormSubmitButton = messageForm.childNodes[6];

    const cleverbotResponseDiv = document.getElementById('line1');
    const currentResponseInput = cleverbotResponseDiv.childNodes[0];

    const newConversation = document.getElementById('actionsnew');

    const getCleverbotResponse = (onResponse) => {
      const answerInterval = setInterval(() => {
        if (cleverbotResponseDiv.childNodes.length !== 1) {
          clearInterval(answerInterval);
          const response = currentResponseInput.textContent;
          onResponse(response);
        }
      }, 200);
    };

    const respondToCleverbot = (message) => {
      input.value = message;
      messageFormSubmitButton.click();
    };

    const startNewChat = () => {
        console.log('starting new chat');
        newConversation.click();
    };

    // Socket

    const socket = new WebSocket('ws://localhost:8080');

    const handleDataMessage = (message) => {
      console.log(`Message from omegle: ${message}`);

      respondToCleverbot(message);
      getCleverbotResponse((cleverbotResponse) => {
        const messageToSend = {
          type: 'data',
          to: 'omegle',
          body: {
            type: 'data',
            data: cleverbotResponse,
          },
        };
        socket.send(JSON.stringify(messageToSend));
      });
    };

    const messageHandlers = {
      'new chat': startNewChat,
      data: handleDataMessage,
    };

    socket.addEventListener('open', (event) => {
      const message = {
        type: 'connection',
        from: 'cleverbot',
      };
      socket.send(JSON.stringify(message));
    });

    socket.addEventListener('message', (event) => {
      const { type, data } = JSON.parse(event.data);
      const messageHandler = messageHandlers[type];
      messageHandler(data);
    });
  });
})();
