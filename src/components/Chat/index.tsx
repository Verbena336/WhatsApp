import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import sendMessageApi from '../../requests/SendMessageApi';
import ReceiveNotificationApi from '../../requests/ReceiveNotificationApi';
import DeleteNotificationApi from '../../requests/DeleteNotificationApi';

import Header from '../Header';

import styles from './Chat.module.scss';

import { TMessage, TNotification } from './types';

function Chat(): JSX.Element {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<TMessage[]>([]);
  const idInstance = localStorage.getItem('idInstance');
  const apiTokenInstance = localStorage.getItem('apiTokenInstance');
  const number = localStorage.getItem('number');
  const messageRef = React.useRef<HTMLDivElement>(null);

  const { register, handleSubmit, reset } = useForm<{ message: string }>({ mode: 'onSubmit' });

  const sendMessage = async (data: { message: string }): Promise<void> => {
    const { message } = data;

    if (idInstance && apiTokenInstance && number) {
      try {
        await sendMessageApi({
          idInstance,
          apiTokenInstance,
          chatId: `${number}@c.us`,
          message,
        });

        const newMessage: TMessage = {
          status: 'out',
          message,
        };
        setMessages((messages) => [...messages, newMessage]);

        reset();
      } catch (error) {
        toast.error('Ошибка отправки сообщения!');
      }
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    const recursionReceiveNotification = async (): Promise<void> => {
      const idInstance = localStorage.getItem('idInstance');
      const apiTokenInstance = localStorage.getItem('apiTokenInstance');
      const number = localStorage.getItem('number');

      if (!idInstance || !apiTokenInstance || !number) {
        navigate('/');
        return;
      }

      try {
        const result: TNotification = await ReceiveNotificationApi({
          idInstance,
          apiTokenInstance,
        });

        if (result) {
          if (result.body.messageData.typeMessage === 'textMessage') {
            if (result.body.senderData.sender.slice(0, 11) === number) {
              const newMessage: TMessage = {
                status: 'in',
                message: result.body.messageData.textMessageData.textMessage,
              };
              setMessages((messages) => [...messages, newMessage]);
            }
          }

          await DeleteNotificationApi({
            idInstance,
            apiTokenInstance,
            receiptId: JSON.stringify(result.receiptId),
          });
        }
        await recursionReceiveNotification();
      } catch (error) {
        toast.error('Ошибка получения сообщений!');
        return;
      }
    };
    recursionReceiveNotification();
  }, [navigate]);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, [messages]);

  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <Header />
          <div className={styles.chat}>
            {messages.map((item, i) => (
              <div
                key={i}
                ref={messageRef}
                className={`${styles.message} ${
                  item.status === 'in' ? styles.incoming : styles.outgoing
                }`}
              >
                {item.message}
              </div>
            ))}
          </div>
          <footer className={styles.footer}>
            <form className={styles.messageForm} onSubmit={handleSubmit(sendMessage)}>
              <input
                autoFocus={true}
                type="text"
                {...register('message', {
                  required: true,
                })}
                placeholder="Введите сообщение"
                className={styles.textField}
              />
              <button className={styles.send}>
                <svg viewBox="0 0 24 24" height="24" width="24">
                  <path
                    fill="currentColor"
                    d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z"
                  ></path>
                </svg>
              </button>
            </form>
          </footer>
        </div>
      </div>
    </section>
  );
}

export default Chat;
