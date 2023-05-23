export type TSendMessage = {
  idInstance: string;
  apiTokenInstance: string;
  chatId: string;
  message: string;
};
export type TApiData = { apiTokenInstance: string; idInstance: string };
export type TDeleteNotification = {
  apiTokenInstance: string;
  idInstance: string;
  receiptId: string;
};
