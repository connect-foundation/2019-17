import React from 'react';
import styled from 'styled-components';
import FriendProfile from 'components/FriendProfile';
import { GetUserInfoWithEmailQuery, User } from 'react-components.d';

const Wrapper = styled.div`
  padding: 0 5px 4px 5px;
`;

interface IProps {
  children?: GetUserInfoWithEmailQuery['friends'];
}

function groupByThree([a, b, c, ...rest]: any[]): any[] {
  if (!rest.length) return [[a, b, c].filter(x => x)];
  return [[a, b, c]].concat(groupByThree(rest));
}

const FriendsTable: React.FC<IProps> = ({ children }) => {
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
                  <FriendProfile {...user} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Wrapper>
  );
};

export default FriendsTable;
