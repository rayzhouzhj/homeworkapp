import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import VoiceChip from './VoiceChip';
import config from '../config.json';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import Zoom from '@material-ui/core/Zoom';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    div: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
    }
});

class EnglishLandingView extends Component {
    constructor(props) {
        super(props);
        this.state = { value: 0, onLandingReview: []};
        this.refreshData = this.refreshData.bind(this);

    }

    componentDidMount() {
        this.refreshData();
    }

    refreshData() {
        fetch(`http://${config.host}/getlanding/subject/english/grade/1/semester/2`, {
            method: 'get',
        })
            .then(response => {
                return response.json();
            })
            .then(json => {
                let newState = this.state;
                newState.onLandingReview = json.onLandingReview;
                newState.startValidate = false;
                this.setState(newState);
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleChange = (event, value) => {
        let newState = this.state;
        newState.value = value;
        this.setState(newState);
    };

    handleChangeIndex = index => {
        let newState = this.state;
        newState.value = index;
        this.setState(newState);
    };

    render() {

        return (
            <Paper className={styles.root} elevation={1}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                    >
                        <Tab label="Reivew" />
                        <Tab label="Practices" />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={'x'}
                    index={this.state.value}
                    onChangeIndex={this.handleChangeIndex}
                >
                    <Typography component="div" style={{ padding: 8 * 3 }}>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                        }}>
                            {
                                this.state.onLandingReview.map((node, nodeIndex) => (
                                    <Zoom in={true} style={{ transitionDelay: '200ms'}}>
                                    <div key={`landing-list-div-item${nodeIndex}`}>
                                        <VoiceChip label={node.displayText} sound={node.sound} key={`landing-list-item${nodeIndex}`} related={node.related}/>
                                    </div>
                                    </Zoom>
                                ))
                            }
                        </div>
                    </Typography>
                    <Typography component="div" style={{ padding: 8 * 3 }}>
                        <Link to={{
                            pathname: "/subject/english/ditation",
                            state: { refresh: true }
                        }}
                            style={{ textDecoration: 'none' }}>
                        <Button>Ditation</Button>
                        </Link>
                        <Link to={{
                            pathname: "/subject/english/selection",
                            state: { refresh: true }
                        }}
                            style={{ textDecoration: 'none' }}>
                        <Button>Selection</Button>
                        </Link>
                        {/* <Switch>
                            <Route path='/subject/english/ditation' component={DitationCard} />
                            <Route path='/subject/english/selection' render={() => <SelectionCard subject="english"/>} />
                        </Switch> */}
                    </Typography>
                    
                </SwipeableViews>
            </Paper>
        );
    }
}

export default EnglishLandingView;