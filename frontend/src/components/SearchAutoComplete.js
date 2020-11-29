import fetch from "cross-fetch";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete, { createFilterOptions } from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useHistory } from "react-router-dom";
import { fade, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
inputBox: {
  position: "relative",
  alignItems: "center"
}
}));


export default function Asynchronous() {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  const [inputval, setInputval] = React.useState("");
  let history = useHistory();
  const classes = useStyles();
  React.useEffect(() => {
    (async () => {
      let response = await fetch("http://localhost:5000/boardlist/" + inputval);
      let boards = await response.json();
      let boardsArray = Object.keys(boards).map((key) => boards[key])
      if (boardsArray.length == 0) {
        boardsArray = []
      }
      setOptions(boardsArray);

    })();
  }, [inputval])
  function handleSubmit(event) {
    event.preventDefault();
    console.log(inputval);
    history.push(`/board/${inputval}`);
  }
  return (
    <div className={classes.inputBox}>
      <form onSubmit={handleSubmit}>
        <Autocomplete
          id="BoardSearch"
          style={{ 
            width: 300 ,
          }}
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onInputChange={(event) => {
            setOpen(true);
            setInputval(event.target.value);
            // setOpen(false);
          }}
          onClose={() => {
            setOpen(false);
          }}
          getOptionSelected={(option, value) => option.boardid === value.boardid}
          getOptionLabel={(option) => option.boardid}
          options={options}
          loading={loading}
          renderInput={(params) => (
            <TextField
            style={{ 
              width: 500 ,
            }}
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
      </form>
   </div>
  );
}