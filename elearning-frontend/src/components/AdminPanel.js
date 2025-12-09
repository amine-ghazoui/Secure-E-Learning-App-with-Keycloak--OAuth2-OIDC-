import React, { useState } from 'react';
import { addCourse } from '../services/api';

function AdminPanel({ onCourseAdded }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        instructor: '',
    });

    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            await addCourse(formData);
            setMessage({ type: 'success', text: '✓ Cours ajouté avec succès !' });

            setFormData({
                title: '',
                description: '',
                instructor: ''
            });

            if (onCourseAdded) {
                setTimeout(() => onCourseAdded(), 1000);
            }
        } catch (error) {
            if (error.response?.status === 403) {
                setMessage({
                    type: 'error',
                    text: '✗ Accès refusé : Droits administrateur requis'
                });
            } else {
                setMessage({
                    type: 'error',
                    text: '✗ Erreur lors de l\'ajout du cours'
                });
            }
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div style={styles.container}>
            <h2>⚙️ Panneau d'Administration</h2>

            <div style={styles.card}>
                <h3>Ajouter un nouveau cours</h3>

                <form style={styles.form} onSubmit={handleSubmit}>

                    <input
                        style={styles.input}
                        type="text"
                        name="title"
                        placeholder="Titre du cours"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        style={styles.textarea}
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />

                    <input
                        style={styles.input}
                        type="text"
                        name="instructor"
                        placeholder="Nom de l'instructeur"
                        value={formData.instructor}
                        onChange={handleChange}
                        required
                    />

                    <button style={styles.button} type="submit" disabled={loading}>
                        {loading ? 'Ajout en cours...' : 'Ajouter le cours'}
                    </button>
                </form>

                {message && (
                    <div
                        style={{
                            ...styles.message,
                            backgroundColor:
                                message.type === 'success' ? '#d4edda' : '#f8d7da',
                            color:
                                message.type === 'success' ? '#155724' : '#721c24',
                        }}
                    >
                        {message.text}
                    </div>
                )}
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
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        marginTop: '1rem',
    },
    input: {
        padding: '0.8rem',
        fontSize: '1rem',
        borderRadius: '5px',
        border: '1px solid #ddd',
        outline: 'none',
    },
    textarea: {
        padding: '0.8rem',
        fontSize: '1rem',
        borderRadius: '5px',
        border: '1px solid #ddd',
        minHeight: '100px',
        resize: 'vertical',
        outline: 'none',
    },
    button: {
        padding: '0.8rem',
        backgroundColor: '#27ae60',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        fontSize: '1rem',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'background-color 0.3s',
    },
    message: {
        marginTop: '1rem',
        padding: '1rem',
        borderRadius: '5px',
        fontWeight: 'bold',
    },
};

export default AdminPanel;
