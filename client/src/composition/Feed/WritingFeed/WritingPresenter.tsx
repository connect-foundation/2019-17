import React from 'react';
import styled from 'styled-components';
import { MdPhotoSizeSelectActual } from 'react-icons/md';
import TextareaAutosize from 'react-textarea-autosize';

import Button from 'components/Button';
import Profile from 'components/Profile';
import UploadPlusButton from './UploadPlusButton';
import { Scalars } from 'react-components.d';
import { Maybe } from 'react-components.d';
import UploadPreviewImg from './UploadPreviewImg';

const Form = styled.form`
  width: 32rem;
  min-height: 150px;
  margin-bottom: 10px;
  margin-top: 10px;
  box-sizing: border-box;
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

const ContentRow = styled.div`
  display: flex;
  width: 100%;
  &:not(:last-child) {
    border-bottom: 1px solid ${props => props.theme.colors.borderColor};
  }
  padding: 5px 0px;
  overflow-x: scroll;
`;

const ContentWrapper = styled.div`
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  background-color: white;
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
  display: none;
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

const FilesContainer = styled.div`
  display: flex;
`;

interface IProps {
  content: string;
  thumbnail: string;
  files: Maybe<Scalars['Upload']>;
  contentCursor: React.RefObject<HTMLTextAreaElement>;
  onChangeTextArea: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onChangeFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  deleteFile: (e: React.MouseEvent<SVGElement, MouseEvent>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const FILE_INPUT_ID = 'upload';
const FEED_MAX_LENGTH = 1500;

function WritingFeedPresenter({
  content,
  thumbnail,
  contentCursor,
  onChangeTextArea,
  onChangeFile,
  files,
  deleteFile,
  onSubmit
}: IProps) {
  return (
    <Form encType="multipart/form-data" onSubmit={onSubmit}>
      <Header>게시물 만들기</Header>
      <ContentWrapper>
        <ContentRow>
          <ProfileColumn>
            <Profile imageUrl={thumbnail} alt={'profile image'} />
          </ProfileColumn>
          <Content
            onChange={onChangeTextArea}
            placeholder={'게시물 작성'}
            value={content}
            inputRef={contentCursor}
            required
            maxLength={FEED_MAX_LENGTH}
          />
        </ContentRow>
        <ContentRow>
          {files && files.length > 0 && (
            <FilesContainer>
              {files.map((file: { fileUrl: string; fileId: number }) => (
                <UploadPreviewImg
                  key={file.fileId}
                  fileUrl={file.fileUrl}
                  fileId={file.fileId}
                  deleteFile={deleteFile}
                />
              ))}
              <UploadPlusButton targetId={FILE_INPUT_ID} />
            </FilesContainer>
          )}
        </ContentRow>
      </ContentWrapper>
      <UploadInput
        id={FILE_INPUT_ID}
        type="file"
        onChange={onChangeFile}
        accept="image/*"
      />
      <Footer>
        <UploadButton htmlFor={FILE_INPUT_ID}>
          <PhotoIcon />
          <PhotoText>사진 업로드</PhotoText>
        </UploadButton>
        <Button size={'small'} text={'게시'} />
      </Footer>
    </Form>
  );
}

export default WritingFeedPresenter;
