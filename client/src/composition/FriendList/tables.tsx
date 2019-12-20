import React from 'react';
import styled from 'styled-components';
import FriendProfile from 'components/FriendProfile';
import { GetUserInfoByEmailQuery, User } from 'react-components.d';

type Friends = GetUserInfoByEmailQuery['friends'];

const Wrapper = styled.div`
  padding: 0 5px 4px 5px;
`;

function groupByThree([a, b, c, ...rest]: Friends): Friends[] {
  if (!rest.length) return [[a, b, c].filter(x => x)];
  return [[a, b, c]].concat(groupByThree(rest));
}

function FriendsTable({ children }: { children?: Friends }) {
  if (!children || !children.length) return <></>;
  const groups = groupByThree(children);
  return (
    <Wrapper>
      <table>
        <tbody>
          {groups.map((row, index) => (
            <tr key={index}>
              {row.map((user: User, subIndex: number) => (
                <td key={subIndex}>
                  <FriendProfile
                    email={user.email}
                    thumbnail={user.thumbnail || undefined}
                    nickname={user.nickname}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Wrapper>
  );
}

export default FriendsTable;
