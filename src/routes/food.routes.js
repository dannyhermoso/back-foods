const { Router } = require("express")

const {
    dataApi,
    getFoods,
    getFoodById,
    postFood,
    putFood,
    deleteFood,
    getDiets,
    getFoodsRestaurant,
    foodsIdInRestaurant
} = require("../controllers/food.controller.js")


const router = Router();

//PARA LLENAR LA BASE DE DATOS
// router.get('/data', dataApi)


//PARA RELACIONAR COMIDAS Y RESTAURANTES
// router.get('/infoid', foodsIdInRestaurant)


router.get('/', getFoods)

router.get('/diets', getDiets)

router.post('/', postFood)

//
router.get('/foodsRestaurant/:idRestaurant', getFoodsRestaurant)

//Get de una comida con id de la comida
router.get('/:idFood', getFoodById)


//Post (CREAR HACER RELACION)
router.post('/:idRestaurant', postFood)


//Update de una comida
router.put('/:idFood', putFood)


//Eliminar una comida
router.delete('/:idFood', deleteFood)


module.exports = router;
