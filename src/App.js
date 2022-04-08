import { useEffect, useState } from "react";

const width = 8;
const colors = [
  '#28a8e5',
  '#bb1bbb',
  '#f92121',
  '#07d307',
  '#ffff28',
  '#ffae18'
];

const App = () => {
  const [currentColors, setCurrentColors] = useState([]);

  const checkColumnOfFour = () => {
    for (let i = 0; i < 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = currentColors[i];

      if (columnOfFour.every(item => currentColors[item] === decidedColor)) {
        columnOfFour.forEach(item => currentColors[item] = '');
      }
    }
  }

  const checkRowOfFour = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3];
      const decidedColor = currentColors[i];
      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64];

      if (notValid.includes(i)) continue

      if (rowOfFour.every(item => currentColors[item] === decidedColor)) {
        rowOfFour.forEach(item => currentColors[item] = '');
      }
    }
  }

  const checkColumnOfThree = () => {
    for (let i = 0; i < 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedColor = currentColors[i];

      if (columnOfThree.every(item => currentColors[item] === decidedColor)) {
        columnOfThree.forEach(item => currentColors[item] = '');
      }
    }
  }

  const checkRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decidedColor = currentColors[i];
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64];

      if (notValid.includes(i)) continue

      if (rowOfThree.every(item => currentColors[item] === decidedColor)) {
        rowOfThree.forEach(item => currentColors[item] = '');
      }
    }
  }

  const createBoard = () => {
    const randomColorArrangement = [];
    for (let i = 0; i < width * width; i++) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      randomColorArrangement.push(randomColor);
    }
    setCurrentColors(randomColorArrangement);
  }

  useEffect(() => {
    createBoard();
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      checkColumnOfFour();
      checkRowOfFour();
      checkColumnOfThree();
      checkRowOfThree();
      setCurrentColors([...currentColors]);
    }, 100)
    return () => clearInterval(timer);
  }, [checkColumnOfThree, currentColors, checkColumnOfFour, checkRowOfThree, checkRowOfFour])

  return (
    <div className="app">
      <div className="app-game">
        {currentColors.map((item, index) => (
          <img key={index} style={{ backgroundColor: item }} alt={index + 1} />
        ))}
      </div>
    </div>
  );
}

export default App;