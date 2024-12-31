import DirectoryItem from '../directory-item/directory-item.component';
import './directory.styles.scss';

function Directory({ categories }) {
  return (
    <div className="direcory-container">
      {categories.map((category, index) => (
        <DirectoryItem key={index} category={category} />
      ))}
    </div>
  );
}

export default Directory;
