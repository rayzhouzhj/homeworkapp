import React, { Component } from 'react';
import CardView from './CardView';
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

class SubjectMainView extends Component {

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
                    <Route path='/subject/:subject' component={CardView} />
                </Switch>

            </main>

        );
    }
}

export default SubjectMainView;