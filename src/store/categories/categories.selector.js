import { createSelector } from 'reselect';

const selectCategoryReducer = state => state.categories || {};

const selectCategories = createSelector(
  [selectCategoryReducer],
  categoriesSlice => categoriesSlice.categories || []
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  categories => {
    return categories.reduce((accumulator, category) => {
      const { title, items } = category;
      accumulator[title.toLowerCase()] = items;
      return accumulator;
    }, {});
  }
);

export const selectIsCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  categoriesSlice => categoriesSlice.isLoading
);
