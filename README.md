# Backend Inlaze - Proyecto NestJS

Este proyecto es una API backend desarrollada con el framework NestJS. Su propósito es gestionar tareas, proyectos, usuarios, notificaciones y comentarios, proporcionando una solución robusta y escalable para aplicaciones empresariales.

## Tabla de Contenidos

- [Descripción del Proyecto](#descripción-del-proyecto)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación y Configuración](#instalación-y-configuración)
- [Ejecución del Proyecto](#ejecución-del-proyecto)
- [Documentación de la API](#documentación-de-la-api)

## Descripción del Proyecto

La API permite realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) sobre las siguientes entidades:
- **Tareas**: Gestión de tareas con atributos como título, descripción, estado y prioridad.
- **Proyectos**: Gestión de proyectos con atributos como nombre, descripción y estado.
- **Usuarios**: Gestión de usuarios con roles y permisos.
- **Notificaciones**: Sistema de notificaciones para los usuarios.
- **Comentarios**: Gestión de comentarios asociados a tareas o proyectos.

## Tecnologías Utilizadas

- **NestJS**: Framework para construir aplicaciones escalables en Node.js.
- **TypeScript**: Lenguaje de programación que extiende JavaScript con tipado estático.
- **MySQL**: Base de datos relacional para almacenar la información.
- **Swagger**: Herramienta para documentar la API.
- **JWT**: Autenticación basada en tokens.

## Estructura del Proyecto

```
backend-inlaze/
├── src/
│   ├── auth/                # Módulo de autenticación
│   ├── comments/            # Módulo de comentarios
│   ├── database/            # Módulo de conexión a la base de datos
│   ├── notifications/       # Módulo de notificaciones
│   ├── projects/            # Módulo de proyectos
│   ├── tasks/               # Módulo de tareas
│   ├── users/               # Módulo de usuarios
│   ├── app.module.ts        # Módulo raíz de la aplicación
│   └── main.ts              # Punto de entrada de la aplicación
├── scripts/                 # Scripts SQL para inicializar la base de datos
├── test/                    # Pruebas e2e
├── tsconfig.json            # Configuración de TypeScript
├── package.json             # Dependencias y scripts del proyecto
└── README.md                # Documentación del proyecto
```

## Instalación y Configuración

1. Clona el repositorio:
   ```bash
   git clone <URL-del-repositorio>
   cd backend-inlaze
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno en un archivo `.env` basado en `.env.example`.

## Ejecución del Proyecto

### Modo Desarrollo

Para ejecutar el proyecto en modo desarrollo:
```bash
npm run start:dev
```

### Modo Producción

Para ejecutar el proyecto en modo producción:
```bash
npm run start:prod
```

## Documentación de la API

La documentación de la API está disponible en Swagger. Una vez que el servidor esté en ejecución, puedes acceder a la documentación en:
```
http://localhost:<PORT>/api-docs
```

## URL del Repositorio

El código fuente del proyecto está disponible en el siguiente repositorio de GitHub:

[https://github.com/snzxvss/backend-inlaze-prueba](https://github.com/snzxvss/backend-inlaze-prueba)

---

Desarrollado por **Camilo Sanz**.
