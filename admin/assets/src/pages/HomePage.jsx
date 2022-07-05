import React from 'react';
import Welcome from "../components/Welcome";
import PollTable from "../components/PollTable";
import { useSelector } from "react-redux";
import { Spin } from "antd";

const HomePage = () => {
    const {polls, loading} = useSelector( state => state.polls )

    if (loading) {
        return (
            <div className="asl-spin">
                <Spin/>
            </div>
        )
    } else {
        return (
            <div>
                {polls.length === 0 ? <Welcome/> : <PollTable/>}
            </div>
        )
    }
};

export default HomePage;
