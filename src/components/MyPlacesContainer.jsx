import MyPlaceItem from "./MyPlaceItem";

const MyPlacesContainer = ({ placesList }) => {
  return placesList.map((place) => <MyPlaceItem key={place._id} {...place} />);
};
export default MyPlacesContainer;
