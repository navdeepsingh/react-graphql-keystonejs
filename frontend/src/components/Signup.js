import React, { useState, useEffect, useContext } from "react";
import { useMutation } from '@apollo/react-hooks';
import gql from "graphql-tag";
import Context from "../context";

const Signup = (props) => {

  const fullName = React.createRef();
  const email = React.createRef();
  const mobile = React.createRef();

  const [error, setError] = useState(false);
  const { state, dispatch } = useContext(Context);

  const ADD_SIGNUP = gql`
    mutation createSignup($data: SignupCreateInput!){
      createSignup(data: $data) {
        id,
        name,
        email
      }
    }`;

  const [addSignupMutation] = useMutation(ADD_SIGNUP);

  async function handleSubmit() {
    try {
      const { data } = await addSignupMutation({ variables: { data: { name: fullName.current.value, email: email.current.value, mobile: mobile.current.value } } });
      dispatch({ type: "ADD_USER", payload: data.createSignup })
      setError(false)
      setTimeout(() => {
        props.history.push('/join')
      }, 3000);
    }
    catch (e) {
      setError(true)
    }
  }

  useEffect(() => {
    const result = Object.keys(state.user).length ? "You have successfully submited the form. Redirecting now..." : ''
    document.getElementById("result").innerHTML = result

  })



  return (
    <>
      <h2>JOIN</h2>
      <div id="result"></div>
      {error ? 'Error in submitting' : ''}
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSubmit();
        }}>
        <div className="formField">
          <label htmlFor="fullName">FULL NAME</label>
          <input ref={fullName} type="text" name="fullName" id="fullName" required />
        </div>
        <div className="formField">
          <label htmlFor="email">EMAIL ADDRESS</label>
          <input ref={email} type="email" name="email" id="email" required />
        </div>
        <div className="formField">
          <label htmlFor="email">MOBILE NUMBER</label>
          <input ref={mobile} type="mobile" name="mobile" id="mobile" required />
        </div>
        <div className="formField">
          <button type="submit">JOIN</button>
        </div>
      </form>
    </>
  )
}

export default Signup;