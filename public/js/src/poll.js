import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import App from './App.jsx';

const polls = document.querySelectorAll( '.asl-poll' )
for (let poll of polls) {
    ReactDOM.render(
        <StrictMode>
            <App id={poll.dataset['poll']} skin={poll.dataset['skin']} showHead={poll.dataset['head']} showDescription={poll.dataset['description']}/>
        </StrictMode>,
        document.getElementById( poll.id ),
    );
}



