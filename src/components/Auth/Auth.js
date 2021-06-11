import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import AnimateHeight from '../../framer/AnimateHeight';
import SignIn from './SignIn';
import SignUp from './SignUp';
import React from 'react';
import { useDimensions } from '../../hooks/useDimensions';

const Auth = () => {
  const [signIn, setSignIn] = useState(true);
  const [windowRef, windowSize] = useDimensions({});
  const [animateFromSide, setAnimateFromSide] = useState(false);
  const togglePage = () => {
    setSignIn(current => !current);
  };
  useEffect(() => {
    if (windowSize.width >= 1366) {
      setAnimateFromSide(true);
    }
  }, [windowSize]);

  return (
    <div className="auth" ref={windowRef}>
      <div className="auth__signIn">
        <AnimatePresence>
          {signIn && (
            <AnimateHeight
              from={animateFromSide}
              isVisible={signIn}
              className="auth__toggle-box"
            >
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
            <AnimateHeight
              from={animateFromSide}
              className="auth__login"
              isVisible={signIn}
            >
              <SignUp />
            </AnimateHeight>
          )}
        </AnimatePresence>
      </div>
      <div className="auth__signUp">
        <AnimatePresence>
          {signIn && (
            <AnimateHeight
              from={animateFromSide}
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
              from={animateFromSide}
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
