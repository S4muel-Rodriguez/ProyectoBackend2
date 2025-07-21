📦 Proyecto Backend 2 - E-commerce API

Este proyecto es un servidor backend para un sistema de e-commerce, desarrollado como parte de la entrega final de Backend CoderHouse. Implementa autenticación y autorización con JWT y Passport, un sistema de compra con tickets, arquitectura DAO/DTO/Repository y control de roles.

🚀 Características

✅ Autenticación y autorización con JWT y Passport.
✅ CRUD de usuarios, productos, carritos y tickets.
✅ Middleware para control de roles (admin / user).
✅ Generación de tickets al finalizar compras.
✅ Arquitectura profesional: DAO, DTO, Repository.
✅ Variables de entorno para configuración segura.
✅ Documentación de endpoints para Postman.

git clone https://github.com/S4muel-Rodriguez/ProyectoBackend2.git
cd ProyectoBackend2


npm install

PORT=3000
MONGO_URL=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/<baseDeDatos>?retryWrites=true&w=majority
JWT_SECRET=tu_secreto_jwt

nodemon server.js