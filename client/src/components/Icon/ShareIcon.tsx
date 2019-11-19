import React from "react";
import styled, { css } from "styled-components";
import { ButtonSVG } from "../../style/feed";

function ShareIcon() {
  return (
    <ButtonSVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M6 17c2.269-9.881 11-11.667 11-11.667v-3.333l7 6.637-7 6.696v-3.333s-6.17-.171-11 5zm12 .145v2.855h-16v-12h6.598c.768-.787 1.561-1.449 2.339-2h-10.937v16h20v-6.769l-2 1.914z" />
    </ButtonSVG>
  );
}

export default ShareIcon;
