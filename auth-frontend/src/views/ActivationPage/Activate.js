import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/bg7.jpg";
import {Link, Redirect} from 'react-router-dom';
import jwt from 'jsonwebtoken';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const useStyles = makeStyles(styles);

export default function Activate(props) {
  const [values, setValues] = React.useState({
    name: "",
    token: "",
    show: true 
  });

  React.useEffect(() => {
    let token = props.match.params.token
    let {name} = jwt.decode(token);

    if(token){
        setValues({...values, name, token})
    }
  },[])

  const { name, token, show } = values;

  const handleSubmit = e => {
    e.preventDefault();
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/account-activation`,
      data: { token }
    })
      .then(response => {
        console.log("activation success", response);
        setValues({
          ...values,
          show: false
        });
        toast.success(response.data.message);
      })
      .catch(error => {
        console.log("Signup error", error.response.data.error);
        toast.error(error.response.data.error);
      });
  };


  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <ToastContainer />
      <Header
        absolute
        color="transparent"
        brand="Boiler plate"
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <h3>Hey {name}, Acivate your account now.</h3>
              <Button color="success" size="lg" onClick={handleSubmit}>
                Acivate my account
              </Button>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}
