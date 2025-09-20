# Around (React) — Galería social con perfil (React + Vite + REST API)

**Demo:** https://lina079.github.io/web_project_around_react/  
**Stack:** React · Vite · CSS · Context API · Fetch/REST · ESLint · GitHub Pages

## 🧭 Resumen 
Aplicación tipo “galería social” donde el usuario:
- Edita su **perfil** (nombre, bio, avatar)
- **Crea** y **elimina** tarjetas con imagen y título
- **Da o quita likes** a las tarjetas
- Interactúa con **modales** (formularios y confirmaciones) con validación

**Qué demuestra este proyecto**  
Integración con **REST API** (GET/POST/PUT/PATCH/DELETE), gestión de estado con **hooks** y **Context**, componentes reutilizables y deploy con **Vite + GitHub Pages**.

---

## ✨ Funcionalidades
- **Perfil:** edición de datos y avatar.
- **Tarjetas (cards):** listar, crear, eliminar, like/unlike.
- **Modales accesibles:** apertura/cierre, focus manejado, validación básica.
- **Validación de formularios** con feedback visual.
- **Consumo de API** con manejo de errores y sincronización de estado.
- **Responsive** (mobile-first).

> **API de práctica** (endpoints tipo `me`, `cards`, etc. de TripleTen).

---

## 🧱 Arquitectura & decisiones
- **React + Vite**: DX rápida y build eficiente.  
- **Context API** para compartir el usuario actual.  
- **Componentes desacoplados** (`Card`, `Popup`, `EditProfile`, `ConfirmDelete`, etc.).  
- **ESLint** para estilo y calidad.  
- **Rutas y assets compatibles con GitHub Pages** (config `base`).

**Estructura (resumen)**
src/
components/
Card/
Header/
Profile/
Popup/
...
contexts/
CurrentUserContext.js
utils/
api.js # capa de acceso a la API (fetch)
styles/
index.css
public/
vite.config.js


---

## 🛠️ Tecnologías
- **React 18/19**, **Vite**
- **Context API**, **Hooks**
- **Fetch / REST API**
- **CSS (responsive)**
- **GitHub Pages**

---

## 🚀 Ejecutar en local
```bash
git clone https://github.com/Lina079/web_project_around_react.git
cd web_project_around_react
npm install
npm run dev
# abre la URL que muestra Vite (p. ej. http://localhost:5173)
```
```
npm run build
npm run deploy   # publica dist/ a la rama gh-pages
```

La app está configurada con base: '/web_project_around_react/' para funcionar en GitHub Pages.

---

### 🔍 Lo que aprendí

- Conectar un frontend React a una REST API con CRUD.

- Manejar estado, efectos y contexto de forma limpia.

- Construir modales y formularios con validación.

- Ajustar build para GH Pages (base URL, 404 fallback).

- Troubleshooting de despliegue (ramas, rutas, assets).

### 📌 Próximos pasos

- Mejorar accesibilidad (focus management completo en modales).

- Tests de componentes clave (React Testing Library).

- Migrar estilos a CSS Modules o Styled Components.

### 👩‍💻 Autora

Lina Castro — Full Stack Dev Jr.
LinkedIn: https://www.linkedin.com/in/lina-castro079/

GitHub: https://github.com/Lina079
