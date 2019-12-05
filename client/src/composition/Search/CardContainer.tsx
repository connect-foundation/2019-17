import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import UserCard from 'components/UserCard';
import queryString from 'querystring';
import ButtonContainer from './ButtonContainer';

const SEARCH_USER = gql`
  query getUserName($keyword: String!) {
    searchUser(keyword: $keyword) {
      nickname
      email
      relation
      thumbnail
    }
  }
`;

interface IKey {
  [key: string]: string;
}

interface IProps {
  location: IKey;
}

function CardContainer({ location }: IProps) {
  const keyword = queryString.parse(location.search.slice(1))[`keyword`];
  const { loading, error, data } = useQuery(SEARCH_USER, {
    variables: {
      keyword
    },
    fetchPolicy: 'network-only'
  });

  if (loading) return <></>;
  if (error)
    return (
      <UserCard
        nickname="데이터를 가져오는데 에러가 발생하였습니다!"
        imageUrl={
          process.env.PUBLIC_URL + '/images/search_notfound.png'
        }></UserCard>
    );
  if (data.searchUser.length === 0)
    return (
      <UserCard
        nickname={`${keyword}에 대한 검색 결과가 없습니다`}
        imageUrl={
          process.env.PUBLIC_URL + '/images/search_notfound.png'
        }></UserCard>
    );

  return (
    <>
      {data.searchUser.map((user: { [key: string]: string }) => (
        <UserCard
          nickname={user.nickname}
          key={user.email}
          imageUrl={user.thumbnail}>
          <ButtonContainer email={user.email} initialRelation={user.relation} />
        </UserCard>
      ))}
    </>
  );
}

export default CardContainer;
