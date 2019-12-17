import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { User } from 'react-components.d';
import { DEFAULT } from 'Constants';

const SIZE = '101px';

const Image = styled.img`
  width: ${SIZE};
  height: ${SIZE};
`;

const Name = styled.div`
  font-size: 12px;
  line-height: 16px;
`;

const FriendProfile: React.FC<User> = ({
  email,
  thumbnail: thumbnailSrc,
  nickname
}: User) => {
  return (
    <>
      <Link to={`/myPage/${email}`}>
        <Image src={thumbnailSrc || DEFAULT.PROFILE} alt={email} />
        <Name>{nickname}</Name>
      </Link>
    </>
  );
};

export default FriendProfile;
