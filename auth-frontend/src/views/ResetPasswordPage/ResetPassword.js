import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
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

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/bg3.jpg";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import jwt from 'jsonwebtoken';

const useStyles = makeStyles(styles);

const ResetPassword = ({ props, match }) => {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");

  const [values, setValues] = React.useState({
    name: '',
    token: '',
    newPassword: '',
    buttonText: "SUBMIT"
  });

  React.useEffect(() => {
    let token = match.params.token;
    let {name} = jwt.decode(token);
    if(token){
        setValues({...values, name, token})
    }
  },[])

  const { name, token, newPassword, buttonText } = values;

  const handleChange = name => e => {
    setValues({ ...values, [name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setValues({ ...values, buttonText: "Loading...." });
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API}/reset-password`,
      data: { newPassword, resetPasswordLink: token }
    })
      .then(response => {
        console.log("Reset password success", response);
        toast.success(response.data.message);
        setValues({ ...values, buttonText: "SUBMITTED" });
      })
      .catch(error => {
        toast.error(error.response.data.error);
        setValues({ ...values, buttonText: "SUBMIT" });
      });
  };

  setTimeout(function() {
    setCardAnimation("");
  }, 700);

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
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="danger" className={classes.cardHeader}>
                    <h4>Hey {name}, Enter your new password.</h4>
                  </CardHeader>
                  <CardBody>
                    <CustomInput
                      labelText="Enter new password"
                      id="email"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "password",
                        value: newPassword,
                        onChange: handleChange("newPassword"),
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        )
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

export default ResetPassword;
