// Функция закрытия попапа карточки фильма
const addClosePopUp = () => {
  const popUp = document.querySelector(`.film-details`);
  const popUpButtonClose = popUp.querySelector(`.film-details__close-btn`);

  popUpButtonClose.addEventListener(`click`, () => {
    popUp.remove();
  });
};

// Функция закрытия попапа карточки фильма по нажатию кнопки Esc
const onEscKeyDown = (evt) => {
  if ((evt.key === `Escape` || evt.key === `Esc`) && document.querySelector(`.film-details`)) {
    evt.preventDefault();
    const popUp = document.querySelector(`.film-details`);
    popUp.remove();
  }
};

// Функция чистки блока от елементов
const cleanChildElement = (cont) => {
  const childElements = cont.querySelectorAll(`.film-card`);

  for (const element of childElements) {
    element.remove();
  }
};

const sortByDate = (taskA, taskB) => {
  if (taskA.yearCreat > taskB.yearCreat) {
    return -1;
  }

  if (taskB.yearCreat > taskA.yearCreat) {
    return 1;
  }


  return 0;
};

const sortByRating = (taskA, taskB) => {
  if (taskA.rating > taskB.rating) {
    return -1;
  }

  if (taskB.rating > taskA.rating) {
    return 1;
  }


  return 0;
};

export {addClosePopUp, onEscKeyDown, cleanChildElement, sortByDate, sortByRating};
