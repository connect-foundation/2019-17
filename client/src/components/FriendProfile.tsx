import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { DEFAULT, PAGE_PATHS } from 'Constants';

const SIZE = '101px';

const Image = styled.img`
  width: ${SIZE};
  height: ${SIZE};
`;

const Name = styled.div`
  font-size: 12px;
  line-height: 16px;
`;

interface IProps {
  thumbnail?: string;
  nickname: string;
  email: string;
}

function FriendProfile({ email, thumbnail, nickname }: IProps) {
  return (
    <Link to={`${PAGE_PATHS.MY_PAGE}/${email}`}>
      <Image src={thumbnail} alt={email} />
      <Name>{nickname}</Name>
    </Link>
  );
}

FriendProfile.defaultProps = {
  thumbnail: DEFAULT.PROFILE
};

export default FriendProfile;
