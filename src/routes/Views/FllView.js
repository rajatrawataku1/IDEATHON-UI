import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import { Accordian, TableHeader,FllTable } from '../../components';
import { DialogAction, SnackbarAction, FllAction } from '../../actions';
import { CopyToClipboardHelper, Auth } from '../../helpers';
import Avatar from 'material-ui/Avatar';
import { PROFILE_ICON, PROFILE_LOGO, COLORS, FONTS} from '../../constants';
import Typography from 'material-ui/Typography';
import Menu, { MenuItem, MenuList } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import orderBy from "lodash/orderBy";
import Input, { InputLabel,InputAdornment } from 'material-ui/Input';
import Icon from 'material-ui/Icon';
import Fade from 'material-ui/transitions/Fade';

const STYLES = {
  BOX_PADDING:{
    marginBottom:"10px"
  },
  MAIN: {
    overflow: 'scroll',
    flexGrow: 1,
    padding: '0px',
    fontFamily: 'Lato'
  },
  CONTAINER: {
    overflow: 'scroll',
    marginTop:"22px",
    padding: '0px 0px'
  },
  ADD_APP_BUTTON: {
    color: COLORS.WHITE,
    borderRadius: '6px',
    border: '1px solid '+ COLORS.WHITE,
    backgroundImage:"linearGradient(58deg, #03ce87, #067ecf)",
    marginRight:"20px",
    fontFamily: FONTS.MAINFONT,
  },
  UPPER_HEADER:{
    height:"63px",
    borderRadius: "10px",
    backgroundColor: "#ffffff",
    border: "solid 1px #e7e7e7",
    width:"100%"
  },
  PROFILE_IMAGE:{
    height:"44px",
    width:"44px",
    margin:"10px 11px 10px 14px",
    backgroundColor:"#d8d8d8",
    borderRadius:"50%",
    display: "inline-block",
    float:"left"
  },
  PROFILE_NAME:{
    fontSize:"16px",
    fontWeight: 300,
    color: "#58595b",
    margin:"0px",
    padding:"0px",
    borderRight:"1px solid #bbbbbb"

  },
  PROFILE_DESIGNATION:{
    fontSize:"16px",
    fontWeight:500,
    color:"#58595b",
    margin:"0px"
  },
  SUB_PROFILE_DESIGNATION:{
    fontSize:"12px",
    color:"#58595b",
    margin:"0px",
    paddingTop:"2px",
    borderRight:"1px solid #bbbbbb"
  }
};

const columnData = [
  { id: 'Sno', numeric: true, disablePadding: false, label: 'Sno' },
  { id: 'BranchID', numeric: false, disablePadding: false, label: 'Branch ID' },
  { id: 'BranchName', numeric: false, disablePadding: true, label: 'Branch Name' },
  { id: 'Radius', numeric: true, disablePadding: false, label: 'Radius' },
  { id: 'Lat', numeric: true, disablePadding: false, label: 'Latitude' },
  { id: 'Lon', numeric: true, disablePadding: false, label: 'Longitude' },
  { id: 'Status', numeric: true, disablePadding: false, label: 'Status',CurrentComments:null},
];


class FllView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      columnToQuery: "AgentId",
      showInput:false
    };

    this.reloadPage = this.reloadPage.bind(this);
  }

  componentDidMount() {
    const { history } = this.props;

    const fllId = Auth.getUserDataByKey('Id');

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

    if( !!fllId){

      console.log(fllId);
      this.props.actions.getFllInfo(fllId,options);

    }


  }

  reloadPage() {

    let options = {
      afterSuccess: () => {},
      afterError: () => {}
    };

    const fllId = Auth.getUserDataByKey('Id');

    // this.props.actions.getFllInfo(fllId,options);
  }


  onInputChange= (event)=>{
    let  { value, name } = event.target;
    console.log(value);
    this.setState({ query:value });
  }

  resetSearch= ()=>{
  }

  showInputBox = () =>{
    this.setState({showInput:true});
  }


  render() {

    let arraObject=[1,2,3];
    const { expanded } = this.state;

     // use this to send data further

    // const { fllInfo } = this.props ? this.props : [];

    // const applications = fllInfo;

    // BranchId: Number(value.BranchId)


    const applications= [
      {
        AgentId:"101",
        CommentCurrentWeekManagerComment:" I will be meeting atleast 25 leads this week.Seeing 10 other potential leads too.",
        CommentCurrentWeekSelfComment:"I will be meeting atleast 25 leads this week.Seeing 10 other potential leads too.",
        CommentPreviousWeekManagerComment:" my previous manager comment",
        CommentPreviousWeekSelfComment:"my previous self comment",
        Name:"Rajat Rawat"
      },
      {
        AgentId:"102",
        CommentCurrentWeekManagerComment:" my current manager comment",
        CommentCurrentWeekSelfComment:"my current self Comment",
        CommentPreviousWeekManagerComment:" my previous manager comment",
        CommentPreviousWeekSelfComment:"my previous self comment",
        Name:"Shivam Singh"
      },
      {
        AgentId:"103",
        CommentCurrentWeekManagerComment:" my current manager comment",
        CommentCurrentWeekSelfComment:"my current self Comment",
        CommentPreviousWeekManagerComment:" my previous manager comment",
        CommentPreviousWeekSelfComment:"my previous self comment",
        Name:"Swastik Shrivastava"
      },
      {
        AgentId:"103",
        CommentCurrentWeekManagerComment:" my current manager comment",
        CommentCurrentWeekSelfComment:"my current self Comment",
        CommentPreviousWeekManagerComment:" my previous manager comment",
        CommentPreviousWeekSelfComment:"my previous self comment",
        Name:"Swastik Shrivastava"
      },
      {
        AgentId:"103",
        CommentCurrentWeekManagerComment:" my current manager comment",
        CommentCurrentWeekSelfComment:"my current self Comment",
        CommentPreviousWeekManagerComment:" my previous manager comment",
        CommentPreviousWeekSelfComment:"my previous self comment",
        Name:"Swastik Shrivastava"
      },
      {
        AgentId:"103",
        CommentCurrentWeekManagerComment:"",
        CommentCurrentWeekSelfComment:"",
        CommentPreviousWeekManagerComment:"",
        CommentPreviousWeekSelfComment:"",
        Name:"Swastik Shrivastava"
      },
      {
        AgentId:"103",
        CommentCurrentWeekManagerComment:" my current",
        CommentCurrentWeekSelfComment:"my current self Comment",
        CommentPreviousWeekManagerComment:" my previous ",
        CommentPreviousWeekSelfComment:"my previous self comment",
        Name:"Swastik Shrivastava"
      },
      {
        AgentId:"103",
        CommentCurrentWeekManagerComment:" my current manager comment",
        CommentCurrentWeekSelfComment:"my current self Comment",
        CommentPreviousWeekManagerComment:" my previous manager comment",
        CommentPreviousWeekSelfComment:"my previous self comment",
        Name:"Swastik Shrivastava"
      },
      {
        AgentId:"103",
        CommentCurrentWeekManagerComment:" my current manager comment",
        CommentCurrentWeekSelfComment:"my current self Comment",
        CommentPreviousWeekManagerComment:" my previous manager comment",
        CommentPreviousWeekSelfComment:"my previous self comment",
        Name:"Swastik Shrivastava"
      }

    ]

    // const applications=[
    //   {
    //     LeadID:"S_1234",
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
    //     LastWeekComments:"I will be able to take it and will make it happen as soon as possible. ",
    //     CurrentWeekComments:"I will be able to take it. Give me that",
    //     LGCode:"asdf",
    //     BankBranchCode:"Mumbai"
    //   },
    //   {
    //     LeadID:"S_2345",
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
    //     LastWeekComments:"I will be able to take it and will make it happen as soon as possible",
    //     CurrentWeekComments:"I will be able to take it and will make it happen as soon as possible",
    //     LGCode:"asdf",
    //     BankBranchCode:"Mumbai"
    //   },
    //   {
    //     LeadID:"457_io",
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
    //     LeadID:"457_iosdf",
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
    //     LeadID:"123sfdsf",
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
    //     LeadID:"jsui8909",
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
    //     LeadID:"sdfa123124123",
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
    //     LeadID:"#234sdf",
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
    //     LeadID:"#$#dfadfaf",
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
    //   }
    // ]

    applications.map((value,index)=>{
      applications[index].Sno=index+1;
    })

    const lowerCaseQuery = this.state.query.toLowerCase();

    return (
        <section style={STYLES.MAIN}>

          <Grid container className="LEAD_TAG_AND_SEARCH_CONTAINER">
            <Grid item xs={12} className="SPACE_GIVEN">
              <br/> <br/> <br/>
            </Grid>

            <Grid item xs={6} className="LEAD_TAGLINE">
              <Grid container>
                <Grid item xs={12}>
                  Agent Information
                </Grid>
                <Grid item xs={1}>
                  <hr style={{border:"1px solid #beebd2"}}/>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} className="flex-row flex-justify-end LEAD_INPUT_SEARCH">
              <Input
                id='query'
                type='text'
                name='query'
                value={this.state.query}
                onChange={this.onInputChange}
                disableUnderline="true"
                style={{ border:"1px solid #d8d8d8",borderRadius:"5px",padding:"4px",color:"#58595b"}}
                placeholder="Search by Agent ID"
                disableUnderline="true"
                startAdornment={
                  <InputAdornment position="start">
                    <Icon style={{color:"#e4e4e4"}}> search</Icon>
                  </InputAdornment>
                }
                className="LEAD_INPUT"

                />
            </Grid>

          </Grid>

          <Grid container className="LEAD_CONTAINER">

            <Grid item xs={12} >
              <FllTable
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

function mapStateToProps(state) {
  return {
    fllInfo: !!state.fllStore.fllInfo ? state.fllStore.fllInfo : [],
    applications: !!state.applicationStore.applications ? state.applicationStore.applications : []
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      openDialog: (dialogType, data, dataActions) => dispatch(DialogAction.open(dialogType, data, dataActions)),
      openSnackbar: (data) => dispatch(SnackbarAction.show(data)),
      getFllInfo: (fllId,options) => dispatch(FllAction.getFllInfo(fllId,options))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FllView);
