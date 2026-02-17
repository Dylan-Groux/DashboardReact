# 📊 DashboardReact - SportSee Analytics Platform

Une application web moderne pour l'analyse et le suivi des données sportives. Combinez un frontend React performant avec une API backend Node.js/Express.

![React](https://img.shields.io/badge/React-19.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![Node.js](https://img.shields.io/badge/Node.js-LTS-green)
![Docker](https://img.shields.io/badge/Docker-Ready-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 📋 Table des matières

- [Description du projet](#description-du-projet)
- [Fonctionnalités principales](#fonctionnalités-principales)
- [Installation et lancement](#installation-et-lancement)
- [Scripts disponibles](#scripts-disponibles)
- [Authentication](#authentication)

---

## 🎯 Description du projet

**DashboardReact** est une plateforme complète d'analyse sportive inspirée du projet OpenClassrooms P6. Elle permet aux utilisateurs de se connecter, consulter leurs données sportives, et analyser leurs performances à travers des visualisations interactives.

Le projet est structuré en deux parties distinctes :
- **Frontend** : Application React moderne avec TypeScript, Vite et build optimisé
- **Backend** : API micro-service Node.js/Express avec authentification JWT

---

## ✨ Fonctionnalités principales

### 🖥️ Frontend (React)
- 🎨 Interface utilisateur moderne et responsive
- 🔐 Authentification et gestion de session
- 📊 Tableaux de bord personnalisés
- 📈 Visualisations de données sportives
- ⚡ Performance optimisée avec Vite et SWC
- 📱 Design mobile-first
- ✅ TypeScript pour la sécurité des types

### 🔧 Backend (Node.js/Express)
- 🔐 Authentification JWT sécurisée
- 📡 API RESTful complète
- 🛡️ CORS activé pour communication frontend
- 🐳 Dockerisé et prêt pour la production
- 🔄 Support des micro-services
- 📝 Documentation API intégrée

---

## 💻 Installation et lancement

### Prérequis

- **Node.js** >= 12.18 ou **Docker Desktop**
- **npm/yarn** ou **Docker Compose**

### 📥 Installation locale (développement)

#### 1️⃣ Cloner le dépôt

```bash
git clone https://github.com/Dylan-Groux/DashboardReact.git
cd DashboardReact
```

#### 2️⃣ Installer les dépendances

**Frontend :**
```bash
cd frontend
npm install
# ou
yarn install
```

**Backend :**
```bash
cd ../backend
npm install
# ou
yarn install
```

### 🚀 Lancement local

#### Frontend seul
```bash
cd frontend
npm run dev
```
Accédez à l'application : [http://localhost:3000](http://localhost:3000)

> Le serveur de développement Vite se lancera automatiquement avec hot reload activé.

#### Backend seul
```bash
cd backend
npm run dev
```
L'API sera disponible : [http://localhost:8000](http://localhost:8000)

> Nodemon surveille les changements et redémarre automatiquement le serveur.

#### Lancer les deux en même temps (2 terminaux différents)
```bash
# Terminal 1 : Frontend
cd frontend && npm run dev

# Terminal 2 : Backend
cd backend && npm run dev
```

---

## 🐳 Lancement avec Docker Compose

### Build et lancement

```bash
# Depuis la racine du projet
docker-compose up --build
```

**Services disponibles :**
- Frontend : [http://localhost:3000](http://localhost:3000)
- Backend API : [http://localhost:8000](http://localhost:8000)

### Arrêter les services

```bash
docker-compose down
```

### Logs en direct

```bash
docker-compose logs -f
```

---

## 📦 Scripts disponibles

### Frontend

```bash
npm run dev        # Lancer le serveur de développement
npm run build      # Build pour la production (TypeScript + Vite)
npm run lint       # Vérifier le code avec ESLint
npm run preview    # Prévisualiser le build de production
```

### Backend

```bash
npm run dev        # Lancer l'API avec Nodemon (hot reload)
npm start          # Lancer en production
```

---

## 🔐 Authentification

L'API utilise **JWT (JSON Web Token)** pour sécuriser les endpoints.

### Exemple d'utilisation

```bash
# 1. Obtenir un token (login)
curl -X POST http://localhost:8000/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password"}'

# 2. Utiliser le token pour les requêtes protégées
curl -X GET http://localhost:8000/protected-endpoint \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

Pour plus de détails, consultez le [backend README](backend/README.md).

---

**Dernier mise à jour:** Février 2026