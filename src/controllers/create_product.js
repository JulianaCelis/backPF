const { Products } = require('../db.js');
const multer = require('multer');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function createProduct(req, res) {
  try {
    const { title, summary, price, stock, categoryIds, subcategoryIds } = req.body;
    let imageUrls = [];

    if (req.files && req.files.images) {
      const images = Array.isArray(req.files.images) ? req.files.images : [req.files.images];

      for (const image of images) {
        const uploadResponse = await cloudinary.uploader.upload(image.tempFilePath, {
          folder: 'GRTECH', // Cambia el nombre de la carpeta según tus necesidades
        });

        if (uploadResponse && uploadResponse.secure_url) {
          imageUrls.push(uploadResponse.secure_url);
        }
      }
    }

    const newProduct = await Products.create({
      title,
      images: imageUrls, // Almacena las URLs de las imágenes en el campo "images"
      summary,
      price,
      stock,
    });

    await newProduct.addCategories(categoryIds);
    await newProduct.addSubcategories(subcategoryIds);

    // Asigna el usuario actual como propietario del producto (reemplaza con tu lógica de autenticación)
    // Ejemplo: await newProduct.setUser(req.user.id);

    return res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error al crear el producto:', error);
    res.status(500).json({ error: 'Error al crear el producto' });
  }
}

module.exports = createProduct;
