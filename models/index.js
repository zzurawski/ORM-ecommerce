// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: "category_id",
})
// Categories have many Products
Category.hasMany(Product, {
  foreignKey: "category_id",
})
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  foreignKey: "product_id",

  through: {
    model: ProductTag,
    unique: false
  },
  as: "tag-product"
})
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  foreignKey: "tag_id",

  through: {
    model: ProductTag
  },
  as: "tag-product"
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
