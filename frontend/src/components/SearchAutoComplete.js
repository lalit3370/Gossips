// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import fetch from "cross-fetch";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete, { createFilterOptions } from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Asynchronous() {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  const [inputval, setInputval] = React.useState("");
  React.useEffect(()=>{
   
    console.log(inputval);
    (async () => {
        let response = await fetch("http://localhost:5000/boardlist/"+ inputval);
        let boards = await response.json();
        let boardsArray=Object.keys(boards).map((key) => boards[key])
        if(boardsArray.length==0){
            boardsArray=[]
        }
        setOptions(boardsArray);
        
      })();   
  },[inputval])
  return (
    <Autocomplete
      id="BoardSearch"
      style={{ width: 300 }}
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