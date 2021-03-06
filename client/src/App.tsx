import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PageRender from './PageRender';
import Header from './components/globle/Header';
import Footer from './components/globle/Footer';
import { Alert } from './components/alert/Alert';

import { useDispatch } from 'react-redux';
import { refrestToken } from './redux/actions/authActions'

function App() {

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(refrestToken())

    }, [dispatch])

    return (
        <div className="app">
            <Router>
                <Alert />
                <Header />

                <Switch>
                    <Route exact path='/' component={PageRender} />
                    <Route exact path='/:page' component={PageRender} />
                    <Route exact path='/:page/:slug' component={PageRender} />
                </Switch>

                <Footer />
            </Router>
        </div>
    );
}

export default App;
