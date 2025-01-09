import { CATEGORIES_ACTIONS_TYPE } from './categories.types';
import { createReducerAction } from '../../utils/reducer/reducer.utils';

export const setCategories = categoriesArray => {
  return createReducerAction(
    CATEGORIES_ACTIONS_TYPE.SET_CATEGORIES,
    categoriesArray
  );
};
