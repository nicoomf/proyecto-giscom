# Sistema de apoyo para la gestion web del grupo de investigacion GISCOM de la Universidad del Bío-Bío.

El proyecto esta diseñado para facilitar la gestion de las distintas actividades e investigaciones que realiza el grupo de investigacion Giscom. Con funciones como realizar publicaciones de distintas categorias como noticias, proyectos de titulo, investigaciones, etc. O tambien el poder programar eventos como cursos, charlas o actividades que realicen como grupo y que el publico en general pueda suscribirse a dichas actividades y reciban correos automaticos como recordatorios, confirmacion de suscripcion o mensajes personalizados que envien los investigadores. Este proyecto esta dirigido a todo tipo de publico que tenga interes en recibir informacion de las distintas areas en las que el grupo se especializa.

## Software stack:

El proyecto GISCOM es una aplicación web que corre sobre el siguiente software:

- Ubuntu 18.04.6 LTS (Bionic Beaver)
- PM2 5.2.0
- NodeJS 16.16.0
- MongoDB Atlas Cluster v5.0.12
- ExpressJS 4.17.1

## Configuraciones de Ejecución para Entorno de Desarrollo/Produccción:

1. Instalar NodeJS v16.16.0 LTS (o superior) de https://nodejs.org/es/

2. Realizar un git clone del repositorio: https://github.com/nicoomf/proyecto-giscom.git

```bash
git clone https://github.com/nicoomf/proyecto-giscom.git
```

3. Abrir una terminal en la raiz del proyecto clonado.

4. Ejecutar el siguiente comando:

```bash
npm install
```

5. Ejecutar el siguiente comando:

```bash
npm start
```

**PARA EJECUTAR CORRECTAMENTE EL PROYECTO DEBE CONTAR CON EL ARCHIVO .env EL CUAL PUEDE SER SOLICITADO AL DESARROLLADOR DEL PROYECTO.**

### Credenciales de Base de Datos y variables de ambiente:

1. Copiar el archivo .env proporcionado por el desarrollador en la raiz del proyecto.

2. **IMPORTANTE**: Por razones de Seguridad **NO** se incluyen las variables de entorno en este documento.

### Docker, Máquina Virtual, Sistema Operativa:

1. Instalar Docker en su dispositivo.

2. Abrir una terminal dentro del directorio raiz donde fue clonado este repositorio, por ej: `../git/mi-proyecto/`.

3. Ejecutar el siguiente comando para construir la imagen docker:

```bash
docker build -t giscom .
```

4. Ejecutar el siguiente comando para iniciar la imagen docker:

  ```bash
  docker run --rm -ti -it -p 80:80 -v /Users/*RUTA DEL PROYECTO*:/var/www/html giscom bash
  ```

5. Instalar los paquetes de NodeJS con el siguiente comando:

  ```bash
  npm install
  ```

6. Iniciar el servicio de NodeJS con el siguiente comando que ejecutara el index.js:

  ```bash
  npm start
  ```

## Construido con:

- [NodeJS](https://nodejs.org/es/) - framework utilizado para el Back-end el proyecto.
- [ExpressJS](https://expressjs.com/es/) - framework utilizado para desarrollar el servidor web.
- [NPM](https://www.npmjs.com/) - utilizado para la gestion de paquetes de Node.
- [Bootstrap 4](https://getbootstrap.com/docs/4.6/getting-started/introduction/) - framework para HTML, CSS y JavaScript.
- [MongoDB Atlas](https://www.mongodb.com/es/atlas/database) - Base de datos NoSQL en la nube proporcionada por MongoDB.

## Desarrollado por:

- Nicolás Medina [LinkedIn](https://www.linkedin.com/in/nicoomf/) - Visita mi perfil de LinkedIn.
- [nicoomf@outlook.com](nicoomf@outlook.com) - Contactame por Correo.
- @Nicoomf [Instagram](https://www.instagram.com/nicoomf/) - Sigueme en Instagram.
- @Nicoomf [Twitter](https://twitter.com/nicoomf) - Sigueme en Twitter.
