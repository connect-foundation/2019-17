import React from "react";
import styled, { css } from "styled-components";
import { ButtonSVG } from "../../style/feed";

function CommentIcon() {
  return (
    <ButtonSVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M12 2c5.514 0 10 3.532 10 7.874 0 4.162-3.627 6.72-7.893 7.721l-2.107 2.958-2.107-2.958c-4.304-1.011-7.893-3.617-7.893-7.721 0-4.342 4.486-7.874 10-7.874zm0-2c-6.627 0-12 4.42-12 9.874 0 4.512 3.678 8.317 8.701 9.496l3.299 4.63 3.299-4.63c5.023-1.18 8.701-4.985 8.701-9.496 0-5.454-5.373-9.874-12-9.874z" />
    </ButtonSVG>
  );
}

export default CommentIcon;
