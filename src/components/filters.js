export const createFilters = (filters) => `
      <section class="main__filter filter container">
        <input
          type="radio"
          id="filter__all"
          class="filter__input visually-hidden"
          name="filter"
          checked
          ${filters[0].count ? `` : `disabled`}
        />
        <label for="filter__all" class="filter__label">
          All <span class="filter__all-count">${filters[0].count}</span></label
        >
        <input
          type="radio"
          id="filter__overdue"
          class="filter__input visually-hidden"
          name="filter"
          ${filters[1].count ? `` : `disabled`}
        />
        <label for="filter__overdue" class="filter__label"
          >Overdue <span class="filter__overdue-count">${filters[1].count}</span></label
        >
        <input
          type="radio"
          id="filter__today"
          class="filter__input visually-hidden"
          name="filter"
          ${filters[2].count ? `` : `disabled`}
        />
        <label for="filter__today" class="filter__label"
          >Today <span class="filter__today-count">${filters[2].count}</span></label
        >
        <input
          type="radio"
          id="filter__favorites"
          class="filter__input visually-hidden"
          name="filter"
          ${filters[3].count ? `` : `disabled`}
        />
        <label for="filter__favorites" class="filter__label"
          >Favorites <span class="filter__favorites-count">${filters[3].count}</span></label
        >
        <input
          type="radio"
          id="filter__repeating"
          class="filter__input visually-hidden"
          name="filter"
          ${filters[4].count ? `` : `disabled`}
        />
        <label for="filter__repeating" class="filter__label"
          >Repeating <span class="filter__repeating-count">${filters[4].count}</span></label
        >
        <input
          type="radio"
          id="filter__tags"
          class="filter__input visually-hidden"
          name="filter"
          ${filters[5].count ? `` : `disabled`}
        />
        <label for="filter__tags" class="filter__label"
          >Tags <span class="filter__tags-count">${filters[5].count}</span></label
        >
        <input
          type="radio"
          id="filter__archive"
          class="filter__input visually-hidden"
          name="filter"
          ${filters[6].count ? `` : `disabled`}
        />
        <label for="filter__archive" class="filter__label"
          >Archive <span class="filter__archive-count">${filters[6].count}</span></label
        >
      </section>
`;
