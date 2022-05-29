// ==UserScript==
// @name         CleverMegle Tinder
// @version      1.0
// @description  CleverMegle Tinder script
// @author       Code Hero
// @match        https://tinder.com/*
// ==/UserScript==

(function() {
  'use strict';

  window.addEventListener('load', () => {
    const match = () => {
      const likeButton = document.querySelectorAll('[data-testid=gamepadLike]');
      likeButton[0].click();
      setTimeout(match, 3000);
    };

    const message = () => {
      console.log('message');
    };

    const talk = () => {
      console.log('talk');
    };

    const modes = {
      '1': match,
      '2': message,
      '3': talk
    };

    const matchKey = event => {
      const pressedKey = event.code[event.code.length - 1];
      console.log(pressedKey);
      if (pressedKey in modes) {
        modes[pressedKey]();
      }
    };

    document.addEventListener('keyup', matchKey);
  });
})();