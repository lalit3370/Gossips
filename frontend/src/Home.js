import React from 'react';
import Nav from './components/Nav.js';
import { Grid, Typography, Paper } from "@material-ui/core";
// import SearchBoards from './components/SearchBoards.js';
import SearchBoards from './components/SearchBoards.js';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function Home() {
    const classes = useStyles();
    const theme = createMuiTheme({
        palette: {
            type: "light",
        }
    });
    return (
        <ThemeProvider theme={theme}>
            <Grid container item xs={12}>
                <Nav />
            </Grid>
            <Paper style={{ height: "90vh" }} className={classes.paper}>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    spacing={3}
                    style={{ minHeight: '100vh' }}
                >
                    <Grid item xs={3} alignItems="center">
                        <SearchBoards />
                    </Grid>
                </Grid>
            </Paper>
        </ThemeProvider>
    );
}