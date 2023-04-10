import productShema from "../validate/product.js";
import Product from "../Model/products.js";
import Cateproduct from "../Model/cateproduct.js";
export const getAllproduct = async (req, res) => {
  try {
    const products = await Product.find().populate({
      path: "cateId",
    });
    if (!products) {
      return res.status(401).json({
        message: "Không tìm thấy sản phẩm nào",
      });
    }
    return res.status(200).json({
      message: "Thành công",
      products,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const getOneproduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findOne({ _id: id });
    if (!product) {
      return res.status(401).json({
        message: "Không tìm thấy sản phẩm nào",
      });
    }
    return res.status(200).json({
      message: "Thành công",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const productAdd = async (req, res) => {
  try {
    const { error } = productShema.validate(req.body);
    if (error) {
      const errors = error.details.map((items) => items.message);
      return res.status(401).json({
        message: errors,
      });
    }
    const newProduct = await Product.create(req.body);

    await Cateproduct.findByIdAndUpdate(newProduct.cateId, {
      $addToSet: {
        products: newProduct._id,
      },
    });
    if (!newProduct) {
      return res.status(400).json({
        message: "Thêm sản phẩm thất bại",
      });
    }
    return res.status(200).json({
      message: "Thêm sản phẩm thành công",
      newProduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error,
    });
  }
};

export const productRemove = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    await Cateproduct.findByIdAndUpdate(product.cateId, {
      $pull: {
        products: product._id,
      },
    });
    const productDelete = await Product.findByIdAndDelete(id);
    if (!productDelete) {
      return res.status(401).json({
        message: "Xóa sản phẩm thất bại",
      });
    }
    return res.status(200).json({
      message: "Xóa sản phẩm thành công",
      productDelete,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const productupdate = async (req, res) => {
  try {
    const id = req.params.id;
    // const { error } = productShema.validate(req.body);
    // if (error) {
    //   const errors = error.details.map((items) => items.message);
    //   return res.status(401).json({
    //     message: errors,
    //   });
    // }
    const productold = await Product.findOne({ _id: id });
    if (productold.cateId == req.body.cateId) {
      const productUpdated = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!productUpdated) {
        return res.status(400).json({
          message: "Cập nhật thất bại",
        });
      }
      return res.status(200).json({
        message: "Cập nhật thành công",
        productUpdated,
      });
    } else {
      await Cateproduct.findOneAndUpdate(
        { _id: productold.cateId },
        { $pull: { products: id } },
        { new: true }
      );
      await Cateproduct.findOneAndUpdate(
        {
          _id: req.body.cateId,
        },
        { $addToSet: { products: id } },
        { new: true }
      );
      const productUpdated = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!productUpdated) {
        return res.status(400).json({
          message: "Cập nhật thất bại",
        });
      }
      return res.status(200).json({
        message: "Cập nhật thành công",
        productUpdated,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const getOnecate = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findOne({ categoryId: id });
    if (!product) {
      return res.status(401).json({
        message: "Không tìm thấy sản phẩm nào",
      });
    }
    return res.status(200).json({
      message: "Thành công",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
export const getAllcateproduct = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const product = await Product.find({ cateId: id });
    if (!product) {
      return res.status(401).json({
        message: "Không tìm thấy sản phẩm nào",
      });
    }
    return res.status(200).json({
      message: "Thành công",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const getAllproductSort = async (req, res) => {
  try {
    let query;
    if (req.query.nameAz) {
      query = { nameProduct: 1 };
      console.log("abc");
    }
    if (req.query.nameZa) {
      query = { nameProduct: -1 };
    }
    if (req.query.priceAz) {
      query = { price: 1 };
    }
    if (req.query.priceZa) {
      query = { price: -1 };
    }
    const products = await Product.find().sort(query).populate({
      path: "categoryId",
      select: "nameCategory",
    });
    if (!products) {
      return res.status(401).json({
        message: "Không tìm thấy sản phẩm nào",
      });
    }
    return res.status(200).json({
      message: "Thành công",
      products,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
