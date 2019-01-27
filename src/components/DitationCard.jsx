import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import hardworking from "../assets/images/hardworking.gif"
import haha from "../assets/images/haha.gif"
import ohno from "../assets/images/ohno.gif"
import config from '../config.json'
import Grid from '@material-ui/core/Grid';
import VoiceChip from './VoiceChip';

const styles = {
    select: {
        marginLeft: '10px',
        marginRight: '10px',
        marginBottom: 10,
        fontSize: 18
    },
    text: {
        fontSize: 18,
    },
    bigAvatar: {
        width: 60,
        height: 60,
    }
};

const divs = {
    left: {
        float: "left",
        paddingTop: 10
    },
    right: {
        float: "right"
    }
}

const getImageStyle = (startValidate) => {
    return ({
        height: "30px",
        width: "30px",
        marginRight: 10,
        display: startValidate ? "inline-block" : "none"
    });

}

class DitationCard extends Component {
    constructor(props) {
        super(props);
        this.state = { startValidate: false, type: "ditation", data: [] };
        this.subject = this.props.subject;

        this.refreshData = this.refreshData.bind(this);
    }

    validate() {
        let newState = this.state;
        newState.startValidate = true;
        this.setState(newState);
    }

    componentDidMount() {
        this.refreshData();
    }

    refreshData() {
        fetch(`http://${config.host}/getquestion/subject/${this.subject}/grade/1/semeter/2/type/ditation`, {
            method: 'get',
        })
            .then(response => {
                return response.json();
            })
            .then(json => {
                let newState = this.state;
                newState.data = json.data;
                newState.startValidate = false;
                console.log("new State");
                console.log(newState);
                this.setState(newState);
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <div style={{ float: 'left' }}><img src={hardworking} style={styles.bigAvatar} alt="hard working..." /></div>
                        <div><Typography variant="h4" style={{ marginTop: 20, marginLeft: 5 }}>Ditation</Typography></div>
                    </Grid>
                </Grid>

                <div className={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                }}>
                    {
                        this.state.onLandingReview.map((node, nodeIndex) => (
                            // <Grid container spacing={24} key={`ditation-list-item${nodeIndex}`}>
                                <VoiceChip text={node} />
                            // </Grid>
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default DitationCard;
