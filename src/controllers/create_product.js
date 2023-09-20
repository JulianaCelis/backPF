const { Products, Category, Subcategory, User } = require('../db.js');
const multer = require('multer');
const { isURL } = require('validator');

const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 1024 * 1024 * 5 } });

const imageFileExtensions = /\.(jpg|jpeg|png|gif|bmp)$/i;

async function createProduct(req, res) {
  try {
    const { title, summary, price, stock, images, categoryIds, subcategoryIds } = req.body;

    let imagesArray = null;

    if (req.file) {
      if (req.file.size > 1024 * 1024 * 5) {
        return res.status(400).json({ error: 'La imagen es demasiado grande. El tamaño máximo permitido es de 5 MB.' });
      }

      imagesArray = [req.file.buffer.toString('base64')];
    }

    if (images && typeof images === 'string') {
      if (!isURL(images)) {
        return res.status(400).json({ error: 'El enlace proporcionado en "images" no es una URL válida.' });
      }

      if (!imageFileExtensions.test(images)) {
        return res.status(400).json({ error: 'El enlace proporcionado en "images" no apunta a una imagen válida.' });
      }

      imagesArray = [images];
    }

    const newProduct = await Products.create({
      title,
      images: imagesArray,
      summary,
      price,
      stock,
    });

    await newProduct.addCategories(categoryIds);
    await newProduct.addSubcategories(subcategoryIds);
    console.log("este es el req user", req.user)

    await newProduct.setUser(req.user.id);

    return res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error al crear el producto:', error);
    res.status(500).json({ error: 'Error al crear el producto' });
  }
}
module.exports = createProduct;


