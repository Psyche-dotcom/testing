import Styles from '../Children.module.scss';
import { FormikContainer } from '@formik/FormikContainer';
import FormikControl from '@formik/FormikControl';
import { contributionData } from './contributionData';

const ContributionLinks: React.FC = () => {
  const initialValues = {
    element__header: '',
    background: '#b3bac3',
    font: '#b3bac3',
  };

  const handleSubmit = async (values) => {
    let obj = {
      element__header: '',
      background: '#b3bac3',
      font: '#b3bac3',
      links: [],
    };
    for (let key in values) {
      if (key === 'element__header') {
        obj['element__header'] = values[key];
      } else if (key === 'background') {
        obj['background'] = values[key];
      } else if (key === 'font') {
        obj['font'] = values[key];
      } else {
        obj['links'].push({
          title: key,
          url: values[key],
        });
      }
    }

  };

  return (
    <div className={Styles.children}>
      <FormikContainer initialValues={initialValues}>
        {(formik) => {
          return (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(formik.values);
              }}
            >
              <FormikControl
                control='input'
                type='text'
                name='element__header'
                placeholder='Element Header'
                required={true}
                elementInput={true}
              />

              <div>
                {contributionData.map((social, index) => (
                  <FormikControl
                    key={index}
                    control='input'
                    type='text'
                    name={social.title.toLowerCase()}
                    placeholder='Username'
                    required={true}
                    social={{ logo: social.logo, title: social.title }}
                  />
                ))}
              </div>

              <div className={Styles.display__color}>
                <span className={Styles.title}>Element Display Color</span>

                <div className={Styles.inputWrapper}>
                  <FormikControl
                    control='input'
                    type='color'
                    name='background'
                    colorInput={true}
                  />
                  <FormikControl
                    control='input'
                    type='color'
                    name='font'
                    colorInput={true}
                  />
                </div>
              </div>
            </form>
          );
        }}
      </FormikContainer>
    </div>
  );
};

export default ContributionLinks;
