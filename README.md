Integrantes:
- Samira Becerra
- Maura Gonzalez
- Ricardo Toro
- Martin Vasquez
# Sistema de Recomendación de Libros  

---

## Índice  
1. [Resumen del Proyecto](#resumen-del-proyecto)  
2. [Requerimientos](#requerimientos)  
3. [Arquitectura de la Información](#arquitectura-de-la-información)  
4. [Prototipo de Diseño](#prototipo-de-diseño)  

---

## Resumen del Proyecto  
Sistema de recomendación de libros basado en intereses del usuario, historial de lectura y preferencias. Incluye:  
- **Roles**: Usuario y Administrador (Admin).  
- **Funcionalidades clave**: Búsqueda avanzada, recomendaciones personalizadas, gestión de libros, reseñas y panel de administración.  
- **Base de datos local** para almacenar libros, usuarios y preferencias.  

---

## Requerimientos  

### Roles del Sistema  
- **Administrador (Admin)**: Gestiona libros, usuarios y estadísticas.  
- **Usuario**: Busca libros, recibe recomendaciones, gestiona listas de lectura y deja reseñas.  

---

### Requerimientos Funcionales por Rol  

#### Rol-Administrador  
- **RF-ADM-01**: Registrar nuevos libros (título, autor, género, ISBN único, año, sinopsis).  
- **RF-ADM-02**: Editar o eliminar libros del catálogo (borrado lógico).  
- **RF-ADM-03**: Gestionar usuarios (crear, editar roles, eliminar).  

#### Rol-Usuario  
- **RF-USR-01**: Registrar preferencias (géneros, autores favoritos).  
- **RF-USR-02**: Buscar libros por título, autor, género o año en la base de datos local.  
- **RF-USR-03**: Recibir recomendaciones basadas en historial de lectura y preferencias.  
- **RF-USR-04**: Crear listas personalizadas (ej: "Para Leer", "Favoritos").  
- **RF-USR-05**: Dejar reseñas y calificar libros (1-5 estrellas).  

---

## Requerimientos No Funcionales  

### RNF-01: Tiempo de Respuesta  
- Carga de recomendaciones y búsquedas en **menos de 2 segundos** (95% de los casos).  

### RNF-02: Seguridad  
- Autenticación con JWT y encriptación de contraseñas.
- Validación de RUT chileno en registro.  

### RNF-03: Usabilidad  
- Interfaz responsiva (móvil y web) con navegación intuitiva (máximo 3 clics para funciones principales).  

### RNF-04: Compatibilidad  
- Compatible con:  
  - **Navegadores**: Chrome, Firefox, Safari, Edge (últimas versiones).  
  - **Dispositivos**: iOS, Android y pantallas ≥ 5 pulgadas.  

---

## Arquitectura de la Información  
- **Flujo principal**:  
  - Usuario: `Login → Home (Recomendaciones) → Búsqueda → Detalle de Libro → Agregar a Lista`.  
  - Admin: `Login → Panel Admin → Gestión de Libros/Usuarios → Estadísticas`.  

---

## Prototipo de Diseño  
[Figma - Prototipo Recomendador de Libros](https://www.figma.com/design/ippKH9RBU8fm7fETNp3nnt/WEB?node-id=0-1&p=f&t=jgnHjeCsJL3KCgCR-0)  
**Pantallas clave**:  
1. **Login/Registro**: Con validación de RUT y campos obligatorios.  
2. **Home**: Recomendaciones basadas en preferencias (grid de libros).  
3. **Búsqueda**: Filtros por género, autor y barra de búsqueda.  
4. **Detalle de Libro**: Portada, sinopsis, reseñas y opción "Agregar a lista".  
5. **Perfil de Usuario**: Preferencias, listas personalizadas e historial.  
6. **Panel Admin**: Formulario para agregar/editar libros, gestión de usuarios. 

---
## Definicion de la navegacion y experiencia de usuario.
- Se incluye la opcion de cambiar entre modo claro y oscuro.
- Diseno responsivo que se adapta al tamano de la pantalla.
- Navegacion a traves de links en el header


## Tecnologías y Librerías  

### Frontend  
- **Ionic Framework (v7+)**: Componentes UI multiplataforma.  
- **Angular (v15+)**: Gestión de estados y enrutamiento.  

---

