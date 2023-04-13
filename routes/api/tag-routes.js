const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    let tag = Tag.findAll({include: {model: Product}});
    res.status(200).json(tag)
  } catch (error) {
    res.status(500).json(error)
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    let tag = Tag.findByPk(req.params.id, {include:{model: Product}});
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

router.post('/', (req, res) => {
  // create a new tag
  try{
    let tag = Tag.create({tag_name: req.body.tag_name});
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

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try{
    let tag = Tag.update(req.body, {where: {id: req.params.id}});
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

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try{
    let tag = Tag.destroy({where:{id: req.params.id}});
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
