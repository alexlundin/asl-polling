import React, {useEffect} from 'react'
import { __ } from '@wordpress/i18n';
import { Layout, Menu } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import { fetchPolls } from "./redux/pollSlice/pollSlice";
import { useDispatch } from "react-redux";


const {Header, Content} = Layout
const items = [
    {
        label: <Link to="/home">{__('All Polls', 'asl-polling')}</Link>,
        key: '/home'
    },
    {
        label: <Link to="/tools">{__('Tools and Settings', 'asl-polling')}</Link>,
        key: '/tools'
    },
    {
        label:  <Link to="/help">{__('Help and Documentation', 'asl-polling')}</Link>,
        key: '/help'
    }

];

const App = () => {
    let location = useLocation();
    const dispatch = useDispatch()
    useEffect( () => {
        dispatch( fetchPolls() );
    }, [ dispatch ] );

    return (
        <Layout className='layout'>
            <Header>
                <span className="plugin-name" tabIndex="0">WP Polling</span>
                <Menu
                    items={items}
                    mode='horizontal'
                    defaultSelectedKeys={location.pathname}
                    selectedKeys={location.pathname}
                />
            </Header>
            <Content>
                <Outlet/>
            </Content>
        </Layout>

    );
};

export default App;
