const { Category } = require('../db');

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
    subcategories: [
      'DDR3',
      'DDR4',
      'DDR5',
    ],
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

const setupCategories = async () => {
  try {
    for (const categoryData of categoriesData) {
      const { name } = categoryData;

      let [category, created] = await Category.findOrCreate({
        where: { name },
        defaults: { name },
      });

      if (!created) {
        console.log(`Categoría principal "${name}" ya existe.`);
      }
    }

    console.log('Categorías principales configuradas con éxito.');
  } catch (error) {
    console.error('Error al configurar las categorías principales:', error);
    throw error;
  }
};

module.exports = setupCategories