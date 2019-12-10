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

type INewAlarmState = {
  [key: string]: boolean;
};

type Action =
  | { type: 'NEW_FRIENDS'; key: string }
  | { type: 'NEW_MESSAGE'; key: string }
  | { type: 'NEW_ALARM'; key: string }
  | { type: 'INITSTATE' };

type INewAlarmDispatch = Dispatch<Action>;

const newAlarmReducer = (
  state: INewAlarmState,
  action: Action
): INewAlarmState => {
  switch (action.type) {
    case 'NEW_FRIENDS':
    case 'NEW_ALARM':
    case 'NEW_MESSAGE':
      console.log('test');
      if (state[action.key]) {
        console.log(state[action.key]);
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

const NewAlarmStateContext = createContext<INewAlarmState | undefined>(
  undefined
);
const NewAlarmDispatchContext = createContext<INewAlarmDispatch | undefined>(
  undefined
);

export function NewAlarmProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(newAlarmReducer, initState);
  return (
    <NewAlarmDispatchContext.Provider value={dispatch}>
      <NewAlarmStateContext.Provider value={state}>
        {children}
      </NewAlarmStateContext.Provider>
    </NewAlarmDispatchContext.Provider>
  );
}

export const useNewAlarmState = () => {
  const state = useContext(NewAlarmStateContext);
  if (!state) {
    throw new Error('cannot find Header Tab Provider');
  }
  return state;
};

export const useNewAlarmDispatch = () => {
  const dispatch = useContext(NewAlarmDispatchContext);
  if (!dispatch) {
    throw new Error('cannot find Header Tab Provider');
  }
  return dispatch;
};
