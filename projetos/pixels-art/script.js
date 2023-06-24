const buttonClearBoardTag = document.querySelector('#clear-board');
const buttonRandomPalletTag = document.querySelector('#button-random-color');
const buttonRandomBoardTag = document.querySelector('#board-random-color');
const pixelBoardTag = document.querySelector('#pixel-board');
const pixelBoardTagLength = 25;
const pixelBoardTagSize = 40;
const colorTag = document.querySelectorAll('.color');

function dataSave(name, data) {
  const newData = localStorage.setItem(name, JSON.stringify(data));

  return newData;
}

function getDataSave(key) {
  const item = localStorage.getItem(key);
  const convertedItem = JSON.parse(item);
  return convertedItem;
}

for (let index = 0; index < pixelBoardTagLength; index += 1) {
  const newPixel = document.createElement('div');
  newPixel.classList.add('pixel');
  pixelBoardTag.appendChild(newPixel);

  pixelBoardTag.style.width = `${(pixelBoardTagSize.toString() * 5) + 2 * 5}px`;
}
const pixelTag = document.querySelectorAll('.pixel');

function changeColor(newColor) {
  for (let index = 0; index < pixelTag.length; index += 1) {
    const currentPixel = pixelTag[index];
    currentPixel.addEventListener('click', () => {
      currentPixel.style.backgroundColor = newColor;
    });
  }
}

function clearBoard() {
  buttonClearBoardTag.addEventListener('click', () => {
    for (let index = 0; index < pixelTag.length; index += 1) {
      const currentPixel = pixelTag[index];

      currentPixel.style.backgroundColor = 'white';
    }
  });
}
clearBoard();

function randomPallet() {
  let rgb = '';
  buttonRandomPalletTag.addEventListener('click', () => {
    for (let index = 0; index < colorTag.length; index += 1) {
      const currentColor = colorTag[index];
      const red = Math.floor(Math.random() * 256);
      const green = Math.floor(Math.random() * 256);
      const blue = Math.floor(Math.random() * 256);
      rgb = `rgb(${red}, ${green}, ${blue})`;
      currentColor.style.backgroundColor = rgb;
    }
  });
  return rgb;
}
randomPallet();

function randomBoard() {
  buttonRandomBoardTag.addEventListener('click', () => {
    for (let index = 0; index < pixelTag.length; index += 1) {
      const currentPixel = pixelTag[index];
      const red = Math.floor(Math.random() * 256);
      const green = Math.floor(Math.random() * 256);
      const blue = Math.floor(Math.random() * 256);
      const rgb = `rgb(${red}, ${green}, ${blue})`;
      currentPixel.style.backgroundColor = rgb;
    }
  });
}
randomBoard();

function verifyPalletColor(color, newColor) {
  if (color !== newColor) {
    changeColor(newColor);
  }
}

function verifyColor(string, color) {
  if (string.includes(color)) {
    changeColor(color);
  }
}

for (let index = 0; index < colorTag.length; index += 1) {
  const currentColor = colorTag[index];
  currentColor.addEventListener('click', (event) => {
    for (let indexx = 0; indexx < colorTag.length; indexx += 1) {
      colorTag[indexx].classList.remove('selected');
    }
    event.target.classList.add('selected');
    if (event.target.style.backgroundColor === '') {
      verifyColor(event.target.className, 'red');
      verifyColor(event.target.className, 'green');
      verifyColor(event.target.className, 'blue');
      verifyColor(event.target.className, 'purple');
    } else {
      verifyPalletColor(randomPallet(), event.target.style.backgroundColor);
    }
  });
}

window.addEventListener('click', () => {
  const pixels = [];
  for (let index = 0; index < pixelTag.length; index += 1) {
    const currentPixelColor = pixelTag[index];
    pixels.push(currentPixelColor.style.backgroundColor);
  }
  dataSave('pixelBoard', pixels);
});

window.onload = () => {
  if (getDataSave('pixelBoard') !== null) {
    for (let index = 0; index < getDataSave('pixelBoard').length; index += 1) {
      const newPixel = getDataSave('pixelBoard')[index];
      const lastPixel = pixelTag[index];
      lastPixel.style.backgroundColor = newPixel;
    }
  }
};
