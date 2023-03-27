import Styles from './SocialInput.module.scss';

const SocialInput: React.FC<{
  logo: string;
  title: String;
  placeholder: string;
  field: any;
  rest: any;
}> = ({ logo, title, placeholder, field, rest }) => {
  return (
    <div className={Styles.iconWrapper}>
      <img src={logo} alt={`${title} Icon`} />
      <input type='text' placeholder={placeholder} {...field} {...rest} />
    </div>
  );
};

export default SocialInput;
