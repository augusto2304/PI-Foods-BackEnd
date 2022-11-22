var express = require('express');
var router = express.Router();
const { Recipe } = require('../db');
const{ getAll, addRecipe, getIdRecipe} = require('../controllers/controller');



router.get('/' , async (req,res) => {
    const { name } = req.query;
    const allRecipes = await getAll();
    try {
        if(name){
            const resultFilter = allRecipes.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
            if(resultFilter.length === 0) {return res.status(404).send('No se encontro ninguna receta.')}
            return res.status(200).send(resultFilter)
        }else{
            return res.status(201).send(allRecipes)
        }

        
    } catch (error) {
        console.error(error)
        
    }
});




router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const idRecipes = await getIdRecipe(id);
        return res.send(idRecipes);
    } 
    catch (error) {
        return res.status(404).send(error.message)
    }
  }); 




  router.post('/' , async (req,res) => {
    try {
       await addRecipe(req.body)
       res.status(200).send("Se creo la receta")
    } catch (error) {
        return res.status(404).send(error.message)
    }
})


module.exports = router