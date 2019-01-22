import React, { Component } from 'react';
import CardView from './CardView';
import { Route } from 'react-router-dom'

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
        this.state = { };

    }
    render() {
        return (
            <main className={styles.content}>
                <Route path='/subject/:subject' component={CardView} />
            </main>

        );
    }
}

export default MainView;