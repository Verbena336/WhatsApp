import { BASE_URL } from '../data/baseURL';

import { TApiData } from './types';

async function setSettingsApi(props: TApiData): Promise<void> {
  const { apiTokenInstance, idInstance } = props;
  const body = {
    webhookUrl: '',
    incomingWebhook: 'yes',
  };

  const response = await fetch(
    `${BASE_URL}/waInstance${idInstance}/setSettings/${apiTokenInstance}`,
    {
      method: 'POST',
      body: JSON.stringify(body),
    }
  );
  return await response.json();
}

export default setSettingsApi;
