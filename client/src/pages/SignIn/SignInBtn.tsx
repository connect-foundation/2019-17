import React from 'react';
import styled from 'styled-components';
import loginIcon from '../../image/btn_google_signin_normal.png';

const LoginBtnImg = styled.img`
  width: 220px;
  cursor: pointer;
`;

const LoginBtn = () => {
  return <LoginBtnImg alt="LOGIN" src={loginIcon} />;
};

export default LoginBtn;
