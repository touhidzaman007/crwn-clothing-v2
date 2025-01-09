import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
// import { CategoriesContext } from '../../contexts/categories.context';
import { CategoryContainer, CategoryTitle } from './category.styles';
import ProductCard from '../../components/product-card/product-card.component';
import { useSelector } from 'react-redux';
import { selectCategoriesMap } from '../../store/categories/categories.selector';

function Category() {
  const categoriesMap = useSelector(selectCategoriesMap);
  const { category } = useParams();
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      <CategoryContainer>
        {products &&
          products.map(product => {
            const { id } = product;
            return <ProductCard key={id} product={product} />;
          })}
      </CategoryContainer>
    </Fragment>
  );
}

export default Category;
