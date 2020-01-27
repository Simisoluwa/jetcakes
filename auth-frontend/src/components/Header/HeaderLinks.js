/*eslint-disable*/
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link, withRouter, Redirect } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, CloudDownload, LocalTaxi } from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

import { isAuth, signout } from "../../views/authHelpers";

const useStyles = makeStyles(styles);

const HeaderLinks = ({ history }) => {
  const classes = useStyles();
  return (
    <List className={classes.list}>
      {/* <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="Components"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={Apps}
          dropdownList={[
            <Link to="/register" className={classes.dropdownLink}>
              Join the commuinity
            </Link>,
            <a
              href="https://creativetimofficial.github.io/material-kit-react/#/documentation?ref=mkr-navbar"
              target="_blank"
              className={classes.dropdownLink}
            >
              Documentation
            </a>
          ]}
        />
      </ListItem> */}

      {!isAuth() && (
        <>
          <ListItem className={classes.listItem}>
            {/* <Button
          href="https://www.creative-tim.com/product/material-kit-react?ref=mkr-navbar"
          color="transparent"
          target="_blank"
          className={classes.navLink}
        > */}
            <Link to="/login" className={classes.navLink}>
              <CloudDownload className={classes.icons} /> Join the commuinity
            </Link>
            {/* <CloudDownload className={classes.icons} /> Login */}
            {/* </Button> */}
          </ListItem>
          <ListItem className={classes.listItem}>
            {/* <Button
          href="https://www.creative-tim.com/product/material-kit-react?ref=mkr-navbar"
          color="transparent"
          target="_blank"
          className={classes.navLink}
        > */}
            <Link to="/register" className={classes.navLink}>
              Signup Now
            </Link>
            {/* <CloudDownload className={classes.icons} /> Login */}
            {/* </Button> */}
          </ListItem>
        </>
      )}


      {isAuth() && isAuth().role === "admin" && (
        <ListItem className={classes.listItem}>
          <Link className="navLink" to="/landing">
            {isAuth().name}
          </Link>
        </ListItem>
      )}

      {isAuth() && isAuth().role === "subscriber" && (
        <ListItem className={classes.listItem}>
          <CustomDropdown
            noLiPadding
            buttonText={isAuth().name}
            buttonProps={{
              className: classes.navLink,
              color: "transparent"
            }}
            buttonIcon={Apps}
            dropdownList={[
              <Link to="/private" className={classes.dropdownLink}>
                Dashboard
              </Link>,
              <Link to="/profile" className={classes.dropdownLink}>
                My Profile
              </Link>
            ]}
          />
        </ListItem>
      )}


      <ListItem className={classes.listItem}>
        {/* <Button
          href="https://www.creative-tim.com/product/material-kit-react?ref=mkr-navbar"
          color="transparent"
          target="_blank"
          className={classes.navLink}
        > */}
        <Link to="/register" className={classes.navLink}>
          Scholastica
        </Link>
        {/* <CloudDownload className={classes.icons} /> Login */}
        {/* </Button> */}
      </ListItem>
      <ListItem className={classes.listItem}>
        {/*<Tooltip title="Delete">
          <IconButton aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>*/}
        <Tooltip
          id="instagram-twitter"
          title="Follow us on twitter"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            href="https://twitter.com/CreativeTim?ref=creativetim"
            target="_blank"
            color="transparent"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-twitter"} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-facebook"
          title="Follow us on facebook"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.facebook.com/CreativeTim?ref=creativetim"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-facebook"} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-tooltip"
          title="Follow us on instagram"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.instagram.com/CreativeTimOfficial?ref=creativetim"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-instagram"} />
          </Button>
        </Tooltip>
      </ListItem>

      {isAuth() && (
        <ListItem className={classes.listItem}>
          <span
            style={{ cursor: "pointer" }}
            className={classes.navLink}
            onClick={() => {
              signout(() => {
                history.push("/login");
              });
            }}
          >
            <LocalTaxi className={classes.icons} /> Signout
          </span>
        </ListItem>
      )}

    </List>
  );
};

export default withRouter(HeaderLinks);
