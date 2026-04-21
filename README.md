# Sportsee

Application front-end React dédiée à l'authentification utilisateur, à la consultation d'un profil protégé et à la visualisation de données de performance via des graphiques métier.

Le projet repose sur une architecture simple et explicite autour de React, TypeScript, Vite et de plusieurs contextes applicatifs pour l'authentification, l'accès API, la gestion des erreurs et l'exposition des données utilisateur.

## Objectif du projet

L'application permet de :

- authentifier un utilisateur via une API externe ;
- protéger les écrans sensibles tant qu'aucune session n'est active ;
- récupérer et agréger les données utilisateur côté front ;
- afficher des indicateurs de performance dans plusieurs composants graphiques ;
- filtrer les données affichées selon une période sélectionnée.

## Stack technique

- React 19
- TypeScript 5
- Vite 7
- React Router 7
- Recharts 3
- Jest pour les tests
- ESLint pour l'analyse statique
- Docker / Docker Compose pour l'exécution en environnement conteneurisé

## Fonctionnalités couvertes

- authentification et fermeture de session ;
- stockage de la session en mémoire uniquement ;
- routage protégé vers le dashboard et le profil ;
- récupération des informations de profil et des statistiques utilisateur ;
- gestion centralisée des erreurs applicatives ;
- affichage de graphiques BPM, hebdomadaires et kilométriques ;
- sélection de plage de dates pour piloter les vues de performance.

## Architecture applicative

Le point d'entrée de l'application compose plusieurs providers globaux autour du routeur :

- `ApiUrlContext` injecte l'URL de l'API via `VITE_API_URL` ;
- `AuthProvider` maintient `email`, `token`, `userId` et `isLoading` ;
- `ErrorProvider` centralise les erreurs et la navigation vers l'écran dédié ;
- `ApiClientProvider` encapsule les appels réseau authentifiés ;
- `UserProvider` expose les données métier utilisateur au reste de l'interface.

### Authentification

- La session est conservée en mémoire uniquement.
- Aucun token n'est persisté dans le navigateur.
- Un rafraîchissement de page réinitialise donc l'état d'authentification.
- Le mot de passe ne fait pas partie d'un stockage persistant côté front.

### Données utilisateur

Le `UserContext` s'appuie sur les hooks métier pour exposer deux blocs principaux :

- `userProfile` pour les informations de profil ;
- `userStatistics` pour les statistiques utilisées par les vues dashboard.

### Gestion des erreurs

Le projet suit une approche centralisée :

- les erreurs globales transitent par `ErrorContext` ;
- les erreurs réseau ou HTTP peuvent être remontées via le client API ;
- une route dédiée `/error` sert de point de chute applicatif ;
- les routes inconnues sont redirigées vers un comportement 404 via `NotFoundRedirect`.

### Gestion des périodes

La logique de période du dashboard utilise des bornes locales inclusives. Pour les plages hebdomadaires, les dates envoyées à l'API doivent rester sérialisées au format `YYYY-MM-DD` afin d'éviter les décalages UTC sur le dimanche.

## Routage

Les routes actuellement exposées sont :

- `/` : page de connexion ;
- `/error` : page d'erreur globale ;
- `/dashboard/:id` : dashboard protégé ;
- `/profil/:id` : profil protégé ;
- `/logout` : fermeture de session ;
- `*` : redirection de type 404.

Les routes protégées sont encapsulées dans un garde d'authentification afin d'éviter la duplication de logique et de garantir la présence d'une session valide avant affichage.

## Structure du projet

```text
src/
  api/              Clients de récupération et mapping des données
  components/       Composants d'interface et sections du dashboard
  context/          Contextes globaux de l'application
  hooks/            Hooks métier et hooks de tests
  utils/            Fonctions utilitaires transverses
  Dashboard/        Entrée fonctionnelle du dashboard
  Login/            Entrée fonctionnelle de la page de connexion
  Logout/           Gestion de déconnexion
  Profile/          Entrée fonctionnelle de la page profil
docs/               Documentation technique complémentaire
```

## Prérequis

- Node.js 20 ou version compatible récente ;
- npm ;
- facultatif : Docker et Docker Compose.

## Installation

```bash
npm install
```

## Configuration

L'application attend une variable d'environnement Vite pour cibler l'API :

```bash
VITE_API_URL=http://localhost:3000
```

Tu peux la définir dans un fichier `.env` local ou via ton environnement d'exécution.

## Lancement en local

```bash
npm run dev
```

Le serveur de développement Vite est exposé par défaut sur le port `5173`.

## Lancement avec Docker

```bash
docker compose up --build
```

Le service `frontend` :

- construit l'image depuis `Dockerfile.dev` ;
- monte le projet dans `/app` ;
- expose le port `5173` ;
- démarre Vite en mode développement avec `--host 0.0.0.0`.

## Scripts disponibles

```bash
npm run dev
npm run build
npm run lint
npm run preview
npm run test
```

### Détail

- `npm run dev` : démarre le serveur de développement ;
- `npm run build` : compile TypeScript puis génère le build Vite ;
- `npm run lint` : exécute ESLint sur le projet ;
- `npm run preview` : sert localement le build de production ;
- `npm run test` : lance la suite Jest.

## Conventions et choix techniques

- Architecture orientée contextes plutôt que store global externe.
- Session volontairement non persistée.
- Appels API centralisés via le client injecté dans le contexte.
- Gestion d'erreurs globales plutôt que traitement dispersé dans les composants.
- Composants de visualisation organisés par domaine métier du dashboard.

## Reprise et évolution du projet

Pour faire évoluer le projet proprement :

- ajoute les nouvelles données utilisateur au niveau des hooks métier puis expose-les via `UserContext` ;
- ajoute toute nouvelle route protégée dans l'arbre encapsulé par le garde d'authentification ;
- conserve la remontée des erreurs globales via `ErrorContext` ;
- respecte le format local `YYYY-MM-DD` pour les dates transmises à l'API sur les vues hebdomadaires.

## Documentation complémentaire

Le dossier `docs/` contient des notes ciblées sur certaines briques métier, notamment :

- l'authentification et le store des fetchs ;
- la navigation par dates ;
- la stratégie de gestion d'erreur.

## État actuel

Le projet est prêt pour un usage de développement local et une reprise technique rapide. Le README a vocation à servir de référence d'onboarding, de rappel d'architecture et de guide d'exécution.
