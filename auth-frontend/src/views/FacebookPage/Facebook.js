import React from "react";
import axios from "axios";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import Button from "components/CustomButtons/Button.js";

const Facebook = ({ informParent = f => f }) => {
  const responseFacebook = response => {
    console.log(response);
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/facebook-login`,
      data: { userID: response.userID, accessToken: response.accessToken }
    })
      .then(response => {
        console.log("Facebook signin success", response);
        //inform parent componet
        informParent(response);
      })
      .catch(error => {
        console.log("Facebook signin failure", error.response);
      });
  };
  return (
    <div>
      <FacebookLogin
        appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
        autoLoad={false}
        callback={responseFacebook}
        render={renderProps => (
            <Button
              justIcon
              href="#facebook"
              target="_blank"
              color="transparent"
              onClick={renderProps.onClick}
            >
                <i className={"fab fa-facebook"} />
            </Button>
          )}
      />
    </div>
  );
};

export default Facebook;
