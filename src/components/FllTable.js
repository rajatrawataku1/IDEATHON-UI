import React from 'react';
import PropTypes from 'prop-types';
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
import Grid from 'material-ui/Grid';
import '../CSS/SllView.css';
import '../CSS/fllTable.css';

const stylesheet = StyleSheet.create({
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
  },
  extraRowFeatures:{
    fontSize: "12px",
    fontWeight: 500,
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    color:"#58595b",
    textAlign:"center",
    backgroundColor:"rgba(151,151,151,0.65) ",
    border:"1px solid rgba(151,151,151,0.25)"
  },
  extraRowFeaturesLeft:{
    fontSize: "12px",
    fontWeight: 500,
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    color:"#58595b",
    textAlign:"left",
    backgroundColor:"rgba(151,151,151,0.65) ",
    border:"1px solid rgba(151,151,151,0.25)"
  }

});

class FllTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollToRow: null,
      collapsedRows: new Set(),
      orderBy: 'BranchId'
    };
    this._handleCollapseClick = this._handleCollapseClick.bind(this);
    this._subRowHeightGetter = this._subRowHeightGetter.bind(this);
    this.reloadPage = this.reloadPage.bind(this);
  }


  _handleCollapseClick(rowIndex) {
  const {collapsedRows} = this.state;
  let shallowCopyOfCollapsedRows = new Set([...collapsedRows]);
  let scrollToRow = rowIndex;
  if (shallowCopyOfCollapsedRows.has(rowIndex)) {
    shallowCopyOfCollapsedRows.delete(rowIndex);
    scrollToRow = null
  } else {
    shallowCopyOfCollapsedRows= new Set();
    shallowCopyOfCollapsedRows.add(rowIndex);
  }

  this.setState({
    scrollToRow: scrollToRow,
    collapsedRows: shallowCopyOfCollapsedRows
  });
}

_subRowHeightGetter(index) {
  let totalRows =  this.props.finalData.length;
  return this.state.collapsedRows.has(index) ? 400 : 0;
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

      <Paper className="Fll_Table_Root">
        <div className="Fll_Table_tableWrapper">

          <Table
            onHorizontalScroll={ ()=>{return false}}
            showScrollbarX={false}
            showScrollbarY={false}
            rowsCount={data.length}
            rowHeight={100}
            headerHeight={50}
            className={css(stylesheet.tableWrapper) + " FllTableStyle"}
            touchScrollEnabled={true}
            width={130+90+250+250}
            maxHeight={768}
            {...this.props}>


          <Column
            columnKey="Name"
            header={<Cell className="Fll_Table_SimpleTableHeader"> Name</Cell>}
            cell={({ rowIndex, columnKey, ...props }) =>
            <Cell className={ this.state.collapsedRows.has(rowIndex) ? css(Object.assign({},stylesheet.CenterAlignedRow,stylesheet.extraRowFeatures)):css(stylesheet.CenterAlignedRow) }   {...props}>
              <a href={"/dashboard?agentId="+data[rowIndex]["AgentId"]} style={{cursor:"pointer",color:"#0067AC",textDecoration:"underline",textDecorationColor:"#0067AC"}} >{data[rowIndex][columnKey]}</a>
            </Cell>}
            width={130}
          />


          <Column
            columnKey="AgentId"
            header={<Cell className="Fll_Table_SimpleTableHeader"> ID</Cell>}
            cell={({ rowIndex, columnKey, ...props }) =>
            <Cell className={ this.state.collapsedRows.has(rowIndex) ? css(Object.assign({},stylesheet.CenterAlignedRow,stylesheet.extraRowFeatures,{textAlign:"center"})):css(stylesheet.CenterAlignedRow) }   {...props}>
                <a cursor="pointer" href={"/dashboard?agentId="+data[rowIndex][columnKey]}> {data[rowIndex][columnKey]}</a>
            </Cell>}
            width={90}
          />

          {/* CommentCurrentWeekManagerComment:" my current manager comment",
          CommentCurrentWeekSelfComment:"my current self Comment",
          CommentPreviousWeekManagerComment:" my previous manager comment",
          CommentPreviousWeekSelfComment:"my previous self comment", */}

          <Column
            columnKey="LastWeekComments"
            header={<Cell  className="Fll_Table_SimpleTableHeader">

              <span style={{color:"#cdcdcd"}} >{PreviousWeekMondayArray[0]}</span> <span>{PreviousWeekMondayArray[2]}</span> <span>{PreviousWeekMondayArray[1]}</span>
              <span>{" - "}</span>
              <span style={{color:"#cdcdcd"}} >{PreviousWeekSundayArray[0]}</span> <span>{PreviousWeekSundayArray[2]}</span> <span>{PreviousWeekSundayArray[1]}</span>
                    </Cell>}
            cell={({ rowIndex, columnKey, ...props }) =>
            <Cell className={ this.state.collapsedRows.has(rowIndex) ? css(Object.assign({},stylesheet.AdvanceTableRow,stylesheet.extraRowFeaturesLeft)):css(stylesheet.AdvanceTableRow) }   {...props}>

                {

                  ( !data[rowIndex]['CommentPreviousWeekSelfComment'] && !data[rowIndex]['CommentPreviousWeekManagerComment']) ?
                    <span style={{textAlign:"center"}}>No Comments</span>
                  :
                  <div>
                    <Grid container>
                      <Grid item xs={8} className="flex-row" style={{justifyContent:"flex-start"}}>
                        <span style={{textAlign:"left",fontSize:"12px"}}> {data[rowIndex]['CommentPreviousWeekSelfComment']} </span>
                      </Grid>
                      <Grid item xs={4}></Grid>
                      <Grid item xs={4}></Grid>
                      <Grid item xs={8} className="flex-row" style={{justifyContent:"flex-end"}}>
                        <span style={{textAlign:"right",fontSize:"11px",fontStyle:"italic"}}> {data[rowIndex]['CommentPreviousWeekManagerComment']} </span>
                      </Grid>
                    </Grid>
                  </div>

                }

              </Cell>}
            width={250}
          />

          <Column
            columnKey="CurrentWeekComments"
            header={<Cell  className="Fll_Table_SimpleTableHeader" >

              <span style={{color:"#cdcdcd"}} >{CurrentWeekMondayArray[0]}</span> <span>{CurrentWeekMondayArray[2]}</span> <span>{CurrentWeekMondayArray[1]}</span>
              <span>{" - "}</span>
              <span style={{color:"#cdcdcd"}} >{CurrentWeekSundayArray[0]}</span> <span>{CurrentWeekSundayArray[2]}</span> <span>{CurrentWeekSundayArray[1]}</span>

            </Cell>}
            cell={({ rowIndex, columnKey, ...props }) =>
            <Cell className={ this.state.collapsedRows.has(rowIndex) ? css(Object.assign({},stylesheet.AdvanceTableRow,stylesheet.extraRowFeaturesLeft)):css(stylesheet.AdvanceTableRow) }   {...props}>
              {

                ( !data[rowIndex]['CommentCurrentWeekManagerComment'] && !data[rowIndex]['CommentCurrentWeekSelfComment']) ?
                  <span style={{textAlign:"center"}}>No Comments</span>
                :
                <div>
                  <Grid container>
                    <Grid item xs={9} className="flex-row" style={{justifyContent:"flex-start"}}>
                      <span style={{textAlign:"left",fontSize:"12px"}}> {data[rowIndex]['CommentCurrentWeekSelfComment']} </span>
                    </Grid>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={9} className="flex-row" style={{justifyContent:"flex-end"}}>
                      <span style={{textAlign:"right",fontSize:"11px",fontStyle:"italic"}}> {data[rowIndex]['CommentCurrentWeekManagerComment']} </span>
                    </Grid>
                  </Grid>
                </div>

              }

              </Cell>}
            width={250}
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

export default connect(mapStateToProps, mapDispatchToProps)(FllTable);
