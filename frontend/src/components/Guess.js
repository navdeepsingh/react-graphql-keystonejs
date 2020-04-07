import React, { useContext } from "react";
import Context from "../context";

const Guess = () => {

  const { state } = useContext(Context);
  return (
    <>
      <p>SUBMUT YOUR GUESS</p>
      <form>
        <div className="formField">
          <label htmlFor="To">To</label>
          <div></div>
        </div>
        <div className="formField">
          <label htmlFor="From">From</label>
          <div>
            {state.user
              ? state.user.name : ''}
          </div>
        </div>
        <div className="formField">
          <label htmlFor="amount">SGD</label>
          <input type="text" name="amount" id="amount" required />
        </div>
      </form>
    </>
  )
}

export default Guess;