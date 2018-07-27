import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import DialogByType from './DialogByType';
import { DialogAction } from '../../actions';
import Slide from 'material-ui/transitions/Slide';
import { COLORS } from '../../constants';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const STYLES = {
  ROOT: {
    borderRadius: '6px',
    zIndex: '1100'
  },
  CLOSE_ICON_CONTAINER: {
    height: '40px'
  },
  CLOSE_ICON: {
    fontSize: '20px',
    color: COLORS.LIGHT_GREY,
    cursor: 'pointer',
    marginRight: '10px',
    marginTop: '5px'
  }
};


class AppDialog extends Component {
  constructor(props) {
    super(props);
    this.onDialogClose = this.onDialogClose.bind(this);
  }

  onDialogClose() {
    this.props.actions.closeDialog();
  }

  render() {
    const { open, dialogData, dialogType, dialogActions } = this.props;
    if (!open) { return false; }
    if (!dialogType) { return false; }

    return(
      <Dialog scroll="paper" open={open} onClose={this.onDialogClose} style={STYLES.ROOT}  transition={Transition} >
        <div className="flex-row flex-align-center flex-justify-end" style={STYLES.CLOSE_ICON_CONTAINER}>
          <i className="material-icons" style={STYLES.CLOSE_ICON} onClick={this.onDialogClose}>close</i>
        </div>
        <DialogByType
          dialogType={dialogType}
          dialogData={dialogData}
          onDialogClose={this.onDialogClose}
          dialogActions={dialogActions}
        />
      </Dialog>
    );
  }
}


function mapStateToProps(state) {
  return {
    dialogStatus: state.dialogStore.open || false,
    dialogData: state.dialogStore.data || {},
    dialogType: state.dialogStore.dialogType || {}
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      openDialog: (dialogType, data) => dispatch(DialogAction.open(dialogType, data)),
      closeDialog: () => dispatch(DialogAction.close())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppDialog);
