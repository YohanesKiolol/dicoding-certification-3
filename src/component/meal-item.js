class MealItem extends HTMLElement {
  constructor() {
    super();
  }

  set meal(meal) {
    this._meal = meal;
    this.render();
  }

  render() {
    this.innerHTML = `
        <style>
            a{
                cursor: pointer
            }
        </style>

        <div class="card text-white bg-dark border-secondary" style="width: 18rem;">
            <img class="card-img-top" src="${this._meal.strMealThumb}" alt="${this._meal.idMeal}-img">
            <div class="card-body">
                <h5 class="card-title">${this._meal.strMeal}</h5>
                <a id="${this._meal.idMeal}" class="btn btn-default text-white">View details »</a>
            </div>
        </div>
    `;
  }
}

customElements.define("meal-item", MealItem);
