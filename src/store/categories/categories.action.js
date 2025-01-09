import { CATEGORIES_ACTIONS_TYPE } from './categories.types';
import { createReducerAction } from '../../utils/reducer/reducer.utils';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';

export const fetchCategoriesStart = () => {
  return createReducerAction(CATEGORIES_ACTIONS_TYPE.FETCH_CATEGORIES_START);
};

export const fetchCategoriesSuccess = categoriesArray => {
  return createReducerAction(
    CATEGORIES_ACTIONS_TYPE.FETCH_CATEGORIES_SUCCESS,
    categoriesArray
  );
};

export const fetchCategoriesFailure = error => {
  return createReducerAction(
    CATEGORIES_ACTIONS_TYPE.FETCH_CATEGORIES_FAILURE,
    error
  );
};

export const fetchCategoriesAsync = () => async dispatch => {
  dispatch(fetchCategoriesStart());
  try {
    const categoriesArray = await getCategoriesAndDocuments('categories');
    // console.log('categoriesArray:', categoriesArray);
    dispatch(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    dispatch(fetchCategoriesFailure(error));
  }
};
