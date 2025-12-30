#  E-Learning Platform - OAuth2 & OpenID Connect

Plateforme d'apprentissage en ligne sécurisée avec authentification OAuth2/OIDC utilisant Keycloak, Spring Boot et React.



##  Technologies utilisées

- **Serveur d'identité** : Keycloak 
- **Backend** : Spring Boot, Spring Security, OAuth2 Resource Server
- **Frontend** : React, Keycloak-js, Axios
- **Sécurité** : OAuth2, OpenID Connect, JWT

##  Architecture

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│             │      │             │      │             │
│   React     │─────▶│  Keycloak   │◀─────│ Spring Boot │
│  (Port 3000)│      │  (Port 8080)│      │ (Port 8081) │
│             │      │             │      │             │
└─────────────┘      └─────────────┘      └─────────────┘
     │                      │                     │
     │                      ▼                     │
     │              Authentication               │
     │                  & Token                  │
     │                                           │
     └──────────── Secured API Calls ───────────┘
```

##  Configuration

### Keycloak Configuration

1. Accédez à http://localhost:8080
2. Créez un compte admin (admin/admin)
3. Créez le realm : `elearning-realm`
4. Créez le client : `react-client` (Public, Standard Flow)
5. Créez les rôles :
   - `ROLE_ADMIN`
   - `ROLE_STUDENT`
6. Créez les utilisateurs :
   - **user1** (password: `password`) → ROLE_STUDENT
   - **admin1** (password: `password`) → ROLE_ADMIN

### Backend Configuration

Fichier : `backend/src/main/resources/application.properties`

```properties
server.port=8081
spring.security.oauth2.resourceserver.jwt.issuer-uri=http://localhost:8080/realms/elearning-realm
```

### Frontend Configuration

Fichier : `frontend/src/keycloak.js`

```javascript
const keycloak = new Keycloak({
  url: 'http://localhost:8080',
  realm: 'elearning-realm',
  clientId: 'react-client'
});
```

##  Utilisation

### Démarrer l'application

**Terminal 1 - Keycloak:**
```bash
cd keycloak-23.x.x/bin
./kc.sh start-dev
```

**Terminal 2 - Backend:**
```bash
cd backend
./mvnw spring-boot:run
```

**Terminal 3 - Frontend:**
```bash
cd frontend
npm start
```

### Accès à l'application

- **Frontend** : http://localhost:3000
- **Backend API** : http://localhost:8081/api
- **Keycloak Admin** : http://localhost:8080

### Comptes de test

| Username | Password | Rôle | Permissions |
|----------|----------|------|-------------|
| user1    | password | STUDENT | Consulter les cours |
| admin1   | password | ADMIN | Consulter et gérer les cours |

##  Captures d'écran

### 1. Configuration Keycloak

### 2. Application React

#### Page de connexion Keycloak
<img width="1473" height="753" alt="page-de-connexion" src="https://github.com/user-attachments/assets/ff637630-57ee-42a8-a36e-887ce9079caa" />
*Page d'authentification Keycloak*

#### Profil utilisateur (Student)
<img width="1879" height="865" alt="Capture d&#39;écran 2025-12-08 224224" src="https://github.com/user-attachments/assets/534907e3-7b1d-40d2-afbd-4a5502e588fb" />
*Profil de user1 avec rôle ROLE_STUDENT*

#### Panneau Admin
<img width="1873" height="861" alt="Capture d&#39;écran 2025-12-08 224305" src="https://github.com/user-attachments/assets/a7ccc161-7800-43f3-a5d0-0a7f8a1c95e8" />

*Panneau d'administration (visible uniquement pour admin)*

#### Ajout de cours (Admin)
<img width="1891" height="656" alt="Capture d&#39;écran 2025-12-08 224322" src="https://github.com/user-attachments/assets/030fe550-8742-4b71-b93d-83c6b06e33d3" />
*Formulaire d'ajout de cours*

##  Structure du projet

```
elearning-oauth2/
├── backend/
│   ├── src/main/java/com/elearning/backend/
│   │   ├── config/
│   │   │   └── SecurityConfig.java
│   │   ├── controller/
│   │   │   └── CourseController.java
│   │   ├── model/
│   │   │   └── Course.java
│   │   └── dto/
│   │       └── UserInfoDTO.java
│   └── pom.xml
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── Profile.js
│   │   │   ├── CoursesList.js
│   │   │   └── AdminPanel.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── keycloak.js
│   │   └── App.css
│   └── package.json
├── screenshots/
│   └── (vos captures d'écran)
└── README.md
```

##  Sécurité

- Authentification via OAuth2 + OpenID Connect
- Tokens JWT signés par Keycloak
- Validation des tokens côté backend
- Protection des routes par rôles (@PreAuthorize)
- Refresh automatique des tokens
- CORS configuré pour sécuriser les appels API

##  Dépannage

### Erreur CORS
- Vérifiez la configuration CORS dans `SecurityConfig.java`
- Assurez-vous que le frontend est sur port 3000

### Erreur 401 Unauthorized
- Token expiré → Reconnexion automatique
- Vérifiez que Keycloak est démarré

### Erreur 403 Forbidden
- Vérifiez les rôles attribués à l'utilisateur
- Normal pour STUDENT sur POST /courses

### Page blanche
- Ouvrez la console (F12) pour voir les erreurs
- Vérifiez que tous les services sont démarrés

##  Endpoints API

| Method | Endpoint | Rôle requis | Description |
|--------|----------|-------------|-------------|
| GET    | /api/courses | STUDENT, ADMIN | Liste des cours |
| POST   | /api/courses | ADMIN | Ajouter un cours |
| GET    | /api/me | Authentifié | Informations utilisateur |
