import React from "react";
import styled from "styled-components";

const Text = styled.span`
  color: ${props => props.theme.colors.facebookBlue};
`;

function Book() {
  return <Text>Book</Text>;
}

export default Book;
