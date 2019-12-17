import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import queryString from 'querystring';
import { UserWithRelation } from 'react-components.d';
import { DEFAULT } from 'Constants';
import UserCard from 'components/UserCard';
import ButtonContainer from './ButtonContainer';
import { SEARCH_USER } from './search.query';

interface ILocation {
  search: string;
}

interface IProps {
  location: ILocation;
}

function getNotFoundCard(keyword: string) {
  return (
    <UserCard
      nickname={`${keyword}에 대한 검색 결과가 없습니다`}
      imageUrl={
        process.env.PUBLIC_URL + '/images/search_notfound.png'
      }></UserCard>
  );
}

function getErrorCard() {
  return (
    <UserCard
      nickname="데이터를 가져오는데 에러가 발생하였습니다!"
      imageUrl={DEFAULT.SEARCH_NOT_FOUND}></UserCard>
  );
}

function checkUrlAndGetKeyword(location: ILocation): string {
  const keyword = queryString.parse(location.search.slice(1))[`keyword`];
  return String(keyword);
}

function CardContainer({ location }: IProps) {
  const keyword = checkUrlAndGetKeyword(location);
  const { loading, error, data } = useQuery(SEARCH_USER, {
    variables: {
      keyword
    }
  });

  if (loading) return <></>;
  if (error) return getErrorCard();
  if (data.searchUser.length === 0) return getNotFoundCard(keyword);

  return (
    <>
      {data.searchUser.map(
        ({ nickname, email, thumbnail, relation }: UserWithRelation) => (
          <UserCard
            nickname={nickname}
            key={email}
            imageUrl={thumbnail || undefined}>
            <ButtonContainer email={email} initialRelation={relation} />
          </UserCard>
        )
      )}
    </>
  );
}

export default CardContainer;
