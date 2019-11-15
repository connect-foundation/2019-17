import React, { useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import gql from "graphql-tag";
// valdation하고
//
interface Languages {
  name: string;
}

interface LanguageData {
  languages: Languages[];
}

/* interface RocketInventoryVars {
  year: number;
} */

const TEST_QUERY = gql`
  query test {
    languages {
      name
    }
  }
`;

const VALIDATION_NAME = gql`
  query getRocketInventory {
    languages {
      name
    }
  }
`;

const GET_ROCKET_INVENTORY1 = gql`
  query getRocketInventory {
    languages {
      name
    }
  }
`;
// SignUp
const SigninPage: React.FC = () => {
  const [name, setName] = useState("a"); // nickname
  const [nameValid, setNameValid] = useState(true);
  const [location, setLocation] = useState("");
  const [origin, setOrigin] = useState(""); // hometown

  const [getName, { loading, data }] = useLazyQuery<LanguageData>(TEST_QUERY); // 1 번..

  const {
    loading: loadingName,
    data: dataName,
    refetch: refetchName
  } = useQuery<LanguageData>(VALIDATION_NAME, {
    variables: {}
  });

  if (loading) {
    return <p>Loading ...</p>;
  }

  /* if (data) {
    return <p>Loading1 ...</p>;
  } */

  const idcheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);

    const validateKey = /^[^0-9][가-힣a-z0-9_]{3,16}$/;
    const result = validateKey.test(name);
    setNameValid(result);
    console.log(result);
    // getName();
    refetchName();
  };

  const idcheck2 = (e: React.MouseEvent<HTMLInputElement>) => {
    // let item = (<HTMLInputElement>e.target ).value ; // why not this
    // <> casting not available in tsx
    const val = (e.target as HTMLInputElement).value;
    // setName(val);
    console.log(val);
    getName();
  };

  // tslint:disable-next-line: no-shadowed-variable
  const validateName = (): boolean => {
    // 숫자로 시작안됨, 영어한글숫자가능 공백불가능, 닉네임 최소 길이 4자
    const validateKey = /^[^0-9][가-힣a-z0-9_]{3,16}$/;
    const result = validateKey.test(name);
    console.log(result);
    return result;
  };

  return (
    <>
      프로필입력 <br />
      ID : <input defaultValue={name} onChange={idcheck} />
      <span> warning : {nameValid ? "true" : "false"} </span>
      <input
        type="button"
        value="test value"
        onClick={(e: React.MouseEvent<HTMLInputElement>) => {
          validateName();
        }}
      />
      <br />
      LOCATION : <input value={location}></input>
      <br />
      ORIGIN : <input value={origin}></input>
      <br />
    </>
  );
};

export default SigninPage;
