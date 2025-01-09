import { USER_ACTIONS_TYPE } from './user.types';
import { createReducerAction } from '../../utils/reducer/reducer.utils';

export const setCurrentUser = user => {
  return createReducerAction(USER_ACTIONS_TYPE.SET_CURRENT_USER, user);
};
