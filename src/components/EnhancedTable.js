import React from 'react';
// import PropTypes from 'prop-types';
// import {Table,TableHead,TableBody, TableCell, TableFooter, TablePagination, TableRow, TableSortLabel} from 'material-ui';
import Paper from 'material-ui/Paper';
// import Tooltip from 'material-ui/Tooltip';
import Button from 'material-ui/Button';
import { DialogAction, SnackbarAction} from '../actions';
import { connect } from 'react-redux';
import moment from 'moment';
// import {  FONTS } from '../constants';
import { Table, Column, Cell } from 'fixed-data-table-2';
import '../CSS/fixed-data-table-view.css';
import '../CSS/enhancedTable.css';
import { getTablerowHeight, getTableHeight, getTableWidth,TimeHelper} from '../helpers';


class EnhancedTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  showInputCommentsDialog(LeadID,columnKey){
    const dialogType = 'ADD_LEAD_COMMENTS';
    const dialogData = {LeadID:LeadID,columnKey:columnKey};
    let dialogActions = {reloadPage: this.props.reloadPage};
    this.props.actions.openDialog(dialogType, dialogData, dialogActions);
  }


  render() {

    const data = this.props.finalData;
    const {week} = this.props;

    const  tableHeight = getTableHeight();
    const  tableWidth = getTableWidth();
    const  rowHeight =  getTablerowHeight();


    return (

      <Paper className="Enhanced_Table_Root">
        <div>

          <Table
          showScrollbarX={false}
          showScrollbarY={false}
          className="Enhanced_tableWrapper"
          touchScrollEnabled={true}
          rowHeight={rowHeight}
          headerHeight={50}
          rowsCount={data.length}
          width={tableWidth}
          maxHeight={tableHeight}
          {...this.props}>

          {/* <Column
            columnKey="Sno"
              header={<Cell className="Enhanced_SimpleTableHeader" >Sno</Cell>}
            cell={({ rowIndex, columnKey, ...props }) =>
              <Cell className="Enhanced_SimpleTableRow" {...props}>
                {data[rowIndex][columnKey]}
              </Cell>}
            fixed={true}
            width={50}
          /> */}

          {/* <Column
            columnKey="LeadId"
            header={<Cell className="Enhanced_newTableHeaderImp">Lead ID</Cell>}
            cell={({ rowIndex, columnKey, ...props }) =>
              <Cell className="Enhanced_AdvanceTableRow" {...props}>
                {data[rowIndex][columnKey]}
              </Cell>}
            width={90}
            fixed={true}
          /> */}

          <Column
            columnKey="LeadId"
            header={<Cell className="Enhanced_newTableHeaderImp">Lead ID</Cell>}
            cell={({ rowIndex, columnKey, ...props }) =>
              <Cell className="Enhanced_SimpleTableRow" {...props}>
                {data[rowIndex][columnKey]}
              </Cell>}
            width={90}
            fixed={true}
          />


          <Column
            columnKey="CustomerName"
            header={<Cell className="Enhanced_newTableHeaderImp">Customer Name</Cell>}
            cell={({ rowIndex, columnKey, ...props }) =>
              <Cell className="Enhanced_AdvanceTableRow" {...props}>
                {data[rowIndex][columnKey]}
              </Cell>}
            fixed={true}
            width={110}
          />

          <Column
            columnKey="DOB"
            header={<Cell className="Enhanced_newTableHeaderNotImp" >DOB</Cell>}
            cell={({ rowIndex, columnKey, ...props }) =>
              <Cell className="Enhanced_AdvanceTableRow" {...props}>
                {TimeHelper.giveMeFormattedTime(data[rowIndex][columnKey])}
              </Cell>}
            width={150}
          />

          <Column
            columnKey="Age"
            header={<Cell className="Enhanced_newTableHeaderNotImp" >Age</Cell>}
            cell={({ rowIndex, columnKey, ...props }) =>
              <Cell className="Enhanced_AdvanceTableRow" {...props}>
                {data[rowIndex][columnKey]}
              </Cell>}
            width={100}
          />

          <Column
            columnKey="MobileNum"
            header={<Cell className="Enhanced_newTableHeaderNotImp" >Contact Num</Cell>}
            cell={({ rowIndex, columnKey, ...props }) =>
              <Cell className="Enhanced_AdvanceTableRow" {...props}>
                {data[rowIndex][columnKey]}
              </Cell>}
            width={150}
          />

          <Column
            columnKey="Status"
            header={<Cell className="Enhanced_newTableHeaderNotImp" >Lead Status</Cell>}
            cell={({ rowIndex, columnKey, ...props }) =>
              <Cell className="Enhanced_AdvanceTableRow" {...props}>
                {data[rowIndex][columnKey]}
              </Cell>}
            width={100}
          />

          <Column
            columnKey="EPI"
            header={<Cell className="Enhanced_newTableHeaderNotImp" >Expected Premium</Cell>}
            cell={({ rowIndex, columnKey, ...props }) =>
              <Cell className="Enhanced_AdvanceTableRow"  {...props}>
                {data[rowIndex][columnKey]}
              </Cell>}
            width={150}
          />

          <Column
            columnKey="IncomeLPA"
            header={<Cell  className="Enhanced_newTableHeaderNotImp" >Income</Cell>}
            cell={({ rowIndex, columnKey, ...props }) =>
              <Cell className="Enhanced_AdvanceTableRow"  {...props}>
                {data[rowIndex][columnKey]}
              </Cell>}
            width={150}
          />

          <Column
            columnKey="MeetinDoneOn"
            header={<Cell  className="Enhanced_newTableHeaderNotImp" >Last Meeting Date</Cell>}
            cell={({ rowIndex, columnKey, ...props }) =>
              <Cell className="Enhanced_AdvanceTableRow"  {...props}>
                {TimeHelper.giveMeFormattedTime(data[rowIndex][columnKey])}
              </Cell>}
            width={150}
          />

          <Column
            columnKey="MeetingSheduledDate"
            header={<Cell  className="Enhanced_newTableHeaderNotImp" >Next Meeting Date</Cell>}
            cell={({ rowIndex, columnKey, ...props }) =>
              <Cell className="Enhanced_AdvanceTableRow"  {...props}>
                {TimeHelper.giveMeFormattedTime(data[rowIndex][columnKey])}
              </Cell>}
            width={150}
          />

          <Column
            columnKey="Location"
            header={<Cell  className="Enhanced_newTableHeaderNotImp" >Location</Cell>}
            cell={({ rowIndex, columnKey, ...props }) =>
              <Cell className="Enhanced_AdvanceTableRow"  {...props}>
                {data[rowIndex][columnKey]}
              </Cell>}
            width={150}
          />

          <Column
            columnKey="LeadCreationDate"
            header={<Cell className="Enhanced_newTableHeaderNotImp" >Lead Creation date </Cell>}
            cell={({ rowIndex, columnKey, ...props }) =>
              <Cell className="Enhanced_AdvanceTableRow" {...props}>
                {TimeHelper.giveMeFormattedTime(data[rowIndex][columnKey])}
              </Cell>}
            width={150}
          />

          <Column
            columnKey="CampCode"
            header={<Cell className="Enhanced_newTableHeaderNotImp" >Campaign Code</Cell>}
            cell={({ rowIndex, columnKey, ...props }) =>
              <Cell className="Enhanced_AdvanceTableRow" {...props}>
                {data[rowIndex][columnKey]}
              </Cell>}
            width={150}
          />

          <Column
            columnKey="FulfillerAgentNum"
            header={<Cell className="Enhanced_newTableHeaderNotImp" >Agent Num</Cell>}
            cell={({ rowIndex, columnKey, ...props }) =>
              <Cell className="Enhanced_AdvanceTableRow" {...props}>
                {data[rowIndex][columnKey]}
              </Cell>}
            width={150}
          />

          <Column
            columnKey="NumMeetingsDone"
            header={<Cell className="Enhanced_newTableHeaderNotImp" >No. Meeting</Cell>}
            cell={({ rowIndex, columnKey, ...props }) =>
              <Cell className="Enhanced_AdvanceTableRow" {...props}>
                {data[rowIndex][columnKey]}
              </Cell>}
            width={100}
          />


          <Column
            columnKey="LdJointCall"
            header={<Cell  className="Enhanced_newTableHeaderNotImp" >Joint Call (Y/N)</Cell>}
            cell={({ rowIndex, columnKey, ...props }) =>
              <Cell className="Enhanced_AdvanceTableRow"  {...props}>
                {data[rowIndex][columnKey]}
              </Cell>}
            width={100}
          />

          <Column
            columnKey="LdMeetingStatus"
            header={<Cell className="Enhanced_newTableHeaderNotImp" >Met/Not Met</Cell>}
            cell={({ rowIndex, columnKey, ...props }) =>
              <Cell className="Enhanced_AdvanceTableRow"  {...props}>
                {data[rowIndex][columnKey]}
              </Cell>}
            width={100}
          />


          <Column
            columnKey="CommentCurrent"
            header={<Cell  className="Enhanced_newTableHeaderNotImp" >Current Week Comments</Cell>}
            cell={({ rowIndex, columnKey, ...props }) =>
              <Cell className="Enhanced_AdvanceTableRow"  {...props}>

                { (!!data[rowIndex][columnKey])?
                  data[rowIndex][columnKey]
                  :
                  (moment().isoWeek() === Number(week)) ?
                    <Button style={{backgroundColor:"#d8d8d8",color:"rgba(88,89,91,0.8)",textTransform:"none"}}  onClick={()=>{this.showInputCommentsDialog(data[rowIndex].LeadId,columnKey)}} >
                      Add Comment
                    </Button>
                  :
                  <span style={{textAlign:"center"}}>No comments</span>
                }

              </Cell>}
            width={250}
          />

          <Column
            columnKey="CommentPrevious"
            header={<Cell  className="Enhanced_newTableHeaderNotImp" >Previous Week Comments</Cell>}
            cell={({ rowIndex, columnKey, ...props }) =>
              <Cell className="Enhanced_AdvanceTableRow"  {...props}>
                { (!!data[rowIndex][columnKey])?
                  data[rowIndex][columnKey]
                  :
                  "No comments"
                }
              </Cell>}
            width={250}
          />

          <Column
            columnKey="LGCode"
            header={<Cell  className="Enhanced_newTableHeaderNotImp" >LG Code</Cell>}
            cell={({ rowIndex, columnKey, ...props }) =>
              <Cell className="Enhanced_AdvanceTableRow"  {...props}>
                {data[rowIndex][columnKey]}
              </Cell>}
            width={150}
          />

          <Column
            columnKey="BankBranchCode"
            header={<Cell  className="Enhanced_newTableHeaderNotImp" >Branch Code</Cell>}
            cell={({ rowIndex, columnKey, ...props }) =>
              <Cell className="Enhanced_AdvanceTableRow"  {...props}>
                {data[rowIndex][columnKey]}
              </Cell>}
            width={150}
          />

        </Table>

        </div>
      </Paper>
    );
  }
}



function mapStateToProps(state){
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

export default connect(mapStateToProps, mapDispatchToProps)(EnhancedTable);
