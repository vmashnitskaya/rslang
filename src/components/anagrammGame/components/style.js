import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    root: {
        maxWidth: 800,
        marginTop: 90,
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
