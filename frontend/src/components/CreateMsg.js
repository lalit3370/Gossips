import React from "react";
import { Button, TextField } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
require("dotenv").config();
const axios = require("axios");

function CreateMsg(props) {
  function submitdata(values) {
    const url = `${process.env.REACT_APP_BASEURL}/board/${props.data.boardId}`;

    axios
      .post(url, {
        msgcontent: values.message,
        date: Date,
      })
      .catch(function (error) {
        console.log(error);
      });
    props.data.updateCount();
  }
  return (
    <div>
      <Formik
        initialValues={{ message: "", date: Date }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            //   alert(JSON.stringify(values, null, 2));
            submitdata(values);
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field
              name="message"
              type="input"
              as={TextField}
              placeholder="Type Message"
            />
            <Button type="Enter" disabled={isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
export default CreateMsg;
