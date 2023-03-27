import clsx from 'clsx';
import Styles from './AccountCompletionStatus.module.scss';
import { statusData } from './statusData';

const AccountCompletionStatus: React.FC = () => {
  return (
    <div className={Styles.status}>
      <div className={Styles.status__progress}></div>

      {statusData.map((obj, index) => {
        return (
          <div
            key={index}
            className={clsx(
              Styles.status__point,
              Styles[`status__point__${obj.position}`],
              obj.active && Styles.status__point__active,
              obj.next && Styles.status__point__next
            )}
          >
            <span
              className={clsx(
                Styles.status__point__ball,
                obj.active && Styles.status__point__ball__active
              )}
            ></span>
            {obj.completed && (
              <span className={clsx(Styles.status__point__complete)}>
                <img src='/assets/icons/complete.svg' alt='Complete Icon' />
              </span>
            )}

            {obj.lastPoint && (
              <span className={clsx(Styles.status__point__ball__last)}>
                50%
              </span>
            )}

            {obj.titleTop && (
              <span
                className={clsx(
                  Styles.status__point__titleTop,
                  Styles.status__point__titleComplete
                )}
              >
                VREEL
              </span>
            )}
            <span
              className={clsx(
                Styles.status__point__title,
                obj.lastPoint && Styles.status__point__titleComplete
              )}
            >
              {obj.title}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default AccountCompletionStatus;

{
  /* SIGN UP */
}
<div
  className={clsx(
    Styles.status__point,
    Styles.status__point__active,
    Styles.status__point__1
  )}
>
  <span className={clsx(Styles.status__point__ball)}></span>
  <span className={clsx(Styles.status__point__complete)}>
    <img src='/assets/icons/complete.svg' alt='Complete Icon' />
  </span>
  <span className={clsx(Styles.status__point__title)}>Sign Up</span>
</div>;

{
  /* COMPLETE Vcard */
}
<div
  className={clsx(
    Styles.status__point,
    Styles.status__point__active,
    Styles.status__point__2
  )}
>
  <span className={clsx(Styles.status__point__ball)}></span>
  <span className={clsx(Styles.status__point__complete)}>
    <img src='/assets/icons/complete.svg' alt='Complete Icon' />
  </span>
  <span className={clsx(Styles.status__point__title)}>Complete Vcard</span>
</div>;

{
  /* PUBLISH SLIDE */
}
<div
  className={clsx(
    Styles.status__point,
    Styles.status__point__next,
    Styles.status__point__3
  )}
>
  <span
    className={clsx(
      Styles.status__point__ball,
      Styles.status__point__ball__active
    )}
  ></span>
  <span className={clsx(Styles.status__point__title)}>Publish 1st Slide</span>
</div>;

{
  /* PUBLISH ELEMENTS */
}
<div className={clsx(Styles.status__point, Styles.status__point__4)}>
  <span className={clsx(Styles.status__point__ball)}></span>
  <span className={clsx(Styles.status__point__title)}>Publish 2 Elements</span>
</div>;

{
  /* COMPLETE VREEL */
}
<div className={clsx(Styles.status__point, Styles.status__point__5)}>
  <span className={clsx(Styles.status__point__ball)}></span>

  <span className={clsx(Styles.status__point__ball__last)}>50%</span>
  <span
    className={clsx(
      Styles.status__point__titleTop,
      Styles.status__point__titleComplete
    )}
  >
    VREEL
  </span>
  <span
    className={clsx(
      Styles.status__point__title,
      Styles.status__point__titleComplete
    )}
  >
    Complete
  </span>
</div>;
