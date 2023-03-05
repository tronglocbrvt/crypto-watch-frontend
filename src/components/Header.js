import {
    AppBar,
    Container,
    Toolbar,
    Typography,
} from "@material-ui/core";
import {
    createTheme,
    makeStyles,
    ThemeProvider,
} from "@material-ui/core/styles";
import Login from "./Login";

const useStyles = makeStyles((theme) => ({
    title: {
        flex: 1,
        color: "gold",
        fontFamily: "Montserrat",
        fontWeight: "bold",
        cursor: "pointer",
    },
}));

const darkTheme = createTheme({
    palette: {
        primary: {
            main: "#fff",
        },
        type: "dark",
    },
});

function Header() {
    const classes = useStyles();

    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar color="transparent" position="static">
                <Container>
                    <Toolbar>
                        <Typography
                            variant="h6"
                            className={classes.title}
                        >
                            Crypto Watch
                        </Typography>
                        <Login />
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    );
}

export default Header;
