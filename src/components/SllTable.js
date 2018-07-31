import React from 'react';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import { DialogAction, SnackbarAction, SllAction } from '../actions';
import { connect } from 'react-redux';
import { Table, Column, Cell} from 'fixed-data-table-2';
import { getTablerowHeight ,getTableHeight,getTableWidth,getExpandTableWidth} from '../helpers';

// import { StyleSheet, css }  from 'aphrodite';
import moment from 'moment';
import Icon from 'material-ui/Icon';
import '../CSS/SllView.css';
import '../CSS/sllTable.css';
import Grid from 'material-ui/Grid';


class SllTable extends React.Component {
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
  // let totalRows =  this.props.sllExpandInfoFinal.length;
  return this.state.collapsedRows.has(index) ? 400 : 0;
}

_rowExpandedGetter({rowIndex, width, height}) {
  if (!this.state.collapsedRows.has(rowIndex)) {
    return null;
  }


  let data = this.props.sllExpandInfoFinal;
  // let {collapsedRows, scrollToRow} = this.state;
  // let { scrollToRow} = this.state;

// logic to create header Coloumn
  // let currentWeekNumber = moment().week();
  // let PreviousWeekNumber = currentWeekNumber -1;

  // let CurrentWeekMondayArray = String(moment().isoWeekday(1)).split(" ");
  // let CurrentWeekSundayArray = String(moment().isoWeekday(7)).split(" ");
  // let PreviousWeekMondayArray = String(moment().week(PreviousWeekNumber).isoWeekday(1)).split(" ");
  // let PreviousWeekSundayArray = String(moment().week(PreviousWeekNumber).isoWeekday(7)).split(" ");

  let tablerowHeight = getTablerowHeight()+15;
  // let tableHeight = getTableHeight();
  let tableWidth = getTableWidth();
  let expandTableWidth = getExpandTableWidth();

    return (
      <div>
        <div className="Sll_Table_expandStyles">
          <Table
            showScrollbarX={true}
            showScrollbarY={true}
            rowsCount={data.length}
            rowHeight={tablerowHeight}
            headerHeight={5}
            className="SllTableStyle SllTableStyleInner"
            touchScrollEnabled={true}
            width={tableWidth-expandTableWidth}
            height={400}
            stopScrollPropagation={true}
            {...this.props}>

          <Column
            columnKey="Name"
            cell={({ rowIndex, columnKey, ...props }) =>
            <Cell className="Sll_CenterAlignedRowFirstName"  {...props}>
              <a href={"/dashboard?agentId="+data[rowIndex]["AgentId"]} style={{cursor:"pointer",color:"#0067AC",textDecorationColor:"#0067AC"}} >{data[rowIndex][columnKey]}</a>
              </Cell>}
            width={90}
          />

          <Column
            columnKey="AgentId"
            cell={({ rowIndex, columnKey, ...props }) =>
            <Cell className="Sll_SimpleCenterAlignedRow" {...props}>
                {data[rowIndex][columnKey]}
            </Cell>}
            width={80}
          />

          <Column
            columnKey="LastWeekComments"
            cell={({ rowIndex, columnKey, ...props }) =>
            <Cell className="Sll_SimpleLeftAlignedRow"   {...props}>

                {

                  ( !data[rowIndex]['CommentPreviousWeekSelfComment'] && !data[rowIndex]['CommentPreviousWeekManagerComment']) ?
                    <span style={{textAlign:"center"}}>No Comments</span>
                  :
                  <div>
                    <Grid container>
                      <Grid item xs={10} className="flex-row" style={{justifyContent:"flex-start"}}>
                        <span> {data[rowIndex]['CommentPreviousWeekSelfComment']} </span> <br/> <br/>
                      </Grid>
                      <Grid item xs={2}></Grid>
                      <Grid item xs={2}></Grid>
                      <Grid item xs={10} className="flex-row" style={{justifyContent:"flex-end"}}>
                        <span className="SLL_Previous_Comment"> {data[rowIndex]['CommentPreviousWeekManagerComment']} </span>
                      </Grid>
                    </Grid>
                  </div>

                }

              </Cell>}
            width={235}
            flexGrow={2}
          />

          <Column
            columnKey="CurrentWeekComments"
            cell={({ rowIndex, columnKey, ...props }) =>
            <Cell className="Sll_SimpleLeftAlignedRow"  {...props}>
              {

                ( !data[rowIndex]['CommentCurrentWeekManagerComment'] && !data[rowIndex]['CommentCurrentWeekSelfComment']) ?
                  <span style={{textAlign:"center"}}>No Comments</span>
                :
                <div>
                  <Grid container>
                    <Grid item xs={10} className="flex-row" style={{justifyContent:"flex-start"}}>
                      <span > {data[rowIndex]['CommentCurrentWeekSelfComment']} </span> <br/> <br/>
                    </Grid>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={10} className="flex-row" style={{justifyContent:"flex-end"}}>
                      <span className="SLL_Previous_Comment"> {data[rowIndex]['CommentCurrentWeekManagerComment']} </span>
                    </Grid>
                  </Grid>
                </div>

              }

              </Cell>}
            width={235}
            flexGrow={2}

          />

        </Table>
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

  onExpandClickHandler = (agentId)=>{

    console.log(agentId);
    //  call the action to update the action call

    let options = {
      afterSuccess: () => {
        console.log('success');
      },
      afterError: () => {
        console.log('error');
      }
    };

    this.props.getExpandSllInfo(agentId,options);
  }

  rowClickHandler = (AgentId)=>{

    console.log(AgentId);
  }

  render() {
    let data = this.props.sllInfoFinal;
    // let {collapsedRows, scrollToRow} = this.state;
    let {collapsedRows} = this.state;

// logic to create header Coloumn
    let currentWeekNumber = moment().week();
    let PreviousWeekNumber = currentWeekNumber -1;

    let CurrentWeekMondayArray = String(moment().isoWeekday(1)).split(" ");
    let CurrentWeekSundayArray = String(moment().isoWeekday(7)).split(" ");
    let PreviousWeekMondayArray = String(moment().week(PreviousWeekNumber).isoWeekday(1)).split(" ");
    let PreviousWeekSundayArray = String(moment().week(PreviousWeekNumber).isoWeekday(7)).split(" ");

    let tablerowHeight = getTablerowHeight()+15;
    let tableHeight = getTableHeight();
    let tableWidth = getTableWidth();

    // console.log(CurrentWeekMondayArray,CurrentWeekSundayArray,PreviousWeekMondayArray,PreviousWeekSundayArray);

    return (

      <Paper className="Sll_Table_root">
        <div>

          <Table
            showScrollbarX={false}
            showScrollbarY={false}
            rowsCount={data.length}
            rowHeight={tablerowHeight}
            subRowHeightGetter={this._subRowHeightGetter}
            rowExpanded={this._rowExpandedGetter}
            headerHeight={50}
            className={"Sll_Table_tableWrapper SllTableStyle"}
            touchScrollEnabled={true}
            width={tableWidth}
            maxHeight={tableHeight}
            onRowClick={this.rowHandler}
            {...this.props}>

          <Column
            columnKey="Name"
            header={<Cell className="Sll_Table_SimpleTableHeader">Name</Cell>}
            cell={({ rowIndex, columnKey, ...props }) =>
            <Cell className={ this.state.collapsedRows.has(rowIndex) ? "Sll_SelectedCenterAlignedRowFirstName":"Sll_CenterAlignedRowFirstName" }   {...props}>
                <a href={"/dashboard?agentId="+data[rowIndex]["AgentId"]} style={{cursor:"pointer",color:"#0067AC",textDecorationColor:"#0067AC"}} >{data[rowIndex][columnKey]}</a>
              </Cell>}
            width={90}
          />

          <Column
            columnKey="AgentId"
            header={<Cell className="Sll_Table_SimpleTableHeader"> ID</Cell>}
            cell={({ rowIndex, columnKey, ...props }) =>
            <Cell className={ this.state.collapsedRows.has(rowIndex) ? "Sll_SelectedSimpleCenterAlignedRow":"Sll_SimpleCenterAlignedRow" }   {...props}>
                {data[rowIndex][columnKey]}
            </Cell>}
            width={80}
          />

          <Column
            columnKey="LastWeekComments"
            header={<Cell  className="Sll_Table_SimpleTableHeader">

              <span style={{color:"#cdcdcd"}} >{PreviousWeekMondayArray[0]}</span> <span>{PreviousWeekMondayArray[2]}</span> <span>{PreviousWeekMondayArray[1]}</span>
              <span>{" - "}</span>
              <span style={{color:"#cdcdcd"}} >{PreviousWeekSundayArray[0]}</span> <span>{PreviousWeekSundayArray[2]}</span> <span>{PreviousWeekSundayArray[1]}</span>
                    </Cell>}
            cell={({ rowIndex, columnKey, ...props }) =>
            <Cell className={ this.state.collapsedRows.has(rowIndex) ?"Sll_SelectedSimpleLeftAlignedRow":"Sll_SimpleLeftAlignedRow" }   {...props}>

                {

                  ( !data[rowIndex]['CommentPreviousWeekSelfComment'] && !data[rowIndex]['CommentPreviousWeekManagerComment']) ?
                    <span style={{textAlign:"center"}}>No Comments</span>
                  :
                  <div>
                    <Grid container>
                      <Grid item xs={11} className="flex-row" style={{justifyContent:"flex-start"}}>
                        <span> {data[rowIndex]['CommentPreviousWeekSelfComment']} </span> <br/> <br/>
                      </Grid>
                      <Grid item xs={1}></Grid>
                      <Grid item xs={1}></Grid>
                      <Grid item xs={11} className="flex-row" style={{justifyContent:"flex-end"}}>
                        <span className="SLL_Previous_Comment"> {data[rowIndex]['CommentPreviousWeekManagerComment']} </span>
                      </Grid>
                    </Grid>
                  </div>

                }

              </Cell>}
            width={235}
            flexGrow={2}
          />


          <Column
            columnKey="CurrentWeekComments"
            header={<Cell  className="Sll_Table_SimpleTableHeader" >

              <span style={{color:"#cdcdcd"}} >{CurrentWeekMondayArray[0]}</span> <span>{CurrentWeekMondayArray[2]}</span> <span>{CurrentWeekMondayArray[1]}</span>
              <span>{" - "}</span>
              <span style={{color:"#cdcdcd"}} >{CurrentWeekSundayArray[0]}</span> <span>{CurrentWeekSundayArray[2]}</span> <span>{CurrentWeekSundayArray[1]}</span>

            </Cell>}
            cell={({ rowIndex, columnKey, ...props }) =>
            <Cell className={ this.state.collapsedRows.has(rowIndex) ? "Sll_SelectedSimpleLeftAlignedRow":"Sll_SimpleLeftAlignedRow" }   {...props}>
              {

                ( !data[rowIndex]['CommentCurrentWeekManagerComment'] && !data[rowIndex]['CommentCurrentWeekSelfComment']) ?
                  <span style={{textAlign:"center"}}>No Comments</span>
                :
                <div>
                  <Grid container>
                    <Grid item xs={11} className="flex-row" style={{justifyContent:"flex-start"}}>
                      <span > {data[rowIndex]['CommentCurrentWeekSelfComment']} </span> <br/> <br/>
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={11} className="flex-row" style={{justifyContent:"flex-end"}}>
                      <span className="SLL_Previous_Comment"> {data[rowIndex]['CommentCurrentWeekManagerComment']} </span>
                    </Grid>
                  </Grid>
                </div>

              }

              </Cell>}
            flexGrow={2}
            width={235}
          />


          <Column
            header={<Cell style={{borderLeft:"1px solid rgba(151,151,151,0.25)"}} className=" Sll_Table_tableHeaderWithNoBorder">
              <span style={{fontSize:"14px",color:"#58595b",fontWeight:"800",}}>More Details</span>
            </Cell>}
            cell={({ rowIndex, columnKey, ...props }) =>
              <Cell className={"Sll_Table_SimpleTableRow MORE_DETAILS_SLL"} {...props}>
                {
                  (rowIndex !==0) ?
                    <a style={{cursor:"pointer"}} onClick={() => this._handleCollapseClick(rowIndex)}>
                      {collapsedRows.has(rowIndex) ?
                        <Button mini style={{ color: "white", boxShadow: "none",border:"1px solid rgb(151,151,151)", backgroundColor: "rgb(151,151,151)" }}  variant="fab"  aria-label="Add" >
                         <Icon style={{fontSize:"40px"}}>arrow_drop_up</Icon>
                        </Button>
                         :
                         <Button onClick={()=>{this.onExpandClickHandler(data[rowIndex]["AgentId"])}} mini style={{ color:"rgba(151,151,151,0.3)", boxShadow: "none", border:"1px solid rgba(151,151,151,0.3)",backgroundColor:"white"}}  variant="fab" color="primary" aria-label="Add">
                           <Icon style={{ fontSize: "40px" }}>arrow_drop_down</Icon>
                         </Button>

                       }
                    </a>
                  :
                  <span></span>

                }
              </Cell>}
            width={60}
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
      getExpandSllInfo: (sllId,options) => dispatch(SllAction.getExpandSllInfo(sllId,options))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SllTable);
