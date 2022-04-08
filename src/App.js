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

  return (
    <div className="app">
      <div className="app-game">
        {currentColors.map((item, index) => (
          <img key={index} style={{ backgroundColor: item }} alt={item} />
        ))}
      </div>
    </div>
  );
}

export default App;