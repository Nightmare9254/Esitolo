import TextField from '../Formik/TextField';
import { Form, Formik } from 'formik';
import { formSchemaSignIn } from '../Formik/YupValidation';
import { AnimateContainer, AnimateItem } from '../../framer/Transitions';

const SignIn = () => {
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
        onSubmit={(values) => console.log(values)}
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
            <AnimateItem>
              <p className="auth__forgot-password">Forgot password?</p>
            </AnimateItem>
            <AnimateItem>
              <button className="auth__button button" type="submit">
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
