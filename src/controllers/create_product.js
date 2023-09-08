const { Products, Category, Subcategory, User } = require('../db.js');
const multer = require('multer');
const { isURL } = require('validator');

const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 1024 * 1024 * 5 } });

// Expresión regular para verificar si una URL termina en una extensión de archivo de imagen
const imageFileExtensions = /\.(jpg|jpeg|png|gif|bmp)$/i;

async function createProduct(req, res) {
  try {
    const { title, summary, price, stock, image, externalImageLink, categoryIds, subcategoryIds } = req.body;

    let imageBuffer = null;

    if (req.file) {
      if (req.file.size > 1024 * 1024 * 5) {
        return res.status(400).json({ error: 'La imagen es demasiado grande. El tamaño máximo permitido es de 5 MB.' });
      }

      imageBuffer = req.file.buffer;
    } else if (externalImageLink) {
      if (!isURL(externalImageLink)) {
        return res.status(400).json({ error: 'El enlace proporcionado no es una URL válida.' });
      }

      // Verifica si la URL apunta a una imagen
      if (!imageFileExtensions.test(externalImageLink)) {
        return res.status(400).json({ error: 'El enlace proporcionado no apunta a una imagen válida.' });
      }
    }

    // Crea el producto primero
    const newProduct = await Products.create({
      title,
      image: imageBuffer,
      externalImageLink,
      summary,
      price,
      stock,
    });

    await newProduct.addCategories(categoryIds);
    await newProduct.addSubcategories(subcategoryIds);
    console.log("este es el req user",req.user)
    // Agrega la relación entre el usuario y el producto
    await newProduct.setUser(req.user.id);

    return res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error al crear el producto:', error);
    res.status(500).json({ error: 'Error al crear el producto' });
  }
}

module.exports = createProduct;

