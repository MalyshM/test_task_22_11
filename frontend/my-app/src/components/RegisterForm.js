import React, {useState} from 'react';

const RegisterForm = ({onRegister}) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        const user = {
            username,
            email,
            password,
        };

        try {
            const response = await fetch('http://localhost:8090/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                // Registration successful, handle the response accordingly
                setUsername('');
                setEmail('');
                setPassword('');
                onRegister()
            } else {
                // Registration failed, handle the error response
            }
        } catch (error) {
            // Error occurred during registration, handle the error
        }
    };

    return (
        <div>
            <h2>Register Form</h2>
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
                Email:
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
            <button onClick={handleRegister}>Register</button>
        </div>
    );
};

export default RegisterForm;