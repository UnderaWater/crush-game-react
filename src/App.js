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
  const [squareDragged, setSquareDragged] = useState(null);
  const [squareReplaced, setSquareReplaced] = useState(null)

  const checkColumnOfFour = () => {
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = currentColors[i];

      if (columnOfFour.every(item => currentColors[item] === decidedColor)) {
        columnOfFour.forEach(item => currentColors[item] = '');
        return true;
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
        return true;
      }
    }
  }

  const checkColumnOfThree = () => {
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedColor = currentColors[i];

      if (columnOfThree.every(item => currentColors[item] === decidedColor)) {
        columnOfThree.forEach(item => currentColors[item] = '');
        return true;
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
        return true;
      }
    }
  }

  const moveSquare = () => {
    for (let i = 0; i <= 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstRow.includes(i);

      if (isFirstRow && currentColors[i] === '') {
        let randomNumber = Math.floor(Math.random() * colors.length);
        currentColors[i] = colors[randomNumber]
      }

      if ((currentColors[i + width]) === '') {
        currentColors[i + width] = currentColors[i];
        currentColors[i] = '';
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

  const dragStart = (e) => {
    setSquareDragged(e.target)
  }

  const dragDrop = (e) => {
    setSquareReplaced(e.target)
  }

  const dragEnd = (e) => {
    const squareDraggeddId = parseInt(squareDragged.getAttribute('data-id'));
    const squareReplacedId = parseInt(squareReplaced.getAttribute('data-id'));

    const validMoves = [
      squareDraggeddId - 1,
      squareDraggeddId - width,
      squareDraggeddId + 1,
      squareDraggeddId + width
    ];

    const validMove = validMoves.includes(squareReplacedId);

    const isAColumnOfFour = checkColumnOfFour();
    const isARowOfFour = checkRowOfFour();
    const isAColumnOfThree = checkColumnOfThree();
    const isARowOfThree = checkRowOfThree();

    if (squareReplacedId && validMove
      && (isARowOfThree || isARowOfFour || isAColumnOfFour || isAColumnOfThree)) {
        setSquareDragged(null);
        setSquareReplaced(null);
      } else {
        currentColors[squareReplacedId] = squareDragged.style.backgroundColor;
        currentColors[squareDraggeddId] = squareReplaced.style.backgroundColor;
        setCurrentColors([...currentColors])
      }
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
      moveSquare();
      setCurrentColors([...currentColors]);
    }, 100)
    return () => clearInterval(timer);
  }, [checkColumnOfThree, currentColors, checkColumnOfFour, checkRowOfThree, checkRowOfFour, moveSquare])

  return (
    <div className="app">
      <div className="app-game">
        {currentColors.map((item, index) => (
          <img
            key={index}
            style={{ backgroundColor: item }}
            alt={item}
            data-id={index}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
          />
        ))}
      </div>
    </div>
  );
}

export default App;