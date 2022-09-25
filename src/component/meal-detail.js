import { getVideoInfo } from "youtube-video-exists";

class MealDetail extends HTMLElement {
  constructor() {
    super();
  }

  set detail(detail) {
    this._detail = detail;
    this.render();
  }

  getYoutubeId = (url) => {
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  };

  getYoutubeStatus = async () => {
    const status = await getVideoInfo(
      this.getYoutubeId(this._detail.strYoutube)
    ).then(({ existing }) => existing);
    return status;
  };

  render() {
    const ingredients = {};

    for (const [key, value] of Object.entries(this._detail)) {
      if (value && key.match(/strIngredient\d+/g))
        ingredients[value.charAt(0).toUpperCase() + value.slice(1)] =
          this._detail[`strMeasure${key.match(/\d+/g)}`];
    }

    this.innerHTML = `
        <div id="detail-card" class="card text-white bg-dark border-secondary my-4">
            <div id="detail-body" class="card-body">
                <h3 class="card-title mb-4">${this._detail.strMeal}</h3>
                <p class="card-text my-4">${this._detail.strInstructions}</p>
                <ul id="list-ingredients" class="list-group"></ul>
            </div>
        </div>
    `;

    for (const [key, value] of Object.entries(ingredients)) {
      const ingredientElement = document.createElement("li");
      ingredientElement.classList.add(
        "list-group-item",
        "text-white",
        "bg-dark",
        "border-secondary"
      );
      ingredientElement.innerHTML = `
        <div class="d-flex justify-content-between" >
            <span>${key}</span>
            <span>${value}</span>
        </div>
      `;
      document
        .getElementById("list-ingredients")
        .appendChild(ingredientElement);
    }

    this.getYoutubeStatus().then((value) => {
      const firstChild = document.querySelector("#detail-body");

      if (value) {
        const iframeContainer = document.createElement("div");
        iframeContainer.classList.add("embed-responsive");
        iframeContainer.innerHTML = `
            <iframe 
                class="embed-responsive-item" 
                src="${this._detail.strYoutube.replace("watch?v=", "embed/")}" 
                allowfullscreen
                style="width: 100%; height:400px; padding:20px 20px 0 20px; border:none; border-radius:0.375rem"
            ></iframe>
        `;

        document
          .getElementById("detail-card")
          .insertBefore(iframeContainer, firstChild);
      } else {
        const img = document.createElement("img");
        img.setAttribute("src", this._detail.strMealThumb);
        img.setAttribute("alt", `${this._detail.idMeal}-img`);
        document.getElementById("detail-card").insertBefore(img, firstChild);
      }
    });
  }
}

customElements.define("meal-detail", MealDetail);
