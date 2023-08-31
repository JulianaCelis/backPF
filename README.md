E-Commerce de Productos de Cómputo: GPlayTech

Este es el repositorio del backend para un E-Commerce de productos de cómputo. Aquí encontrarás la implementación del servidor y la lógica para manejar los usuarios, productos y direcciones de envío en tu tienda en línea.

Características Principales

• Registro de usuarios con opciones de comprador y vendedor.

• Gestión de productos, categorías y reseñas.

• Asociación de direcciones de envío a usuarios.

• Rutas API organizadas para interactuar con la aplicación.

• Uso de validaciones para garantizar la integridad de los datos.


Tecnologías Utilizadas

• Node.js

• Express.js

• Sequelize (ORM para PostgreSQL)

• PostgreSQL (Base de Datos)

JSON Web Tokens (JWT) para autenticación y seguridad

Instalación y Configuración
1. Clona este repositorio: git clone 
2. Instala las dependencias: npm install
Configura las variables de entorno en un archivo .env
3. Configuración de la Base de Datos
4. Crea una base de datos en PostgreSQL.
5. Configura las credenciales de la base de datos en el archivo .env.

Uso
1. Ejecuta el servidor: npm start
2. Accede a las rutas API a través de http://localhost:PUERTO/api/...

Rutas API
/api/users/register: Registro de usuarios.
/api/products: Gestión de productos.
/api/categories: Gestión de categorías.
/api/reviews: Gestión de reseñas.
/api/shipping-addresses: Gestión de direcciones de envío.
