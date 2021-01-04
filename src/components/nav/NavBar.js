import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

export const NavBar = (props) => {
    return (
        <>

            <ul className="navbar">

                <li className="navbar__item">
                    <Link className="navbar__link" to="/">Home</Link>
                </li>

                <li className="navbar__item">
                    <Link className="navbar__link" to="/crushes">Crushes</Link>
                </li>

                <li className="navbar__item">
                    <Link className="navbar__link" to="/browse">Browse</Link>
                </li>

                <li className="navbar__item">
                    <Link className="navbar__link" to="/rate">Rate</Link>
                </li>

                <li className="navbar__item">
                    <Link className="navbar__link" to="/upload">Upload</Link>
                </li>

                <li className="navbar__item">
                    <Link className="navbar__link" to="/logout">Logout</Link>
                </li>

            </ul>

        </>
    )
}



function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

class SimpleTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Item One" />
            <Tab label="Item Two" />
            <Tab label="Item Three" />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer>Item One</TabContainer>}
        {value === 1 && <TabContainer>Item Two</TabContainer>}
        {value === 2 && <TabContainer>Item Three</TabContainer>}
      </div>
    );
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTabs);