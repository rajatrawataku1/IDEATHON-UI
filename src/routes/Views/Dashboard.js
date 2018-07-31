import React, { Component } from 'react';
import { addUrlProps, UrlQueryParamTypes } from 'react-url-query';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import { BoxHeader } from '../../components';
import { DialogAction, SnackbarAction, DashboardAction } from '../../actions';
import {  Auth } from '../../helpers';
import { BACK_IMAGE,ADD_COMMENT_IMAGE,PROFILE_LOGO} from '../../constants';
import Typography from 'material-ui/Typography';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import Select from 'material-ui/Select';
import '../../CSS/dashboard.css';
import moment from 'moment';


const urlPropsQueryConfig = {
  agentId: { type: UrlQueryParamTypes.string}
};



class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SelectLeads:"weekly",
      SelectJointCalls:"weekly",
      SelectCampaigns:"weekly",
      SelectTraining:"weekly",
      WeekToShow:moment().isoWeek(),
      WeekValue:"CurrentWeek"
    };
    this.reloadPage = this.reloadPage.bind(this);
  }

  getAllDataApiCall = ()=>{

    // week number
    // let { WeekToShow } = this.state;
    // // agent ID
    // let { agentId } = this.props;
    // // timeline
    // let { SelectLeads, SelectJointCalls, SelectCampaigns, SelectTraining } = this.state;

    let options = {
      afterSuccess: () => {
        console.log('success');
      },
      afterError: () => {
        console.log('error');
      }
    };

    // this.props.actions.getAgentInfo(agentId,options);
    // this.props.actions.getLeadsInfo(WeekToShow,agentId,SelectLeads,options);
    // this.props.actions.getJointCall(WeekToShow,agentId,SelectJointCalls,options);
    // this.props.actions.getCamapaignEfficiency(WeekToShow,agentId,SelectCampaigns,options);
    // this.props.actions.getSelfComments(WeekToShow,agentId,options);
    // this.props.actions.getManagerComments(WeekToShow,agentId,options);

    console.log("I have called the API");
  }

  componentDidMount() {
    const { history } = this.props;
    console.log(Auth.isLoggedIn());
    if(!Auth.isLoggedIn()){
      console.log("I am logged out: dashboard");
      history.push('/');
    }else{
      console.log("I am gonna call API");
      this.getAllDataApiCall();
    }
  }

  reloadPage() {
    let options = {
      afterSuccess: () => {},
      afterError: () => {}
    };

    this.getAllDataApiCall();
  }


  showAddAppDialog() {
    const dialogType = 'ADD_BRANCH';
    const dialogData = '';
    let dialogActions = {reloadPage: this.reloadPage};
    this.props.actions.openDialog(dialogType, dialogData, dialogActions);
  }

  handleLeadChange = (event)=>{
    this.setState({SelectLeads:event.target.value});

    let {WeekToShow} = this.state;
    let { id } = this.props;
    let SelectLeads = event.target.value;

    let options = {
      afterSuccess: () => {
        console.log('success');
      },
      afterError: () => {
        console.log('error');
      }
    };

    this.props.actions.getLeadsInfo(WeekToShow,id,SelectLeads,options);
  }

  handleJoinCallChange= (event)=>{
    this.setState({SelectJointCalls:event.target.value});

    let { WeekToShow } = this.state;

    let { id } = this.props;
    let SelectJointCalls = event.target.value;

    let options = {
      afterSuccess: () => {
        console.log('success');
      },
      afterError: () => {
        console.log('error');
      }
    };

    this.props.actions.getJointCall(WeekToShow,id,SelectJointCalls,options);
  }

  handleCampaignChange = (event)=>{
    this.setState({SelectCampaigns:event.target.value});

    let {WeekToShow} = this.state;

    let { id } = this.props;
    let SelectCampaigns = event.target.value;

    let options = {
      afterSuccess: () => {
        console.log('success');
      },
      afterError: () => {
        console.log('error');
      }
    };

    this.props.actions.getCamapaignEfficiency(WeekToShow,id,SelectCampaigns,options);
  }

  handleTrainingChange = (event)=>{
    this.setState({SelectTraining:event.target.value});
  }

  goBackWeek = ()=>{
    this.setState((prevState,props)=>{
      return {WeekToShow:moment().isoWeek()-1,WeekValue:"PreviousWeek"}
    });

    this.getAllDataApiCall();

  }

  goForwardWeek = ()=>{
    this.setState((prevState,props)=>{
      return {WeekToShow:moment().isoWeek(),WeekValue:"CurrentWeek"}
    });

    this.getAllDataApiCall();

  }

  showAddSelfCommentDialog = ()=>{
    const dialogType = 'ADD_SELF_COMMENT';
    const dialogData = {week:this.state.WeekToShow,agentId:Auth.getUserDataByKey('Id')};
    let dialogActions = {reloadPage: this.reloadPage};
    this.props.actions.openDialog(dialogType, dialogData, dialogActions);
  }

  showAddManagerCommentDialog = ()=>{
    const dialogType = 'ADD_MANAGER_COMMENT';
    const dialogData = {week:this.state.WeekToShow,managerId:Auth.getUserDataByKey('Id'),agentId:this.props.agentId};
    let dialogActions = {reloadPage: this.reloadPage};
    this.props.actions.openDialog(dialogType, dialogData, dialogActions);
  }

  viewLeadDetails = () =>{

    let { WeekToShow } = this.state;
    let { agentId } = this.props;
    let { SelectLeads } = this.state;
    const { history } = this.props;

    history.push('/lead/?agentId='+agentId+'&week='+WeekToShow+'&type='+SelectLeads);

  }

  render() {


    let { agentId } = this.props;


    let { SelectLeads, SelectJointCalls, SelectCampaigns, SelectTraining } = this.state;
    // let { agentStore, leadsStore, jointCallsStore,campaignEfficiencyStore ,managerCommentsStore,selfCommentsStore} = this.props;

    let arraObject=[1,2,3];

    let currentWeekNumber = moment().isoWeek();
    let PreviousWeekNumber = currentWeekNumber -1;

    let CurrentWeekMondayArray = String(moment().week(currentWeekNumber).weekday(1)).split(" ");
    let CurrentWeekSundayArray = String(moment().week(currentWeekNumber).weekday(7)).split(" ");
    let PreviousWeekMondayArray = String(moment().week(PreviousWeekNumber).weekday(1)).split(" ");
    let PreviousWeekSundayArray = String(moment().week(PreviousWeekNumber).weekday(7)).split(" ");

    let WeekToShowFrontendMondayArray = (this.state.WeekValue === "CurrentWeek") ? CurrentWeekMondayArray :PreviousWeekMondayArray;
    let WeekToShowFrontendSundayArray = (this.state.WeekValue === "CurrentWeek") ? CurrentWeekSundayArray :PreviousWeekSundayArray;

    let arrow_left_State = !(this.state.WeekValue === "CurrentWeek") ? true : false;
    let arrow_right_State = !(this.state.WeekValue === "PreviousWeek") ? true : false;

    return (
        <section  className="DASHBOARD_MAIN">
          <Grid container className="DASHBOARD_CONTAINER">
            <Grid item xs={12} sm={12} md={12} className="flex-row">
                  <Grid container className="DASHBOARD_UPPER_HEADER">
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <img src={PROFILE_LOGO} className="DASHBOARD_PROFILE_IMAGE" alt="Profile Icon"/>
                      <p style={{padding:"0px",margin:"0px",marginTop:"15px"}}><span className="DASHBOARD_PROFILE_NAME"><b>Ankush Wagh,</b> Direct Loyality</span></p>
                      <p className="DASHBOARD_PROFILE_DESIGNATION"> Financial Planning Manager</p>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <Grid container style={{marginLeft:"22px"}}>
                        <Grid item xs={1}>
                          <p className="DASHBOARD_COMMA"> “</p>
                        </Grid>
                        <Grid item xs={10} className="DASHBOARD_COMMITMENT_CONTAINER">
                          <Grid container>
                            <Grid item xs={12}>
                              <span className="DASHBOARD_MY_COMMITMENT" > MY COMMITMENT </span>
                            </Grid>
                            <Grid item xs={12} style={{marginTop:"-5px"}}>

                                { (Auth.getUserDataByKey('Id') === Number(agentId) )?
                                    <Button size="small" className="DASHBOARD_MANAGER_BUTON" onClick={this.showAddSelfCommentDialog}>
                                      <span><img src={ADD_COMMENT_IMAGE} style={{height:"7px",marginRight:"2px"}} alt="Add Comment" /></span>
                                      <span className="DASHBOARD_COMMENTS_BUTTON">Click to Add Comment</span>
                                    </Button>
                                    :
                                  <span className="DASHBOARD_COMMENTS_SELF" >{" "}</span>
                                }

                              <span className="DASHBOARD_COMMENTS_SELF" >   I will be meeting atleast 25 leads this week. Seeing 10 other potential leads too.</span>

                            </Grid>
                            <Grid item xs={12} style={{textAlign:"right",paddingRight:"7px"}}>
                              <Grid container>
                                <Grid item xs={12}>

                                  <span className="DASHBOARD_COMMENTS_MANAGER" >   I will be meeting atleast 25 leads this week. Seeing 10 other potential leads too.</span>

                                  { (Auth.getUserDataByKey('Role') !== "FLS" )?
                                      <Button size="small" className="DASHBOARD_MANAGER_BUTON" onClick={this.showAddManagerCommentDialog}>
                                        <span className="DASHBOARD_COMMENTS_BUTTON">Manager Comments </span>
                                        <span><img src={BACK_IMAGE} style={{height:"7px",marginLeft:"2px"}} alt="Back_Image"/></span>
                                      </Button>
                                      :
                                    <span className="DASHBOARD_COMMENTS_SELF" >{" "}</span>
                                  }

                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
            </Grid>

            <Grid item xs={12} className="DASHBOARD_MARGIN_TOP_DESIG" ></Grid>

            <Grid item xs={12} className="flex-row flex-justify-center">
                <Grid container>
                  <Grid item xs={12}>
                    <Typography align="center" style={{fontSize:"10px",color:"#58595b"}}>
                     Current Week
                   </Typography>
                  </Grid>
                  <Grid item xs={1} sm={4} className="flex-row flex-justify-end">
                    <IconButton onClick={this.goBackWeek} disabled={arrow_left_State} color="secondary" aria-label="Show More" style={{borderRadius:"50%",marginTop:"-10px"}}>
                      <Icon style={{fontSize:"34px"}}>arrow_left</Icon>
                    </IconButton>
                  </Grid>
                  <Grid item xs={10} sm={4} className="DASHBOARD_TIMINGS">
                    <Typography align="center" style={{fontSize:"18px",color:"#58595b",fontStyle:"italic"}}>
                      <span style={{padding:"0px",margin:"0px",fontSize:"18px",color:"#9b9b9b"}} >{WeekToShowFrontendMondayArray[0]} </span>
                      <span style={{padding:"0px",margin:"0px"}}> {WeekToShowFrontendMondayArray[1] + " "+WeekToShowFrontendMondayArray[2] + "-"}
                      </span> <span style={{padding:"0px",margin:"0px",fontSize:"18px",color:"#9b9b9b"}}>  {WeekToShowFrontendSundayArray[0]} </span>
                       <span style={{padding:"0px",margin:"0px"}} >{WeekToShowFrontendSundayArray[1]+" "+ WeekToShowFrontendSundayArray[2]}</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={1} sm={4}>
                    <IconButton onClick={this.goForwardWeek} disabled={arrow_right_State} color="secondary" aria-label="Show More" style={{borderRadius:"50%",marginTop:"-10px"}}>
                      <Icon style={{fontSize:"34px"}}>arrow_right</Icon>
                    </IconButton>
                  </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12} style={{marginBottom:"5px"}}></Grid>
            <Grid item  xs={12}>
              <Grid container>

                {/* left side */}
                  <Grid item xs={12} sm={6} style={{fontFamily: 'Roboto,sans-serif'}}>
                    <Grid container>
                      {/* Lead Box */}
                        <Grid item xs={12} style={{backgroundColor:"white",border:"1px solid #d8d8d8",marginBottom:"9px"}}>
                          <BoxHeader LeftHeading="My leads" RightHeading="Leads"/>
                          <Grid container style={{marginTop:"10px",marginBottom:"10px"}}>
                            <Grid item xs={12}>
                              <Grid container>
                                <Grid item xs={6} style={{fontSize:"14px",marginTop:"5px",marginLeft:"12px",color:"#444444"}}> Lead funnel ( Total : <span> 14 </span> )</Grid>
                                <Grid item xs={1} className="flex-row flex-justify-center" style={{marginTop:"-10px",fontSize:"40px",fontStyle:"italic",fontWeight:"bold",color:"#4a4a4a"}}> 14</Grid>
                                <Grid item xs={4} className="flex-row flex-justify-end">
                                  <FormControl>
                                    <Select
                                      disableUnderline={true}
                                      style={{color:"#444444",paddingTop:"2px",paddingLeft:"10px",fontWeight:"bold",fontSize:"10px",borderRadius:"4px",border:"solid 1px #e3e3e3"}}
                                      value={SelectLeads}
                                      onChange={this.handleLeadChange}
                                    >
                                      <MenuItem value={"weekly"}>WTD</MenuItem>
                                      <MenuItem value={"monthly"}>MTD</MenuItem>
                                      <MenuItem value={"quarterly"}>QTD</MenuItem>
                                    </Select>
                                  </FormControl>
                                </Grid>
                              </Grid>
                             </Grid>

                             <Grid item xs={1}></Grid>
                             <Grid item xs={10} className="flex-row flex-justify-center"style={{fontSize:"10px"}}>
                               <Grid container style={{color:"#727272",fontSize:"13px"}}>
                                 <Grid item xs={12} style={{marginBottom:"5px"}}></Grid>

                                 <Grid item xs={3} className="flex-row flex-justify-center" style={{textAlign:"center"}}> New</Grid>
                                 <Grid item xs={3} className="flex-row flex-justify-center" style={{textAlign:"center"}}> Follow-up</Grid>
                                 <Grid item xs={3} className="flex-row flex-justify-center" style={{textAlign:"center"}}> +ve Closure</Grid>
                                 <Grid item xs={3} className="flex-row flex-justify-center" style={{textAlign:"center"}}> -Ve Closure</Grid>

                                 <Grid item xs={3} className="flex-row flex-justify-center"> <hr style={{width:"100%",border:"1px solid #727272",backgroundColor:"#727272"}} /></Grid>
                                 <Grid item xs={3} className="flex-row flex-justify-center"> <hr style={{width:"100%",border:"1px solid #0072bc",backgroundColor:"#0072bc"}} /></Grid>
                                 <Grid item xs={3} className="flex-row flex-justify-center"> <hr style={{width:"100%",border:"1px solid #92278f",backgroundColor:"#92278f"}}/></Grid>
                                 <Grid item xs={3} className="flex-row flex-justify-center"> <hr style={{width:"100%",border:"1px solid #ed1c24",backgroundColor:"#ed1c24"}}/></Grid>

                                 <Grid item xs={3} className="flex-row flex-justify-center"> 7</Grid>
                                 <Grid item xs={3} className="flex-row flex-justify-center"> 3</Grid>
                                 <Grid item xs={3} className="flex-row flex-justify-center"> 2</Grid>
                                 <Grid item xs={3} className="flex-row flex-justify-center"> 2</Grid>

                                 <Grid item xs={12} style={{marginBottom:"5px"}}></Grid>
                                 <Grid item xs={4} className="flex-row flex-justify-center"> LAR</Grid>
                                 <Grid item xs={4} className="flex-row flex-justify-center"> MET %</Grid>
                                 <Grid item xs={4} className="flex-row flex-justify-center"> LCR %</Grid>

                                 <Grid item xs={4} className="flex-row flex-justify-center"> <hr style={{width:"100%",border:"1px solid #959595",backgroundColor:"#959595"}} /></Grid>
                                 <Grid item xs={4} className="flex-row flex-justify-center"> <hr style={{width:"100%",border:"1px solid #f7941d",backgroundColor:"#f7941d"}} /></Grid>
                                 <Grid item xs={4} className="flex-row flex-justify-center"> <hr style={{width:"100%",border:"1px solid #3cb878",backgroundColor:"#3cb878"}}/></Grid>

                                 <Grid item xs={4} className="flex-row flex-justify-center"> 43%</Grid>
                                 <Grid item xs={4} className="flex-row flex-justify-center"> 46%</Grid>
                                 <Grid item xs={4} className="flex-row flex-justify-center"> 15%</Grid>

                                 <Grid item xs={4} style={{marginBottom:"5px"}}> </Grid>
                                 <Grid item xs={12} className="flex-row flex-justify-center">
                                   <Button  style={{minHeight:"2px",height:"25px",padding:"0px",textTransform:"none",width:"80%",fontSize:"12px",fontWeight:"500",color:"white",backgroundColor:"#1095ff",borderRadius:"30px",marginBottom:"5px"}} onClick={this.viewLeadDetails}>  view lead details </Button>
                                 </Grid>
                               </Grid>
                             </Grid>
                             <Grid item xs={1}></Grid>

                            </Grid>
                          </Grid>

                        <Grid item xs={12} style={{backgroundColor:"white",border:"1px solid #d8d8d8",marginBottom:"9px"}}>
                          <BoxHeader LeftHeading="Manager Support" RightHeading="Joint Call"/>
                          <Grid container style={{marginTop:"10px",marginBottom:"10px"}}>
                            <Grid item xs={12}>
                              <Grid container>
                                <Grid item xs={6} className="flex-row flex-justify-center"></Grid>
                                <Grid item xs={1} className="flex-row flex-justify-center" style={{marginTop:"-10px",fontSize:"40px",fontStyle:"italic",fontWeight:"bold"}}> <span style={{color:"#71c093"}}>1</span> <span style={{color:"#4a4a4a"}}>/3</span></Grid>
                                <Grid item xs={5} className="flex-row flex-justify-end" style={{paddingRight:"14px"}}>
                                  <FormControl>
                                    <Select
                                      disableUnderline={true}
                                      style={{color:"#444444",paddingTop:"2px",paddingLeft:"10px",fontWeight:"bold",fontSize:"10px",borderRadius:"4px",border:"solid 1px #e3e3e3"}}
                                      value={SelectJointCalls}
                                      onChange={this.handleJoinCallChange}
                                    >
                                      <MenuItem value={"weekly"}>WTD</MenuItem>
                                      <MenuItem value={"monthly"}>MTD</MenuItem>
                                      <MenuItem value={"quarterly"}>QTD</MenuItem>
                                    </Select>
                                  </FormControl>
                                </Grid>
                              </Grid>
                             </Grid>

                             <Grid item xs={1}></Grid>
                             <Grid item xs={10} className="flex-row flex-justify-center"style={{fontSize:"10px",marginBottom:"4px"}}>
                               <Grid container style={{color:"#727272",fontSize:"13px"}}>
                                 <Grid item xs={12} style={{marginBottom:"5px"}} ></Grid>

                                 <Grid item xs={3} className="flex-row flex-justify-center" style={{textAlign:"center"}}> New</Grid>
                                 <Grid item xs={3} className="flex-row flex-justify-center" style={{textAlign:"center"}}> Follow-up</Grid>
                                 <Grid item xs={3} className="flex-row flex-justify-center" style={{textAlign:"center"}}> +ve Closure</Grid>
                                 <Grid item xs={3} className="flex-row flex-justify-center" style={{textAlign:"center"}}> -Ve Closure</Grid>

                                 <Grid item xs={3} className="flex-row flex-justify-center"> <hr style={{width:"100%",border:"1px solid #727272",backgroundColor:"#727272"}} /></Grid>
                                 <Grid item xs={3} className="flex-row flex-justify-center"> <hr style={{width:"100%",border:"1px solid #0072bc",backgroundColor:"#0072bc"}} /></Grid>
                                 <Grid item xs={3} className="flex-row flex-justify-center"> <hr style={{width:"100%",border:"1px solid #92278f",backgroundColor:"#92278f"}}/></Grid>
                                 <Grid item xs={3} className="flex-row flex-justify-center"> <hr style={{width:"100%",border:"1px solid #92278f",backgroundColor:"#ed1c24"}}/></Grid>

                                 <Grid item xs={3} className="flex-row flex-justify-center"> 7</Grid>
                                 <Grid item xs={3} className="flex-row flex-justify-center"> 3</Grid>
                                 <Grid item xs={3} className="flex-row flex-justify-center"> 2</Grid>
                                 <Grid item xs={3} className="flex-row flex-justify-center"> 2</Grid>


                               </Grid>
                             </Grid>
                             <Grid item xs={1}></Grid>

                            </Grid>
                        </Grid>

                        <Grid item xs={12} style={{backgroundColor:"white",height:"200px",overflow:"scroll",border:"1px solid #d8d8d8",marginBottom:"9px"}}>
                          <BoxHeader LeftHeading="Campaign Efficiency" RightHeading="Leads"/>
                            <Grid container style={{marginTop:"10px",marginBottom:"10px"}}>
                              <Grid item xs={12} className="flex-row flex-justify-end" style={{paddingRight:"12px"}}>
                                  <FormControl>
                                    <Select
                                      disableUnderline={true}
                                      style={{color:"#444444",paddingTop:"2px",paddingLeft:"10px",fontWeight:"bold",fontSize:"10px",borderRadius:"4px",border:"solid 1px #e3e3e3"}}
                                      value={SelectCampaigns}
                                      onChange={this.handleCampaignChange}
                                    >
                                      <MenuItem value={"weekly"}>WTD</MenuItem>
                                      <MenuItem value={"monthly"}>MTD</MenuItem>
                                      <MenuItem value={"quarterly"}>QTD</MenuItem>
                                    </Select>
                                  </FormControl>
                              </Grid>


                               {
                                 arraObject.map((data,index)=>
                                 <Grid container key={index}>
                                   <Grid item xs={12} style={{marginTop:"10px"}}>
                                     <Grid container>
                                       <Grid item xs={7} style={{paddingTop:"8px",fontSize:"14px",marginTop:"5px",paddingLeft:"12px",color:"#444444"}}> Campaign <span> 1 </span> (Total Leads: <span> 14 </span> )</Grid>
                                       <Grid item xs={2} className="flex-row flex-justify-center" style={{marginTop:"-10px",fontSize:"40px",fontStyle:"italic",fontWeight:"bold",color:"#4a4a4a"}}> 14</Grid>
                                     </Grid>
                                   </Grid>
                                   <Grid item xs={1}></Grid>
                                   <Grid item xs={10} className="flex-row flex-justify-center"style={{fontSize:"10px"}}>
                                     <Grid container style={{color:"#727272",fontSize:"13px"}}>
                                       <Grid item xs={12} style={{marginBottom:"5px"}}></Grid>

                                       <Grid item xs={3} className="flex-row flex-justify-center" style={{textAlign:"center"}}> New</Grid>
                                       <Grid item xs={3} className="flex-row flex-justify-center" style={{textAlign:"center"}}> Follow-up</Grid>
                                       <Grid item xs={3} className="flex-row flex-justify-center" style={{textAlign:"center"}}> +ve Closure</Grid>
                                       <Grid item xs={3} className="flex-row flex-justify-center" style={{textAlign:"center"}}> -Ve Closure</Grid>

                                       <Grid item xs={3} className="flex-row flex-justify-center"> <hr style={{width:"100%",border:"1px solid #727272",backgroundColor:"#727272"}} /></Grid>
                                       <Grid item xs={3} className="flex-row flex-justify-center"> <hr style={{width:"100%",border:"1px solid #0072bc",backgroundColor:"#0072bc"}} /></Grid>
                                       <Grid item xs={3} className="flex-row flex-justify-center"> <hr style={{width:"100%",border:"1px solid #92278f",backgroundColor:"#92278f"}}/></Grid>
                                       <Grid item xs={3} className="flex-row flex-justify-center"> <hr style={{width:"100%",border:"1px solid #ed1c24",backgroundColor:"#ed1c24"}}/></Grid>

                                       <Grid item xs={3} className="flex-row flex-justify-center"> 7</Grid>
                                       <Grid item xs={3} className="flex-row flex-justify-center"> 3</Grid>
                                       <Grid item xs={3} className="flex-row flex-justify-center"> 2</Grid>
                                       <Grid item xs={3} className="flex-row flex-justify-center"> 2</Grid>

                                     </Grid>
                                   </Grid>
                                   <Grid item xs={1}></Grid>
                                 </Grid>
                                 )
                               }
                              </Grid>

                        </Grid>


                        <Grid item xs={12} style={{backgroundColor:"white",border:"1px solid #d8d8d8",marginBottom:"9px"}}>
                          <BoxHeader LeftHeading="Training" RightHeading=""/>
                          <Grid container style={{marginTop:"10px",marginBottom:"10px"}}>
                            <Grid item xs={12}>
                              <Grid container>
                                <Grid item xs={12} className="flex-row flex-justify-end" style={{paddingRight:"14px"}}>
                                  <FormControl>
                                    <Select
                                      disableUnderline={true}
                                      style={{color:"#444444",paddingTop:"2px",paddingLeft:"10px",fontWeight:"bold",fontSize:"10px",borderRadius:"4px",border:"solid 1px #e3e3e3"}}
                                      value={SelectTraining}
                                      onChange={this.handleTrainingChange}
                                    >
                                      <MenuItem value={"weekly"}>WTD</MenuItem>
                                      <MenuItem value={"monthly"}>MTD</MenuItem>
                                      <MenuItem value={"quarterly"}>QTD</MenuItem>
                                    </Select>
                                  </FormControl>
                                </Grid>
                              </Grid>
                             </Grid>

                             <Grid item xs={1}></Grid>
                             <Grid item xs={10} className="flex-row flex-justify-center" style={{fontSize:"10px"}}>
                               <Grid container style={{color:"#727272",fontSize:"13px"}}>
                                 <Grid item xs={12} style={{marginBottom:"5px"}}></Grid>

                                 <Grid item xs={3} className="flex-row flex-justify-center"> PRODUCT</Grid>
                                 <Grid item xs={3} className="flex-row flex-justify-center"> TECH</Grid>
                                 <Grid item xs={3} className="flex-row flex-justify-center"> PROCESS</Grid>
                                 <Grid item xs={3} className="flex-row flex-justify-center"> OTHERS</Grid>

                                 <Grid item xs={3} className="flex-row flex-justify-center"> <hr style={{width:"100%",border:"1px solid #727272",backgroundColor:"#727272"}} /></Grid>
                                 <Grid item xs={3} className="flex-row flex-justify-center"> <hr style={{width:"100%",border:"1px solid #0072bc",backgroundColor:"#0072bc"}} /></Grid>
                                 <Grid item xs={3} className="flex-row flex-justify-center"> <hr style={{width:"100%",border:"1px solid #92278f",backgroundColor:"#92278f"}}/></Grid>
                                 <Grid item xs={3} className="flex-row flex-justify-center"> <hr style={{width:"100%",border:"1px solid #ed1c24",backgroundColor:"#ed1c24"}}/></Grid>

                                 <Grid item xs={3} className="flex-row flex-justify-center"> 7</Grid>
                                 <Grid item xs={3} className="flex-row flex-justify-center"> 2</Grid>
                                 <Grid item xs={3} className="flex-row flex-justify-center"> 1</Grid>
                                 <Grid item xs={3} className="flex-row flex-justify-center"> 0</Grid>
                               </Grid>
                             </Grid>
                             <Grid item xs={1}></Grid>
                             <Grid item xs={5} style={{fontSize:"14px",color:"#444444",fontStyle:"italic",paddingLeft:"12px",marginBottom:"2px"}} >Focus Products</Grid><Grid item xs={7}></Grid>
                             <Grid item xs={4} className="flex-row flex-justify-center" style={{color:"#444444",fontStyle:"italic",marginBottom:"2px",marginTop:"2px"}} > C2P 3D</Grid>
                             <Grid item xs={4} className="flex-row flex-justify-center" style={{color:"#444444",fontStyle:"italic"}} > Sanchay</Grid>
                             <Grid item xs={4} className="flex-row flex-justify-center" style={{color:"#444444",fontStyle:"italic"}} > PGP</Grid>
                             <Grid item xs={4} className="flex-row flex-justify-center" style={{color:"#0072bc",marginBottom:"8px"}}> Beginner</Grid>
                             <Grid item xs={4} className="flex-row flex-justify-center" style={{color:"#ff9000"}}> Intermediate</Grid>
                             <Grid item xs={4} className="flex-row flex-justify-center" style={{color:"#3cb878"}}> Professional</Grid>
                            </Grid>
                        </Grid>



                    </Grid>
                  </Grid>

                {/* Right Side */}
                  <Grid item xs={6}>

                  </Grid>
              </Grid>

            </Grid>
          </Grid>
        </section>
    );
  }
}

function mapStateToProps(state) {
  return {

    agentStore: !!state.dashboardStore.agentStore ? state.dashboardStore.agentStore : {},

    leadsStore: !!state.dashboardStore.leadsStore ? state.dashboardStore.leadsStore : {},
    jointCallsStore: !!state.dashboardStore.jointCallsStore ? state.dashboardStore.jointCallsStore : {},
    campaignEfficiencyStore: !!state.dashboardStore.campaignEfficiencyStore ? state.dashboardStore.campaignEfficiencyStore : [],

    selfCommentsStore: !!state.dashboardStore.selfCommentsStore ? state.dashboardStore.selfCommentsStore : {},
    managerCommentsStore: !!state.dashboardStore.managerCommentsStore ? state.dashboardStore.managerCommentsStore : {},

  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
    openDialog: (dialogType, data, dataActions) => dispatch(DialogAction.open(dialogType, data, dataActions)),
    openSnackbar: (data) => dispatch(SnackbarAction.show(data)),

    getAgentInfo: (agentId,options) =>dispatch(DashboardAction.getAgentInfo(agentId,options)),

    getLeadsInfo: (week,agentId,timeline,options) =>dispatch(DashboardAction.getLeadsInfo(week,agentId,timeline,options)),
    getJointCall: (week,agentId,timeline,options) =>dispatch(DashboardAction.getJointCall(week,agentId,timeline,options)),
    getCamapaignEfficiency: (week,agentId,timeline,options) =>dispatch(DashboardAction.getCamapaignEfficiency(week,agentId,timeline,options)),

    getSelfComments: (week,agentId,options) =>dispatch(DashboardAction.getSelfComments(week,agentId,options)),
    getManagerComments: (week,agentId,options) =>dispatch(DashboardAction.getManagerComments(week,agentId,options)),

    }
  }
}

export default addUrlProps({ urlPropsQueryConfig })(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
