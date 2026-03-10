# 🐾 Professional API creation - Proyecto Final Backend III

Backend profesional para la gestión de adopciones de mascotas, desarrollado con **Node.js**, **Express** y **MongoDB**. Este proyecto implementa una arquitectura robusta, documentación automatizada y una suite de tests funcionales.

## 🚀 Características Principales

- **Gestión de Usuarios y Mascotas:** CRUD completo con persistencia en MongoDB.
- **Sistema de Adopciones:** Lógica de vinculación entre usuarios y mascotas.
- **Subida de Documentos:** Implementación de **Multer** para carga de archivos (perfiles, mascotas y documentos).
- **Seguridad:** Autenticación basada en cookies y sesiones.

## 🧪 Testing Funcional

El proyecto cuenta con una suite de **10 tests de integración** utilizando **Mocha**, **Chai** y **Supertest**, cubriendo:

- **Pets:** Creación, validación de campos obligatorios y obtención de listados.
- **Users:** Búsqueda por ID y manejo de errores 404.
- **Sessions:** Registro de usuarios y validación de cookies en el Login.
- **Adoptions:** Flujo completo de adopción y validación de IDs inexistentes.

> **Ejecución local:** `npm test`

## 🐳 Docker & CI/CD

Este repositorio utiliza **GitHub Actions** para automatizar el ciclo de vida de la aplicación.

- **CI/CD:** Cada `push` a la rama `main` dispara un workflow que construye la imagen de Docker y la sube automáticamente a Docker Hub.
- **Imagen Oficial:** [franboo/adoptme-api](https://hub.docker.com/r/franboo/adoptme-api)

## 🛠️ Instalación y Uso (Docker)

1. Descarga la imagen:
   ```bash
   docker pull franboo/adoptme-api:latest
   ```

2. Corre el contenedor pasando tus variables de entorno:

```bash
docker run -p 8080:8080 -e MONGO_URL="tu_url_mongodb" franboo/adoptme-api

```

3. Accede a la documentación en: `http://localhost:8080/api/docs`

## 📖 Documentación

La API está totalmente documentada con **Swagger**. Puedes explorar los endpoints de Users, Pets, Adoptions y Sessions directamente desde la interfaz interactiva en el endpoint `/api/docs`.

---

Desarrollado por **Fran Bonet** - Ingeniería UNL | Founder de Reboot.

