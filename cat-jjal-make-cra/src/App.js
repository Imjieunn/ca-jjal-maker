import React from "react";
import './App.css';
import Title from './components/Title';
import Input from './components/Input';
import MainCard from './components/MainCard';
import Favorites from './components/Favorites';

const jsonLocalStorage = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
};

const fetchCat = async (text) => {
  const OPEN_API_DOMAIN = "https://cataas.com";
  const response = await fetch(`${OPEN_API_DOMAIN}/cat/says/${text}?json=true`);
  const responseJson = await response.json();
  return `${OPEN_API_DOMAIN}/${responseJson.url}`;
};

const App = () => {
  const CAT1 = "https://img.freepik.com/free-photo/close-up-portrait-on-beautiful-cat_23-2149214373.jpg";
  const CAT2 = "https://img.freepik.com/free-photo/adorable-kitty-looking-like-it-want-to-hunt_23-2149167099.jpg";
  const CAT3 = "https://t1.daumcdn.net/cfile/tistory/216C553953FC27C335";
  const cats = [CAT1, CAT2];

  const [counter, setCounter] = React.useState(() => { return jsonLocalStorage.getItem('counter') });
  const [catImage, setCatImage] = React.useState(CAT1);
  const [favorites, setFavorites] = React.useState(() => { return jsonLocalStorage.getItem('favorites') || [] });

  const alreadyFavorite = favorites.includes(catImage)

  async function setInitialCat() {
    const newCat = await fetchCat('First cat');
    console.log(newCat);
    setCatImage(newCat);
  }

  React.useEffect(() => {
    setInitialCat();
  }, [])

  async function updateMainCat(value) {
    const newCat = await fetchCat(value);

    setCatImage(newCat);
    setCounter((prev) => {
      const nextCounter = prev + 1;
      jsonLocalStorage.setItem('counter', nextCounter);
      return nextCounter;
    })

  }

  function handleHeartClick() {
    const nextFavorites = [...favorites, catImage];
    setFavorites(nextFavorites);
    jsonLocalStorage.setItem('favorites', nextFavorites);
  }

  const counterTitle = (counter === null) ? "" : counter + '번째 ';

  return (
    <div>
      <Title> {counterTitle}고양이 가라사대 </Title>
      <Input updateMainCat={updateMainCat} />
      <MainCard image={catImage} onHeartClick={handleHeartClick} alreadyFavorite={alreadyFavorite} />
      <Favorites favorites={favorites} />
    </div>
  )
}

export default App;
