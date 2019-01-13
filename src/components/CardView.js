import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import OrderingCard from './OrderingCard';
import SelectionCard from './SelectionCard';

const styles = {
    layout: {
        margin: 'auto'
    },
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};

class CardView extends Component {

    constructor(props) {
        super(props);
        this.state = { questionType: "ordering" };
        this.childOrdering = React.createRef();
        this.childSelection = React.createRef();
        this.currentChild = this.childOrdering;
        this.refreshData = this.refreshData.bind(this);
        this.validate = this.validate.bind(this);
        this.updateType = this.updateType.bind(this);
    }

    refreshData = () => {
        this.currentChild.current.refreshData();
    };

    validate = () => {
        this.currentChild.current.validate();
    };

    updateType = () => {
        if (this.state.questionType == "selection") {
            this.setState({ questionType: "ordering" });
            this.currentChild = this.childOrdering;
        } else {
            this.setState({ questionType: "selection" });
            this.currentChild = this.childSelection;
        }

    };

    render() {
        return (
            <div style={styles.layout}>
                <Card style={styles.card}>
                    <CardContent>
                        {
                            this.state.questionType === "ordering" ? <OrderingCard ref={this.childOrdering} /> : <SelectionCard ref={this.childSelection} />
                        }
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={this.validate}>Check</Button>
                        <Button size="small" onClick={this.refreshData}>Next</Button>
                        <Button size="small" onClick={this.updateType}>Change</Button>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default CardView;