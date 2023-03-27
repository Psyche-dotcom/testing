import Styles from '../Children.module.scss';
import { FormikContainer } from '@formik/FormikContainer';
import FormikControl from '@formik/FormikControl';

const Contact: React.FC = () => {
  const initialValues = {
    element_header: '',
    contact_title: '',
    contact_description: '',
    background: '#b3bac3',
    font: '#b3bac3',
  };

  const handleSubmit = async (values) => {
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
              <div className={Styles.contact}>
                <FormikControl
                  control='input'
                  type='text'
                  name='element_header'
                  placeholder='Element Header'
                  elementInput={true}
                  required={true}
                />

                <div className={Styles.boxWrapper}>
                  <div className={Styles.inputWrapper}>
                    <FormikControl
                      control='input'
                      type='text'
                      name='contact_title'
                      placeholder='Contact Title'
                      elementInput={true}
                      required={true}
                    />
                    <FormikControl
                      control='textarea'
                      type='text'
                      name='contact_description'
                      placeholder='Contact Description'
                      required={true}
                      elementInput={true}
                    />
                  </div>
                  <div className={Styles.imageWrapper}>
                    <img
                      src='/assets/images/female.png'
                      alt='Image of a Lady'
                    />

                    <div className={Styles.inputFile}>
                      <input type='file' />
                      <div className={Styles.addLogoContainer}>
                        <span>Add Image</span>
                        <img src='/assets/icons/addLogo.svg' alt='Image Logo' />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className={Styles.selectWrapper}>
  <h4>Select Input Fields</h4>
</div> */}

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

export default Contact;
