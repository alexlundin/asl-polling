import React from 'react';
import {__} from '@wordpress/i18n';
import {Button} from "antd";
import {useNavigate} from "react-router-dom"

const Welcome = () => {
    const navigate = useNavigate()

    const onClick = () => {
        navigate('/add')
    }

    return (
        <div className="asl-polling-welcome">
            <h2>{__('Welcome to WP Pools', 'asl-polling')}</h2>
            <p>{__('Thank you for installing WP Pools', 'asl-polling')}</p>
            <div className="asl-polling_actions">
                <Button type="primary" shape="round" onClick={onClick}>
                    {__('Create a New Pool', 'asl-polling')}
                </Button>
            </div>
        </div>
    );
};

export default Welcome;
