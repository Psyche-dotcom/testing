import Styles from './ElementInput.module.scss';

const ElementInput: React.FC<{
  type: 'text' | 'textarea';
  icon?: boolean;
  placeholder: string;
  field: any;
  rest: any;
}> = ({ type, icon, placeholder, field, rest }) => {
  if (!rest.value) rest.value = ""
  return (
    <div className={Styles.inputWrapper}>
      {type === 'text' ? (
        <input type='text' placeholder={placeholder} {...field} {...rest} />
      ) : (
        <textarea
          type='textarea'
          placeholder={placeholder}
          {...field}
          {...rest}
          rows={6}
        />
      )}
      {icon && <img src='/assets/ball-pen-line.svg' alt='Pen Icon' />}
    </div>
  );
};

export default ElementInput;
