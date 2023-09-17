const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2; 

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });


router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    
    const result = await cloudinary.uploader.upload(req.file.buffer, {
      folder: 'GRTECH' 
    });

    
    const imageUrl = result.secure_url;


    
    res.json({ imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al cargar la imagen' });
  }
});

module.exports = router;
