const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res)=> {
  // find all categories
  // be sure to include its associated Products
  try {
    let category = await Category.findAll({include: [{model: Product}]});
    res.status(200).json(category)
  } catch(error) {
    res.status(500).json(error)
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    let category = await Category.findByPk(req.params.id, {include: [{model: Product}]});
    if (!category) {
      res.status(404).json({message: 'No category associated with this id!!'});
      return;
    } 
    res.status(200).json(category)
    
  } catch(error) {
    res.status(500).json(error);
  }
});

router.post('/', (req, res) => {
  // create a new category
  try {
    let category = Category.create({category_name: req.body.category_name})
    if (!category) {
      res.status(404).res.json({message: 'unable to create category'});
      return;
    } else {
      res.status(200).json(category)
    }
  } catch(error) {
    res.status(500).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    let category = await Category.update(req.body, {where: {id: req.params.id}});
    if (!category) {
      res.status(404).json({message: "no category found"});
      return;
    } else {
      res.status(200).json(category);
    }
  } catch(error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    let category = Category.destroy({where: {id: req.params.id}});
    if (!category) {
      res.status(404).json({message: 'no category with this id found!'});
      return;
    } else {
      res.status(200).json(category);
    }
  } catch(error) {
    res.status(500).json(error);
  }
});

module.exports = router;
