import Cateproduct from "../Model/cateproduct.js";
import cateproductShema from "../validate/cateProduct.js";
import Product from "../Model/products.js";
export const getAllcate = async (req, res) => {
  try {
    const cates = await Cateproduct.find();
    if (!cates) {
      return res.status(401).json({
        message: "Không tìm thấy danh mục nào",
      });
    }
    return res.status(200).json({
      message: "Thành công",
      cates,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const getOnecate = async (req, res) => {
  try {
    const id = req.params.id;
    const cate = await Cateproduct.findOne({ _id: id });
    if (!cate) {
      return res.status(401).json({
        message: "Không tìm  danh mục",
      });
    }
    return res.status(200).json({
      message: "Thành công",
      cate,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const addCate = async (req, res) => {
  try {
    const body = req.body;
    const { error } = cateproductShema.validate(body);
    if (error) {
      const errors = error.detail.map((items) => items.message);
      return res.status(401).json({
        message: errors,
      });
    }
    const cate = await Cateproduct.create(body);
    if (!cate) {
      return res.status(401).json({
        message: "Thêm thất bại",
      });
    }
    return res.status(200).json({
      message: "Thành công",
      cate,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const cateUpdate = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const newcate = {
      name: body.name,
      products: body.products,
    };
    const cateupdated = await Cateproduct.findOneAndUpdate(
      { _id: id },
      newcate,
      {
        new: true,
      }
    );
    if (!cateupdated) {
      return res.status(401).json({
        message: "Cập nhật thất bại",
      });
    }
    return res.status(200).json({
      message: "Thành công",
      cateupdated,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
export const cateRemove = async (req, res) => {
  try {
    const id = req.params.id;
    const productUpdate = await Product.find({ cateId: id });
    for (const product of productUpdate) {
      await Product.findOneAndUpdate(
        { _id: product._id },
        { cateId: "64313f24a90c165016a56810" },
        { new: true }
      );
    }
    await Cateproduct.findOneAndUpdate(
      { _id: "64313f24a90c165016a56810" },
      {
        products: [...productUpdate],
      }
    );

    const cate = await Cateproduct.findOneAndRemove({ _id: id });
    if (!cate) {
      return res.status(401).json({
        message: "Xóa thất bại",
      });
    }
    return res.status(200).json({
      message: "Thành công",
      cate,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
