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
<<<<<<< HEAD
    <Link href={`${config.serverHost}/auth/google`}>
=======
    <Link href={`http://${config.serverHost}/auth/google`}>
>>>>>>> 6e822b097ba543ab2a61cc53bbd2d4f6e96a6905
      <LoginBtnImg
        alt="LOGIN"
        src={process.env.PUBLIC_URL + '/images/btn_google_signin_normal.png'}
      />
    </Link>
  );
};

export default LoginBtn;
