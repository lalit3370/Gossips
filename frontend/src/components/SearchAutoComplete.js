import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import fetch from "cross-fetch";
import React from "react";
import { useHistory } from "react-router-dom";

require("dotenv").config();
const useStyles = makeStyles((theme) => ({
  inputBox: {
    position: "relative",
    alignItems: "center",
  },
  option: {
    '&[data-focus="true"]': {
      backgroundColor: "#F8F8F8",
      borderColor: "transparent",
    },
    '&[aria-selected="true"]': {
      backgroundColor: "theme.palette.grey.A200",
      borderColor: "transparent",
    },
  },
}));
export default function Asynchronous() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  const [inputval, setInputval] = React.useState("");
  let history = useHistory();
  React.useEffect(() => {
    var url = `${process.env.REACT_APP_BASEURL}/boardlist/${inputval}`;
    (async () => {
      let response = await fetch(url);
      let boards = await response.json();
      let boardsArray = Object.keys(boards).map((key) => boards[key]);
      if (boardsArray.length == 0) {
        boardsArray = [];
      }
      setOptions(boardsArray);
    })();
  }, [inputval]);
  function handleSubmit(event) {
    event.preventDefault();
    history.push(`/board/${inputval}`);
  }
  return (
    <div className={classes.inputBox}>
      <form onSubmit={handleSubmit}>
        <Autocomplete
          classes={{ option: classes.option }}
          id="BoardSearch"
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
          getOptionSelected={(option, value) =>
            option.boardid === value.boardid
          }
          getOptionLabel={(option) => option.boardid}
          options={options}
          loading={loading}
          renderInput={(params) => (
            <TextField
              style={{
                width: 500,
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
