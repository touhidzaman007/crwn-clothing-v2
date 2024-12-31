import DirectoryItem from '../directory-item/directory-item.component';
import { DirectoryContainer } from './directory.styles';
function Directory({ categories }) {
  return (
    <DirectoryContainer>
      {categories.map((category, index) => (
        <DirectoryItem key={index} category={category} />
      ))}
    </DirectoryContainer>
  );
}

export default Directory;
