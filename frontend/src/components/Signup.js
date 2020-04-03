import React, { useState, useEffect } from "react";
import { useMutation } from '@apollo/react-hooks';
import gql from "graphql-tag";

const Signup = () => {

  const fullName = React.createRef();
  const email = React.createRef();
  const mobile = React.createRef();

  const [formerror, setFormError] = useState(false);
  const [signupData, setSignupData] = useState({});


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
      console.log(data);
      setFormError(false)
      setSignupData({ id: data.createSignup.id, name: data.createSignup.name, email: data.createSignup.email })
    }
    catch (e) {
      setFormError(true)
    }
  }

  useEffect(() => {
    document.getElementById("result").innerHTML = JSON.stringify(signupData)
  })



  return (
    <>
      <h2>JOIN</h2>
      <div id="result"></div>
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