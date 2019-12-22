import React from 'react';
import styled from 'styled-components';
import config from 'utils/config';

const LoginBtnImg = styled.img`
  width: 220px;
  cursor: pointer;
`;

const Link = styled.a``;

const LoginBtn = () => {
  return (
    <Link href={`${config.serverHost}/auth/google`}>
      <LoginBtnImg
        alt="LOGIN"
        src={process.env.PUBLIC_URL + '/images/btn_google_signin_normal.png'}
      />
    </Link>
  );
};

export default LoginBtn;
