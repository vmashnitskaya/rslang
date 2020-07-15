import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    wrapper: {
        height: '100vh',
        width: '100%',
        backgroundImage: 'url("/assets/images/anagramm.jpg")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        paddingTop: 90,
    },
    root: {
        maxWidth: 800,
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
        marginBottom: '5px',
    },
    media: {
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: 350,
        height: 300,
        marginTop: 30,
    },

    button: {
        marginLeft: 'auto',
        marginRight: 'auto',

        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 13,
        paddingBottom: 13,
    },

    buttonBlock: {
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingTop: 13,
        paddingBottom: 13,
        marginBottom: 13,
    },
});

export default useStyles;
