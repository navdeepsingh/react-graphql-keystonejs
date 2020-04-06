import React, { useState, useEffect } from "react";
import { useMutation } from '@apollo/react-hooks';
import gql from "graphql-tag";

const Signup = (props) => {

  const fullName = React.createRef();
  const email = React.createRef();
  const mobile = React.createRef();

  const [error, setError] = useState(false);
  const [user, setUser] = useState({});


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
      setError(false)
      setUser({ id: data.createSignup.id, name: data.createSignup.name, email: data.createSignup.email })
      setTimeout(() => {
        props.history.push('/join')
      }, 3000);
    }
    catch (e) {
      setError(true)
      setUser({});
    }
  }

  useEffect(() => {
    const result = Object.keys(user).length ? "You have successfully submited the form. Redirecting now..." : ''
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