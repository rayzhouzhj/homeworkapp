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
import VoiceButton from './VoiceButton';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const styles = {
    card: {
        minWidth: 275,
    },
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
        console.log("initial state: " + this.state);
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

    validate = () => {
        this.validate = this.validate.bind(this);
    };

    refreshData() {
        fetch(`http://${config.host}/getquestions/subject/english/grade/1/semester/2/type/ditation`, {
            method: 'get',
        })
            .then(response => {
                return response.json();
            })
            .then(json => {
                let newState = this.state;
                newState.data = json;
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
        console.log("render state: " + this.state);
        return (
            <Card style={styles.card}>
                <CardContent>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <div style={{ float: 'left' }}><img src={hardworking} style={styles.bigAvatar} alt="hard working..." /></div>
                        <div><Typography variant="h4" style={{ marginTop: 20, marginLeft: 5 }}>Ditation</Typography></div>
                    </Grid>
                </Grid>

                
                    {
                        this.state.data.map((node, nodeIndex) => (
                            <Grid container spacing={24} key={`ditation-list${nodeIndex}`}>
                                <Grid item xs="auto"><Typography variant="h5" style={{ marginTop: 8}}>{nodeIndex+1}.</Typography></Grid>
                                <Grid item xs={node.length > 10? 8 : 3} >
                                    
                                    <TextField
                                        style={{ margin: 8 }}
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={3} >
                                    <VoiceButton text={node} />
                                </Grid>
                            </Grid>
                        ))
                    }
                    </CardContent>
                <CardActions>
                    <Button size="small" onClick={this.validate}>Check</Button>
                </CardActions>
            </Card>
        )
    }
}

export default DitationCard;
