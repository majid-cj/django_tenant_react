import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { signinUser, setAuthErrors } from '../../actions';
import { PasswordField, UsernameField } from '../../components/inputs';
import { Alert } from '../../components/ui';
import { HOME_SCREEN, SIGN_UP_SCREEN } from '../../constants';
import { SignInValidator } from '../../utils/validators';

export const SigninScreen = () => {
  const [signin] = useState(new SignInValidator());
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.error.auth);

  const onSignin = () => {
    try {
      const signinData = signin.getAuthData();
      dispatch(
        signinUser(signinData, () => {
          history.push(HOME_SCREEN);
        })
      );
    } catch (error) {
      dispatch(setAuthErrors(error.message));
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className='d-flex align-items-center justify-content-center col-12 py-5 px-1'>
        <form className='col-lg-4 col-md-8 col-10' onSubmit={onSignin}>
          <UsernameField onValue={(username) => signin.setUsername(username)} />

          <PasswordField onValue={(password) => signin.setPassword(password)} />

          {auth && <Alert message={auth} show={auth !== null} />}
          <input type='submit' value='signin' className='btn btn-sm btn-danger m-1' />
        </form>
      </div>
      <Link className='text-dark' to={SIGN_UP_SCREEN}>
        you don't have an account ? create one !
      </Link>
    </div>
  );
};
