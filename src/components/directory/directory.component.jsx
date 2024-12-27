import CategoryItem from '../category-item/category-item.component';
import './directory.styles.scss';

function Directory({ categories }) {
  return (
    <div className="direcory-container">
      {categories.map((category, index) => (
        <CategoryItem key={index} category={category} />
      ))}
    </div>
  );
}

export default Directory;
