import MainContainer from '@sections/MainContainer/MainContainer';
import SectionContainer from '@sections/SectionContainer/SectionContainer';
import React from 'react';
import Styles from './Test5.module.scss';

const Test5 = () => {
  return (
    <MainContainer>
      <SectionContainer title='Link'>
        <div className={Styles.content}>
          {[1, 2, 3, 4].map((item) => (
            <div className={Styles.card}>
              <div className={Styles.card__Image}>
                <img
                  src='https://images.unsplash.com/photo-1658191084280-69ca3f675c88?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80'
                  alt=''
                />
              </div>
              <div className={Styles.card__Content}>
                Lorem ipsum dolor sit amet.
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>
    </MainContainer>
  );
};

export default Test5;
