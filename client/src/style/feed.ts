import styled from 'styled-components';

interface IStyleprops {
  hasLiked?: boolean;
}
export const ButtonSVG = styled.svg<IStyleprops>`
  width: 14px;
  height: 14px;
  margin: 0 3px 3px 0;
  fill: ${props => {
    return props.hasLiked
      ? props.theme.colors.fontMainBlue
      : props.theme.colors.fontButtonGray;
  }};
`;
