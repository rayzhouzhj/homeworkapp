import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Content from './Content';
import hardworking from "../assets/images/hardworking.gif"

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
        this.state = { };
        this.child = React.createRef();
        this.onClick = this.onClick.bind(this);
        this.validate = this.validate.bind(this);
    }

    onClick = () => {
        this.child.current.refreshData();
    };

    validate = () => {
        this.child.current.validate();
    };

    render() {
        return (
            <div style={styles.layout}>
                <Card style={styles.card}>
                    <CardContent>
                        <Content ref={this.child}/>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={this.validate}>Check</Button>
                        <Button size="small" onClick={this.onClick}>Next</Button>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default CardView;