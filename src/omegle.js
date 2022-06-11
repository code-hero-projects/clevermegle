// ==UserScript==
// @name         CleverMegle Omegle
// @version      1.0
// @description  CleverMegle Omegle script
// @author       Code Hero
// @match        https://www.omegle.com/*
// ==/UserScript==

(function () {
  "use strict";

  window.addEventListener("load", () => {
    // Socket

    const socket = new WebSocket("ws://localhost:8080");

    socket.addEventListener("open", (event) => {
      const message = {
        type: "connection",
        from: "omegle",
      };
      socket.send(JSON.stringify(message));
    });

    const sendSocketMessage = (messageType, messageData) => {
      const messageToSend = {
        type: "data",
        to: "cleverbot",
        body: {
          type: messageType,
          data: messageData,
        },
      };

      socket.send(JSON.stringify(messageToSend));
    };

    // DOM

    let currentMessagesLength = 0;

    const consentTermsAndConditions = () => {
      const checkboxes = document.querySelectorAll("input[type=checkbox]");
      const confirmButton = document.querySelectorAll("input[type=button]");

      checkboxes[1].click();
      checkboxes[2].click();
      confirmButton[0].click();
    };

    const getNextMessage = (onMessage) => {
      const answerInterval = setInterval(() => {
        const strangerMessages = document.getElementsByClassName("strangermsg");
        const strangerMessagesLength = strangerMessages.length;

        if (strangerMessagesLength > currentMessagesLength) {
          clearInterval(answerInterval);

          currentMessagesLength = strangerMessagesLength;
          const strangerMessage =
            strangerMessages[strangerMessagesLength - 1].textContent;
          const message = strangerMessage.substring(
            strangerMessage.indexOf(":") + 2
          );

          onMessage(message);
        }

        const newChatWrapper = document.getElementsByClassName("newchatbtnwrapper");
        if (newChatWrapper.length > 0) {
          const newChatButtonssss = newChatWrapper[0].childNodes[0];
          currentMessagesLength = 0;
          sendSocketMessage("new chat");
          newChatButtonssss.click();
        }
      }, 200);
    };

    const replyToStranger = (message) => {
      let currentIndex = 0;
      const textArea = document.getElementsByClassName("chatmsg")[0];
      const sendButton = document.getElementsByClassName("sendbtn")[0];

      const typeInterval = setInterval(() => {
        let finishIndex = currentIndex + 3;
        let sendMessage = false;
        if (message.length < finishIndex) {
          finishIndex = message.length;
          sendMessage = true;
        }

        const messageToType = message.substring(currentIndex, finishIndex);
        currentIndex = finishIndex;
        textArea.value = textArea.value + messageToType;

        if (sendMessage) {
          sendButton.click();
          clearInterval(typeInterval);
        }
      }, 700);
    };

    // App

    const startChatting = () => {
      consentTermsAndConditions();

      socket.addEventListener("message", (event) => {
        const { data } = JSON.parse(event.data);
        replyToStranger(data);
        getNextMessage((message) => sendSocketMessage("data", message));
      });

      getNextMessage((message) => sendSocketMessage("data", message));
    };

    const startChatButtonsIds = [
      "chattypetextcell",
      "chattypevideocell",
      "videobtnstatus",
    ];
    startChatButtonsIds.forEach(
      (id) => (document.getElementById(id).onclick = startChatting)
    );

    console.log("lets gooooo");
  });
})();
