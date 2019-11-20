export interface AddUserQueryArgs {
  email: string;
  nickname: string | null;
  hometown: string | null;
  residence: string | null;
  thumbnail: string | null;
}

export interface FindUserWithEmailQueryArgs {
  email: string;
}

export interface User {
  email: string;
  nickname: string | null;
  hometown: string | null;
  residence: string | null;
  thumbnail: string | null;
}
