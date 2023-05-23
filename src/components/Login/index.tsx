import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import setSettingsApi from '../../requests/SetSettingsApi';

import styles from './Login.module.scss';

import { TApiData } from '../../requests/types';

function Login(): JSX.Element {
  const navigate = useNavigate();
  const [slide, setSlide] = useState<'slide1' | 'slide2'>('slide1');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TApiData>({ mode: 'onSubmit' });

  const {
    register: registerNumber,
    handleSubmit: handleSubmitNumber,
    formState: { errors: errorsNumber },
    setFocus,
  } = useForm<{ number: string }>({ mode: 'onSubmit' });

  const onSubmitId = async (data: TApiData): Promise<void> => {
    const { idInstance, apiTokenInstance } = data;
    localStorage.setItem('idInstance', idInstance);
    localStorage.setItem('apiTokenInstance', apiTokenInstance);

    try {
      await setSettingsApi(data);
    } catch (error) {
      toast.error('Неверные данные!');
      return;
    }

    setSlide('slide2');
    setFocus('number');
  };

  const onSubmitNumber = (data: { number: string }): void => {
    const { number } = data;
    if (number.slice(0, 1) === '8') {
      localStorage.setItem('number', `7${number.slice(1)}`);
    } else {
      localStorage.setItem('number', number);
    }
    navigate('/chat');
  };

  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>WhatsApp Web</h1>
        <div className={styles.form}>
          <div
            className={styles.slider}
            style={slide === 'slide2' ? { animationName: `${styles.slideAnimation}` } : {}}
          >
            <form className={styles.slide} id="slide1" onSubmit={handleSubmit(onSubmitId)}>
              <input
                className={styles.input}
                style={!!errors.idInstance ? { color: '#bb0915' } : {}}
                placeholder="IdInstance"
                {...register('idInstance', {
                  required: true,
                  pattern: /^\d+$/,
                })}
              />
              <input
                className={styles.input}
                style={!!errors.apiTokenInstance ? { color: '#bb0915' } : {}}
                placeholder="ApiTokenInstance"
                {...register('apiTokenInstance', {
                  required: true,
                  pattern: /^[a-z0-9]+$/,
                })}
              />
            </form>
            <form
              className={styles.slide}
              id="slide2"
              onSubmit={handleSubmitNumber(onSubmitNumber)}
            >
              <input
                className={styles.input}
                style={!!errorsNumber.number ? { color: '#bb0915' } : {}}
                placeholder="Номер получателя"
                {...registerNumber('number', {
                  required: true,
                  pattern: /^\d{11}$/,
                })}
              />
            </form>
          </div>
        </div>

        <button className={styles.submit} type="submit" form={slide}>
          <svg viewBox="0 0 24 24" height="24" width="24">
            <path
              fill="currentColor"
              d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z"
            ></path>
          </svg>
        </button>
      </div>
    </section>
  );
}

export default Login;
