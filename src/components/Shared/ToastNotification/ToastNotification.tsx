import { useQuery } from '@apollo/client';
import React from 'react';
import { useCookies } from 'react-cookie';
import toast, { ToastBar, Toaster } from 'react-hot-toast';
import { AiOutlineClose } from 'react-icons/ai';
import { RiErrorWarningLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { GET_USER_BY_TOKEN } from 'src/services/graphql/query';
import { userAuthReducer } from 'src/redux/createSlice/userSlice';
import { Loader } from '../Loader/Loader';
import Styles from './ToastNotification.module.scss';

const ToastNotification = () => {
  return (
    <Toaster
      position='top-center'
      reverseOrder={false}
      toastOptions={{
        duration: 5000,
        style: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
        success: {
          iconTheme: {
            primary: 'green',
            secondary: 'white',
          },
        },
        error: {
          style: {
            color: 'red',
          },
          iconTheme: {
            primary: 'red',
            secondary: 'white',
          },
        },
      }}
    >
      {(t) => {
        return (
          <ToastBar toast={t}>
            {({ icon, message }) => (
              <div className={Styles.toast_notification_container}>
                {t.type === 'error' ? (
                  <RiErrorWarningLine className={Styles.error_icon} />
                ) : (
                  icon
                )}
                {message}
                {t.type !== 'loading' && (
                  <button type='button' onClick={() => toast.dismiss(t.id)}>
                    <AiOutlineClose className={Styles.close_btn} />
                  </button>
                )}
              </div>
            )}
          </ToastBar>
        );
      }}
    </Toaster>
  );
};

export default ToastNotification;
