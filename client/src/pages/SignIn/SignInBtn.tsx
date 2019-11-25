import React from 'react';
import styled from 'styled-components';
import loginIcon from '../../image/btn_google_signin_normal.png';

const LoginBtnImg = styled.img`
  width: 220px;
  cursor: pointer;
`;

const Link = styled.a``;

const PRODUCTION: string = 'production';
const NODE_ENV: string = process.env.NODE_ENV || '';

const LoginBtn = () => {
  return (
    <Link
      href={`http://${
        NODE_ENV === PRODUCTION
          ? process.env.REACT_APP_SERVER_HOST
          : 'localhost:4000'
      }/auth/google`}>
      <LoginBtnImg alt="LOGIN" src={loginIcon} />
    </Link>
  );
};

export default LoginBtn;
