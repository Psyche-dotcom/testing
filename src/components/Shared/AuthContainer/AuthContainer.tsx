import React from 'react';
import { useRouter } from 'next/router';
import { BsArrowLeftCircle } from 'react-icons/bs';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import Styles from './AuthContainer.module.scss';

const AuthContainer: React.FC<{ children: React.ReactNode, logo?: string }> = ({
  children,
  logo
}) => {
  const router = useRouter();
  const logoUri = logo ? logo : '/assets/images/Vreel_logo.svg'
  return (
    <div className={Styles.authContainer}>
      <div className={Styles.authBackBtn} onClick={() => router.push('/')}>
        <BsArrowLeftCircle className={Styles.icons} />
        <p>Back</p>
      </div>
      <div className={Styles.img}>
        <img src='/assets/images/regLogBg.png' alt='bg images' />
      </div>

      <div className={Styles.wrapper}>
        <div className={Styles.icons} onClick={() => router.push('/')}>
          <IoIosCloseCircleOutline className={Styles.icon} />
        </div>

        <div className={Styles.form}>
          <div className={Styles.logoContainer}>
            <img src={logoUri} alt='Vreel Logo' />
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;
