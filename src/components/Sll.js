import React from 'react';
import PropTypes from 'prop-types';
// import {Table,TableHead,TableBody, TableCell, TableFooter, TablePagination, TableRow, TableSortLabel} from 'material-ui';
import Paper from 'material-ui/Paper';
import Tooltip from 'material-ui/Tooltip';
import Button from 'material-ui/Button';
import { DialogAction, SnackbarAction, ApplicationAction } from '../actions';
import { connect } from 'react-redux';
import {  FONTS } from '../constants';
import { Table, Column, Cell ,CollapseCell } from 'fixed-data-table-2';
import  {StyleSheet, css}  from 'aphrodite';
import moment from 'moment';
import Icon from 'material-ui/Icon';


const stylesheet = StyleSheet.create({
  expandStyles: {
     'background-color': 'white',
     border: '1px solid #d3d3d3',
     'box-sizing': 'border-box',
     padding: '20px',
     overflow:'hidden',
     width: '100%',
     height: '100%'
   },

 tableWrapper: {
    overflow:'hidden',
    height: '100%',
  },
  tableHeaderWithNoBorder:{
    backgroundColor:"white",
    borderLeft:"1px solid rgba(151,151,151,0.25)"
  },
  SimpleTableHeader:{
    color: '#58595b',
    fontSize: '14px',
    lineHeight: '1',
    border: 'none',
    fontStyle:'italic',
    fontWeight:'800',
    textAlign:'center',
    backgroundImage:"none",
    backgroundColor:"white",
    border:"1px solid rgba(151,151,151,0.25)"
  },
  SimpleTableRow:{
    fontSize: "12px",
    fontWeight: 500,
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    textAlign: "center",
    color:"#58595b",
    backgroundColor:"white",
    borderLeft:"1px solid rgba(151,151,151,0.25)"

  },
  CenterAlignedRow:{
    fontSize: "12px",
    fontWeight: 500,
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    textAlign: "center",
    color:"#58595b",
    backgroundColor:"white",
    border:"1px solid rgba(151,151,151,0.25)"

  },
  AdvanceTableRow:{
    fontSize: "12px",
    fontWeight: 500,
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    textAlign: "left",
    color:"#58595b",
    backgroundColor:"white",
    border:"1px solid rgba(151,151,151,0.25)"
  }
});

const STYLES = {
  root:{
    padding:"20px",
    boxShadow:"none",
  },
  table: {
    tableLayout: "fixed",
    width: "100%",
  },
  tableHeadCellImp:{
      "fontSize": "14px",
      "fontStyle": "italic",
      "fontStretch": "normal",
      "lineHeight": "normal",
      "letterSpacing": "normal",
      "textAlign": "left",
      "flexDirection":"row",
      "color":"#58595b",
      "textTransform":"uppercase",
      "padding":"4px 24px",
      "position":"sticky",
      "backgroundColor":"#ffa9a9",
      "boxShadow":"3px 0 4px 0 rgba(0, 0, 0, 0.5)"
    },
  tableHeadCellNotImp:{
    "fontSize": "14px",
    "fontStyle": "italic",
    "fontStretch": "normal",
    "lineHeight": "normal",
    "letterSpacing": "normal",
    "textAlign": "left",
    "flexDirection":"row",
    "color":"#58595b",
    "textTransform":"uppercase",
    "padding":"4px 24px",
    "position":"sticky",
    "backgroundColor":"#cfe5ff",
    "borderRight":"1px solid rgba(151,151,151,0.4)",
    "boxShadow":"3px 0 4px 0 rgba(0, 0, 0, 0.3)"
  },
  tableHeadCell:{
    "fontSize": "14px",
    "fontStyle": "italic",
    "fontStretch": "normal",
    "lineHeight": "normal",
    "letterSpacing": "normal",
    "textAlign": "left",
    "flexDirection":"row",
    "color":"#58595b",
    "textTransform":"uppercase",
    "padding":"4px 24px",
    "position":"sticky",
    "backgroundColor":"white",
    "border":"1px solid rgba(151,151,151,0.3)",
  },

 tableRowCell:{
   "fontSize": "12px",
   "fontWeight": 500,
   "fontStyle": "normal",
   "fontStretch": "normal",
   "lineHeight": "normal",
   "letterSpacing": "normal",
   "textAlign": "left",
   "padding":"4px 24px",
   "color":"#58595b",
 },

 updateBranch:{
  backgroundColor:"#03ce87",
  color:"white",
  borderRadius: "6px",
  border: "solid 1px #ffffff",
  textTransform:"none",
  paddingRight:"10px",
  fontFamily: FONTS.MAINFONT
 },

 deleteBranch:{
   backgroundColor:"#f8544c",
   color:"white",
   borderRadius: "6px",
   border: "solid 1px #ffffff",
   textTransform:"none",
   fontFamily: FONTS.MAINFONT

 }

};


class Sll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollToRow: null,
      collapsedRows: new Set(),
      orderBy: 'BranchId'
    };
    this._handleCollapseClick = this._handleCollapseClick.bind(this);
    this._subRowHeightGetter = this._subRowHeightGetter.bind(this);
    this._rowExpandedGetter = this._rowExpandedGetter.bind(this);
    this.reloadPage = this.reloadPage.bind(this);
  }


  _handleCollapseClick(rowIndex) {
  const {collapsedRows} = this.state;
  const shallowCopyOfCollapsedRows = new Set([...collapsedRows]);
  let scrollToRow = rowIndex;
  if (shallowCopyOfCollapsedRows.has(rowIndex)) {
    shallowCopyOfCollapsedRows.delete(rowIndex);
    scrollToRow = null
  } else {
    shallowCopyOfCollapsedRows.add(rowIndex);
  }

  this.setState({
    scrollToRow: scrollToRow,
    collapsedRows: shallowCopyOfCollapsedRows
  });
}

_subRowHeightGetter(index) {
  return this.state.collapsedRows.has(index) ? 80 : 0;
}

_rowExpandedGetter({rowIndex, width, height}) {
  if (!this.state.collapsedRows.has(rowIndex)) {
    return null;
  }

  const style = {
    height: height,
    width: width - 2,
  };
    return (
      <div style={style}>
        <div className={css(stylesheet.expandStyles)}>
            expanded content
        </div>
      </div>
    );
  }


  reloadPage() {
    let options = {
      afterSuccess: () => {},
      afterError: () => {}
    };
    this.props.actions.getAllApps(options);
  }


  showDeleteAppDialog(appdata) {
    const dialogType = 'DELETE_BRANCH';
    const dialogData = appdata;
    let dialogActions = {reloadPage: this.reloadPage};
    this.props.actions.openDialog(dialogType, dialogData, dialogActions);
  }

  showUpdateDialog(appdata) {
    // appdata.BranchId = String(appdata.BranchId);
    const dialogType = 'UPDATE_BRANCH';
    const dialogData = appdata;
    let dialogActions = {reloadPage: this.reloadPage};
    this.props.actions.openDialog(dialogType, dialogData, dialogActions);
  }

  showInputCommentsDialog(LeadID,columnKey){
    const dialogType = 'ADD_COMMENTS';
    const dialogData = {LeadID:LeadID,columnKey:columnKey};
    let dialogActions = {reloadPage: this.reloadPage};
    this.props.actions.openDialog(dialogType, dialogData, dialogActions);
  }

  render() {
    const  classes  = STYLES;
    let data = this.props.finalData;
    let {collapsedRows, scrollToRow} = this.state;

// logic to create header Coloumn
    let currentWeekNumber = moment().week();
    let PreviousWeekNumber = currentWeekNumber -1;

    let CurrentWeekMondayArray = String(moment().isoWeekday(1)).split(" ");
    let CurrentWeekSundayArray = String(moment().isoWeekday(7)).split(" ");
    let PreviousWeekMondayArray = String(moment().week(PreviousWeekNumber).isoWeekday(1)).split(" ");
    let PreviousWeekSundayArray = String(moment().week(PreviousWeekNumber).isoWeekday(7)).split(" ");

    console.log(CurrentWeekMondayArray,CurrentWeekSundayArray,PreviousWeekMondayArray,PreviousWeekSundayArray);
    return (

      <Paper style={classes.root}>
        <div className={classes.tableWrapper}>

          <Table
            scrollToRow={scrollToRow}
            rowsCount={data.length}
            rowHeight={100}
            subRowHeightGetter={this._subRowHeightGetter}
            rowExpanded={this._rowExpandedGetter}
            headerHeight={50}
            className={css(stylesheet.tableWrapper)}
            touchScrollEnabled={true}
            width={720}
            height={768}
            {...this.props}>
          <Column
            columnKey="CustomerName"
            header={<Cell className={css(stylesheet.SimpleTableHeader)} > Name</Cell>}
            cell={({ rowIndex, columnKey, ...props }) =>
              <Cell className={css(stylesheet.CenterAlignedRow)} {...props}>
                {data[rowIndex][columnKey]}
              </Cell>}
            width={100}
          />

          <Column
            columnKey="LeadID"
            header={<Cell className={css(stylesheet.SimpleTableHeader)}> ID</Cell>}
            cell={({ rowIndex, columnKey, ...props }) =>
              <Cell className={css(stylesheet.CenterAlignedRow)} {...props}>
                {data[rowIndex][columnKey]}
              </Cell>}
            width={100}
          />

          <Column
            columnKey="LastWeekComments"
            header={<Cell  className={css(stylesheet.SimpleTableHeader)}>

              <span style={{color:"#cdcdcd"}} >{PreviousWeekMondayArray[0]}</span> <span>{PreviousWeekMondayArray[2]}</span> <span>{PreviousWeekMondayArray[1]}</span>
              <span>{" - "}</span>
              <span style={{color:"#cdcdcd"}} >{PreviousWeekSundayArray[0]}</span> <span>{PreviousWeekSundayArray[2]}</span> <span>{PreviousWeekSundayArray[1]}</span>
                    </Cell>}
            cell={({ rowIndex, columnKey, ...props }) =>
              <Cell className={css(stylesheet.AdvanceTableRow)}  {...props}>
                { (!!data[rowIndex][columnKey])?
                  data[rowIndex][columnKey]
                  :
                  "No comments"
                }
              </Cell>}
            width={200}
          />


          <Column
            columnKey="CurrentWeekComments"
            header={<Cell  className={css(stylesheet.SimpleTableHeader)} >

              <span style={{color:"#cdcdcd"}} >{CurrentWeekMondayArray[0]}</span> <span>{CurrentWeekMondayArray[2]}</span> <span>{CurrentWeekMondayArray[1]}</span>
              <span>{" - "}</span>
              <span style={{color:"#cdcdcd"}} >{CurrentWeekSundayArray[0]}</span> <span>{CurrentWeekSundayArray[2]}</span> <span>{CurrentWeekSundayArray[1]}</span>

            </Cell>}
            cell={({ rowIndex, columnKey, ...props }) =>
              <Cell className={css(stylesheet.AdvanceTableRow)}  {...props}>

                {
                  data[rowIndex][columnKey]
                }

              </Cell>}
            width={200}
          />

          <Column
            header={<Cell className={css(stylesheet.tableHeaderWithNoBorder)}>
            </Cell>}
            cell={({ rowIndex, columnKey, ...props }) =>
              <Cell className={css(stylesheet.SimpleTableRow)} {...props}>
                {
                  (rowIndex !=0) ?
                    <a style={{cursor:"pointer"}} onClick={() => this._handleCollapseClick(rowIndex)}>
                      {collapsedRows.has(rowIndex) ?
                        <Button mini style={{ color: "white", boxShadow: "none", border: "1px solid #ffa9a9", backgroundColor: "#ffa9a9" }}  variant="fab" color="primary" aria-label="Add" >
                         <Icon style={{fontSize:"40px"}}>arrow_drop_up</Icon>
                        </Button>
                         :
                         <Button mini style={{ color:"#ffa9a9", boxShadow: "none", border:"1px solid #ffa9a9",backgroundColor:"white"}}  variant="fab" color="primary" aria-label="Add">
                           <Icon style={{ fontSize: "40px" }}>arrow_drop_down</Icon>
                         </Button>

                       }
                    </a>
                  :
                  <span style={{fontSize:"14px",color:"#58595b",fontWeight:"800",borderRight:"1px solid red"}}>More Details</span>
                }
              </Cell>}
            width={100}
          />


        </Table>

        </div>
      </Paper>
    );
  }
}



function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      openDialog: (dialogType, data, dataActions) => dispatch(DialogAction.open(dialogType, data, dataActions)),
      openSnackbar: (data) => dispatch(SnackbarAction.show(data)),
      getAllApps: (options) => dispatch(ApplicationAction.getApplications(options))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sll);
