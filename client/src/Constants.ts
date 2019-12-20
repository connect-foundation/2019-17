import config from 'utils/config';

export enum PAGE_PATHS {
  SIGNUP = '/signup',
  SIGNIN = '/signin',
  MY_PAGE = '/mypage',
  MY_PAGE_BY_EMAIL = '/mypage/:email',
  MAIN = '/',
  SEARCH = '/search'
}

export enum HEADER_TAB {
  IS_ACTIVE_FRIEND_TAB = 'isActiveFriendTab',
  IS_ACTIVE_MESSAGE_TAB = 'isActiveMessageTab',
  IS_ACTIVE_ALARM_TAB = 'isActiveAlarmTab'
}

export enum CHAT_ROOM {
  NEW = 'new',
  CHAT = 'chat'
}

export enum HEADER_TAB_CNT {
  FRIEND = 'friendCount',
  MESSAGE = 'messageCount',
  ALARM = 'alarmCount'
}

export const DEFAULT = {
  PROFILE: process.env.PUBLIC_URL + '/images/profile.jpg',
  SEARCH_NOT_FOUND: process.env.PUBLIC_URL + '/images/search_notfound.png',
  LOGO_WHITE: process.env.PUBLIC_URL + '/images/boostbook_logo_white.png'
};

export const MAX_DATE = '9999-12-31T09:29:26.050Z';

export const WRITING_FEED_CONTENT = 'writingFeedContent';

export const HTTP_SERVER_URI = `${config.serverHost}/graphql`;

export const UPLOAD_SERVER_URI = `${config.serverHost}/graphql`;

export const WEB_SOCKET_URI = `${config.webSocket}/subscriptions`;
