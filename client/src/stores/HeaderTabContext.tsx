import React, {
  useReducer,
  createContext,
  ReactNode,
  Dispatch,
  useContext
} from 'react';
import { HEADER_TAB } from 'Constants'

const initState = {
  [HEADER_TAB.IS_ACTIVE_FRIEND_TAB]: false,
  [HEADER_TAB.IS_ACTIVE_MESSAGE_TAB]: false,
  [HEADER_TAB.IS_ACTIVE_ALARM_TAB]: false
};

type IHeaderTabState = {
  [key: string]: boolean;
};

type Action =
  | { type: 'CLICK_FRIEND_TAB'; key: string }
  | { type: 'CLICK_MESSAGE_TAB'; key: string }
  | { type: 'CLICK_ALARM_TAB'; key: string }
  | { type: 'INITSTATE' };

type IHeaderTabDispatch = Dispatch<Action>;

const headerTabReducer = (
  state: IHeaderTabState,
  action: Action
): IHeaderTabState => {
  switch (action.type) {
    case 'CLICK_FRIEND_TAB':
    case 'CLICK_ALARM_TAB':
    case 'CLICK_MESSAGE_TAB':
      if (state[action.key]) {
        return { ...initState };
      } else {
        return { ...initState, [action.key]: true };
      }
    case 'INITSTATE':
      return { ...initState };
    default:
      throw new Error('Unhandled action');
  }
};

const HeaderTabStateContext = createContext<IHeaderTabState | undefined>(
  undefined
);
const HeaderTabDispatchContext = createContext<IHeaderTabDispatch | undefined>(
  undefined
);

export function HeaderTabProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(headerTabReducer, initState);
  return (
    <HeaderTabDispatchContext.Provider value={dispatch}>
      <HeaderTabStateContext.Provider value={state}>
        {children}
      </HeaderTabStateContext.Provider>
    </HeaderTabDispatchContext.Provider>
  );
}

export const useHeaderTabState = () => {
  const state = useContext(HeaderTabStateContext);
  if (!state) {
    throw new Error('cannot find Header Tab Provider');
  }
  return state;
};

export const useHeaderTabDispatch = () => {
  const dispatch = useContext(HeaderTabDispatchContext);
  if (!dispatch) {
    throw new Error('cannot find Header Tab Provider');
  }
  return dispatch;
};
