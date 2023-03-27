import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { SwiperSlide } from 'swiper/react';
import SwiperContainer from '../../Shared/SwiperContainer/SwiperContainer';
import Styles from './CommonSocialsLinks.module.scss';

const CommomSocialsLinks: React.FC<{ data: any }> = ({ data }) => {
  const router = useRouter();

  return (
    <SwiperContainer>
      {data.map((obj: any, index: number) => (
        <SwiperSlide key={index}>
          <div  className={clsx(
              Styles.iconsContainer,
              obj.length <= 4 &&
              Styles.iconsContainer__onlyRow
          )}>
            {obj.map((item: any, index: number) => (
              <div
                key={index}
                className={clsx(
                  Styles.iconsContainer__icons,
                  index === obj.length - 1 &&
                  index % 2 === 0 &&
                  Styles.iconsContainer__icons__fullRow
                )}
                onClick={() => router.push(item.href)}
              >
                <div
                  className={Styles.iconsContainer__icons__imgContainer}
                  style={{ backgroundColor: `${item.bgColor}` }}
                >
                  <img src={item.icon_link} alt={item.name} />
                </div>
                <Link href={item.href}>
                  <a
                    target='_blank'
                    className={Styles.iconsContainer__icons__iconsName}
                  >
                    {item.name}
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </SwiperSlide>
      ))}
    </SwiperContainer>
  );
};

export default CommomSocialsLinks;
