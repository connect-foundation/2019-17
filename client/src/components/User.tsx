import React from 'react';
import styled, { css } from 'styled-components';
import Profile from './Profile';

const ProfileDiv = styled.div`
  display: block;
  height: 30px;
  line-height: 30px;
  margin: 4px 0 0 0;
  position: relative;
  white-space: nowrap;
`;

const ProfileImgBox = styled.div`
  display: inline-block;
  padding-right: 0.5rem;
  cursor: pointer;
`;

const ProfileName = styled.div`
  display: inline-block;
  overflow: hidden;
  padding-left: 8px;
  line-height: 30px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ProfileStatus = styled.div`
  float: right;
  line-height: 30px;
  margin: 0 1px 0 4px;
  text-align: right;
  padding-right: 12px;
`;

const status = css`
  border-radius: 50%;
  display: inline-block;
  height: 6px;
  margin-left: 4px;
  width: 6px;
`;

const On = styled.div`
  ${status};
  background: rgb(66, 183, 42);
`;

const Off = styled.div`
  ${status};
  background: red;
`;

interface Iprops {
  email: string;
  thumbnail: string | undefined;
  nickname: string;
  status: string;
}

const User = ({ email, thumbnail, nickname, status }: Iprops) => {
  return (
    <ProfileDiv>
      <ProfileImgBox>
        <Profile imageUrl={thumbnail} alt={email} size="30px" />
      </ProfileImgBox>
      <ProfileName>{nickname}</ProfileName>
      <ProfileStatus>{status === 'online' ? <On /> : <Off />}</ProfileStatus>
    </ProfileDiv>
  );
};

export default User;
