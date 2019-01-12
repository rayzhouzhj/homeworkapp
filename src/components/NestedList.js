import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import Folder from '@material-ui/icons/Folder';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
});

class NestedList extends React.Component {
    state = {
        open: true,
    };

    handleClick = () => {
        this.setState(state => ({ open: !state.open }));
    };

    render() {
        const { classes } = this.props;

        return (
            <List
                component="nav"
                // subheader={<ListSubheader component="div">Nested List Items</ListSubheader>}
                className={classes.root}
            >
                <ListItem button>
                    <ListItemIcon>
                        <StarBorder />
                    </ListItemIcon>
                    <ListItemText inset primary="我的小目標" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <Folder />
                    </ListItemIcon>
                    <ListItemText inset primary="中文" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <Folder />
                    </ListItemIcon>
                    <ListItemText inset primary="English" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <Folder />
                    </ListItemIcon>
                    <ListItemText inset primary="數學" />
                </ListItem>
                <ListItem button onClick={this.handleClick}>
                    <ListItemIcon>
                        <Folder />
                    </ListItemIcon>
                    <ListItemText inset primary="常識" />
                    {/* {this.state.open ? <ExpandLess /> : <ExpandMore />} */}
                </ListItem>
                {/* <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText inset primary="一年級" />
                        </ListItem>
                    </List>
                </Collapse> */}
            </List>
        );
    }
}

NestedList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NestedList);