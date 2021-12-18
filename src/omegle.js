let currentMessagesLength = 0;

const consentTermsAndConditions = () => {
  // TODO
};

const getNextMessage = (onMessage) => {
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
  })
};

const startChatting = () => {
  console.log('started');
  consentTermsAndConditions();
  getNextMessage(message => {
    console.log('message: '+ message);
  });
};

document.getElementById('chattypetextcell').onclick = startChatting;
document.getElementById('chattypevideocell').onclick = startChatting;
document.getElementById('videobtnstatus').onclick = startChatting;