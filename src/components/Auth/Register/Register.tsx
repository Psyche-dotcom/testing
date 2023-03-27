import React, { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useLazyQuery, useMutation } from '@apollo/client';
import * as Yup from 'yup';
import clsx from 'clsx';
import { useCookies } from 'react-cookie';
import toast from 'react-hot-toast';

import Styles from './Register.module.scss';
import { GET_USER_BY_USER_NAME, LOGIN_QUERY } from '@graphql/query';
import { CREATE_USER } from '@graphql/mutations';

import AuthContainer from '@shared/AuthContainer/AuthContainer';
import BtnForm from '@shared/BtnForn/BtnForm';

import { FormikContainer } from '@formik/FormikContainer';
import FormikControl from '@formik/FormikControl';
import { FormikRegFormTypes } from '@formik/Types/FormikTypes';

const Register = () => {
  const initialValues: FormikRegFormTypes = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Must be a valid email').required('Required'),
    password: Yup.string().required('No password provided.'),

    /*   .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."), */
    confirmPassword: Yup.string()
      .required('required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  const [userError, setUserError] = useState(null);
  const [cookies, setCookie] = useCookies(['userAuthToken']);
  const [createUser] = useMutation(CREATE_USER);
  const [loginUser] = useLazyQuery(LOGIN_QUERY);
  const [getUser] = useLazyQuery(GET_USER_BY_USER_NAME);
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  const [value, setValue] = useState<string>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [useable, setUseable] = useState<string>(null);

  //=================== handle user validation function ==========================//
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    setUseable(null);
    setUserError(null);
    setValue(event.target.value);
    setTimeout(async () => {
      const userName = await getUser({
        variables: {
          username: event.target.value,
        },
      });
      if (!event.target.value) {
        setUseable(null);
      } else if (userName.data) {
        setUseable('Already used ');
      } else if (!userName.data) {
        setUseable('Available');
      }
      setLoading(false);
    }, 1000);
  };

  // =================== handle Register Form ===================//
  const handleRegisterUser = async (formik) => {
    setUserError(null);
    const { email, password } = formik.values;
    const username = value;
    if (!username || !email || !password) {
      toast.error('Fill up the form please');
      return;
    }

    try {
      await createUser({
        variables: {
          username,
          email,
          password,
          account_type: 'stander',
        },
      });

      const user = await loginUser({
        variables: {
          email,
          password,
        },
      });
      if (user.data.login.token) {
        setCookie('userAuthToken', user.data.login.token, {
          path: '/',
          secure: true,
        });
        router.push(`/${username}`);
        toast.success(`${username} Successfully Created`);
      }
      formik.resetForm();
    } catch (error) {
      formik.errors['email'] = error.message;

      formik.setSubmitting(false);
    }
  };

  return (
    <AuthContainer>
      <div className={Styles.vreelLoginForm}>
        <div>
          <h4>Sign up Free!</h4>
          <FormikContainer
            initialValues={initialValues}
            validationSchema={validationSchema}
          >
            {(formik) => {
              return (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    formik.handleSubmit();
                    handleRegisterUser(formik);
                  }}
                >
                  <div className={Styles.userInputGroup}>
                    <label htmlFor="username">vreel.page/</label>
                    <input
                      type='text'
                      id='username'
                      name='username'
                      placeholder='username'
                      value={value || ''}
                      onChange={handleChange}
                      className={Styles.user_input}
                    />
                  </div>
                  <div className={Styles.user_loading}>
                    {loading ? (
                      <div className={Styles.user_not_found}>
                        <span style={{ color: 'white' }}> Username : </span>
                        loading...
                      </div>
                    ) : (
                      <div
                        className={
                          useable == 'Available'
                            ? `${Styles.user_not_found}`
                            : null
                        }
                      >
                        <span style={{ color: 'white' }}> Username : </span>
                        {useable}
                      </div>
                    )}
                    <div style={{ margin: '10px 20px' }}>
                      After registration username CAN NOT be changed!{' '}
                    </div>
                  </div>
                  <FormikControl
                    control='input'
                    type='email'
                    name='email'
                    placeholder='Email'
                  />
                  <FormikControl
                    control='input'
                    type='password'
                    name='password'
                    placeholder='Password'
                  />
                  <FormikControl
                    control='input'
                    type='password'
                    name='confirmPassword'
                    placeholder='Confirm Password'
                  />

                  <div className={Styles.error}>
                    {userError && <span>{userError}</span>}
                  </div>

                  <div
                    className={Styles.checkbox}
                    onClick={() => setChecked(!checked)}
                  >
                    <div
                      id='check'
                      className={clsx(
                        Styles.formCheckbox,
                        checked && Styles.active
                      )}
                    ></div>

                    <label htmlFor='check'>
                      By continuing you accept our Privacy Policy
                    </label>
                  </div>

                  <div className={Styles.btnCenter}>
                    <BtnForm title='Register' type='submit' formik={formik} />
                  </div>
                </form>
              );
            }}
          </FormikContainer>

          <div className={Styles.logIn}>
            <p>
              Already have an account?
              <Link href='/login'>
                <span className={Styles.logInBtn}> Log In</span>
              </Link>
            </p>
          </div>
          <div className={Styles.terms}>
            <p>
              By clicking register you agree to VReel’s <br />
              <br />
              <Link href={''}>
                <span>Privacy policy </span>
              </Link>
              and
              <Link href={''}>
                <span> Terms of service</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </AuthContainer>
  );
};

export default Register;
