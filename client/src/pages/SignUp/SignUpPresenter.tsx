import React from 'react';
import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa';
import { darken } from 'polished';
import { IUseInput } from './SignUpContainer';

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
  font-weight: 500;
`;

const Input = styled.input`
  all: unset;
  box-sizing: border-box;
  width: 80%;
  height: 40px;
  border: ${props => props.theme.borders.borderStyle};
  border-radius: ${props => props.theme.borders.radius};
  padding: 1rem;
  transition: border-color 0.5s ease-in-out;
  color: ${props => props.theme.colors.facebookTextColor};
  &:focus {
    border-color: ${props => darken(0.4, props.theme.colors.borderColor)};
  }
  & + & {
    margin-top: 1.25rem;
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

const InputFile = styled.input`
  position: absolute;
  top: 0px;
  left: 0px;
  opacity: 0;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  width: 150px;
  height: 200px;
  background-color: ${props => props.theme.colors.bgColor};
  border: ${props => props.theme.borders.borderStyle};
  border-radius: ${props => props.theme.borders.radius};
  cursor: pointer;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  &:first-child {
    height: 80%;
  }
  &:last-child {
    height: 20%;
    background-color: ${props => props.theme.colors.white};
    border-bottom-right-radius: ${props => props.theme.borders.radius};
    border-bottom-left-radius: ${props => props.theme.borders.radius};
  }
`;

const CircleButton = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.facebookBlue};
  color: ${props => props.theme.colors.white};
  font-weight: 900;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FileText = styled.span`
  color: ${props => props.theme.colors.facebookBlue};
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

const WarnSpan = styled.span`
  color: red;
  font-size: 0.75rem;
  float: left;
  width: 80%;
  height: 1.25rem;
  padding-top: 0.1rem;
`;

const NICKNAME_VALIDATION_FAIL =
  '닉네임은 공백업이 한글,영어,숫자의 조합으로만 가능합니다.';

interface IProps {
  nickname: IUseInput;
  location: IUseInput;
  hometown: IUseInput;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  src: string;
  nameValid: boolean;
}

function SignUpPresenter({
  nickname,
  location,
  hometown,
  onFileChange,
  src,
  nameValid
}: IProps) {
  return (
    <Wrapper>
      <Form>
        <Title>프로필 입력</Title>
        <InputFile
          id="profileFile"
          type="file"
          accept="image/*"
          onChange={onFileChange}
        />
        <Label htmlFor="profileFile">
          {src ? (
            <Image src={src} />
          ) : (
            <>
              <Row>
                <CircleButton>
                  <FaPlus />
                </CircleButton>
              </Row>
              <Row>
                <FileText>사진 추가</FileText>
              </Row>
            </>
          )}
        </Label>
        <InputContainer>
          <Input placeholder="닉네임" {...nickname} />
          <WarnSpan> {nameValid ? '' : NICKNAME_VALIDATION_FAIL} </WarnSpan>
          <Input placeholder="거주지" {...location} />
          <Input placeholder="출신" {...hometown} />
        </InputContainer>
        <Button> 등록하기 </Button>
      </Form>
    </Wrapper>
  );
}

export default SignUpPresenter;
