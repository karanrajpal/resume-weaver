// Import styles
import '../../styles/styles.scss';

import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import ConnectedResume from './ResumeSwitch';
import ConnectedResumeEditor from './ResumeEditor';

const App = () => (
    <Router>
        <div>
            <Route exact path='/' component={ConnectedResumeEditor} />
            <Route exact path='/resume' component={ConnectedResume} />
        </div>
    </Router>
);

export default App;
