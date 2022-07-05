import React from "react";
import { useParams } from "react-router-dom";
import CreatePoll from "../components/CreatePoll";
import EditPoll from "../components/EditPoll";


const PollPage = () => {
    const params = useParams()
    return (Object.keys( params ).length === 0) ? <CreatePoll/> : <EditPoll id={params.id}/>
};

export default PollPage;
