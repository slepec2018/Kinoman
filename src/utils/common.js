// Функция рандомного числа из заданного диапазона включая границы
const getRandomNumber = (min, max) => {
  if (min < 0 || max < 0 || min >= max) {
    return NaN;
  }

  const finMin = Math.ceil(Math.min(min, max));
  const finMax = Math.floor(Math.max(min, max));

  return Math.floor(Math.random() * (finMax - finMin + 1)) + finMin;
};

// Функция рандомного елемента из заданного массива
const getRandomItemArr = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

// Функция рандомного добавления одного или двух елементов массива
const getRandomItemsArray = (arr, count) => {
  const allElements = [];

  for (let i = 0; i < count; i++) {
    const element = arr[getRandomNumber(0, arr.length - 1)];
    allElements.push(element);
  }

  return allElements.join(` `);
};

// Функция возрощающая случайную часть заданного массива
const getRandomArrayPart = (arr) => {
  const a = getRandomNumber(0, arr.length - 1);
  let b = getRandomNumber(0, arr.length - 1);

  while (b === 0 || b === a) {
    b = getRandomNumber(0, arr.length - 1);
  }

  const lower = Math.min(a, b);
  const upper = Math.max(a, b);

  return arr.slice(lower, upper);
};

// Функция возращающая случайное число с плавающей точкой из переданного диапозона включительно
const getRandomNumberPoint = (min, max, point) => {
  if (min < 0 || max < 0) {
    return NaN;
  }

  const finMin = Math.min(min, max);
  const finMax = Math.max(min, max);

  let int = Math.random() * (finMax - finMin) + finMin;
  return Number(int.toFixed(point));
};

// Функция форматиорования единичных цифр с добавкой 0 в начале
const getNumberWithLeadZero = (number) => number < 10 ? `0${number}` : number;

const WORDS = [
  `got`,
  `ability`,
  `shop`,
  `recall`,
  `fruit`,
  `easy`,
  `dirty`,
  `giant`,
  `shaking`,
  `ground`,
  `weather`,
  `lesson`,
  `almost`,
  `square`,
  `forward`,
  `bend`,
  `cold`,
  `broken`,
  `distant`,
  `adjective`,
];

// Функция превращения первой буквы строки в заглавную
const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

// Функция выбора рандомного слова(элемента массива)
const getRandomWord = () => {
  const word = getRandomItemArr(WORDS);
  return word;
};

// Функция создания lorem предложения
const generateWords = (length) => {
  return capitalize([...Array(length)].map(getRandomWord).join(` `) + `.`);
};

// Функция создания текста lorem
const generateLoremText = (numSent) => {
  const text = [];

  for (let i = 0; i < numSent; i++) {
    text.push(generateWords(getRandomNumber(2, 10)));
  }
  return text.join(` `);
};

// Функция сортировки массива
const sortArray = (arr, chapter) => {
  const deepData = JSON.parse(JSON.stringify(arr));

  return deepData.sort(function (a, b) {
    return b[chapter] - a[chapter];
  });
};

// Функция навешивания активного класса на елемент
const addActiveClass = (arr, classActiv, itemActiv) => {
  for (const item of arr) {
    item.classList.remove(classActiv);
  }

  itemActiv.classList.add(classActiv);
};

// Функция генерирования массива с заданной длинной, исключающая повторов
const getRandomTags = (arr, length) => {
  let set = new Set();

  const cycle = getRandomNumber(1, length);

  while (set.size !== cycle) {
    set.add(arr[getRandomNumber(0, arr.length - 1)]);
  }

  return Array.from(set);
};

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};

export {
  getRandomNumber,
  getRandomItemArr,
  getRandomItemsArray,
  getRandomArrayPart,
  getRandomNumberPoint,
  getNumberWithLeadZero,
  generateLoremText,
  sortArray,
  addActiveClass,
  getRandomTags,
  updateItem
};
