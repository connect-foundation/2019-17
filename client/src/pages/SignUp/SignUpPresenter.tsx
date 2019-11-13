import React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

const Container = styled.div`
  min-width: 500px;
  min-height: 600px;
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borders.radius};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
`;

const Title = styled.span`
  font-size: 2rem;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  color: ${props => props.theme.colors.facebookTextColor};
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  all: unset;
  width: 80%;
  height: 30px;
  border: 1px solid ${props => props.theme.colors.borderColor};
  border-radius: ${props => props.theme.borders.radius};
  padding: 0.5rem;
  transition: border-color 0.5s ease-in-out;
  color: ${props => props.theme.colors.facebookTextColor};
  &:focus {
    border-color: ${props => darken(0.4, props.theme.colors.borderColor)};
  }
  & + & {
    margin-top: 0.5rem;
  }
`;

function SignUpPresenter() {
  return (
    <Wrapper>
      <Container>
        <Title>프로필 입력</Title>
        <Input placeholder="닉네임" />
        <Input placeholder="거주지" />
        <Input placeholder="출신" />
      </Container>
    </Wrapper>
  );
}

export default SignUpPresenter;
