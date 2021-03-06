import TextField from '../Formik/TextField';
import { Form, Formik } from 'formik';
import { formSchemaSignIn } from '../Formik/YupValidation';
import { AnimateContainer, AnimateItem } from '../../framer/Transitions';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useCookies } from 'react-cookie';

const SignIn = () => {
  const history = useHistory();
  const [message, setMessage] = useState('');
  const [, setCookie] = useCookies(['user']);

  const loginUser = values => {
    fetch(`${process.env.REACT_APP_API}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then(res => res.json())
      .then(json => {
        if (json.valid) {
          setCookie('user', json.user, {
            path: '/',
            maxAge: 24 * 60 * 60 * 1000,
          });
          history.push('/');
          window.location.reload();
        }
        setMessage(json.message);
      });
  };

  return (
    <main className="auth__method-main">
      <AnimateContainer>
        <AnimateItem>
          <h2 className="auth__header">Sign in to Esitolo</h2>
        </AnimateItem>
        <AnimateItem>
          <div className="auth__google">
            <i className="fab fa-google"></i>
          </div>
        </AnimateItem>
        <AnimateItem>
          <p className="auth__option-txt">or use your email:</p>
        </AnimateItem>
      </AnimateContainer>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={values => loginUser(values)}
        validationSchema={formSchemaSignIn}
      >
        <Form className="auth__form">
          <AnimateContainer>
            <TextField
              key="email"
              placeholder="Email"
              icon="fas fa-envelope"
              name="email"
              type="email"
            />
            <TextField
              key="password"
              placeholder="Password"
              icon="fas fa-lock"
              name="password"
              type="password"
            />
            <p className="error error--lower">{message}</p>
            <AnimateItem>
              <p className="auth__forgot-password">Forgot password?</p>
            </AnimateItem>
            <AnimateItem>
              <button
                aria-label="Sign in"
                className="auth__button-full"
                type="submit"
              >
                SIGN IN
              </button>
            </AnimateItem>
          </AnimateContainer>
        </Form>
      </Formik>
    </main>
  );
};

export default SignIn;
