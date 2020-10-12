// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import fetch from "cross-fetch";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Asynchronous() {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  const [inputval, setVal] = React.useState("");
  React.useEffect(() => {
    console.log(inputval);
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const response = await fetch("http://localhost:5000/boardlist");
      const boards = await response.json();

      if (active) {
        setOptions(Object.keys(boards).map((key) => boards[key].boardid));
      }
    })();

    return () => {
      active = false;
    };
  }, [inputval]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="SearchBoards"
      style={{ width: 300 }}
      open={open}
      onInputChange={(event) => {
        setOpen(true);
        setVal(event.target.value);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search Boards"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
