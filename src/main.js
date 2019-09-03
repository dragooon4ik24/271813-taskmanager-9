import {createMenu} from './components/menu.js';
import {createSearch} from './components/search.js';
import {createFilters} from './components/filters.js';
import {createBoard} from './components/board.js';
import {createTask} from './components/task.js';
import {createEditTask} from './components/task-edit.js';
import {createLoadMoreButton} from './components/load-more-button.js';
import {generateTask, generateFilters} from './components/data.js';

const CARDS_COUNT = 25;
const CARDS_COUNT_RENDERED_AT_TIME = 7;
let countRenderedCard = 0;
const dataArr = new Array(CARDS_COUNT).fill(``).map(() => generateTask());

const render = (container, insertedElement) => container.insertAdjacentHTML(`beforeend`, insertedElement);

const renderCards = (board, cards) => {
  cards.forEach((el) => render(board, createTask(el)));
};

const mainBlock = document.querySelector(`.main`);
let boardTasks;
const renderHeader = () => {
  render(document.querySelector(`.main__control`), createMenu());
  render(mainBlock, createSearch());
  render(mainBlock, createFilters(generateFilters(dataArr)));
};

const renderBoard = () => {
  render(mainBlock, createBoard());

  boardTasks = document.querySelector(`.board__tasks`);

  render(boardTasks, createEditTask(dataArr[0]));
  countRenderedCard++;
  renderCards(boardTasks, dataArr.slice(countRenderedCard, countRenderedCard += 7));
  render(document.querySelector(`.board`), createLoadMoreButton());
};

const renderPage = () => {
  renderHeader();
  renderBoard();
};

renderPage();

const loadMoreButton = document.querySelector(`.load-more`);
const loadMoreButtonHandler = () => {
  if (CARDS_COUNT - countRenderedCard > CARDS_COUNT_RENDERED_AT_TIME) {
    renderCards(boardTasks, dataArr.slice(countRenderedCard, countRenderedCard += CARDS_COUNT_RENDERED_AT_TIME));
  } else {
    renderCards(boardTasks, dataArr.slice(countRenderedCard));
    countRenderedCard = CARDS_COUNT;
    loadMoreButton.classList.add(`load-more--deleted`);
  }
};
loadMoreButton.addEventListener(`click`, loadMoreButtonHandler);

