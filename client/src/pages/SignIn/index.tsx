import React from 'react';
import styled from 'styled-components';
import LoginBtn from './SignInBtn';
import Helmet from 'components/Helmet';

const CenterBox = styled.div`
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

const HorizonCenterContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  color: ${props => props.theme.colors.facebookTextColor};
`;

const SignInContainer: React.FC = () => {
  return (
    <>
      <Helmet message={'Sign In'} />
      <CenterBox>
        <Wrapper>
          <HorizonCenterContainer>
            <Title>BOOSTBOOK LOGIN</Title>
            <LoginBtn />
          </HorizonCenterContainer>
        </Wrapper>
      </CenterBox>
    </>
  );
};

export default SignInContainer;
