import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import OrderingCard from './OrderingCard';
import SelectionCard from './SelectionCard';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import { TweenMax } from "gsap/TweenMax";
import { TimelineLite, CSSPlugin } from "gsap/all";

const styles = {
    layout: {
        margin: 'auto'
    },
    card: {
        minWidth: 275,
    },
    bigAvatar: {
        margin: 10,
        width: 60,
        height: 60,
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
        this.subject = this.props.match.params.subject;
        this.childOrdering = React.createRef();
        this.childSelection = React.createRef();
        this.currentChild = this.childOrdering;
        this.refreshData = this.refreshData.bind(this);
        this.validate = this.validate.bind(this);
        this.updateType = this.updateType.bind(this);

        // this.container = null;
        // this.logoTween = null;
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

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.state.refresh === true) {
            this.subject = nextProps.match.params.subject;
            this.updateType();
        }
    }
    
    render() {
        return (
            <div style={styles.layout}>
                <Card style={styles.card}>
                    <CardContent>
                        {
                            this.state.questionType === "ordering" ? <OrderingCard ref={this.childOrdering} subject={this.subject} /> : <SelectionCard ref={this.childSelection} subject={this.subject}/>
                        }
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={this.validate}>Check</Button>
                        <Button size="small" onClick={this.refreshData}>Next</Button>
                        <Button size="small" onClick={this.updateType} ref={card => this.container = card}>Change</Button>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default CardView;