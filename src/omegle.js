// DOM

let currentMessagesLength = 0;

const consentTermsAndConditions = () => {
  // TODO
};

const getNextMessage = onMessage => {
  const answerInterval = setInterval(() => {
    const strangerMessages = document.getElementsByClassName('strangermsg');
    const strangerMessagesLength = strangerMessages.length;

    if (strangerMessagesLength > currentMessagesLength) {
      clearInterval(answerInterval);

      currentMessagesLength = strangerMessagesLength;
      const strangerMessage = strangerMessages[strangerMessagesLength - 1].textContent;
      const message = strangerMessage.substring(strangerMessage.indexOf(':') + 2);

      onMessage(message);
    }
  }, 200);
};

const replyToStranger = message => {
  const textArea = document.getElementsByClassName('chatmsg ')[0];
  const sendButton = document.getElementsByClassName('sendbtn')[0];
  textArea.value = message;
  sendButton.click();
};

// Socket

const socket = new WebSocket('ws://localhost:8080');

socket.addEventListener('open', event => {
  const message = {
    type: 'connection',
    from: 'omegle'
  };
  socket.send(JSON.stringify(message));
});

const sendSocketMessage = message => {
  const messageToSend = {
    type: 'data',
    to: 'cleverbot',
    data: message
  };

  socket.send(JSON.stringify(messageToSend));
};

// App

const startChatting = () => {
  console.log('started');
  consentTermsAndConditions();

  socket.addEventListener('message', event => {
    const message = event.data;
    replyToStranger(message);
    getNextMessage(sendSocketMessage);
  });

  getNextMessage(sendSocketMessage);
};

const startChatButtonsIds = ['chattypetextcell', 'chattypevideocell', 'videobtnstatus'];
startChatButtonsIds.forEach(id => document.getElementById(id).onclick = startChatting);