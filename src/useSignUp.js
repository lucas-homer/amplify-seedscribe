import React, { useReducer } from "react";
import { Auth } from "aws-amplify";

const initialSignUpForm = {
  username: "",
  password: "",
  email: "",
  phone_number: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "updateInput":
      return { ...state, [action.fieldName]: action.value };
    default:
      return state;
  }
}
