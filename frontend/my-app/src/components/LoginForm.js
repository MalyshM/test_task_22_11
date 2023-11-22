import React, {useState} from 'react';

const LoginForm = ({onLogin}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const formData = {
            username,
            password,
        };

        try {
            const response = await fetch('http://localhost:8090/api/login', {
                method: 'POST', // Corrected the method to POST
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                const userId = data; // Assuming the API response contains the user ID
                onLogin(userId);
            } else {
                // Login failed, handle the error response
                console.log('Login failed');
            }
        } catch (error) {
            // Error occurred during login, handle the error
            console.error('Error during login:', error);
        }
    };

    return (
        <div>
            <h2>Login Form</h2>
            <label>
                Username:
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </label>
            <br/>
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <br/>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default LoginForm;