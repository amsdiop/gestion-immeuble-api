# 🏢 Gestion_Immeuble API - Backend

API REST pour l'application de gestion de location d'immeubles.

## 📋 Stack Technologique

- **Framework:** Node.js + Express
- **ORM:** TypeORM
- **Database:** MySQL 8.0
- **Language:** TypeScript
- **Auth:** JWT
- **Security:** Helmet + CORS

## 🚀 Démarrage rapide

### 1. Installation des dépendances

```bash
npm install
```

### 2. Configuration de la base de données

Créez une base de données MySQL:
```bash
mysql -u root -p
CREATE DATABASE immeuble CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 3. Configuration des variables d'environnement

Copiez `.env.example` en `.env` et configurez:
```bash
cp .env.example .env
```

Éditez `.env` avec vos credentials:
```
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=amsdiop
DB_PASSWORD=@MSd4500
DB_NAME=immeuble
```

### 4. Lancer le serveur en développement

```bash
npm run dev
```

Le serveur démarre sur `http://localhost:3000`

## 📁 Structure du projet

```
src/
├── entities/          # Modèles TypeORM (tables)
├── controllers/       # Logique HTTP (endpoints)
├── services/          # Logique métier (business logic)
├── routes/            # Définition des routes
├── middleware/        # Middleware (auth, validation, etc)
├── database/          # Configuration DB + migrations
├── types/             # Types TypeScript
├── utils/             # Utilitaires et helpers
└── index.ts           # Point d'entrée
```

## 🔗 API Endpoints

### Health Check
```
GET /health → Vérifie si le serveur fonctionne
GET /api/v1 → Info sur l'API
```

### À implémenter:
```
/api/v1/auth           → Authentification (login, register, logout)
/api/v1/immeubles      → Gestion des immeubles
/api/v1/biens          → Gestion des biens (chambres, apts)
/api/v1/locataires     → Gestion des locataires
/api/v1/baux           → Gestion des contrats
/api/v1/paiements      → Gestion des paiements
/api/v1/notifications  → Notifications
/api/v1/rapports       → Rapports et statistiques
```

## 🗄️ Base de données

### Initialiser la DB avec le schéma

```bash
# Appliquer le schéma SQL
mysql -u amsdiop -p immeuble < ../schema_gestion_immeuble.sql
```

### Migrations TypeORM (futur)

```bash
npm run migration:create -- src/database/migrations/InitialSchema
npm run migration:run
```

## 🧪 Tests

```bash
npm test
npm run test:watch
```

## 🏗️ Build pour production

```bash
npm run build
npm start
```

## 📝 Scripts npm disponibles

| Command | Description |
|---------|-------------|
| `npm run dev` | Démarrer en mode développement (avec hot reload) |
| `npm run build` | Compiler TypeScript en JavaScript |
| `npm start` | Lancer le serveur compilé |
| `npm test` | Lancer les tests |
| `npm run test:watch` | Lancer les tests en mode watch |
| `npm run lint` | Vérifier le linting du code |
| `npm run migration:run` | Appliquer les migrations |

## 🔐 Variables d'environnement requises

```
DB_HOST           # Hôte MySQL
DB_PORT           # Port MySQL (défaut: 3306)
DB_USERNAME       # Utilisateur MySQL
DB_PASSWORD       # Mot de passe MySQL
DB_NAME           # Nom de la base de données

SERVER_PORT       # Port du serveur (défaut: 3000)
NODE_ENV          # development | production

JWT_SECRET        # Clé secrète JWT (CHANGE en production!)
JWT_EXPIRATION    # Durée du token (ex: 7d)
```

## ✅ Checklist de démarrage

- [ ] Base de données MySQL créée
- [ ] `.env` configuré avec vos credentials
- [ ] `npm install` exécuté
- [ ] Schéma SQL importé
- [ ] `npm run dev` fonctionne
- [ ] `GET /health` retourne 200 OK

## 📞 Troubleshooting

### Erreur: "Cannot find module 'express'"
```bash
npm install
```

### Erreur: "Database connection failed"
Vérifiez que:
- MySQL est en cours d'exécution
- Les credentials dans `.env` sont corrects
- La base de données `immeuble` existe

### Erreur: "Port 3000 is already in use"
Changez le port dans `.env`:
```
SERVER_PORT=3001
```

## 🚀 Prochaines étapes

1. ✅ Structure de base (fait)
2. 📝 Créer les entités TypeORM
3. 🔌 Implémenter les endpoints API
4. 🧪 Ajouter les tests
5. 🚀 Déployer en production

---

**Pour plus d'information, consultez le DESIGN_DOCUMENT.md et l'IMPLEMENTATION_PLAN.md**
