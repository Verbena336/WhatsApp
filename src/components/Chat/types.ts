export type TMessage = {
  status: 'in' | 'out';
  message: string;
};

export type TNotification = {
  receiptId: number;
  body: {
    senderData: {
      sender: string; //79052042665@c.us
    };
    messageData: {
      typeMessage: string;
      textMessageData: {
        textMessage: string;
      };
    };
  };
};
