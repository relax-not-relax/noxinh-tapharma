// eslint-disable-next-line no-unused-vars
import React from "react";

function ContactForm() {
  return (
    <div>
      <form>
        <input type="text" placeholder="Name" />
        <br />
        <input type="email" placeholder="Email" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ContactForm;
