export interface Feeds {
  feedItems: IFeedItem[];
}

export interface Idate {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  nanosecond: number;
  timeZoneOffsetSeconds: number;
  timeZoneId: string;
}

export interface IUser {
  nickname: string;
  hometown: string;
  thumbnail: string;
  residence: string;
  email: string;
}
export interface Content {
  createdAt: Idate;
  content: string;
}

export interface Comment {
  id: string;
  content: string;
}

export interface IFeedItem {
  searchUser: IUser;
  feed: Content;
  feedId: number;
  totallikes: number;
  hasLiked: number;
  comments: [Comment];
}
