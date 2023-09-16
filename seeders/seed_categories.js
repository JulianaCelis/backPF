

'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const categoriesData = [
      {
        name: 'Laptops y Computadoras de Escritorio',
        subcategories: [
          'Laptops',
          'Computadoras de Escritorio',
          'Componentes de Computadora',
        ],
      },
      {
        name: 'Componentes de Computadora',
        subcategories: [
          'Procesadores (CPU)',
          'Tarjetas Gráficas (GPU)',
          'Placas Base (Motherboards)',
          'Unidades de Almacenamiento (HDD, SSD)',
          'Memorias RAM',
          'Fuentes de Poder (PSU)',
          'Refrigeración (Coolers, Ventiladores)',
        ],
      },
      {
        name: 'Periféricos',
        subcategories: [
          'Teclados',
          'Ratones',
          'Monitores',
          'Auriculares y Micrófonos',
          'Impresoras y Escáneres',
          'Cámaras Web',
        ],
      },
      {
        name: 'Software',
        subcategories: [
          'Sistemas Operativos',
          'Suites de Oficina',
          'Software de Diseño',
          'Antivirus y Seguridad',
        ],
      },
      {
        name: 'Redes y Conectividad',
        subcategories: [
          'Routers y Modems',
          'Switches y Hubs',
          'Tarjetas de Red',
          'Cables y Conectores',
        ],
      },
      {
        name: 'Accesorios',
        subcategories: [
          'Fundas para Laptops',
          'Soportes para Monitores',
          'Adaptadores y Conversores',
          'Cables y Cableado',
        ],
      },
      {
        name: 'Memorias RAM',
        subcategories: ['DDR3', 'DDR4', 'DDR5'],
      },
      {
        name: 'Fuentes de Poder (PSU)',
        subcategories: [
          'Fuentes de Poder ATX',
          'Fuentes de Poder Modulares',
          'Fuentes de Poder Certificadas',
        ],
      },
      {
        name: 'Refrigeración',
        subcategories: [
          'Ventiladores de CPU',
          'Sistemas de Refrigeración Líquida',
          'Disipadores de Calor',
        ],
      },
    ];

    for (const categoryData of categoriesData) {
        const { name, subcategories } = categoryData;
  
        const categoryId = uuidv4();
  
        await queryInterface.bulkInsert(
          'Categories',
          [
            {
              id: categoryId, 
              name,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
          { returning: true }
        );
  
        for (const subcategoryName of subcategories) {
          const subcategoryId = uuidv4(); 
          await queryInterface.bulkInsert('Subcategories', [
            {
              id: subcategoryId, 
              name: subcategoryName,
              categoryId: categoryId, 
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ]);
        }
      }
  
      console.log('Categorías y subcategorías configuradas con éxito.');
    },
  
    down: async (queryInterface, Sequelize) => {
      // Eliminar datos si es necesario
    },
  };