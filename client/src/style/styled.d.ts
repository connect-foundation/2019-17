import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      facebookBlue: string;
      borderColor: string;
      textColor: string;
    };
  }
}
