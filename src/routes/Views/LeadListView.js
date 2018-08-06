import React, { Component } from 'react';
import { addUrlProps, UrlQueryParamTypes } from 'react-url-query';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import { EnhancedTable } from '../../components';
import { DialogAction, SnackbarAction, LeadAction } from '../../actions';
import orderBy from "lodash/orderBy";
import Input, { InputAdornment } from 'material-ui/Input';
import Icon from 'material-ui/Icon';
import '../../CSS/leadListView.css';

const urlPropsQueryConfig = {
  agentId: { type: UrlQueryParamTypes.string},
  week:{type:UrlQueryParamTypes.string},
  type:{type:UrlQueryParamTypes.string}
};


class LeadListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      columnToQuery: "LeadId",
      showInput:false
    };

    this.reloadPage = this.reloadPage.bind(this);
  }

  componentDidMount() {
    // const { history } = this.props;

    // if(!!Auth.isLoggedIn && Auth.getUserDataByKey('Role') !== 'SUPERADMIN') {
    //   history.push('/profile');
    // }

    let options = {
      afterSuccess: () => {
        console.log('success');
      },
      afterError: () => {
        console.log('error');
      }
    };

    let { agentId } = this.props;
    let { week } = this.props;
    let { type } = this.props;

    this.props.actions.getLeadsInfo(type,week,agentId,options);
  }

  reloadPage() {
    let options = {
      afterSuccess: () => {},
      afterError: () => {}
    };

    let { agentId } = this.props;
    let { week } = this.props;
    this.props.actions.getLeadsInfo(week,agentId,options);
  }


  showAddAppDialog() {
    const dialogType = 'ADD_BRANCH';
    const dialogData = '';
    let dialogActions = {reloadPage: this.reloadPage};
    this.props.actions.openDialog(dialogType, dialogData, dialogActions);
  }


  onInputChange= (event)=>{
    let  { value } = event.target;
    console.log(value);
    this.setState({ query:value });
  }

  resetSearch= ()=>{
  }

  showInputBox = () =>{
    this.setState({showInput:true});
  }


  render() {

    // let arraObject=[1,2,3];
    // let { agentId } = this.props;
    let { week } = this.props;

    const { leadDataStore  } = this.props ? this.props : [];

    // const { applications } = this.props ? this.props : [];

    // BranchId: Number(value.BranchId)

    const applications = leadDataStore;

    // const applications=[
    //   {
    //     LeadId:"S_1234",
    //     CustomerName:"Swastik Shrivastava",
    //     DOB:"12/21/1997",
    //     Contact:"9897507488",
    //     Status:"Taken",
    //     Met:"Yes",
    //     NoMeetingDone:"5",
    //     JointCall:"Yes",
    //     Remarks:"Agrred",
    //     ExpectedPremium:"7500",
    //     AnnualIncome:"500000",
    //     LastMeetingDate:"2018-07-22T18:30:00.000Z",
    //     NextMeetingDate:"2018-07-22T18:30:00.000Z",
    //     ProductName:"Cancer Care",
    //     Location:"Mumbai",
    //     CommentCurrent:"",
    //     CommentPrevious:"I will be meeting atleast 25 leads this week.Seeing 10 other potential leads too.I am gonna",
    //     LGCode:"asdf",
    //     BankBranchCode:"Mumbai",
    //     MeetinDoneOn:"2018-07-22T18:30:00.000Z"
    //   },
    //   {
    //     LeadId:"S_2345",
    //     CustomerName:"Rajat Rawat",
    //     DOB:"12/21/1997",
    //     Contact:"9897507488",
    //     Status:"Taken",
    //     Met:"Yes",
    //     NoMeetingDone:"5",
    //     JointCall:"Yes",
    //     Remarks:"Agrred",
    //     ExpectedPremium:"7500",
    //     AnnualIncome:"500000",
    //     LastMeetingDate:"21/6/1998",
    //     NextMeetingDate:"21/6/1998",
    //     ProductName:"Cancer Care",
    //     Location:"Mumbai",
    //     LastWeekComments:"I will be able to take it and will make it happen as soon as possible",
    //     CurrentWeekComments:"I will be able to take it and will make it happen as soon as possible",
    //     LGCode:"asdf",
    //     BankBranchCode:"Mumbai"
    //   },
    //   {
    //     LeadId:"457_io",
    //     CustomerName:"Rajat Rawat",
    //     DOB:"12/21/1997",
    //     Contact:"9897507488",
    //     Status:"Taken",
    //     Met:"Yes",
    //     NoMeetingDone:"5",
    //     JointCall:"Yes",
    //     Remarks:"Agrred",
    //     ExpectedPremium:"7500",
    //     AnnualIncome:"500000",
    //     LastMeetingDate:"21/6/1998",
    //     NextMeetingDate:"21/6/1998",
    //     ProductName:"Cancer Care",
    //     Location:"Mumbai",
    //     LastWeekComments:null,
    //     CurrentWeekComments:null,
    //     LGCode:"asdf",
    //     BankBranchCode:"Mumbai"
    //   },
    //   {
    //     LeadId:"457_iosdf",
    //     CustomerName:"Rajat Rawat",
    //     DOB:"12/21/1997",
    //     Contact:"9897507488",
    //     Status:"Taken",
    //     Met:"Yes",
    //     NoMeetingDone:"5",
    //     JointCall:"Yes",
    //     Remarks:"Agrred",
    //     ExpectedPremium:"7500",
    //     AnnualIncome:"500000",
    //     LastMeetingDate:"21/6/1998",
    //     NextMeetingDate:"21/6/1998",
    //     ProductName:"Cancer Care",
    //     Location:"Mumbai",
    //     LastWeekComments:null,
    //     CurrentWeekComments:null,
    //     LGCode:"asdf",
    //     BankBranchCode:"Mumbai"
    //   },
    //   {
    //     LeadId:"123sfdsf",
    //     CustomerName:"Rajat Rawat",
    //     DOB:"12/21/1997",
    //     Contact:"9897507488",
    //     Status:"Taken",
    //     Met:"Yes",
    //     NoMeetingDone:"5",
    //     JointCall:"Yes",
    //     Remarks:"Agrred",
    //     ExpectedPremium:"7500",
    //     AnnualIncome:"500000",
    //     LastMeetingDate:"21/6/1998",
    //     NextMeetingDate:"21/6/1998",
    //     ProductName:"Cancer Care",
    //     Location:"Mumbai",
    //     LastWeekComments:null,
    //     CurrentWeekComments:null,
    //     LGCode:"asdf",
    //     BankBranchCode:"Mumbai"
    //   },
    //   {
    //     LeadId:"123sfdsf",
    //     CustomerName:"Rajat Rawat",
    //     DOB:"12/21/1997",
    //     Contact:"9897507488",
    //     Status:"Taken",
    //     Met:"Yes",
    //     NoMeetingDone:"5",
    //     JointCall:"Yes",
    //     Remarks:"Agrred",
    //     ExpectedPremium:"7500",
    //     AnnualIncome:"500000",
    //     LastMeetingDate:"21/6/1998",
    //     NextMeetingDate:"21/6/1998",
    //     ProductName:"Cancer Care",
    //     Location:"Mumbai",
    //     LastWeekComments:null,
    //     CurrentWeekComments:null,
    //     LGCode:"asdf",
    //     BankBranchCode:"Mumbai"
    //   },
    //   {
    //     LeadId:"123sfdsf",
    //     CustomerName:"Rajat Rawat",
    //     DOB:"12/21/1997",
    //     Contact:"9897507488",
    //     Status:"Taken",
    //     Met:"Yes",
    //     NoMeetingDone:"5",
    //     JointCall:"Yes",
    //     Remarks:"Agrred",
    //     ExpectedPremium:"7500",
    //     AnnualIncome:"500000",
    //     LastMeetingDate:"21/6/1998",
    //     NextMeetingDate:"21/6/1998",
    //     ProductName:"Cancer Care",
    //     Location:"Mumbai",
    //     LastWeekComments:null,
    //     CurrentWeekComments:null,
    //     LGCode:"asdf",
    //     BankBranchCode:"Mumbai"
    //   },
    //   {
    //     LeadId:"123sfdsf",
    //     CustomerName:"Rajat Rawat",
    //     DOB:"12/21/1997",
    //     Contact:"9897507488",
    //     Status:"Taken",
    //     Met:"Yes",
    //     NoMeetingDone:"5",
    //     JointCall:"Yes",
    //     Remarks:"Agrred",
    //     ExpectedPremium:"7500",
    //     AnnualIncome:"500000",
    //     LastMeetingDate:"21/6/198",
    //     NextMeetingDate:"21/6/198",
    //     ProductName:"Cancer Care",
    //     Location:"Mumbai",
    //     LastWeekComments:null,
    //     CurrentWeekComments:null,
    //     LGCode:"asdf",
    //     BankBranchCode:"Mumbai"
    //   },
    //   {
    //     LeadId:"123sfdsf",
    //     CustomerName:"Rajat Rawat",
    //     DOB:"12/21/1997",
    //     Contact:"9897507488",
    //     Status:"Taken",
    //     Met:"Yes",
    //     NoMeetingDone:"5",
    //     JointCall:"Yes",
    //     Remarks:"Agrred",
    //     ExpectedPremium:"7500",
    //     AnnualIncome:"500000",
    //     LastMeetingDate:"21/06/1998",
    //     NextMeetingDate:"21/06/1998",
    //     ProductName:"Cancer Care",
    //     Location:"Mumbai",
    //     LastWeekComments:null,
    //     CurrentWeekComments:null,
    //     LGCode:"asdf",
    //     BankBranchCode:"Mumbai"
    //   }
    //
    // ]

    // applications.map((value,index)=>{
    //   applications[index].Sno=index+1;
    // })

    const lowerCaseQuery = this.state.query.toLowerCase();

    return (
        <section className="LEAD_MAIN">

          <Grid container className="LEAD_TAG_AND_SEARCH_CONTAINER">
            <Grid item xs={12} className="SPACE_GIVEN">
              <br/> <br/> <br/>
            </Grid>

            <Grid item xs={6} sm={6} className="LEAD_TAGLINE">
              <Grid container>
                <Grid item xs={12}>
                  Lead Information
                </Grid>
                <Grid item xs={1}>
                  <hr style={{border:"1px solid #beebd2"}}/>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={6}  sm={6} className="flex-row LEAD_INPUT_SEARCH">
              <Input
                id='query'
                type='text'
                name='query'
                value={this.state.query}
                onChange={this.onInputChange}
                disableUnderline={true}
                placeholder="Search by Lead ID"
                startAdornment={
                  <InputAdornment position="start">
                    <Icon style={{color:"#e4e4e4"}}> search</Icon>
                  </InputAdornment>
                }
                className="LEAD_INPUT"
                />
            </Grid>
          </Grid>

          <Grid container  className="LEAD_CONTAINER">

            <Grid item xs={12} className="flex-row" style={{justifyContent:"center"}}>
              <EnhancedTable
                week={week}
                reloadPage={this.reloadPage}
                finalData={orderBy(
                  this.state.query
                    ? applications.filter(x =>
                        x[this.state.columnToQuery]
                          .toLowerCase()
                          .includes(lowerCaseQuery)
                      )
                    : applications,
                  this.state.columnToSort,
                  this.state.sortDirection
                )}
              />

            </Grid>
          </Grid>
        </section>
    );
  }
}

function mapStateToProps(state){
  return {
    leadDataStore :!!state.leadViewStore.leadData ? state.leadViewStore.leadData : []
  };
}

function mapDispatchToProps(dispatch){
  return {
    actions: {
      openDialog: (dialogType, data, dataActions) => dispatch(DialogAction.open(dialogType, data, dataActions)),
      openSnackbar: (data) => dispatch(SnackbarAction.show(data)),
      getLeadsInfo: (type,week,agentId,options) => dispatch(LeadAction.getLeadsInfo(type,week,agentId,options))
    }
  }
}

export default addUrlProps({ urlPropsQueryConfig })(connect(mapStateToProps, mapDispatchToProps)(LeadListView));
