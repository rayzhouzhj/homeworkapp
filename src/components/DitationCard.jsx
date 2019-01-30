import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
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

const getImageStyle = (startValidate) => {
    return ({
        height: "30px",
        width: "30px",
        marginTop: 10,
        display: startValidate ? "inline-block" : "none"
    });

}

class DitationCard extends Component {
    constructor(props) {
        super(props);
        this.state = { startValidate: false, type: "ditation", data: [] };
        this.subject = this.props.subject;
        this.refreshData = this.refreshData.bind(this);
        this.validate = this.validate.bind(this);
        this.onTextFieldChange = this.onTextFieldChange.bind(this);
    }

    validate = () => {
        let newState = this.state;
        if (newState.startValidate){
            newState.data.forEach(v => {v.label = v.content});
        }else{
            newState.startValidate = true;
        }
        
        this.setState(newState);
    }

    onTextFieldChange = (e, index) => {
        e.preventDefault();
        let newState = this.state;
        newState.data[index].current = e.target.value;
        newState.data[index].matched = newState.data[index].current === newState.data[index].content;
        this.setState(newState);
    }

    componentDidMount() {
        this.refreshData();
    }

    refreshData() {
        fetch(`http://${config.host}/getquestions/subject/english/grade/1/semester/2/type/ditation`, {
            method: 'get',
        })
            .then(response => {
                return response.json();
            })
            .then(json => {
                let newState = this.state;
                newState.data = json.map(data => ({label: "", current: "", content: data, matched: false}));
                newState.startValidate = false;
                this.setState(newState);
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <Card style={styles.card}>
                <CardContent>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <div style={{ float: 'left' }}><img src={hardworking} style={styles.bigAvatar} alt="hard working..." /></div>
                        <div><Typography variant="h4" style={{ marginTop: 20, paddingLeft: 10 }}>Ditation</Typography></div>
                    </Grid>
                </Grid>

                
                    {
                        this.state.data.map((node, nodeIndex) => (
                            <Grid container spacing={16} key={`ditation-list${nodeIndex}`}>
                                <Grid item xs="auto"><Typography variant="h5" style={{ paddingRight: nodeIndex>8?0:15, marginTop: 8}}>{nodeIndex+1}.</Typography></Grid>
                                <Grid item xs={node.content.length > 10? 8 : 3} >
                                    
                                    <TextField
                                        style={{ margin: 8 }}
                                        label={node.label}
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={(e) => this.onTextFieldChange(e, nodeIndex)}
                                    />
                                </Grid>
                                <Grid item xs={3} >
                                    <div style={{ float: 'left' }}><VoiceButton text={node.content} /></div>
                                    
                                    <div key={`ditation-list${nodeIndex}-validate`}>
                                        {
                                            <img src={
                                                this.state.data[nodeIndex].matched ? haha : ohno
                                            } style={getImageStyle(this.state.startValidate)} alt="hard working..." />
                                        } 
                                    </div>
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
