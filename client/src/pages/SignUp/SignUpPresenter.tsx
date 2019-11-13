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

const Form = styled.form`
  min-width: 500px;
  min-height: 600px;
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borders.radius};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
`;

const Title = styled.span`
  font-size: 2rem;
  color: ${props => props.theme.colors.facebookTextColor};
  margin-bottom: 1.5rem;
  font-weight: 500;
`;

const Input = styled.input`
  all: unset;
  box-sizing: border-box;
  width: 80%;
  height: 40px;
  border: 1px solid ${props => props.theme.colors.borderColor};
  border-radius: ${props => props.theme.borders.radius};
  padding: 1rem;
  transition: border-color 0.5s ease-in-out;
  color: ${props => props.theme.colors.facebookTextColor};
  &:focus {
    border-color: ${props => darken(0.4, props.theme.colors.borderColor)};
  }
  & + & {
    margin-top: 0.5rem;
  }
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  background: linear-gradient(#67ae55, #578843);
  background-color: #69a74e;
  box-shadow: inset 0 1px 1px #a4e388;
  border-color: #3b6e22 #3b6e22 #2c5115;
  width: 40%;
  height: 40px;
  color: ${props => props.theme.colors.white};
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  border-radius: ${props => props.theme.borders.radius};
  cursor: pointer;
  transition: transform 0.2s linear;
  &:active {
    transform: translateY(2px);
  }
`;

function SignUpPresenter() {
  return (
    <Wrapper>
      <Form>
        <Title>프로필 입력</Title>
        <InputContainer>
          <Input placeholder="닉네임" />
          <Input placeholder="거주지" />
          <Input placeholder="출신" />
        </InputContainer>
        <Button> 등록하기 </Button>
      </Form>
    </Wrapper>
  );
}

export default SignUpPresenter;
