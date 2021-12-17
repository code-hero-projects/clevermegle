import { openUrlInNewTab } from './utils';

export const setupCleverbot = () => {
  const cleverbotTab = openUrlInNewTab('https://www.cleverbot.com/');
  setTimeout(() => {
    cleverbotTab?.alert('hey');
  }, 1000);
};