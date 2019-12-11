import React, {
  useReducer,
  createContext,
  ReactNode,
  Dispatch,
  useContext
} from 'react';
import { HEADER_TAB } from '../constants';

const initState = {
  [HEADER_TAB.FRIENDS]: false,
  [HEADER_TAB.MESSAGE]: false,
  [HEADER_TAB.ALARM]: false
};

type IHeaderTabState = {
  [key: string]: boolean;
};

type Action =
  | { type: 'CLICK_FRIENDS'; key: string }
  | { type: 'CLICK_MESSAGE'; key: string }
  | { type: 'CLICK_ALARM'; key: string }
  | { type: 'INITSTATE' };

type IHeaderTabDispatch = Dispatch<Action>;

const headerTabReducer = (
  state: IHeaderTabState,
  action: Action
): IHeaderTabState => {
  switch (action.type) {
    case 'CLICK_FRIENDS':
    case 'CLICK_ALARM':
    case 'CLICK_MESSAGE':
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
