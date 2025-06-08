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

### RNF-01: Seguridad  
- Autenticación con JWT y encriptación de contraseñas.
- Validación de RUT chileno en registro.  

### RNF-02: Usabilidad  
- Interfaz responsiva (móvil y web) con navegación intuitiva (máximo 3 clics para funciones principales).  

### RNF-03: Compatibilidad  
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
Navegación General

El sistema de recomendación de libros implementa una navegación clara, eficiente y adaptada tanto a dispositivos móviles como a escritorio, utilizando rutas definidas en Angular. La navegación se organiza a través de un HeaderComponent visible en todas las vistas principales, que incluye accesos directos a secciones clave y un menú adaptable según el tipo de usuario (Usuario o Administrador).

/login: Pantalla de autenticación, con validación.

/registro: Formulario de registro para nuevos usuarios.

/home: Pantalla de inicio que muestra las recomendaciones personalizadas según intereses.

/search: Vista con filtros por título, autor, género y año.

/book/:id: Muestra sinopsis, portada, reseñas y permite agregar a listas.

/perfil: Acceso a preferencias, listas personalizadas e historial.

/admin: Panel exclusivo para el administrador, con gestión de usuarios, libros y estadísticas.

Flujo de Usuario

Usuario nuevo:

    Ingresa a /registro y completa el formulario (con validación de campos y RUT).

    Accede a /home, donde recibe recomendaciones iniciales.

    Utiliza /buscar para explorar libros por género, autor, etc.

    Consulta el /detalle-libro/:id y lo agrega a una lista personalizada.

    Deja una reseña y califica el libro si lo desea.

Usuario recurrente:

    Inicia sesión en /login.

    Recibe recomendaciones actualizadas en /home.

    Accede a /perfil para ver o modificar sus listas y preferencias.

    Usa filtros de búsqueda avanzada para descubrir nuevas lecturas.

Administrador:

    Inicia sesión en /login.

    Accede al /admin para:

        Registrar nuevos libros (RF-ADM-01).

        Editar o eliminar libros (RF-ADM-02).

        Gestionar usuarios (RF-ADM-03).

Principios de UX aplicados

    Navegación fluida: Se garantiza que las funciones principales estén disponibles en máximo 3 clics.

    Diseño responsivo: Adaptable a pantallas de 5 pulgadas o más, con uso de Ionic para asegurar una experiencia homogénea en iOS y Android.

    Modo claro/oscuro: Alternancia entre ambos modos desde el header, persistente en sesiones.

    Consistencia visual: Uso coherente de componentes UI, con retroalimentación visual inmediata (ej. al agregar libros o dejar una reseña).

    Minimización del esfuerzo cognitivo: El usuario puede realizar acciones clave sin necesidad de redirigirse constantemente.


## Tecnologías y Librerías  

### Frontend  
- **Node.js (V22)**: Se utiliza la node:imagen 22-alpine de docker debido a que no posee vulnerabilidades conocidas
- **Ionic Framework (v8)**: Componentes UI multiplataforma.  
- **Angular (V18)**: Gestión de estados y enrutamiento.  

### Backend y base de datos
- **Python (V3.20):** Se utiliza la imagen alpine3.20 de docker debido a que no posee vulnerabilidades conocidas.
- **Flask (V3.1.1)**
- **MySQL (V9.0)**

---

