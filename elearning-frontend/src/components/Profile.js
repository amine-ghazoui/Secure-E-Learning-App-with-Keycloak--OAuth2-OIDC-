import React from 'react';

function Profile({ userInfo }) {
    if (!userInfo) return <p>Chargement du profil...</p>;

    return (
        <div style={styles.container}>
            <div style={styles.card}>

                <h2>👤 Profil Utilisateur</h2>

                <div style={styles.row}>
                    <strong>Nom d'utilisateur :</strong>
                    <span>{userInfo.username}</span>
                </div>

                <div style={styles.row}>
                    <strong>Prénom :</strong>
                    <span>{userInfo.firstName}</span>
                </div>

                <div style={styles.row}>
                    <strong>Nom :</strong>
                    <span>{userInfo.lastName}</span>
                </div>

                <div style={styles.row}>
                    <strong>Email :</strong>
                    <span>{userInfo.email}</span>
                </div>

                <div style={styles.row}>
                    <strong>Rôles :</strong>
                    <div style={styles.roles}>
                        {userInfo.roles?.map((role, index) => (
                            <span key={index} style={styles.badge}>
                                {role}
                            </span>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

const styles = {
    container: {
        margin: '2rem 0',
    },
    card: {
        backgroundColor: '#f8f9fa',
        padding: '1.5rem',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0.75rem 0',
        borderBottom: '1px solid #e0e0e0',
    },
    roles: {
        display: 'flex',
        gap: '0.5rem',
    },
    badge: {
        backgroundColor: '#3498db',
        color: 'white',
        padding: '0.25rem 0.75rem',
        borderRadius: '12px',
        fontSize: '0.85rem',
    },
};

export default Profile;
