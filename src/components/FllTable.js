import React from 'react';
import Paper from 'material-ui/Paper';
import { DialogAction, SnackbarAction, ApplicationAction } from '../actions';
import { connect } from 'react-redux';
import { Table, Column, Cell } from 'fixed-data-table-2';
import moment from 'moment';
import Grid from 'material-ui/Grid';
import { getTablerowHeight ,getTableHeight,getTableWidth,getTheClass,Auth} from '../helpers';
import '../CSS/SllView.css';
import '../CSS/fllTable.css';


class FllTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.reloadPage = this.reloadPage.bind(this);
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

// logic to create header Coloumn
    let currentWeekNumber = moment().week();
    let PreviousWeekNumber = currentWeekNumber -1;

    let CurrentWeekMondayArray = String(moment().isoWeekday(1)).split(" ");
    let CurrentWeekSundayArray = String(moment().isoWeekday(7)).split(" ");
    let PreviousWeekMondayArray = String(moment().week(PreviousWeekNumber).isoWeekday(1)).split(" ");
    let PreviousWeekSundayArray = String(moment().week(PreviousWeekNumber).isoWeekday(7)).split(" ");

    const  tableHeight = getTableHeight();
    let  tableWidth = getTableWidth();

    //  because there are only four coloumns and maximum can be this only
    // if(tableWidth>720){
    //   tableWidth= 720;
    // }


    // adding 30 to accomdate big comments
    const  rowHeight =  getTablerowHeight()+15;


    // console.log(CurrentWeekMondayArray,CurrentWeekSundayArray,PreviousWeekMondayArray,PreviousWeekSundayArray);

    return (

      <Paper className="Fll_Table_Root">
        <div className="Fll_Table_tableWrapper">

          <Table
            onHorizontalScroll={ ()=>{return true}}
            showScrollbarX={false}
            showScrollbarY={false}
            rowsCount={data.length}
            rowHeight={rowHeight}
            headerHeight={50}
            className={"FllTableStyle"}
            touchScrollEnabled={true}
            width={tableWidth}
            maxHeight={tableHeight}
            {...this.props}>

          <Column
            columnKey="Name"
            header={<Cell className="Fll_Table_SimpleTableHeader"> Name</Cell>}
            cell={({ rowIndex, columnKey, ...props }) =>
            <Cell className={ getTheClass(rowIndex,"Fll_Table_CenterAlignedRow") }   {...props}>
              {
                (rowIndex === 0 && Auth.getUserDataByKey("Id") === data[rowIndex]["AgentId"])?
                <span>
                  <a href={"/dashboard?agentId="+data[rowIndex]["AgentId"]} style={{cursor:"pointer",color:"#0067AC",textDecoration:"underline",textDecorationColor:"#0067AC"}} >{data[rowIndex][columnKey]}</a>
                  <br/> <br/>
                   <span>(self)</span>
                </span>
                :
                <a href={"/dashboard?agentId="+data[rowIndex]["AgentId"]} style={{cursor:"pointer",color:"#0067AC",textDecoration:"underline",textDecorationColor:"#0067AC"}} >{data[rowIndex][columnKey]}</a>
              }
            </Cell>}
            width={110}
          />


          <Column
            columnKey="AgentId"
            header={<Cell className="Fll_Table_SimpleTableHeader"> ID</Cell>}
            cell={({ rowIndex, columnKey, ...props }) =>
            <Cell className={ getTheClass(rowIndex,"Fll_Table_CenterAlignedRow") }   {...props}>
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
            <Cell className={ getTheClass(rowIndex,"Fll_Table_CenterAlignedRow") }   {...props}>

                {

                  ( !data[rowIndex]['CommentPreviousWeekSelfComment'] && !data[rowIndex]['CommentPreviousWeekManagerComment']) ?
                    <span style={{textAlign:"center"}}>No Comments</span>
                  :
                  <div>
                    <Grid container>
                      <Grid item xs={8} className="flex-row" style={{justifyContent:"flex-start"}}>
                        <span style={{textAlign:"left",}}> {data[rowIndex]['CommentPreviousWeekSelfComment']} </span>
                      </Grid>
                      <Grid item xs={4}></Grid>
                      <Grid item xs={4}></Grid>
                      <Grid item xs={8} className="flex-row" style={{justifyContent:"flex-end"}}>
                        <span className="Fll_Previous_Week_comment"> {data[rowIndex]['CommentPreviousWeekManagerComment']} </span>
                      </Grid>
                    </Grid>
                  </div>

                }

              </Cell>}
            width={256}
            flexGrow={2}
          />

          <Column
            columnKey="CurrentWeekComments"
            header={<Cell  className="Fll_Table_SimpleTableHeader" >

              <span style={{color:"#cdcdcd"}} >{CurrentWeekMondayArray[0]}</span> <span>{CurrentWeekMondayArray[2]}</span> <span>{CurrentWeekMondayArray[1]}</span>
              <span>{" - "}</span>
              <span style={{color:"#cdcdcd"}} >{CurrentWeekSundayArray[0]}</span> <span>{CurrentWeekSundayArray[2]}</span> <span>{CurrentWeekSundayArray[1]}</span>

            </Cell>}
            cell={({ rowIndex, columnKey, ...props }) =>
            <Cell className={ getTheClass(rowIndex,"Fll_Table_CenterAlignedRow") } {...props}>
              {

                ( !data[rowIndex]['CommentCurrentWeekManagerComment'] && !data[rowIndex]['CommentCurrentWeekSelfComment']) ?
                  <span style={{textAlign:"center"}}>No Comments</span>
                :
                <div>
                  <Grid container>
                    <Grid item xs={9} className="flex-row" style={{justifyContent:"flex-start"}}>
                      <span style={{textAlign:"left"}}> {data[rowIndex]['CommentCurrentWeekSelfComment']} </span>
                    </Grid>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={9} className="flex-row" style={{justifyContent:"flex-end"}}>
                      <span className="Fll_Previous_Week_comment"> {data[rowIndex]['CommentCurrentWeekManagerComment']} </span>
                    </Grid>
                  </Grid>
                </div>

              }

              </Cell>}
            width={256}
            flexGrow={2}
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FllTable);
