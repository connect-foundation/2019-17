import React, {
  useReducer,
  createContext,
  ReactNode,
  Dispatch,
  useContext
} from 'react';
import { HEADER_TAB_CNT } from '../constants';

const initState = {
  [HEADER_TAB_CNT.FRIENDS]: 0,
  [HEADER_TAB_CNT.MESSAGE]: 0,
  [HEADER_TAB_CNT.ALARM]: 0
};

type IHeaderTabCountState = {
  [key: string]: number;
};

type Action =
  | { type: 'SET_INIT_ALARM_CNT'; key: IValue }
  | { type: 'ADD_ALARM_CNT'; key: IValue }
  | { type: 'RESET' };

interface IValue {
  id: string;
  value: number;
}

type IHeaderTabCountDispatch = Dispatch<Action>;

const headerTabCountReducer = (
  state: IHeaderTabCountState,
  action: Action
): IHeaderTabCountState => {
  switch (action.type) {
    case 'ADD_ALARM_CNT':
      return { ...state, [action.key.id]: state.alarmCount + 1 };
    case 'SET_INIT_ALARM_CNT':
      console.log('test ', {
        ...state,
        [action.key.id]: state.alarmCount + action.key.value
      });
      return { ...state, [action.key.id]: action.key.value };
    case 'RESET':
      return { ...initState };
    default:
      throw new Error('Unhandled action');
  }
};

const HeaderTabStateContext = createContext<IHeaderTabCountState | undefined>(
  undefined
);
const HeaderTabDispatchContext = createContext<
  IHeaderTabCountDispatch | undefined
>(undefined);

export function HeaderAlarmCountProvider({
  children
}: {
  children: ReactNode;
}) {
  const [state, dispatch] = useReducer(headerTabCountReducer, initState);
  return (
    <HeaderTabDispatchContext.Provider value={dispatch}>
      <HeaderTabStateContext.Provider value={state}>
        {children}
      </HeaderTabStateContext.Provider>
    </HeaderTabDispatchContext.Provider>
  );
}

export const useHeaderTabCountState = () => {
  const state = useContext(HeaderTabStateContext);
  if (!state) {
    throw new Error('cannot find Header Tab Count Provider');
  }
  return state;
};

export const useHeaderTabCountDispatch = () => {
  const dispatch = useContext(HeaderTabDispatchContext);
  if (!dispatch) {
    throw new Error('cannot find Header Tab Count Provider');
  }
  return dispatch;
};
