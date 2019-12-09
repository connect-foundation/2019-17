import React from 'react';
import styled from 'styled-components';
import Profile from 'components/Profile';
import { IoIosClose } from 'react-icons/io';

const Header = styled.header`
  height: 3rem;
  width: 100%;
  border-bottom: 1.5px solid rgba(0, 0, 0, 0.2);
  padding: 0.5rem 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Nickname = styled.span`
  color: ${props => props.theme.colors.facebookTextColor};
  font-weight: 600;
  margin-left: 0.5rem;
  font-size: 0.875rem;
`;

const CloseButton = styled(IoIosClose)<{ btncolor: string }>`
  font-size: 1.75rem;
  color: ${props => props.btncolor || 'rgba(0, 0, 0, 0.3)'};
  cursor: pointer;
`;

interface IProps {
  nickname: string;
  btncolor: string;
  isProfile: boolean;
  onClose?: (e: React.MouseEvent<SVGElement>) => void;
}

function ChatHeader({ nickname, isProfile, btncolor, onClose }: IProps) {
  return (
    <Header>
      <ProfileContainer>
        {isProfile && <Profile size={'35px'} />}
        <Nickname>{nickname}</Nickname>
      </ProfileContainer>
      <CloseButton btncolor={btncolor} onClick={onClose} />
    </Header>
  );
}

ChatHeader.defaultProps = {
  btncolor: 'rgba(0, 0, 0, 0.3)',
  isProfile: true
};

export default ChatHeader;
