# DevTree
La aplicación DevTree es un clon de Linktree, diseñada para centralizar todos los enlaces de redes sociales de un usuario en un solo perfil. Cuyos objetivos serán:

1. Concentrar Redes Sociales: Permite a los usuarios crear un perfil donde pueden subir una imagen, escribir una descripción y agregar enlaces a sus diferentes redes sociales.
2. Interacción y Registro de Usuarios: DevTree permite a cualquier usuario registrarse y gestionar su información. Cada usuario puede tener su propio "Dev Tree" donde organizan sus enlaces.
3. Validaciones de Usuario: La aplicación implementa validaciones para asegurarse de que los nombres de usuario (handles) sean únicos, evitando conflictos en la identificación de usuarios, similar a plataformas como Instagram o Twitter.
4. Interfaz Pública y Privada: Ofrece tanto una interfaz pública donde los enlaces pueden ser compartidos como una interfaz privada para que los usuarios puedan gestionar sus propios perfiles, habilitar o deshabilitar enlaces, y reorganizar la presentación de sus redes.
5. Gestión de Enlaces: Los usuarios pueden actualizar, eliminar o agregar enlaces, y se asegura que estos cambios se reflejen en tiempo real.

# DevTree Backend

API REST del proyecto DevTree construida con Express, TypeScript y MongoDB. Este servicio gestiona autenticación de usuarios, edición de perfil, búsqueda por `handle` y carga de imágenes con Cloudinary.

## Características

- Registro de usuarios con validación de datos.
- Inicio de sesión con autenticación basada en JWT.
- Consulta del usuario autenticado.
- Actualización de perfil público.
- Búsqueda y validación de disponibilidad de `handle`.
- Carga de imagen de perfil con Cloudinary.
- Configuración CORS para integrar el frontend del proyecto.

## Stack

- Node.js
- Express
- TypeScript
- MongoDB con Mongoose
- JWT para autenticación
- Cloudinary para almacenamiento de imágenes
- Express Validator para validación de requests
- Formidable para manejo de archivos

## Requisitos

- Node.js y npm instalados
- Una base de datos MongoDB accesible
- Una cuenta de Cloudinary para la subida de imágenes

## Instalación

```bash
npm install
```

Crea un archivo `.env` en la raíz del backend con las siguientes variables:

```env
PORT=4000
MONGO_URI=tu_cadena_de_conexion_mongodb
JWT_SECRET=tu_clave_secreta
FRONTEND_URL=http://localhost:5173
CLOUDINARY_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

## Ejecución

Modo desarrollo:

```bash
npm run dev
```

Modo desarrollo para pruebas directas de API:

```bash
npm run dev:api
```

Este comando agrega `undefined` a la whitelist de CORS, lo que facilita probar la API desde herramientas como Thunder Client o Postman sin depender del origen del frontend.

Compilar el proyecto:

```bash
npm run build
```

Iniciar la versión compilada:

```bash
npm start
```

Por defecto, el servidor se ejecuta en `http://localhost:4000`.

## Scripts disponibles

| Script | Descripción |
| --- | --- |
| `npm run dev` | Inicia el backend con `nodemon` y recarga automática. |
| `npm run dev:api` | Inicia el backend en modo desarrollo permitiendo pruebas de API sin origen frontend definido. |
| `npm run build` | Compila TypeScript hacia `dist/`. |
| `npm start` | Ejecuta la aplicación compilada desde `dist/index.js`. |

## Variables de entorno

| Variable | Descripción |
| --- | --- |
| `PORT` | Puerto del servidor. Si no se define, se usa `4000`. |
| `MONGO_URI` | URL de conexión a MongoDB. |
| `JWT_SECRET` | Clave secreta usada para firmar y validar tokens JWT. |
| `FRONTEND_URL` | URL permitida por CORS para el frontend. |
| `CLOUDINARY_NAME` | Nombre de la cuenta de Cloudinary. |
| `CLOUDINARY_API_KEY` | API key de Cloudinary. |
| `CLOUDINARY_API_SECRET` | API secret de Cloudinary. |

## Endpoints principales

| Método | Ruta | Auth | Descripción |
| --- | --- | --- | --- |
| `POST` | `/auth/register` | No | Crea una nueva cuenta. |
| `POST` | `/auth/login` | No | Autentica al usuario y devuelve un JWT. |
| `GET` | `/user` | Sí | Obtiene la información del usuario autenticado. |
| `PATCH` | `/user` | Sí | Actualiza `handle`, `description` y `links`. |
| `POST` | `/user/image` | Sí | Sube una imagen de perfil a Cloudinary. |
| `GET` | `/:handle` | No | Obtiene el perfil público de un usuario por `handle`. |
| `POST` | `/search` | No | Verifica si un `handle` está disponible. |

### Validaciones relevantes

- `POST /auth/register`
  - `handle`: obligatorio
  - `name`: obligatorio
  - `email`: formato válido
  - `password`: mínimo 8 caracteres
- `POST /auth/login`
  - `email`: formato válido
  - `password`: obligatorio
- `PATCH /user`
  - `handle`: obligatorio
- `POST /search`
  - `handle`: obligatorio

## Autenticación

Las rutas protegidas requieren el header:

```http
Authorization: Bearer <token>
```

El token se genera al iniciar sesión y tiene una vigencia de `180d`.

## Estructura del proyecto

```text
src/
├── config/        # Base de datos, CORS y Cloudinary
├── handlers/      # Lógica de negocio de cada endpoint
├── middleware/    # Autenticación y validación
├── models/        # Modelos de Mongoose
├── utils/         # JWT y utilidades de hashing
├── index.ts       # Punto de entrada del servidor
├── router.ts      # Definición de rutas
└── server.ts      # Configuración de Express
```

## Modelo de usuario

La entidad `User` almacena los siguientes campos:

- `handle`
- `name`
- `email`
- `password`
- `description`
- `image`
- `links`

## Notas

- El backend no incluye tests automatizados en su estado actual.
- La ruta de carga de imagen espera un archivo en el campo `file`.
- Los perfiles públicos excluyen `_id`, `__v`, `email` y `password` de la respuesta.

## Autor

Felipe GM
