import React, { useState, useEffect } from 'react';
import keycloak from './keycloak';
import { getUserInfo } from './services/api';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import CoursesList from './components/CoursesList';
import AdminPanel from './components/AdminPanel';
import './App.css';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshCourses, setRefreshCourses] = useState(0);

  // INITIALISATION KEYCLOAK
  useEffect(() => {
    keycloak
        .init({
          onLoad: 'login-required',
          checkLoginIframe: false,
        })
        .then((auth) => {
          setAuthenticated(auth);

          if (auth) {
            fetchUserInfo();

            // Rafraîchissement du token
            setInterval(() => {
              keycloak.updateToken(30).catch(() => {
                console.error('Token refresh failed');
                keycloak.login();
              });
            }, 30000);
          }

          setLoading(false);
        })
        .catch((err) => {
          console.error('Keycloak initialization failed', err);
          setLoading(false);
        });
  }, []);

  // RÉCUPÉRATION DES INFORMATIONS UTILISATEUR
  const fetchUserInfo = async () => {
    try {
      const response = await getUserInfo();
      setUserInfo(response.data);
      console.log('User Info:', response.data);
    } catch (err) {
      console.error('Error fetching user info:', err);
    }
  };

  const isAdmin = () => {
    return userInfo?.roles?.includes('ROLE_ADMIN');
  };

  const handleCourseAdded = () => {
    setRefreshCourses((prev) => prev + 1);
  };

  // CHARGEMENT
  if (loading) {
    return (
        <div className="loading">
          <h2>Chargement de l'application...</h2>
        </div>
    );
  }

  // NON AUTHENTIFIÉ
  if (!authenticated) {
    return (
        <div>
          <h2>Non authentifié. Redirection vers la page de connexion...</h2>
        </div>
    );
  }

  return (
      <div>
        {/* Navbar */}
        <Navbar userInfo={userInfo} />

        <div className="container">
          {/* Profil utilisateur */}
          <Profile userInfo={userInfo} />

          {/* Liste des cours */}
          <CoursesList key={refreshCourses} />

          {/* Section Admin si ROLE_ADMIN */}
          {isAdmin() ? (
              <div style={{ marginTop: '2rem' }}>
                <AdminPanel onCourseAdded={handleCourseAdded} />
              </div>
          ) : (
              <div style={{ marginTop: '1rem', color: '#555' }}>
                <p>
                  ℹ️ Vous êtes connecté en tant qu'étudiant.<br />
                  Le panneau d'administration n'est pas disponible.
                </p>
              </div>
          )}
        </div>
      </div>
  );
}

export default App;
