import Menu from './components/menu.js';
import Search from './components/search.js';
import Filters from './components/filters.js';
import Board from './components/board.js';
import Task from './components/task.js';
import TaskEdit from './components/task-edit.js';
import LoadMoreButton from './components/load-more-button.js';
import NoTasks from './components/no-tasks.js'
import {generateTask, generateFilters} from './components/data.js';
import {Position, render, unrender} from "./components/utils.js";

const CARDS_COUNT = 25;
const CARDS_COUNT_RENDERED_AT_TIME = 2;
let countRenderedCard = 0;
let tasksContainer;

const renderTask = (taskMock) => {
  const task = new Task(taskMock);
  const taskEdit = new TaskEdit(taskMock);

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      tasksContainer.replaceChild(task.getElement(), taskEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  task.getElement()
    .querySelector(`.card__btn--edit`)
    .addEventListener(`click`, () => {
      tasksContainer.replaceChild(taskEdit.getElement(), task.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    });

  taskEdit.getElement().querySelector(`textarea`)
    .addEventListener(`focus`, () => {
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

  taskEdit.getElement().querySelector(`textarea`)
    .addEventListener(`blur`, () => {
      document.addEventListener(`keydown`, onEscKeyDown);
    });

  taskEdit.getElement()
    .querySelector(`.card__save`)
    .addEventListener(`click`, () => {
      tasksContainer.replaceChild(task.getElement(), taskEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

  taskEdit.getElement()
    .querySelector(`.card__form`)
    .addEventListener(`submit`, () => {
      tasksContainer.replaceChild(task.getElement(), taskEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

  taskEdit.getElement()
    .querySelector(`.card__delete`)
    .addEventListener(`click`, () => {
      unrender(taskEdit.getElement());
      taskEdit.removeElement();
      task.removeElement();
      document.removeEventListener(`keydown`, onEscKeyDown);

      if(!--countRenderedCard) {
        unrender(board);
        renderNoTasks();
      }
    });

  render(tasksContainer, task.getElement(), Position.BEFOREEND);
};
const renderBoard = () => {
  const board = new Board();
  render(main, board.getElement(), `beforeend`);
};
const renderMenu = () => {
  const menu = new Menu();
  render(document.querySelector(`.main__control`), menu.getElement(), `beforeend`);
};
const renderSearch = () => {
  const search = new Search();
  render(main, search.getElement(), `beforeend`);
};
const renderFilters = () => {
  const filters = new Filters(generateFilters(taskMocks));
  render(main, filters.getElement(), `beforeend`);
};
const renderLoadMoreButton = () => {
  const loadMoreButton = new LoadMoreButton();
  render(board, loadMoreButton.getElement(), `beforeend`);

  loadMoreButton.getElement()
    .addEventListener(`click`, () => {
      if (CARDS_COUNT - countRenderedCard > CARDS_COUNT_RENDERED_AT_TIME) {
        taskMocks.slice(countRenderedCard, countRenderedCard += CARDS_COUNT_RENDERED_AT_TIME).forEach((taskMock) => renderTask(taskMock));
      } else {
        taskMocks.slice(countRenderedCard).forEach((taskMock) => renderTask(taskMock));
        countRenderedCard = CARDS_COUNT;
        loadMoreButton.getElement().classList.add(`load-more--deleted`);
      }
    });
};
const renderNoTasks = () => {
  const noTasks = new NoTasks();
  render(main, noTasks.getElement(), `beforeend`);
};

const taskMocks = new Array(CARDS_COUNT).fill(``).map(generateTask);

const main = document.querySelector(`.main`);
let board;
const renderHeader = () => {
  renderMenu();
  renderSearch();
  renderFilters();
};

const renderBody = () => {
  renderBoard();
  board = document.querySelector(`.board`);
  tasksContainer = document.querySelector(`.board__tasks`);

  taskMocks.slice(countRenderedCard, countRenderedCard += CARDS_COUNT_RENDERED_AT_TIME).forEach((taskMock) => renderTask(taskMock));
  renderLoadMoreButton();
};

const renderPage = () => {
  renderHeader();
  renderBody();
};

renderPage();


