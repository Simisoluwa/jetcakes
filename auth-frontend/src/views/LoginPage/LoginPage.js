import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import Google from "views/GooglePage/Google";
import Facebook from "views/FacebookPage/Facebook";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/bg7.jpg";
import { Link, Redirect, withRouter } from "react-router-dom";
import { authenticate, isAuth } from "../authHelpers";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const useStyles = makeStyles(styles);

const LoginPage = ({ props, history }) => {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");

  const [values, setValues] = React.useState({
    name: "",
    email: "",
    password: "",
    buttonText: "Submit"
  });

  const { name, email, password, buttonText } = values;

  const handleChange = name => e => {
    setValues({ ...values, [name]: e.target.value });
  };

  const informParent = response => {
    authenticate(response, () => {
      isAuth() && isAuth().role === "admin"
        ? history.push("/admin")
        : history.push("/private");
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setValues({ ...values, buttonText: "Loading...." });
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/signup`,
      data: { name, email, password }
    })
      .then(response => {
        console.log("Signup success", response);
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          buttonText: "submitted"
        });
        toast.success(response.data.message);
      })
      .catch(error => {
        console.log("Signup error", error.response.data);
        setValues({ ...values, buttonText: "Submit" });
        toast.error(error.response.data.error);
      });
  };

  setTimeout(function() {
    setCardAnimation("");
  }, 700);

  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      {isAuth() ? <Redirect to="/profile" /> : null}
      <ToastContainer />
      <Header
        absolute
        color="transparent"
        brand="Jetcake"
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
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="danger" className={classes.cardHeader}>
                    <h4>Register Now</h4>
                    <div className={classes.socialLine}>
                      <Facebook informParent={informParent} />
                      <Google informParent={informParent} />
                    </div>
                  </CardHeader>
                  <p className={classes.divider}>Or Be Classical</p>
                  <CardBody>
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
                      labelText="Email"
                      id="email"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "email",
                        value: email,
                        onChange: handleChange("email"),
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText="Password"
                      id="pass"
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
                        ),
                        autoComplete: "off"
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button color="danger" size="lg" onClick={handleSubmit}>
                      {buttonText}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
};

export default withRouter(LoginPage);
