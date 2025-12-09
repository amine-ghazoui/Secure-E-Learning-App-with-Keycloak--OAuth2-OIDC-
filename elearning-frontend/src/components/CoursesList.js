import React, { useState, useEffect } from 'react';
import { getCourses } from '../services/api';

function CoursesList() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            setLoading(true);
            const response = await getCourses();
            setCourses(response.data);
            setError(null);
        } catch (err) {
            setError('Erreur lors du chargement des cours');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Chargement des cours...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    return (
        <div style={styles.container}>
            <h2>📚 Cours Disponibles</h2>

            <div style={styles.grid}>
                {courses.map((course) => (
                    <div key={course.id} style={styles.card}>
                        <h3 style={styles.title}>{course.title}</h3>

                        <p style={styles.description}>{course.description}</p>

                        <p style={styles.instructor}>
                            👨‍🏫 Instructeur : {course.instructor}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

const styles = {
    container: {
        margin: '2rem 0',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.5rem',
        marginTop: '1rem',
    },
    card: {
        backgroundColor: '#fff',
        padding: '1.5rem',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: '1px solid #e0e0e0',
        transition: 'transform 0.2s',
        cursor: 'pointer',
    },
    title: {
        color: '#2c3e50',
        marginBottom: '1rem',
    },
    description: {
        color: '#7f8c8d',
        marginBottom: '1rem',
        lineHeight: '1.5',
    },
    instructor: {
        color: '#34495e',
        fontSize: '0.9rem',
    },
};

export default CoursesList;
