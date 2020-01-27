import React from "react";
import axios from "axios";
import GoogleLogin from "react-google-login";
import Button from "components/CustomButtons/Button.js";

const Google = ({informParent = f => f}) => {
  const responseGoogle = response => {
    console.log(response.tokenId);
    axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API}/google-login`,
        data: {idToken: response.tokenId}
    })
    .then(response => {
        console.log('Google signin success', response)
        //inform parent componet
        informParent(response);
    })
    .catch(error => {
        console.log('Google signin failure', error.response)
    })
  };
  return (
    <div>
      <GoogleLogin
        clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        render={renderProps => (
          <Button
            justIcon
            href="#google"
            target="_blank"
            color="transparent"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
              <i className={"fab fa-google-plus-g"} />
          </Button>
        )}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default Google;
