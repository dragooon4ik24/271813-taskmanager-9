import {shuffle} from './utils.js';

const Colors = {
  BLACK: `black`,
  YELLOW: `yellow`,
  BLUE: `blue`,
  GREEN: `green`,
  PINK: `pink`
};

const generateTask = () => {
  const millisecondsInDay = 24 * 60 * 60 * 1000;
  return {
    description: [`Изучить теорию`,
      `Сделать домашку`,
      `Пройти интенсив на соточку`
    ][Math.floor(Math.random() * 3)],
    dueDate: Date.now() + Math.floor(Math.random() * 14) * millisecondsInDay - millisecondsInDay * 7,
    repeatingDays: {
      'mo': false,
      'tu': false,
      'we': Boolean(Math.round(Math.random())),
      'th': false,
      'fr': false,
      'sa': false,
      'su': false,
    },
    tags: new Set(
        shuffle([`homework`,
          `theory`,
          `practice`,
          `intensive`,
          `keks`
        ]).slice(0, Math.floor(Math.random() * 4))
    ),
    color: Object.values(Colors)[Math.floor(Math.random() * 5)],
    isFavorite: Boolean(Math.round(Math.random())),
    isArchive: Boolean(Math.round(Math.random())),
  };
};

const generateFilters = (dataArr) => {
  const millisecondsInDay = 24 * 60 * 60 * 1000;
  const now = Date.now();
  const today = new Date(now);
  const startToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  let favoritesCount = 0;
  let archiveCount = 0;
  let repeatingsCount = 0;
  let overdueCount = 0;
  let todayCount = 0;
  let setAllTags = new Set();

  dataArr.forEach((el) => {
    const countElapsedMillisecondsToday = el.dueDate - startToday;

    if (now > el.dueDate) {
      overdueCount++;
    }
    if (countElapsedMillisecondsToday < millisecondsInDay && countElapsedMillisecondsToday > 0) {
      todayCount++;
    }
    if (el.isFavorite) {
      favoritesCount++;
    }
    if (el.isArchive) {
      archiveCount++;
    }
    if (Object.values(el.repeatingDays).some((value) => value)) {
      repeatingsCount++;
    }
    el.tags.forEach((tag) => setAllTags.add(tag));
  });

  return [
    {
      title: `all`,
      count: dataArr.length
    },
    {
      title: `overdue`,
      count: overdueCount
    },
    {
      title: `today`,
      count: todayCount
    },
    {
      title: `favorites`,
      count: favoritesCount
    },
    {
      title: `repeating`,
      count: repeatingsCount
    },
    {
      title: `tags`,
      count: setAllTags.size
    },
    {
      title: `archive`,
      count: archiveCount
    }];
};
export {generateTask, generateFilters, Colors};
