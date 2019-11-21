import React from "react";
import styled from "styled-components";

const ProfileDiv = styled.div`
  display: inline-block;
  padding-bottom: 0.5rem;
`;

const ProfileImgBox = styled.a`
  display: inline-block;
  float: left;
  padding-right: 0.5rem;
  cursor: pointer;
`;

interface ITest {
  size: string;
}

const ProfileImg = styled.img<ITest>`
  border-radius: 50%;
  border: 1px solid black;
  width: ${props => props.size}px;
  width: 2.5rem;
  height: 2.5rem;
`;

const ProfileNameDiv = styled.div`
  margin-bottom: 0.25rem;
  padding-right: 22px;
  font-weight: bold;
  font-size: 0.875rem;
  color: ${props => props.theme.colors.fontMainBlue};
`;

const ProfileDateDiv = styled.span`
  margin-bottom: 0.25rem;
  font-size: 0.75rem;
`;

interface Iprops {
  createdAt: string;
}

const FeedHeader = ({ createdAt }: Iprops) => {
  return (
    <>
      <div>
        <ProfileImgBox>
          <ProfileImg size="40"></ProfileImg>
        </ProfileImgBox>
        <ProfileDiv>
          <ProfileNameDiv>우연서</ProfileNameDiv>
          <ProfileDateDiv>{createdAt} </ProfileDateDiv>
        </ProfileDiv>
      </div>
    </>
  );
};

export default FeedHeader;
