import React from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { Button, TextField } from "@material-ui/core";

export default function SearchBoard() {
  let history = useHistory();
  return (
    <div>
      <Formik
        initialValues={{ keyword: "" }}
        onSubmit={(values) => {
          history.push("/board/" + values.keyword);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field
              name="keyword"
              type="input"
              as={TextField}
              placeholder="Search boards"
            />
            <Button type="submit">Search</Button>
          </Form>
        )}
      </Formik>
    </div>
  );

}
