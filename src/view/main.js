import axios from "axios";
import "../component/list-category.js";
import "../component/list-meal.js";
import "../component/meal-detail.js";

const main = () => {
  const categoryListElement = document.querySelector("list-category");
  const categoryLinksElement = categoryListElement.getElementsByTagName("a");
  const mealListElement = document.querySelector("list-meal");
  const mealLinksElement = mealListElement.getElementsByTagName("a");
  const mealDetailElement = document.querySelector("meal-detail");

  const getCategories = async () => {
    let categories = [];
    try {
      categories = await axios
        .get("https://www.themealdb.com/api/json/v1/1/categories.php")
        .then(({ data }) =>
          data.categories.map((category) => category.strCategory)
        );
    } catch ({ message }) {
      alertMessage(message);
    }

    const endPoints = categories.map((category) => {
      return {
        endPoint: `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,
        category,
      };
    });

    const categoriesData = await axios.all(
      endPoints.map(async ({ endPoint, category }) => {
        const categoryData = {};

        const { data } = await axios.get(endPoint);
        const mealLength = await data.meals.length;

        categoryData[category] = mealLength;
        return categoryData;
      })
    );

    categoriesData.sort((a, b) => Object.values(b) - Object.values(a));
    categoriesData ? renderCategories(categoriesData) : alertMessage();
  };

  const getMealsByCategory = async (category) => {
    try {
      const meals = await axios
        .get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        .then(({ data }) => data.meals);

      meals ? renderMeals(meals) : alertMessage();
    } catch ({ message }) {
      alertMessage(message);
    }
  };

  const getDetailMeal = async (mealId) => {
    try {
      const detail = await axios
        .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(({ data }) => data.meals);

      detail ? renderDetail(detail[0]) : alertMessage();
    } catch ({ message }) {
      alertMessage(message);
    }
  };

  const renderCategories = (categories) => {
    categoryListElement.categories = categories;

    for (const link of categoryLinksElement) {
      link.addEventListener("click", ({ target }) =>
        getMealsByCategory(target.getAttribute("value"))
      );
    }
  };

  const renderMeals = (meals) => {
    const mealDetail = document.querySelector("meal-detail");
    mealDetail.innerHTML = ``;
    mealListElement.meals = meals;

    for (const meals of mealLinksElement) {
      meals.addEventListener("click", ({ target }) => {
        getDetailMeal(target.id);
      });
    }
  };

  const renderDetail = (detail) => {
    mealDetailElement.detail = detail;
    window.scrollTo(0, 0);
  };

  const alertMessage = (message = "No Data") => {
    alert(message);
  };

  document.addEventListener("DOMContentLoaded", () => {
    getCategories();
  });
};

export default main;
