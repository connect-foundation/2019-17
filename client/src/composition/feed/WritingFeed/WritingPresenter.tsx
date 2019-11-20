import React from 'react';
import styled from 'styled-components';
import { MdPhotoSizeSelectActual } from 'react-icons/md';
import TextareaAutosize from 'react-textarea-autosize';

import Button from '../../../components/Button';
import Profile from '../../../components/Profile';

const Form = styled.form`
  width: 510px;
  min-height: 150px;
  border: 1px solid ${props => props.theme.colors.borderColor};
`;

const Header = styled.div`
  height: 32px;
  background-color: #f5f6f7;
  border-bottom: 1px solid ${props => props.theme.colors.borderColor};
  color: ${props => props.theme.colors.textColor};
  display: flex;
  align-items: center;
  padding: 0.5rem;
  font-size: 0.8rem;
  font-weight: 600;
`;

const Footer = styled.div`
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 1rem;
  padding-right: 1rem;
  color: ${props => props.theme.colors.textColor};
  background-color: white;
`;

const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid ${props => props.theme.colors.borderColor};
`;

const ContentWrapper = styled.div`
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;

const Content = styled(TextareaAutosize)`
  all: unset;
  width: 100%;
  box-sizing: border-box;
  padding: 0.5rem;
  padding-top: 20px;
  font-size: 1.1rem;
  color: #1d2028;
  min-height: 70px;
  &::placeholder {
    font-size: 0.8rem;
  }
`;

const ProfileColumn = styled.div`
  width: 65px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UploadInput = styled.input`
  position: absolute;
  top: 0px;
  left: 0px;
  opacity: 0;
`;

const UploadButton = styled.label`
  all: unset;
  background-color: #f5f6f7;
  width: 110px;
  height: 35px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding-left: 0.5rem;
  cursor: pointer;
  transition: box-shadow 0.3s ease-in-out;
  &:hover {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }
`;

const PhotoText = styled.span`
  line-height: 35px;
  font-size: 0.9rem;
  font-weight: 500;
`;

const PhotoIcon = styled(MdPhotoSizeSelectActual)`
  color: ${props => props.theme.colors.facebookBlue};
  font-size: 1.5rem;
  margin-right: 0.3rem;
`;

interface IProps {
  content: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function WritingFeedPresenter({ content, onChange }: IProps) {
  return (
    <Form encType="multipart/form-data">
      <Header>게시물 만들기</Header>
      <ContentWrapper>
        <ContentContainer>
          <ProfileColumn>
            <Profile
              imageUrl={process.env.PUBLIC_URL + '/images/profile.jpg'}
              alt={'profile image'}
            />
          </ProfileColumn>
          <Content
            onChange={onChange}
            placeholder={'게시물 작성'}
            value={content}
          />
        </ContentContainer>
      </ContentWrapper>
      <UploadInput id="upload" type="file" />
      <Footer>
        <UploadButton htmlFor="upload">
          <PhotoIcon />
          <PhotoText>사진 업로드</PhotoText>
        </UploadButton>
        <Button size={'small'} text={'게시'} />
      </Footer>
    </Form>
  );
}

export default WritingFeedPresenter;
