class ListCategory extends HTMLElement {
  constructor() {
    super();
  }

  set categories(categories) {
    this._categories = categories;
    this.render();
  }

  set clickEvent(event) {
    this._clickEvent = event;
    this.render();
  }

  render() {
    const categoriesContainer = document.createElement("div");
    categoriesContainer.classList.add("list-group");
    categoriesContainer.innerHTML = "";

    this._categories.forEach((category) => {
      const mealsName = Object.keys(category);
      const categoryLink = document.createElement("a");
      categoryLink.classList.add(
        "list-group-item",
        "list-group-item-action",
        "d-flex",
        "justify-content-between",
        "align-items-center",
        "text-white",
        "bg-dark",
        "border-secondary"
      );
      categoryLink.setAttribute("href", "#");
      categoryLink.setAttribute("value", mealsName);
      categoryLink.addEventListener("click", this._clickEvent);
      categoryLink.innerHTML = `
        ${mealsName} <span class="badge bg-primary rounded-pill pe-none">${category[mealsName]}</span>`;

      categoriesContainer.appendChild(categoryLink);
    });
    this.appendChild(categoriesContainer);
  }
}

customElements.define("list-category", ListCategory);
