const { Products, User, Reviews } = require('../../db');

async function toggleActive(modelName, id, active) {
  try {
    let Model;
    switch (modelName) {
      case 'Products':
        Model = Products;
        break;
      case 'User':
        Model = User;
        break;
      case 'Reviews':
        Model = Reviews;
        break;
      default:
        throw new Error('Modelo no válido');
    }

    const existingRecord = await Model.findOne({
      where: {
        id,
      },
    });

    if (!existingRecord) {
      throw new Error('Registro no encontrado'); 
    }

    const updatedRecord = await Model.update(
      { active },
      {
        where: {
          id,
        },
        returning: true,
      }
    );

    if (updatedRecord[0] === 1) {
      return updatedRecord[1][0]; 
    } else {
      throw new Error('No se pudo actualizar el registro');
    }
  } catch (error) {
    throw error;
  }
}

module.exports = toggleActive;
