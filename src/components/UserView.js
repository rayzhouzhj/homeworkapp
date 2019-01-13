import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import asher from "../assets/images/asher.jpeg";
import MoreVertIcon from '@material-ui/icons/MoreVert';

const styles = theme => ({
    card: {
        maxWidth: 400,
    },
    bigAvatar: {
        margin: 10,
        width: 60,
        height: 60,
    }
});

class UserView extends React.Component {
    state = { expanded: false };

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };

    render() {
        const { classes } = this.props;

        return (
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar alt="Asher Zhou" src={asher} className={classes.bigAvatar} />
                    }
                    action={
                        <IconButton>
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title="Asher"
                    subheader="一年級"
                />         
            </Card>
        );
    }
}

UserView.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserView);