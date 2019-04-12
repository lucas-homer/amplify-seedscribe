import React, { useReducer } from "react";
import { Auth } from "aws-amplify";

const styles = {
  container: {
    flexGrow: 1,
  },
  headerTitle: {
    flexGrow: 1,
  },
  input: {
    height: 35,
    margin: 5,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const initialFormState = {
  username: "",
  password: "",
  email: "",
  phone_number: "",
  authenticationCode: "",
  step: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "updateInput":
      return { ...state, [action.fieldName]: action.value };
    case "changeStep":
      return { ...state, step: action.nextStep };
    default:
      return state;
  }
}

function AuthBar() {
  const [
    { username, password, email, phone_number, step, authenticationCode },
    dispatch,
  ] = useReducer(reducer, initialFormState);

  const signIn = async () => {
    try {
      await Auth.signIn({
        username,
        password,
      });
    } catch (err) {
      console.log(`error from signIn(): ${err}`);
    }
  };

  const signOut = async () => {
    try {
      await Auth.signOut();
    } catch (err) {
      console.log(`error from signOut(): ${err}`);
    }
  };

  const signUp = async () => {
    try {
      await Auth.signUp({
        username,
        password,
        attributes: { email, phone_number },
      });
      console.log("Successfully signed up!");
      dispatch({ type: "changeStep", nextStep: 1 });
    } catch (err) {
      console.log(`error from signUp(): ${err}`);
    }
  };

  const confirmSignUp = async () => {
    try {
      await Auth.confirmSignUp(username, authenticationCode);
      console.log("user successfully signed up!");
    } catch (err) {
      console.log(`error from confirmSignUp(): ${err}`);
    }
  };

  const resendSignUp = async () => {
    try {
      await Auth.resendSignUp(username);
      console.log(`Re-sent signup confirmation for username: ${username}`);
    } catch (err) {
      console.log(`error from resendSignup(): ${err}`);
    }
  };

  return (
    <>
      {step === 0 && (
        <div>
          <input
            placeholder="username"
            onChange={e =>
              dispatch({
                type: "updateInput",
                fieldName: "username",
                value: e.target.value,
              })
            }
            name="username"
            style={styles.input}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={e =>
              dispatch({
                type: "updateInput",
                fieldName: "password",
                value: e.target.value,
              })
            }
            style={styles.input}
          />
          <input
            placeholder="email"
            name="email"
            onChange={e =>
              dispatch({
                type: "updateInput",
                fieldName: "email",
                value: e.target.value,
              })
            }
            style={styles.input}
          />
          <input
            placeholder="phone_number"
            name="phone_number"
            onChange={e =>
              dispatch({
                type: "updateInput",
                fieldName: "phone_number",
                value: e.target.value,
              })
            }
            style={styles.input}
          />
          <button onClick={signUp}>Sign Up</button>
        </div>
      )}
      {step === 1 && (
        <div>
          <input
            placeholder="username"
            name="username"
            onChange={e =>
              dispatch({
                type: "updateInput",
                fieldName: "username",
                value: e.target.value,
              })
            }
            style={styles.input}
          />
          <input
            placeholder="authentication code"
            name="authenticationCode"
            onChange={e =>
              dispatch({
                type: "updateInput",
                fieldName: "authenticationCode",
                value: e.target.value,
              })
            }
            style={styles.input}
          />
          <button onClick={confirmSignUp}>Confirm Sign Up</button>
        </div>
      )}
    </>
  );
}

export default AuthBar;
