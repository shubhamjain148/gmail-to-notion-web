// import axios from "axios";

export const signInToGoogle = () => {
  // Google's OAuth 2.0 endpoint for requesting an access token
  var oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";

  // Create <form> element to submit parameters to OAuth 2.0 endpoint.
  var form = document.createElement("form");
  form.setAttribute("method", "GET"); // Send as a GET request.
  form.setAttribute("action", oauth2Endpoint);
  // Parameters to pass to OAuth 2.0 endpoint.
  var params: { [key: string]: string } = {
    client_id:
      "891866724637-8s6irbcjmnkiqf6ek1beamnjqr81tqgu.apps.googleusercontent.com",
    redirect_uri: `${process.env.REDIRECT_URL}/loggedIn`,
    response_type: "code",
    scope:
      "https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/gmail.settings.basic",
    include_granted_scopes: "true",
    access_type: "offline",
    state: "pass-through value",
  };

  // Add form parameters as hidden input values.
  for (var p in params) {
    var input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("name", p);
    input.setAttribute("value", params[p]);
    form.appendChild(input);
  }

  // Add form to page and submit it to open the OAuth 2.0 endpoint.
  document.body.appendChild(form);
  form.submit();
};
