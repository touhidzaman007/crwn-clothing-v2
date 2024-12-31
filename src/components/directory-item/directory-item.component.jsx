import {
  BackgroundImage,
  Body,
  DirectoryItemContainer,
} from './directory-item.styles';

function DirectoryItem({ category }) {
  const { id, title, imageUrl } = category;
  return (
    <DirectoryItemContainer key={id}>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  );
}

export default DirectoryItem;
