import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    aboutProject: {
        margin: '0 auto',
        backgroundColor: 'white',
        backgroundSize: '100%',
    },
    root: {
        flexGrow: 1,
        margin: theme.spacing(1),
        backgroundColor: 'none',
    },
    paper: {
        padding: 10,
        textAlign: 'center',
        margin: 10,
    },
    button: {
        padding: 3,
        marginBottom: '4%',
        marginTop: '4%',
        textAlign: 'center',
        margin: 2,
        backgroundColor: 'Lavender',
        color: 'black',
        fontFamily: 'Roboto',
        width: '100%',
    },
    slogan: {
        paddingTop: '10px',
        paddingBottom: '10px',
        textAlign: 'center',
        height: '100%',
        color: 'Chocolate',
        fontFamily: 'Roboto',
        fontSize: '18px',
        textShadow: '0 0 30px LightYellow',
        borderBottom: '2px solid Lavender',
    },
    list: {
        padding: 5,
        marginTop: 10,
        textAlign: 'left',
        marginLeft: '5%',
        backgroundColor: 'none',
        color: 'Black',
        fontFamily: 'Roboto',
        fontSize: '0.9em',
        fontWeight: '100',
        textShadow: '0 0 10px LightYellow',
    },
    slide: {
        padding: 10,
        textAlign: 'center',
        margin: 10,
        backgroundColor: 'none',
        boxShadow: 'inset 0 0 40px red',
    },
    logo: {
        padding: 0,
        fontFamily: 'Roboto',
        fontSize: '2em',
        textAlign: 'center',
        margin: 0,
        backgroundColor: 'none',
    },
    infoBlock: {
        paddingLeft: '50%',
        paddingTop: '20px',
        paddingBottom: '90px',
        backgroundColor: 'none',
        height: '100%',
        textAlign: 'center',
        borderBottom: '2px solid Lavender',
    },
}));

export default useStyles;
