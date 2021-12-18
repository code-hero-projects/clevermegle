const understoodFormSubmitButton = document.getElementById('noteb').childNodes[1];
understoodFormSubmitButton.submit();

const messageForm = document.getElementById('avatarform');
const input = messageForm.childNodes[0];
const messageFormSubmitButton = messageForm.childNodes[6];

const cleverbotResponseDiv = document.getElementById('line1');
const currentResponseInput = cleverbotResponseDiv.childNodes[0];

const getCleverbotResponse = onResponse => {
  const answerInterval = setInterval(() => {
    if (cleverbotResponseDiv.childNodes.length !== 1) {
      clearInterval(answerInterval);
      const response = currentResponseInput.textContent;
      onResponse(response);
    }
  });
};

const respondToCleverbot = message => {
  input.value = message;
  messageFormSubmitButton.click();
};

const socket = new WebSocket('ws://localhost:8080');

socket.addEventListener('open', event => {
  const message = {
    type: 'connection',
    from: 'cleverbot'
  };
  socket.send(JSON.stringify(message));
});

socket.addEventListener('message', event => {
  const message = event.data;
  respondToCleverbot(message);

  getCleverbotResponse(cleverbotResponse => {
    const messageToSend = {
      type: 'data',
      to: 'omegle',
      data: cleverbotResponse
    };
  
    socket.send(JSON.stringify(messageToSend));
  });
});