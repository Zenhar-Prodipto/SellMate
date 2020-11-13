const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

//This.COntroller
const {
  create,
  productById,
  read,
  remove,
  update,
  list,
  relatedProducts,
  categoryList,
  listBySearch,
  productPhoto,
  listSearch,
} = require("../controllers/product");

router.post("/product/create/:userId", requireSignin, isAdmin, create);
router.get("/product/:productId", read);
router.post("/product/create/:userId", requireSignin, isAuth, isAdmin, create);
router.delete("/product/:productId/:userId", requireSignin, isAdmin, remove);
router.put("/product/:productId/:userId", requireSignin, isAdmin, update);

router.get("/products", list);
router.get("/products/search", listSearch);

router.get("/products/relatedproducts/:productId", relatedProducts);
router.get("/products/catogories", categoryList);
router.post("/products/by/search", listBySearch);
router.get("/product/photo/:productId", productPhoto);

router.param("userId", userById);
router.param("productId", productById);

module.exports = router;
