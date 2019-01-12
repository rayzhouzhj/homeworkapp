import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import App from './App'
import NestedList from './components/NestedList'

const styles = {
    layout: {
        margin: 'auto',
        width: '50%',
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

function SimpleCard() {
    const bull = <span className={styles.bullet}>•</span>;

    return (
        <div style={styles.layout}>
        <Card className={styles.card}>
            <CardContent>
                <Typography className={styles.title} color="textSecondary" gutterBottom>
                    Word of the Day
        </Typography>
                <Typography variant="h5" component="h2">
                    be
          {bull}
                    nev
          {bull}o{bull}
                    lent
        </Typography>
                <Typography className={styles.pos} color="textSecondary">
                    adjective
        </Typography>
                <Typography component="p">
                    well meaning and kindly.
          <br />
                    {'"a benevolent smile"'}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
        </div>
    );
}

ReactDOM.render(
    <App />
   , document.getElementById('root'));