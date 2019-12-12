export enum PAGE_PATHS {
  SIGNUP = '/signup',
  SIGNIN = '/signin',
  MY_PAGE = '/mypage',
  MAIN = '/',
  SEARCH = '/search'
}

export enum HEADER_TAB {
  IS_ACTIVE_FRIENDS_TAB = 'isActiveFriendsTab',
  IS_ACTIVE_MESSAGE_TAB = 'isActiveMessageTab',
  IS_ACTIVE_ALARM_TAB = 'isActiveAlarmTab'
}

export enum CHAT_ROOM {
  NEW = 'new',
  CHAT = 'chat'
}

export enum HEADER_TAB_CNT {
  FRIENDS = 'friendsCount',
  MESSAGE = 'messageCount',
  ALARM = 'alarmCount'
}

export const DEFAULT = {
  PROFILE: process.env.PUBLIC_URL + '/images/profile.png',
  SEARCH_NOT_FOUND: process.env.PUBLIC_URL + '/images/search_notfound.png'
}
