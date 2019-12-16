import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
  thumbnail: string | undefined;
  nickname: string;
  email: string;
}

const FriendProfile: React.FC<IProps> = ({ email, thumbnail, nickname }) => {
  return (
    <>
      <Link to={`/myPage/${email}`}>
        <Image
          src={
            thumbnail
              ? thumbnail
              : process.env.PUBLIC_URL + '/images/profile.jpg'
          }
          alt={email}
        />
        <Name>{nickname}</Name>
      </Link>
    </>
  );
};

export default FriendProfile;
