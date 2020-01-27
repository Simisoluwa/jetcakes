import React, { useState, useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import People from "@material-ui/icons/People";
import Email from "@material-ui/icons/Email";
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import profile from "assets/img/faces/christian.jpg";

import styles from "assets/jss/material-kit-react/views/profilePage.js";

import { isAuth, getCookie, signout, updateUser } from "../authHelpers";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const useStyles = makeStyles(styles);

const ProfileUpdatePage = ({ props, history }) => {
  const classes = useStyles();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  const [values, setValues] = React.useState({
    role: "",
    name: "",
    password: "",
    email: "",
    address: "",
    buttonText: "Submit"
  });

  const token = getCookie("token");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        const { role, name, email, address } = response.data;
        setValues({ ...values, role, name, email });
      })
      .catch(error => {
        if (error.response.status === 401) {
          signout(() => {
            history.push("/login");
          });
        }
      });
  };

  const { name, password, email, address, role, buttonText } = values;

  const handleChange = name => e => {
    setValues({ ...values, [name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setValues({ ...values, buttonText: "Loading...." });
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API}/user/update`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: { name, password }
    })
      .then(response => {
        console.log("Update success", response);
        updateUser(response, () => {
          setValues({
            ...values,
            buttonText: "submitted"
          });
          toast.success("Profile updated successfully");
        });
      })
      .catch(error => {
        console.log("Update error", error.response.data.error);
        setValues({ ...values, buttonText: "Submit" });
        toast.error(error.response.data.error);
      });
  };

  return (
    <div>
      <ToastContainer />
      <Header
        color="transparent"
        brand="Boiler plate"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white"
        }}
        {...rest}
      />
      <Parallax small filter image={require("assets/img/profile-bg.jpg")} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    <img src={profile} alt="..." className={imageClasses} />
                  </div>
                  <div className={classes.name}>
                    {isAuth() && (
                      <h3 className={classes.title}>
                        {" "}
                        Welcome {isAuth().name}
                      </h3>
                    )}
                    <h6>UPDATE YOUR PROFILE</h6>
                    <Button justIcon link className={classes.margin5}>
                      <i className={"fab fa-twitter"} />
                    </Button>
                    <Button justIcon link className={classes.margin5}>
                      <i className={"fab fa-instagram"} />
                    </Button>
                    <Button justIcon link className={classes.margin5}>
                      <i className={"fab fa-facebook"} />
                    </Button>
                  </div>
                </div>
              </GridItem>
            </GridContainer>

            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={4} className={classes.navWrapper}>
                <form className={classes.form}>
                  <CustomInput
                    labelText="Role"
                    id="first"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text",
                      value: role,
                      endAdornment: (
                        <InputAdornment position="end">
                          <People className={classes.inputIconsColor} />
                        </InputAdornment>
                      )
                    }}
                    disabled
                  />

                  <CustomInput
                    labelText="Email"
                    id="first"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text",
                      value: email,
                      endAdornment: (
                        <InputAdornment position="end">
                          <Email className={classes.inputIconsColor} />
                        </InputAdornment>
                      )
                    }}
                    disabled
                  />
                  <CustomInput
                    labelText="Full Name"
                    id="first"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text",
                      value: name,
                      onChange: handleChange("name"),
                      endAdornment: (
                        <InputAdornment position="end">
                          <People className={classes.inputIconsColor} />
                        </InputAdornment>
                      )
                    }}
                  />

                  <CustomInput
                    labelText="Password"
                    id="first"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "password",
                      value: password,
                      onChange: handleChange("password"),
                      endAdornment: (
                        <InputAdornment position="end">
                          <Icon className={classes.inputIconsColor}>
                            lock_outline
                          </Icon>
                        </InputAdornment>
                      )
                    }}
                  />

                  <CustomInput
                    labelText="Address"
                    id="first"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text",
                      value: address,
                      onChange: handleChange("address"),
                      endAdornment: (
                        <InputAdornment position="end">
                          <Icon className={classes.inputIconsColor}>
                            lock_outline
                          </Icon>
                        </InputAdornment>
                      )
                    }}
                  />
                  <Button color="danger" size="lg" onClick={handleSubmit}>
                    {buttonText}
                  </Button>
                </form>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfileUpdatePage;
