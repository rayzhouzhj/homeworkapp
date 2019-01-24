import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Folder from '@material-ui/icons/Folder';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import LooksOne from '@material-ui/icons/LooksOne';
import { Link } from 'react-router-dom';

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

class SideMenuList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            "chineseFolder": false,
            "englishFolder": false,
            "mathFolder": false,
            "generalFolder": false,
         };
    }

    handleClick = (folder) => {
        let newState = this.state;
        newState[folder] = !newState[folder];
        console.log(newState);
        this.setState(newState);
    };

    render() {
        const { classes } = this.props;

        return (
            <List
                component="nav"
                // subheader={<ListSubheader component="div">Nested List Items</ListSubheader>}
                className={classes.root}
            >
                <Link to={{
                    pathname: "/",
                    state: { refresh: true }
                }}
                    style={{ textDecoration: 'none' }}>
                <ListItem button>
                    <ListItemIcon>
                        <StarBorder />
                    </ListItemIcon>
                    <ListItemText inset primary="我的小目標" />
                </ListItem>
                </Link>
                <ListItem button onClick={() => this.handleClick("chineseFolder")}>
                    <ListItemIcon>
                        <Folder />
                    </ListItemIcon>
                    <ListItemText inset primary="中文" />
                    {this.state.chineseFolder ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={this.state.chineseFolder} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <Link to={{
                            pathname: "/subject/chinese",
                            state: { refresh: true }
                        }}
                            style={{ textDecoration: 'none' }}>
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                                <LooksOne />
                            </ListItemIcon>
                            <ListItemText inset primary="一年級" />
                        </ListItem>
                        </Link>
                    </List>
                </Collapse>
                <ListItem button onClick={() => this.handleClick("englishFolder")}>
                    <ListItemIcon>
                        <Folder />
                    </ListItemIcon>
                    <ListItemText inset primary="English" />
                    {this.state.englishFolder ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={this.state.englishFolder} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <Link to={{
                            pathname: "/subject/english",
                            state: { refresh: true }
                        }}
                            style={{ textDecoration: 'none' }}>
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                                <LooksOne />
                            </ListItemIcon>
                            <ListItemText inset primary="一年級" />
                        </ListItem>
                        </Link>
                    </List>
                </Collapse>
                <ListItem button onClick={() => this.handleClick("mathFolder")}>
                    <ListItemIcon>
                        <Folder />
                    </ListItemIcon>
                    <ListItemText inset primary="數學" />
                    {this.state.mathFolder ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={this.state.mathFolder} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                                <LooksOne />
                            </ListItemIcon>
                            <ListItemText inset primary="一年級" />
                        </ListItem>
                    </List>
                </Collapse>
                <ListItem button onClick={() => this.handleClick("generalFolder")}>
                    <ListItemIcon>
                        <Folder />
                    </ListItemIcon>
                    <ListItemText inset primary="常識" />
                    {this.state.generalFolder ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={this.state.generalFolder} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                                <LooksOne />
                            </ListItemIcon>
                            <ListItemText inset primary="一年級" />
                        </ListItem>
                    </List>
                </Collapse>
            </List>
        );
    }
}

SideMenuList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SideMenuList);