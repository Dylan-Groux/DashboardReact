# 📊 Dashboard React — Fonctionnalités & Architecture

## Fonctionnalités principales

- Authentification utilisateur (login/logout)
- Gestion du token et de l'userId (stockés en mémoire, non persistants)
- Récupération et affichage dynamique des informations utilisateur (profil, statistiques, etc.)
- Navigation protégée (redirection automatique vers la page de login si non authentifié)
- Visualisation de performances (graphiques, statistiques, etc.)
- Sélection de période (DateNavigator) pour filtrer les données affichées

## Architecture des contextes

### AuthContext
- Fournit : email, password, token, userId, login, logout, isLoading
- login : effectue l'appel API, stocke le token/userId, gère l'état de chargement
- logout : réinitialise tous les états
- isLoading : indique si une authentification est en cours (utile pour loader ou blocage navigation)
- Le token N'EST PAS persistant (perdu au refresh)

### UserContext
- Fournit : userInformation (profil complet), memberDate (date d'inscription formatée)
- Récupère automatiquement les infos utilisateur dès que le token change
- Expose memberDate déjà formatée pour affichage direct

## Navigation & Sécurité

- Utilisation d'un composant RequireAuth pour protéger les routes sensibles
- Si l'utilisateur n'est pas authentifié (token null), il est redirigé vers la page de login
- Utilisation d'un parent <Route element={<RequireAuth><Outlet /></RequireAuth>}> pour éviter la duplication

## Loader & UX

- Un loader (ou rien) est affiché tant que l'authentification est en cours (isLoading)
- Pas de loader visible si la connexion est très rapide (comportement par défaut)

## Choix techniques

- Pas de persistance du token : l'utilisateur doit se reconnecter après un refresh (choix volontaire)
- Utilisation de contextes React pour le state global (pas de Redux, pas de localStorage)
- Formatage des dates et des données utilisateur centralisé dans UserContext
- Les graphiques affichent toujours la dernière période complète (pas de semaine en cours)

## Conseils pour la reprise du projet

- Pour ajouter une nouvelle info utilisateur, enrichis UserContext et consomme-la via useUser()
- Pour protéger une nouvelle route, ajoute-la comme enfant du parent RequireAuth dans App.tsx
- Pour modifier le comportement d'auth, adapte AuthContext (ex : persistance, refresh token, etc.)

---

Ce README a été mis à jour pour servir de bloc-notes et de guide rapide sur l'architecture et les choix du projet. Relis-le avant de reprendre le code pour gagner du temps !
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
