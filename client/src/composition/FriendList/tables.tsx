import React from 'react';
import styled from 'styled-components';
import FriendProfile from 'components/FriendProfile';

const Div = styled.div`
  padding: 0 5px 4px 5px;
`;

interface IProps {
  children?: any;
}

interface IUser {
  thumbnail: string | undefined;
  nickname: string;
  email: string;
}

function groupByThree([a, b, c, ...rest]: any[]): any[] {
  if (!rest.length) return [[a, b, c].filter(x => x)];
  return [[a, b, c]].concat(groupByThree(rest));
}

const FriendsTable: React.FC<IProps> = ({ children }) => {
  if (!children || !children.length) return <></>;
  const groups = groupByThree(children);
  return (
    <Div>
      <table>
        <tbody>
          {groups.map((row, index) => (
            <tr key={index}>
              {row.map(
                ({ thumbnail, nickname, email }: IUser, subIndex: number) => (
                  <td key={subIndex}>
                    <FriendProfile
                      thumbnail={thumbnail}
                      nickname={nickname}
                      email={email}
                    />
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </Div>
  );
};

export default FriendsTable;
