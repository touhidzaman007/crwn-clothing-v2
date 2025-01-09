import { Fragment } from 'react';
import { useSelector } from 'react-redux';
// import { CategoriesContext } from '../../contexts/categories.context';
import CategoryPreview from '../../components/category-preview/category-preview.component';
import Spinner from '../../components/spinner/spinner.component';
import {
  selectCategoriesMap,
  selectIsCategoriesIsLoading,
} from '../../store/categories/categories.selector';

function CategoriesPreview() {
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectIsCategoriesIsLoading);
  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        Object.keys(categoriesMap).map(title => {
          const products = categoriesMap[title];
          return (
            <Fragment key={title}>
              <CategoryPreview title={title} products={products} />
            </Fragment>
          );
        })
      )}
    </Fragment>
  );
}

export default CategoriesPreview;
