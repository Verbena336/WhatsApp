import { BASE_URL } from '../data/baseURL';

import { TNotification } from '../components/Chat/types';
import { TApiData } from './types';

async function ReceiveNotificationApi(props: TApiData): Promise<TNotification> {
  const { apiTokenInstance, idInstance } = props;

  const response = await fetch(
    `${BASE_URL}/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`,
    {
      method: 'GET',
    }
  );
  return await response.json();
}

export default ReceiveNotificationApi;
