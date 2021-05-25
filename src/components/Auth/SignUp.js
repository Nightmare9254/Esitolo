import TextField from '../Formik/TextField';
import { Form, Formik } from 'formik';
import { formSchemaSignUp } from '../Formik/YupValidation';
import { AnimateContainer, AnimateItem } from '../../framer/Transitions';
import { useHistory } from 'react-router-dom';

const SignUp = () => {
  const history = useHistory();
  const registration = (values) => {
    fetch('https://esitolo-backend.herokuapp.com/auth/create-account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.created) history.push('/');
      });
  };

  return (
    <main className="auth__method-main">
      <AnimateContainer>
        <AnimateItem>
          <h2 className="auth__header auth__header--active">Create Account</h2>
        </AnimateItem>
        <AnimateItem>
          <div className="auth__google">
            <i className="fab fa-google"></i>
          </div>
        </AnimateItem>
        <AnimateItem>
          <p className="auth__option-txt">
            or use your email for registration:
          </p>
        </AnimateItem>
      </AnimateContainer>

      <Formik
        initialValues={{
          userName: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        onSubmit={(values) => registration(values)}
        validationSchema={formSchemaSignUp}
      >
        <Form className="auth__form">
          <AnimateContainer>
            <TextField
              key="userName"
              placeholder="Name"
              icon="fas fa-user"
              name="userName"
              type="text"
            />
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
            <TextField
              key="confirmPassword"
              placeholder="Confirm Password"
              icon="fas fa-lock"
              name="confirmPassword"
              type="password"
            />
            <AnimateItem>
              <button
                type="submit"
                className="auth__button auth__button--action"
              >
                JOIN NOW
              </button>
            </AnimateItem>
          </AnimateContainer>
        </Form>
      </Formik>
    </main>
  );
};

export default SignUp;
