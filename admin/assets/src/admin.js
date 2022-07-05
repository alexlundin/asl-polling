import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Routes, Route} from 'react-router-dom';

import App from './App.jsx';

import HomePage from './pages/HomePage';
import ToolsPage from './pages/ToolsPage';
import HelpPage from './pages/HelpPage';
import NotFoundPage from './pages/NotFoundPage';
import PollPage from './pages/PollPage';
import {Provider} from "react-redux";
import {store} from "./redux/store";

ReactDOM.render(
    <StrictMode>
        <HashRouter>
            <Provider store={store}>
                <Routes>
                    <Route path='/' element={<App/>}>
                        <Route path='home' element={<HomePage/>}/>
                        <Route path='add' element={<PollPage/>}/>
                        <Route path='tools' element={<ToolsPage/>}/>
                        <Route path='help' element={<HelpPage/>}/>
                        <Route path='*' element={<NotFoundPage/>}/>
                        <Route path='poll/:id' element={<PollPage/>}/>
                    </Route>
                </Routes>
            </Provider>
        </HashRouter>
      </StrictMode>,
    document.getElementById('asl-polling'),
);

