import {createMenu} from './components/menu.js';
import {createSearch} from './components/search.js';
import {createFilters} from './components/filters.js';
import {createBoard} from './components/board.js';
import {createTask} from './components/task.js';
import {createEditTask} from './components/task-edit.js';
import {createLoadMoreButton} from './components/load-more-button.js';

const CARDS_COUNT = 3;

const render = (container, insertedElement) => container.insertAdjacentHTML(`beforeend`, insertedElement);

const renderCards = (board, cardsCount = 3) => {
  for (let i = 0; i < cardsCount; i++) {
    render(board, createTask());
  }
};

const mainBlock = document.querySelector(`.main`);
const renderHeader = () => {
  render(document.querySelector(`.main__control`), createMenu());
  render(mainBlock, createSearch());
  render(mainBlock, createFilters());
};

const renderBoard = () => {
  render(mainBlock, createBoard());

  const boardTasks = document.querySelector(`.board__tasks`);

  render(boardTasks, createEditTask());
  renderCards(boardTasks, CARDS_COUNT);
  render(document.querySelector(`.board`), createLoadMoreButton());
};

const renderPage = () => {
  renderHeader();
  renderBoard();
};

renderPage();

