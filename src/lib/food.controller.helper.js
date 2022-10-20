const paginate = ({ limit, page, foods }) => {
  const indexLast = page * limit;
  const indexFirst = indexLast - limit;
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(foods.length / limit); i++) {
    pageNumbers.push(i);
  }

  const current = foods.slice(indexFirst, indexLast);

  return { foods: current, pages: pageNumbers[pageNumbers.length - 1] };
};



const sortNames = ({ foods, sort }) => {
  if (sort === "AZ") {
    foods = foods.sort((a, b) => {
      if (a.title > b.title) return 1;
      if (a.title < b.title) return -1;
      return 0;
    });
  }
  if (sort === "ZA") {
    foods = foods.sort((a, b) => {
      if (a.title < b.title) return 1;
      if (a.title > b.title) return -1;
      return 0;
    });
  }
  if (sort === "lowest to highest") {
    foods = foods.sort((a, b) => {
      if (a.price > b.price) return 1;
      if (a.price < b.price) return -1;
      return 0;
    });
  }
  if (sort === "highest to lowest") {
    foods = foods.sort((a, b) => {
      if (a.price < b.price) return 1;
      if (a.price > b.price) return -1;
      return 0;
    });
  }

  return foods;
};

const getByDiet = ({ foods, diet }) => {
  return foods.filter((food) => food.genres.includes(diet));
};

const getByTitle = ({ foods, title }) => {
  return foods.filter((food) =>
    food.title.toLowerCase().includes(title.toLowerCase())
  );
};


module.exports = {
  paginate,
  sortNames,
  getByDiet,
  getByTitle
}