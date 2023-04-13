const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    let tag = await Tag.findAll({include: {model: Product}});
    res.status(200).json(tag)
  } catch (error) {
    res.status(500).json(error)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    let tag = await Tag.findByPk(req.params.id, {include:{model: Product}});
    if (!tag) {
      res.status(404).json({message: 'no tag with this id!'});
      return;
    } else {
      res.status(200).json(tag)
    }
  } catch(error) {
    res.status(500).json(error)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try{
    let tag = await Tag.create({tag_name: req.body.tag_name});
    if(!tag) {
      res.status(404).json({message: 'no tag with this id!'});
      return;
    } else {
      res.status(200).json(tag)
    }
  } catch(error) {
    res.status(500).json(error)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
    let tag = await Tag.update(req.body, {where: {id: req.params.id}});
    if (!tag) {
      res.status(404).json({message: 'no tag with this id!'});
      return;
    } else {
      res.status(200).json(tag)
    }
  } catch(error) {
    res.status(500).json(error)
  }
  }
);

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try{
    let tag = await Tag.destroy({where:{id: req.params.id}});
    if (!tag) {
      res.status(404).json({message: 'no tag with this id!'});
      return;
    } else {
      res.status(200).json(tag);
    }
  } catch(error) {
    res.status(500).json(error)
  }
});

module.exports = router;
