import React from 'react';

const HomePage = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Welcome to Our Application!</h1>
            <p style={styles.paragraph}>This is the home page of our awesome app. Here, you can find various features and information. Feel free to explore and enjoy our services.</p>
            {/* Add more content here as needed */}
        </div>
    );
};

// You can also use external CSS files instead of inline styles
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#f5f5f5' // Light grey background
    },
    header: {
        fontSize: '2.5em',
        color: '#333', // Dark grey text
        marginBottom: '20px'
    },
    paragraph: {
        fontSize: '1.2em',
        color: '#666' // Medium grey text
    }
};

export default HomePage;
