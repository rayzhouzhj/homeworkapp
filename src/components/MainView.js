import React, { Component } from 'react';
import EnglishLandingView from './EnglishLandingView';
import { Route, Switch } from 'react-router-dom'
import GoalView from './GoalView';

const styles = theme => ({
    root: {
        display: 'flex',
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
});

class MainView extends Component {

    constructor(props) {
        super(props);
        this.state = { onLanding: true };

    }
    render() {
        return (
            <main className={styles.content}>
            {
                    // this.state.onLanding? 
            }
            <Switch>
                <Route exact path='/' component={GoalView} />
                <Route path='/subject/english' component={EnglishLandingView} />
            </Switch>
                
            </main>

        );
    }
}

export default MainView;