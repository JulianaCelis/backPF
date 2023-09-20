const express = require('express');
const softDeleteRouter = express.Router();
const { toggleActive } = require ('../controllers/index');

softDeleteRouter.put('/activate', async (req, res) => {
    const { model, id, activateValue } = req.body; 
  
    try {
      const result = await toggleActive(model, id, activateValue);
      return res.json(result);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

module.exports = softDeleteRouter;