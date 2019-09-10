import {Colors} from './data.js';
import {createElement} from "./utils";

export default class TaskEdit {
  constructor({description, dueDate, repeatingDays, tags, color, isFavorite, isArchive}) {
    this._description = description;
    this._dueDate = new Date(dueDate);
    this._tags = tags;
    this._color = color;
    this._element = null;
    this._repeatingDays = repeatingDays;
    this._isFavorite = isFavorite;
    this._isArchive = isArchive;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    if (this._element) {
      this._element = null;
    }
  }

  getTemplate() {
    return `
      <article class="card card--edit card--${this._color} ${Object.keys(this._repeatingDays).some((day) => this._repeatingDays[day]) ? `
      card--repeat` : ``}">
                  <form class="card__form" method="get">
                    <div class="card__inner">
                      <div class="card__control">
                        <button type="button" class="card__btn card__btn--archive ${this._isArchive ? `` : `card__btn--disabled`}">
                          archive
                        </button>
                        <button
                          type="button"
                          class="card__btn card__btn--favorites card__btn--disabled" ${this._isFavorite ? `` : `card__btn--disabled`}
                        >
                          favorites
                        </button>
                      </div>
      
                      <div class="card__color-bar">
                        <svg class="card__color-bar-wave" width="100%" height="10">
                          <use xlink:href="#wave"></use>
                        </svg>
                      </div>
      
                      <div class="card__textarea-wrap">
                        <label>
                          <textarea
                            class="card__text"
                            placeholder="Start typing your text here..."
                            name="text"
                          >${this._description}</textarea>
                        </label>
                      </div>
      
                      <div class="card__settings">
                        <div class="card__details">
                          <div class="card__dates">
                            <button class="card__date-deadline-toggle" type="button">
                              date: <span class="card__date-status">yes</span>
                            </button>
      
                            <fieldset class="card__date-deadline">
                              <label class="card__input-deadline-wrap">
                                <input
                                  class="card__date"
                                  type="text"
                                  placeholder=""
                                  name="date"
                                  value="${new Date(this._dueDate).toString()}"
                                />
                              </label>
                            </fieldset>
      
                            <button class="card__repeat-toggle" type="button">
                              repeat:<span class="card__repeat-status">${Object.keys(this._repeatingDays).some((day) => this._repeatingDays[day]) ? `yes` : `no`}</span>
                            </button>
      
                            <fieldset class="card__repeat-days">
                              <div class="card__repeat-days-inner">
                                <input
                                  class="visually-hidden card__repeat-day-input"
                                  type="checkbox"
                                  id="repeat-mo-4"
                                  name="repeat"
                                  value="mo"
                                  ${this._repeatingDays[`mo`] ? `checked` : ``}
                                />
                                <label class="card__repeat-day" for="repeat-mo-4"
                                  >mo</label
                                >
                                <input
                                  class="visually-hidden card__repeat-day-input"
                                  type="checkbox"
                                  id="repeat-tu-4"
                                  name="repeat"
                                  value="tu"
                                  ${this._repeatingDays[`tu`] ? `checked` : ``}
                                />
                                <label class="card__repeat-day" for="repeat-tu-4"
                                  >tu</label
                                >
                                <input
                                  class="visually-hidden card__repeat-day-input"
                                  type="checkbox"
                                  id="repeat-we-4"
                                  name="repeat"
                                  value="we"
                                  ${this._repeatingDays[`we`] ? `checked` : ``}
                                />
                                <label class="card__repeat-day" for="repeat-we-4"
                                  >we</label
                                >
                                <input
                                  class="visually-hidden card__repeat-day-input"
                                  type="checkbox"
                                  id="repeat-th-4"
                                  name="repeat"
                                  value="th"
                                  ${this._repeatingDays[`th`] ? `checked` : ``}
                                />
                                <label class="card__repeat-day" for="repeat-th-4"
                                  >th</label
                                >
                                <input
                                  class="visually-hidden card__repeat-day-input"
                                  type="checkbox"
                                  id="repeat-fr-4"
                                  name="repeat"
                                  value="fr"
                                  ${this._repeatingDays[`fr`] ? `checked` : ``}
                                />
                                <label class="card__repeat-day" for="repeat-fr-4"
                                  >fr</label
                                >
                                <input
                                  class="visually-hidden card__repeat-day-input"
                                  type="checkbox"
                                  name="repeat"
                                  value="sa"
                                  id="repeat-sa-4"
                                  ${this._repeatingDays[`sa`] ? `checked` : ``}
                                />
                                <label class="card__repeat-day" for="repeat-sa-4"
                                  >sa</label
                                >
                                <input
                                  class="visually-hidden card__repeat-day-input"
                                  type="checkbox"
                                  id="repeat-su-4"
                                  name="repeat"
                                  value="su"
                                  ${this._repeatingDays[`su`] ? `checked` : ``}
                                />
                                <label class="card__repeat-day" for="repeat-su-4"
                                  >su</label
                                >
                              </div>
                            </fieldset>
                          </div>
      
                          <div class="card__hashtag">
                            <div class="card__hashtag-list">
                            ${Array.from(this._tags).map((tag) => `<span class="card__hashtag-inner">
                                <input
                                  type="hidden"
                                  name="hashtag"
                                  value="repeat"
                                  class="card__hashtag-hidden-input"
                                />
                                <p class="card__hashtag-name">
                                  #${tag}
                                </p>
                                <button type="button" class="card__hashtag-delete">
                                  delete
                                </button>
                              </span>`).join(``)}
                            </div>
      
                            <label>
                              <input
                                type="text"
                                class="card__hashtag-input"
                                name="hashtag-input"
                                placeholder="Type new hashtag here"
                              />
                            </label>
                          </div>
                        </div>
      
                        <div class="card__colors-inner">
                          <h3 class="card__colors-title">Color</h3>
                          <div class="card__colors-wrap">
                            <input
                              type="radio"
                              id="color-${Colors.BLACK}-4"
                              class="card__color-input card__color-input--${Colors.BLACK} visually-hidden"
                              name="color"
                              value="${Colors.BLACK}"
                              ${this._color === Colors.BLACK ? `checked` : ``}
                            />
                            <label
                              for="color-${Colors.BLACK}-4"
                              class="card__color card__color--${Colors.BLACK}"
                              >black</label
                            >
                            <input
                              type="radio"
                              id="color-${Colors.YELLOW}-4"
                              class="card__color-input card__color-input--${Colors.YELLOW} visually-hidden"
                              name="color"
                              value="${Colors.YELLOW}"
                              ${this._color === Colors.YELLOW ? `checked` : ``}
                            />
                            <label
                              for="color-${Colors.YELLOW}-4"
                              class="card__color card__color--${Colors.YELLOW}"
                              >yellow</label
                            >
                            <input
                              type="radio"
                              id="color-${Colors.BLUE}-4"
                              class="card__color-input card__color-input--${Colors.BLUE} visually-hidden"
                              name="color"
                              value="${Colors.BLUE}"
                              ${this._color === Colors.BLUE ? `checked` : ``}
                            />
                            <label
                              for="color-${Colors.BLUE}-4"
                              class="card__color card__color--${Colors.BLUE}"
                              >blue</label
                            >
                            <input
                              type="radio"
                              id="color-${Colors.GREEN}-4"
                              class="card__color-input card__color-input--${Colors.GREEN} visually-hidden"
                              name="color"
                              value="${Colors.GREEN}"
                              ${this._color === Colors.GREEN ? `checked` : ``}
                            />
                            <label
                              for="color-${Colors.GREEN}-4"
                              class="card__color card__color--${Colors.GREEN}"
                              >green</label
                            >
                            <input
                              type="radio"
                              id="color-${Colors.PINK}-4"
                              class="card__color-input card__color-input--${Colors.PINK} visually-hidden"
                              name="color"
                              value="${Colors.PINK}"
                              ${this._color === Colors.PINK ? `checked` : ``}
                            />
                            <label
                              for="color-${Colors.PINK}-4"
                              class="card__color card__color--${Colors.PINK}"
                              >pink</label
                            >
                          </div>
                        </div>
                      </div>
      
                      <div class="card__status-btns">
                        <button class="card__save" type="submit">save</button>
                        <button class="card__delete" type="button">delete</button>
                      </div>
                    </div>
                  </form>
                </article>`;
  }
}
