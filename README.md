# Around (React) — Galería social con perfil (React + Vite + REST API)

**Demo:** https://lina079.github.io/web_project_around_auth/  
**Stack:** React · Vite · REACT ROUTERS · CSS · Context API · Fetch/REST · ESLint · GitHub Pages 

## 🧭 Resumen 
Aplicación tipo “galería social” donde el usuario:
- Edita su **perfil** (nombre, bio, avatar)
- **Crea** y **elimina** tarjetas con imagen y título
- **Da o quita likes** a las tarjetas
- Interactúa con **modales** (formularios y confirmaciones) con validación
- **Login/Register** de sesión (JWT), rutas protegidas y redirecciones.

**Qué demuestra este proyecto**  
Integración con **REST API** (GET/POST/PUT/PATCH/DELETE), gestión de estado con **hooks** y **Context**, componentes reutilizables y deploy con **Vite + GitHub Pages**.

---

## ✨ Funcionalidades
- **Perfil:** edición de datos y avatar.
- **Tarjetas (cards):** listar, crear, eliminar, like/unlike.
- **Autenticación:** 
  -Rutas públicas: /signin(login), /signout (registro)
  -Rutas protegidas: / (galería) -- solo accesible si hay   sesión.
  -ProtectedRoute (en App.jsx) redirige a /signin sin no hay token.
  -Redirección automatica a / si ya estas logueado e intentas visitar /signin o /signout.
  -Validación de contraseña: alfanumérica y mínimo 6 caracteres.
  -InfoTooltip: modal de feedback tras registro/login.
- **Modales accesibles:** apertura/cierre, focus manejado, validación básica.
- **Validación de formularios** con feedback visual.
- **Consumo de API** con manejo de errores y sincronización de estado.
- **Responsive** (mobile-first).

> **API de práctica** (endpoints tipo `me`, `cards`, etc. de TripleTen).

---

## 🧱 Arquitectura & decisiones
- **React + Vite**: DX rápida y build eficiente. 
- **React Router:** rutas públicas/protegidas. 
- **Context API** para compartir el usuario actual.  
- **Componentes desacoplados** (`Card`, `Popup`, `EditProfile`, `ConfirmDelete`, etc.). 
- **Capa de API separada:**
  - utils/auth.js: registro, login y validación del token (servicio de TripleTen).
  - utils/api.js: endpoints de usuario y tarjetas (usa token/API key según corresponda)
- **ESLint** para estilo y calidad.  
- **Rutas y assets compatibles con GitHub Pages** (config `base`).
- **Security & analysis** en GitHub activado (Dependency graph, Dependabot alerts; dependabot.yml).

**Estructura (resumen)**
.
web_project_around_auth/
├─ .github/
│  └─ dependabot.yml
├─ .vscode/
│  └─ launch.json
├─ blocks/                      # CSS BEM por bloques
│  ├─ body.css
│  ├─ elements.css
│  ├─ footer.css
│  ├─ header.css
│  ├─ image-popup.css
│  ├─ page.css
│  ├─ popup.css
│  └─ profile.css
├─ images/
│  ├─ Galeria/
│  │  ├─ atardecer.jpg
│  │  ├─ lago-de-louise.jpg
│  │  ├─ valle-de-yosemite.jpg
│  │  └─ ... (otros)
│  └─ popup/
│     ├─ Close-Icon.png
│     └─ Close-Icon.svg
├─ public/
│  ├─ black-heart.png
│  ├─ heart-vector.png
│  └─ vite.svg
├─ src/
│  ├─ assets/
│  │  └─ react.svg
│  ├─ components/
│  │  ├─ App/
│  │  │  ├─ App.css
│  │  │  └─ App.jsx
│  │  ├─ Card/
│  │  │  └─ Card.jsx
│  │  ├─ EditProfile/
│  │  │  └─ EditProfile.jsx
│  │  ├─ Footer/
│  │  │  └─ Footer.jsx
│  │  ├─ Header/
│  │  │  └─ Header.jsx
│  │  ├─ InfoTooltip/
│  │  │  └─ InfoTooltip.jsx
│  │  ├─ Main/
│  │  │  ├─ Main.jsx
│  │  │  └─ components/
│  │  │     ├─ ConfirmDelete/ConfirmDelete.jsx
│  │  │     ├─ EditAvatar/EditAvatar.jsx
│  │  │     ├─ ImagePopup/ImagePopup.jsx
│  │  │     └─ NewCard/NewCard.jsx
│  │  ├─ Popup/
│  │  │  └─ Popup.jsx
│  │  ├─ Profile/
│  │  │  └─ Profile.jsx
│  │  └─ ProtectedRoute.jsx          
│  ├─ contexts/
│  │  └─ CurrentUserContext.js
│  ├─ pages/
│  │  ├─ Login.jsx
│  │  └─ Register.jsx
│  ├─ utils/
│  │  ├─ api.js                 # capa core (perfil, cards, likes)
│  │  ├─ auth.js                # /signup, /signin, /users/me + token helper
│  │  └─ cardsData.js           # (si aplica: datos mock o helpers)
│  ├─ index.css
│  └─ main.jsx
├─ vendor/
│  ├─ fonts.css
│  └─ normalize.css
├─ .editorconfig
├─ .env.example                 # ejemplo de variables de entorno
├─ .env.local                   # (ignorado) valores locales
├─ .gitignore
├─ .prettierignore
├─ eslint.config.js
├─ favicon.ico
├─ index.html
├─ package.json
├─ README.md
└─ vite.config.js


----

🔌 Integraciones y endpoints

Autenticación (temporal)

Base: https://se-register-api.en.tripleten-service.com/v1
- POST /signup -> crea usuario { data: { email, _id } }
- POST /signin -> devuelve { token }
- GET /users/me -> valida token y devuelve { data: { email, _id } }
El *JWT* se guarda en localStorage bajo la clave jwt.
Al cargar la pp, se valida el token con /users/me; si es válido, se entra a /. 

**Datos principales (usuarios/cards)**

Se consumen desde la API de TripleTen (base y headers configurados en utils/api.js).
  Algunas rutas pueden requerir API key; otras usan Autorization: Bearer <token>.

## 🚀 Ejecutar en local
```bash
git clone https://github.com/Lina079/web_project_around_auth.git
cd web_project_around_auth
npm install
npm run dev
# abre la URL que muestra Vite (p. ej. http://localhost:5173)
```
```
npm run build
npm run deploy   # publica dist/ a la rama gh-pages
```

La app está configurada con base: '/web_project_around_auth/' para funcionar en GitHub Pages.

---

**🔐 Detalles de Autenticación** 

Flujo:
1. Registro en /signup → InfoTooltip confirma éxito.
2. Login en /signin → guarda token y navega a /.
3. App.jsx protege / con ProtectedRoute y muestra Header con email + botón Salir.
4. “Salir” → borra token (localStorage) y redirige a /signin.

**Validaciones:**

- Password: alfanumérica y mínimo 6 caracteres
  - HTML: pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$"
  - JS (UI): const pwPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

Redirecciones:
Si ya estás logueado e intentas /signin o /signup, se redirige a /.
Si no estás logueado e intentas /, se redirige a /signin.

**🔒 Seguridad (resumen aplicado)**
- Validación de entrada en formularios (regex contraseña + HTML5)
- Token en localStorage (borrado al cerrar sesión).
- Rutas protegidas: / bloqueada para no autenticados.
- Manejo de errores centralizado en auth.js/api.js (parsea JSON o texto y lanza mensajes claros).
- GitHub Security & analysis activado (Dependency graph, Dependabot alerts y dependabot.yml).
- Revisión de dependencias: npm audit antes de publicar.

**🧪 Pruebas rápidas**
- Registro inválido → ver mensaje en InfoTooltip y validación de password.
- Login con credenciales válidas → navegando a / muestra perfil/tarjetas.
- Acceder a /signup//signin logueado → redirige a /.
- Acceder a / deslogueado → redirige a /signin.

**🔧 Troubleshooting**
- “Token inválido” tras login: borra el localStorage, vuelve a iniciar sesión y revisa utils/auth.js (base URL y headers).
- No ves tarjetas/perfil: revisa utils/api.js (encabezados, base URL correcta) y la consola de red en el navegador.
-404 en rutas en GH Pages: asegúrate de tener fallback para SPA y base configurado en vite.config.js si publicas en subcarpeta.

**🔍 Lo que aprendí**

- Diseño de flujo de autenticación completo en React (registro, login, persistencia de sesión, validación de token, logout) con rutas protegidas.
- Construcción de una capa de API desacoplada (auth.js / api.js) con manejo de errores uniforme y variables de entorno para entornos reales.
- Implementación de validación alfanumérica de contraseña y feedback inmediato en UI.
- Mejores prácticas de accesibilidad en modales (InfoTooltip/popup).
- Observabilidad con DevTools de red y logs centrados para depurar respuestas 4xx/5xx.
- Higiene de proyecto: Dependabot activado, npm audit integrado, ESLint/Prettier, .env.example, README documentado.
- Trabajo con dos backends distintos (auth y core) y coordinación del estado global con Context.


### 👩‍💻 Autora

Lina Castro — Full Stack Dev Jr.
LinkedIn: https://www.linkedin.com/in/lina-castro079/

GitHub: https://github.com/Lina079
