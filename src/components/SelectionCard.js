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
        display: startValidate? "inline-block" : "none"
    });
    
}

class SelectionCard extends Component {
    constructor(props) {
        super(props);
        this.state = { startValidate: false, type: "selection", data: []};
        this.subject = this.props.subject;

        this.renderNode = this.renderNode.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
        fetch(`http://${config.host}/getquestion/subject/${this.subject}/type/selection`, {
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

    handleChange = event => {
        console.log(event.target);

        let newState = this.state;
        console.log(newState);
        let nameDetails = event.target.name.replace("list-item-", "").replace("input-", "").split("-");
        console.log(nameDetails);
        let nodeIndex = nameDetails[0];
        let itemIndex = nameDetails[1];
        newState.data[nodeIndex].status = true;
        newState.data[nodeIndex].details[itemIndex].selected = event.target.value;

        if (newState.data[nodeIndex].details[itemIndex].selected === newState.data[nodeIndex].details[itemIndex].expected){
            newState.data[nodeIndex].details[itemIndex].matched = true;
        }
        
        console.log(newState);

        this.setState(newState);
    };

    renderNode(node, nodeIndex, itemIndex) {
        if (node.type === "text") {
            return (
                <div id="result" key={`list-item${nodeIndex}+text${itemIndex}`}>
                    < Typography style={styles.text} noWrap={true}>
                        {itemIndex == 0? `${nodeIndex+1}.  ` : ""}
                        {node.content}
                    </Typography>
                </div>
            )
        } else if (node.type === "select") {
            return (
                <div key={`list-item${nodeIndex}-div${itemIndex}`}>
                    <div style={divs.left} key={`list-item${nodeIndex}-div${itemIndex}-left`}>
                    <Select
                        value={this.state.data[nodeIndex].details[itemIndex].selected}
                        style={styles.select}
                        onChange={this.handleChange}
                        key={`list-item${nodeIndex}-select${itemIndex}`}
                        inputProps={{
                            name: `list-item-${nodeIndex}-input-${itemIndex}`,
                            id: `list-item${nodeIndex}-input${itemIndex}`
                        }}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {
                            node.options.map((option, optionIndex) => (
                                <MenuItem value={option} key={`list-item${nodeIndex}-select${itemIndex}-option${optionIndex}`}>{option}</MenuItem>
                            ))
                        }
                    </Select>
                    </div>
                    <div style={divs.right} key={`list-item${nodeIndex}-div${itemIndex}-right`}>
                    <img src={
                        this.state.data[nodeIndex].details[itemIndex].matched ? haha : ohno
                        } style={getImageStyle(this.state.startValidate)} alt="hard working..." />
                    </div>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                <Grid container spacing={24}>
                    <Grid item xs={1}>
                        <img src={hardworking} style={styles.bigAvatar} alt="hard working..." />
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="h4" style={{ marginTop: 10, marginLeft: 5 }}>選擇題</Typography>
                    </Grid>
                </Grid>

                <List component="nav">
                    {
                        this.state.data.map((node, nodeIndex) => (
                            <ListItem button key={`list-item${nodeIndex}`}>
                                {
                                    node.details.map((item, itemIndex) => (
                                        this.renderNode(item, nodeIndex, itemIndex)
                                    ))
                                }
                            </ListItem> 
                        ))
                    }
              
                </List>
            </div>
    )}
}

export default SelectionCard;
