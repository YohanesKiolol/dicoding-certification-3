import "./meal-item.js";

class ListMeal extends HTMLElement {
  constructor() {
    super();
  }

  set meals(meals) {
    this._meals = meals;
    this.render();
  }

  render() {
    this.classList.add("d-flex");
    this.style.justifyContent = "center";
    this.style.flexWrap = "wrap";
    this.style.gap = "20px";
    this.innerHTML = "";
    this._meals.forEach((meal) => {
      const mealItem = document.createElement("meal-item");
      mealItem.meal = meal;
      this.appendChild(mealItem);
    });
  }
}

customElements.define("list-meal", ListMeal);
