import React, { useEffect } from "react";
import FeedPresentor from "./FeedPresentor";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

interface ILanguages {
  name: string;
}
interface RocketInventoryVars {
  year: number;
}

interface Languages {
  languages: ILanguages[];
}

const TEST_QUERY = gql`
  query languages {
    languages {
      name
    }
  }
`;

const SignUpPresenter: React.FC = () => {
  // tslint:disable-next-line: no-shadowed-variable
  const { loading, data } = useQuery<Languages, {}>(TEST_QUERY, {
    variables: {}
  });

  console.log(data);
  return (
    <>
      <FeedPresentor />
      <FeedPresentor />
      {data && data.languages.map(inventory => <FeedPresentor />)}
    </>
  );
};

export default SignUpPresenter;
