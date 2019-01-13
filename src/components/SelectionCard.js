import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import hardworking from "../assets/images/hardworking.gif"
import haha from "../assets/images/haha.gif"
import ohno from "../assets/images/ohno.gif"

const styles = {
    select: {
        marginLeft: '10px',
        marginRight: '10px'
    },
    text: {
        fontSize: 18,
    }
};

const divs = {
    left: {
        float: "left"
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
        this.state = { startValidate: false, type: "selection", data: [
            {
                status: false,
                details: [
                    {
                        type: "text",
                        content: "This is just a "
                    },
                    {
                        type: "select",
                        options: ["great", "normal", "not good"],
                        expected: "good",
                        selected: ""
                    },
                    {
                        type: "text",
                        content: "aiya... "
                    }
                ]
            },
            {
                status: false,
                details: [
                    {
                        type: "text",
                        content: "This is just a "
                    },
                    {
                        type: "select",
                        options: ["great", "normal", "not good"],
                        expected: "normal",
                        selected: "",
                        matched: false
                    },
                    {
                        type: "text",
                        content: "aiya... "
                    },
                    {
                        type: "select",
                        options: ["great", "normal", "not good"],
                        expected: "normal",
                        selected: "",
                        matched: false
                    },
                    {
                        type: "text",
                        content: "2nd... "
                    }
                ]
            },
            {
                status: false,
                details: [
                    {
                        type: "text",
                        content: "This is just a "
                    },
                    {
                        type: "select",
                        options: ["great", "normal", "not good"],
                        expected: "normal",
                        selected: "",
                        matched: false
                    },
                    {
                        type: "text",
                        content: "aiya... "
                    },
                    {
                        type: "select",
                        options: ["great", "normal", "not good"],
                        expected: "normal",
                        selected: "",
                        matched: false
                    },
                    {
                        type: "text",
                        content: "2nd... "
                    }
                ]
            }
        ]};

        this.renderNode = this.renderNode.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    validate() {
        let newState = this.state;
        newState.startValidate = true;
        this.setState(newState);
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
