import React from 'react';
import { HashRouter as Router, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

// styling with material ui
const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  button: {
      margin: theme.spacing.unit,
      background: 'linear-gradient(360deg, #99D22B 10%, #FBFF00 360%)',
      color: 'white',
      textColor: 'white',
  },
});

// stateless component to render materia ui table
function GalleryList(props) {
  const { classes } = props;

   // function to delete project with reducer
   // had to map the project id into the arrow button 
   // no state on component to access
   function deleteStuff(stuffID) {
      console.log(stuffID);
      props.dispatch({
          type: 'DELETE_STUFF',
          payload: stuffID
      });
  }

  return (
        <section>
        <Paper className={classes.root}>
        <Table className={classes.table}>
            <TableHead>
            <TableRow>
                <TableCell>Stuff Name</TableCell>
                <TableCell align="right">{'\u00A0'}</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {props.reduxState.stuff.map(stuffItem => (
                <TableRow key={stuffItem.id}>
                <TableCell component="th" scope="project">
                    {stuffItem.stuff_name}
                </TableCell>
                <TableCell align="right">
                    <Button type="button" className={classes.button}
                    onClick={() => deleteStuff(stuffItem.id)}>DELETE
                    </Button>
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </Paper>
        </section>
  );
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState
})

GalleryList.propTypes = {
    classes: PropTypes.object.isRequired,
};

// export default connect(mapReduxStateToProps)(withStyles(styles)(Admin));

const StyledGalleryList = withStyles(styles)(GalleryList);
export default connect(mapReduxStateToProps)(StyledGalleryList);