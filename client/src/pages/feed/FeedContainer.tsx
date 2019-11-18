import React, { FunctionComponent, useState } from "react";
import styled from "styled-components";
import { FaPlus } from "react-icons/fa";
import { darken } from "polished";
import FeedPresentor from "./FeedPresentor";
const SignUpPresenter: React.FC = () => {
  const [count, setCount] = React.useState(0); // The useState hook
  return (
    <>
      <FeedPresentor />
    </>
  );
};

export default SignUpPresenter;
