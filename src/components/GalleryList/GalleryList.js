import React, { Component } from 'react';
// import { HashRouter as Router, Link } from 'react-router-dom';
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
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import withMobileDialog from '@material-ui/core/withMobileDialog';

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
      background: 'linear-gradient(315deg, #a40606 0%, #d98324 74%)',
      color: 'white',
      textColor: 'white',
  },
});

class GalleryList extends Component {
    state = {
        open: false,
      };
    
      handleClickOpen = () => {
        this.setState({ open: true });
      };
    
      handleClose = () => {
        this.setState({ open: false });
      };

    // function to delete project with reducer
    // had to map the project id into the arrow button 
    // no state on component to access
      deleteStuff = (event) => {
        console.log(event.currentTarget.value);
        this.props.dispatch( { type: 'DELETE_STUFF', payload: event.currentTarget.value } );
        this.handleClose();
      }
    
render() {
    const { classes, fullScreen } = this.props;

  return (
        <section>
        <Paper className={classes.root}>
        <Table className={classes.table}>
            <TableHead>
            <TableRow>
                <TableCell>Stuff Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">{'\u00A0'}</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {this.props.reduxState.stuff.map(stuffItem => (
                <TableRow key={stuffItem.id} name={stuffItem.id}>
                <TableCell component="th" scope="project">
                    {stuffItem.stuff_name}
                </TableCell>
                <TableCell component="th" scope="project">
                    {stuffItem.description}
                </TableCell>
                <TableCell component="th" scope="project">
                    {stuffItem.quantity}
                </TableCell>
                <TableCell component="th" scope="project">
                    {stuffItem.type}
                </TableCell>
                <TableCell component="th" scope="project">
                    {stuffItem.status}
                </TableCell>
                <TableCell align="right">
                    {/* <Button type="button" className={classes.button}
                    onClick={() => deleteStuff(stuffItem.id)}>DELETE
                    </Button> */}
                    <Button className={classes.button}
                    onClick={this.deleteStuff} value={stuffItem.id}>DELETE
                    </Button>
                    {/* <Button variant="outlined" color="primary"  value={stuffItem.id} onClick={this.handleClickOpen}>
                    Delete
                    </Button>
                    <Dialog
                    value={stuffItem.id}
                    fullScreen={fullScreen}
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="responsive-dialog-title"
                    >
                    <DialogTitle id="responsive-dialog-title">{"Are you sure you want to delete?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                        Deleting your stuff will permanently remove this from your database.
                        <br></br>
                        You can also set your stuff to "Inactive" to keep it in your database.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions value={stuffItem.id}>
                        <Button onClick={this.handleClose} color="primary">
                        Cancel
                        </Button>
                        <Button onClick={this.deleteStuff} value={stuffItem.id} color="primary" autoFocus>
                        Delete
                        </Button>
                    </DialogActions>
                    </Dialog> */}
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </Paper>
        </section>
  )
}
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState
})

GalleryList.propTypes = {
    classes: PropTypes.object.isRequired,
    // fullScreen: PropTypes.bool.isRequired,
};

// export default connect(mapReduxStateToProps)(withStyles(styles)(Admin));
// export default withMobileDialog()(GalleryList);

const StyledGalleryList = withStyles(styles)(GalleryList);
export default connect(mapReduxStateToProps)(StyledGalleryList);