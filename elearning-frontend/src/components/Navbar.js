import React from 'react';
import keycloak from '../keycloak';

function Navbar({ userInfo }) {
    const handleLogout = () => {
        keycloak.logout({ redirectUri: 'http://localhost:3000' });
    };

    return (
        <nav style={styles.navbar}>

            {/* Titre */}
            <h1 style={styles.brand}>🎓 E-Learning Platform</h1>

            {/* Partie droite */}
            <div style={styles.userSection}>
                {userInfo && (
                    <span style={styles.username}>
                        Bienvenue, {userInfo.firstName} {userInfo.lastName}
                    </span>
                )}

                <button style={styles.logoutBtn} onClick={handleLogout}>
                    Déconnexion
                </button>
            </div>

        </nav>
    );
}

const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        backgroundColor: '#2c3e50',
        color: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    brand: {
        margin: 0,
    },
    userSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
    },
    username: {
        fontSize: '1rem',
    },
    logoutBtn: {
        padding: '0.5rem 1rem',
        backgroundColor: '#e74c3c',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
};

export default Navbar;
