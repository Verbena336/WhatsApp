import { BASE_URL } from '../data/baseURL';

import { TDeleteNotification } from './types';

async function DeleteNotificationApi(props: TDeleteNotification): Promise<void> {
  const { apiTokenInstance, idInstance, receiptId } = props;

  const response = await fetch(
    `${BASE_URL}/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`,
    {
      method: 'DELETE',
    }
  );
  return await response.json();
}

export default DeleteNotificationApi;
