import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import RequestList from './components/RequestList';
import RequestDetails from './components/RequestDetails';
import {getRequests, getRequestById} from './api/requests';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import CreateRequestForm from './components/CreateRequestForm';
import InboxForm from './components/InboxForm';
import DialoguePage from './components/DialoguePage';

const App = () => {
    const [requests, setRequests] = useState([]);
    const [selectedRequestId, setSelectedRequestId] = useState(null);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [showCreateRequestForm, setShowCreateRequestForm] = useState(false);
    const [showInboxForm, setShowInboxForm] = useState(false);

    useEffect(() => {
        const fetchRequests = async () => {
            const data = await getRequests();
            setRequests(data);
        };

        fetchRequests();
    }, []);

    useEffect(() => {
        const fetchRequestDetails = async () => {
            if (selectedRequestId) {
                const data = await getRequestById(selectedRequestId);
                setSelectedRequest(data);
            }
        };

        fetchRequestDetails();
    }, [selectedRequestId]);

    useEffect(() => {
        const storedUserId = localStorage.getItem('currentUser');
        if (storedUserId) {
            setCurrentUser(storedUserId);
        }
    }, []);

    const handleSelectRequest = (id) => {
        setSelectedRequestId(id);
        localStorage.getItem('currentUser');
        console.log(currentUser);
        console.log(selectedRequest);
        if (selectedRequest && selectedRequest.user_id === currentUser) {
            console.log('You are the creator of this request.');
        } else {
            console.log('You are not the creator of this request.');
        }
    };

    const handleLogin = (userId) => {
        setCurrentUser(userId);
        localStorage.setItem('currentUser', userId);
        setShowLoginForm(false);
    };

    const handleRegister = () => {
        setShowRegisterForm(false);
    };

    const handleRegisterClick = () => {
        setShowRegisterForm(true);
    };

    const handleLoginClick = () => {
        setShowLoginForm(true);
    };

    const handleCreateRequest = (data) => {
        setRequests([...requests, data]);
        setShowCreateRequestForm(false);
    };

    const handleCreateRequestClick = () => {
        setShowCreateRequestForm(true);
    };

    const handleViewInbox = () => {
        if (currentUser === undefined) {
            alert('Please login first.');
            return;
        }
        setShowCreateRequestForm(false);
        setShowInboxForm(true);
    };

    return (
        <Router>
            <Switch>
                <Route exact path="/" render={() => (
                    <div>
                        <button onClick={handleRegisterClick}>Register</button>
                        <button onClick={handleLoginClick}>Login</button>
                        {showRegisterForm && <RegisterForm onRegister={handleRegister}/>}
                        {showLoginForm && <LoginForm onLogin={handleLogin}/>}
                        <RequestList requests={requests} onSelectRequest={handleSelectRequest}/>
                        {selectedRequest && (
                            <RequestDetails request={selectedRequest} currentUser={currentUser}/>
                        )}
                        {showCreateRequestForm ? (
                            <CreateRequestForm onCreateRequest={handleCreateRequest}/>
                        ) : (
                            <button onClick={handleCreateRequestClick}>Create Request</button>
                        )}
                        {currentUser !== undefined && (
                            <div>
                                <button onClick={handleViewInbox}>View Inbox</button>
                                {showInboxForm && <InboxForm currentUser={currentUser}/>}
                            </div>
                        )}
                    </div>
                )}/>
                <Route
                    path="/dialogue"
                    render={({}) => (
                        <DialoguePage
                            currentUser={localStorage.getItem('currentUser')}
                            receiverUser={localStorage.getItem('receiverUser')}
                        />
                    )}
                />
            </Switch>
        </Router>
    );
};

export default App;