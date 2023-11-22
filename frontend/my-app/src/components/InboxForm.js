import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';

const InboxForm = ({currentUser}) => {
    const [inboxData, setInboxData] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const fetchInboxData = async () => {
            if (currentUser) {
                const response = await fetch(`http://localhost:8090/api/my_inbox?user=${currentUser}`);
                const data = await response.json();
                setInboxData(data);
            } else {
                setInboxData([]);
            }
        };

        fetchInboxData();
    }, [currentUser]);

    const handleStartDialogue = (receiverUser) => {
        localStorage.setItem('receiverUser', receiverUser)
    };

    return (
        <div>
            <h2>Inbox</h2>
            {inboxData.map((data) => (
                <div key={data.id}>
                    <p>User ID: {data.user_id}</p>
                    <p>Response Text: {data.response_text}</p>
                    <p>Request ID: {data.request_id}</p>
                    <a href={'/dialogue'}>
                        <button onClick={() => handleStartDialogue(data.user_id)}>Start Dialogue</button>
                    </a>
                </div>
            ))}
        </div>
    );
};

export default InboxForm;