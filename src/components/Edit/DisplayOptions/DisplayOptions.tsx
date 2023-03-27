import DisplayOption from './DisplayOption/DisplayOption';
import Styles from './DisplayOptions.module.scss';

const DisplayOptions: React.FC = () => {
  return (
    <div className={Styles.displayOptions}>
      <div className={Styles.displayOptions__left}>
        <div className={Styles.displayOption_container}>
          <DisplayOption />
        </div>
      </div>

      <div className={Styles.displayOptions__right}>
        <h1>Preview</h1>
      </div>
    </div>
  );
};

export default DisplayOptions;
