import Styles from "./Newsfeed.module.scss";
import HeroSlider from "@sections/Sliders/HeroSlider/HeroSlider";

const NewsFeed: React.FC = () => {
  return (
    <div className={Styles.news_feed}>
      <div className={Styles.container}>Half Percent</div>
      <div className={Styles.container}>
        <HeroSlider view="Mobile" />
      </div>
    </div>
  );
};

export default NewsFeed;
