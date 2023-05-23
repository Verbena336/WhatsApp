import { BASE_URL } from '../data/baseURL';

import { TSendMessage } from './types';

async function sendMessageApi(props: TSendMessage): Promise<void> {
  const { chatId, message, apiTokenInstance, idInstance } = props;
  const body = {
    chatId,
    message,
  };

  const response = await fetch(
    `${BASE_URL}/waInstance${idInstance}/SendMessage/${apiTokenInstance}`,
    {
      method: 'POST',
      body: JSON.stringify(body),
    }
  );
  return await response.json();
}

export default sendMessageApi;
