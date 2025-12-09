# 🎓 E-Learning Platform - OAuth2 & OpenID Connect

Plateforme d'apprentissage en ligne sécurisée avec authentification OAuth2/OIDC utilisant Keycloak, Spring Boot et React.



## 🛠️ Technologies utilisées

- **Serveur d'identité** : Keycloak 
- **Backend** : Spring Boot, Spring Security, OAuth2 Resource Server
- **Frontend** : React, Keycloak-js, Axios
- **Sécurité** : OAuth2, OpenID Connect, JWT

## 🏗️ Architecture

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

## ⚙️ Configuration

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

## 🚀 Utilisation

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

## 📸 Captures d'écran

### 1. Configuration Keycloak

### 2. Application React

#### Page de connexion Keycloak
*Page d'authentification Keycloak*

#### Profil utilisateur (Student)
![Student Profile](./screenshots/06-student-profile.png)
*Profil de user1 avec rôle ROLE_STUDENT*

#### Liste des cours
![Courses List](./screenshots/07-courses-list.png)
*Liste des cours disponibles*

#### Panneau Admin
![Admin Panel](./screenshots/08-admin-panel.png)
*Panneau d'administration (visible uniquement pour admin)*

#### Ajout de cours (Admin)
![Add Course](./screenshots/09-add-course.png)
*Formulaire d'ajout de cours*

### 3. Tests API avec Postman

#### Token Student
![Student Token](./screenshots/10-postman-student-token.png)
*Obtention du token pour user1*

#### GET /courses - Autorisé
![GET Courses Success](./screenshots/11-get-courses-success.png)
*GET /courses avec token student - 200 OK*

#### POST /courses - Refusé (Student)
![POST Refused Student](./screenshots/12-post-refused-student.png)
*POST /courses avec token student - 403 Forbidden*

#### Token Admin
![Admin Token](./screenshots/13-postman-admin-token.png)
*Obtention du token pour admin1*

#### POST /courses - Autorisé (Admin)
![POST Success Admin](./screenshots/14-post-success-admin.png)
*POST /courses avec token admin - 200 OK*

#### GET /me - User Info
![User Info](./screenshots/15-get-me-userinfo.png)
*Endpoint /me affichant les informations et rôles*

## 🧪 Tests

### Tests manuels avec Postman

#### 1. Obtenir un token

```http
POST http://localhost:8080/realms/elearning-realm/protocol/openid-connect/token
Content-Type: application/x-www-form-urlencoded

grant_type=password
&client_id=react-client
&username=user1
&password=password
```

#### 2. Tester GET /courses

```http
GET http://localhost:8081/api/courses
Authorization: Bearer {votre_token}
```

**Résultat attendu** : 200 OK

#### 3. Tester POST /courses (Student)

```http
POST http://localhost:8081/api/courses
Authorization: Bearer {token_student}
Content-Type: application/json

{
  "title": "Nouveau Cours",
  "description": "Description du cours",
  "instructor": "Instructeur"
}
```

**Résultat attendu** : 403 Forbidden

#### 4. Tester POST /courses (Admin)

```http
POST http://localhost:8081/api/courses
Authorization: Bearer {token_admin}
Content-Type: application/json

{
  "title": "Nouveau Cours",
  "description": "Description du cours",
  "instructor": "Instructeur"
}
```

**Résultat attendu** : 200 OK

### Scénarios de test

- ✅ Connexion réussie avec user1
- ✅ Affichage du profil utilisateur
- ✅ Consultation des cours (Student & Admin)
- ✅ Ajout de cours autorisé (Admin uniquement)
- ✅ Ajout de cours refusé (Student)
- ✅ Déconnexion fonctionnelle
- ✅ Refresh automatique du token
- ✅ Gestion des erreurs 401/403

## 📁 Structure du projet

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

## 🔒 Sécurité

- Authentification via OAuth2 + OpenID Connect
- Tokens JWT signés par Keycloak
- Validation des tokens côté backend
- Protection des routes par rôles (@PreAuthorize)
- Refresh automatique des tokens
- CORS configuré pour sécuriser les appels API

## 🐛 Dépannage

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

## 📝 Endpoints API

| Method | Endpoint | Rôle requis | Description |
|--------|----------|-------------|-------------|
| GET    | /api/courses | STUDENT, ADMIN | Liste des cours |
| POST   | /api/courses | ADMIN | Ajouter un cours |
| GET    | /api/me | Authentifié | Informations utilisateur |

## 👤 Auteur

**Votre Nom**
- GitHub: [@votre-username](https://github.com/votre-username)
- Email: votre.email@example.com

## 📄 Licence

Ce projet est réalisé dans le cadre d'un TP académique.

---

⭐ **N'oubliez pas de star ce repo si vous l'avez trouvé utile !**
