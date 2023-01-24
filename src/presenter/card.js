import {TempCard} from "../components/card.js";
import {TempCardPop} from "../components/card_pop.js";
import {render, RenderPosition, remove, replace} from "../utils/render.js";

class Card {
  constructor(
      popUpListContainer,
      mainListContainer,
      topRatedListContainer,
      mostCommentedListContainer,
      block = `main`,
      changeData
  ) {
    this._popUpListContainer = popUpListContainer;
    this._mainListContainer = mainListContainer;
    this._topRatedListContainer = topRatedListContainer;
    this._mostCommentedListContainer = mostCommentedListContainer;
    this._block = block;
    this._changeData = changeData;

    this._cardComponent = null;
    this._cardEditComponent = null;

    this._handlePopUpClick = this._handlePopUpClick.bind(this);
    this._handlePopUpCloseClick = this._handlePopUpCloseClick.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(card) {
    this._card = card;

    const prevCardComponent = this._cardComponent;
    const prevCardEditComponent = this._cardEditComponent;

    this._cardComponent = new TempCard(card);
    this._cardEditComponent = new TempCardPop(card);

    this._cardComponent.setPopUpClickHandler(this._handlePopUpClick);
    this._cardComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._cardComponent.setwatchedClickHandler(this._handleWatchedClick);
    this._cardComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._cardEditComponent.setCardHandler(this._handlePopUpCloseClick);

    if (prevCardComponent === null || prevCardEditComponent === null) {
      this._firstRenderComponent();
      return;
    }

    // Проверка на наличие в DOM необходима,
    // чтобы не пытаться заменить то, что не было отрисовано
    if (this._checkForContains(prevCardComponent)) {
      replace(this._cardComponent, prevCardComponent);
    }

    if (this._popUpListContainer.contains(prevCardEditComponent.getElement())) {
      replace(this._cardEditComponent, prevCardEditComponent);
    }

    remove(prevCardComponent);
    remove(prevCardEditComponent);
  }

  _firstRenderComponent() {
    if (this._block === `main`) {
      render(this._mainListContainer, this._cardComponent, RenderPosition.BEFOREEND);
    }
    if (this._block === `TopRated`) {
      render(this._topRatedListContainer, this._cardComponent, RenderPosition.BEFOREEND);
    }
    if (this._block === `MostCommented`) {
      render(this._mostCommentedListContainer, this._cardComponent, RenderPosition.BEFOREEND);
    }
  }

  _checkForContains(prevTaskComponent) {
    if (this._mainListContainer.contains(prevTaskComponent.getElement())) {
      return true;
    }
    if (this._topRatedListContainer.contains(prevTaskComponent.getElement())) {
      return true;
    }
    if (this._mostCommentedListContainer.contains(prevTaskComponent.getElement())) {
      return true;
    }

    return false;
  }

  destroy() {
    remove(this._cardComponent);
    remove(this._cardEditComponent);
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._cardEditComponent.reset(this._card);
      this._popUpListContainer.lastChild.remove();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  _addPopUpToMain() {
    render(this._popUpListContainer, this._cardEditComponent, RenderPosition.BEFOREEND);
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _closePopUp() {
    this._popUpListContainer.lastChild.remove();
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }


  _handlePopUpClick() {
    this._addPopUpToMain();
  }

  _handleWatchlistClick() {
    this._changeData(
        Object.assign(
            {},
            this._card,
            {
              watchlist: !this._card.watchlist
            }
        )
    );
  }

  _handleWatchedClick() {
    this._changeData(
        Object.assign(
            {},
            this._card,
            {
              watched: !this._card.watched
            }
        )
    );
  }

  _handleFavoriteClick() {
    this._changeData(
        Object.assign(
            {},
            this._card,
            {
              favorite: !this._card.favorite
            }
        )
    );
  }

  _handlePopUpCloseClick(card) {
    this._changeData(card);
    this._closePopUp();
  }
}

export {Card};
