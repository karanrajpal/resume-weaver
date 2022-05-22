// Import styles
import '../../styles/styles.scss';

import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import ConnectedResume from './ResumeSwitch';
import ConnectedResumeEditor from './ResumeEditor';
import { Save } from './Save';

const App = () => (
    <Router>
        <div>
            <Route exact path='/' component={ConnectedResumeEditor} />
            <Route exact path='/resume' component={ConnectedResume} />
            <Route exact path='/arweave' component={Save} />
        </div>
    </Router>
);

export default App;
