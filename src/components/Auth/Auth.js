import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import AnimateHeight from '../../framer/AnimateHeight';
import SignIn from './SignIn';
import SignUp from './SignUp';
import React from 'react';

const Auth = () => {
  const [signIn, setSignIn] = useState(true);

  const togglePage = () => {
    setSignIn(current => !current);
  };

  return (
    <div className="auth">
      <div className="auth__signIn">
        <AnimatePresence>
          {signIn && (
            <AnimateHeight isVisible={signIn} className="auth__toggle-box">
              <p className="auth__toggle-txt">Create brand new account</p>
              <button
                onClick={togglePage}
                className="button--active auth__button"
              >
                JOIN US
              </button>
            </AnimateHeight>
          )}
          {!signIn && (
            <AnimateHeight className="auth__login" isVisible={signIn}>
              <SignUp />
            </AnimateHeight>
          )}
        </AnimatePresence>
      </div>
      <div className="auth__signUp">
        <AnimatePresence>
          {signIn && (
            <AnimateHeight
              isVisible={signIn}
              init="closed"
              animate="open"
              className="auth__login "
            >
              <SignIn />
            </AnimateHeight>
          )}
          {!signIn && (
            <AnimateHeight
              isVisible={signIn}
              init="closed"
              animate="open"
              className="auth__toggle-box auth__toggle--on"
            >
              <p className="auth__toggle-txt">
                Welcome back, please login to you account
              </p>
              <button onClick={togglePage} className=" auth__toggle-btn">
                SIGN IN
              </button>
            </AnimateHeight>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Auth;
