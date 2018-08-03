import React, { Component } from 'react';
import { addUrlProps, UrlQueryParamTypes } from 'react-url-query';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import { BoxHeader } from '../../components';
import { DialogAction, SnackbarAction, DashboardAction } from '../../actions';
import {  Auth } from '../../helpers';
import { BACK_IMAGE,ADD_COMMENT_IMAGE,PROFILE_LOGO, LEFT_QUOTE, RIGHT_QUTOE} from '../../constants';
import Typography from 'material-ui/Typography';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import Select from 'material-ui/Select';
import {Fade} from 'material-ui/transitions';

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
      WeekValue:"CurrentWeek",
      TimelineFade:true
    };
    this.reloadPage = this.reloadPage.bind(this);
  }

  getAllDataApiCall = (weekNumber)=>{

    // week number
    // let { WeekToShow } = this.state;
    console.log("WeekNumber : ",weekNumber)

    // // agent ID
    let { agentId } = this.props;
    // // timeline
    let { SelectLeads, SelectJointCalls, SelectCampaigns, SelectTraining } = this.state;

    let options = {
      afterSuccess: () => {
        console.log('success');
      },
      afterError: () => {
        console.log('error');
      }
    };

    this.props.actions.getAgentInfo(agentId,options);
    this.props.actions.getLeadsInfo(weekNumber,agentId,SelectLeads,options);
    this.props.actions.getJointCall(weekNumber,agentId,SelectJointCalls,options);
    this.props.actions.getCamapaignEfficiency(weekNumber,agentId,SelectCampaigns,options);
    this.props.actions.getCommitments(weekNumber,agentId,options);

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
      this.getAllDataApiCall(moment().isoWeek());
    }
  }

  reloadPage() {
    let options = {
      afterSuccess: () => {},
      afterError: () => {}
    };

    this.getAllDataApiCall(moment().isoWeek());
  }


  showAddAppDialog() {
    const dialogType = 'ADD_BRANCH';
    const dialogData = '';
    let dialogActions = {reloadPage: this.reloadPage};
    this.props.actions.openDialog(dialogType, dialogData, dialogActions);
  }

  handleSelectToggleChange = (event)=>{

    let StateKey = event.target.name;

    console.log(event.target)

    let {WeekToShow} = this.state;
    let { agentId } = this.props;
    let SelectedTimeline = event.target.value;

    let options = {
      afterSuccess: () => {
        console.log('success');
      },
      afterError: () => {
        console.log('error');
      }
    };

    const {name} = event.target;
    console.log(name);

    if(name === "SelectLeads"){
      this.setState({SelectLeads:SelectedTimeline});
      this.props.actions.getLeadsInfo(WeekToShow,agentId,SelectedTimeline,options);
    }else
    if(name === "SelectJointCalls"){
      this.setState({SelectJointCalls:SelectedTimeline});
      this.props.actions.getJointCall(WeekToShow,agentId,SelectedTimeline,options);
    }else
    if(name === "SelectCampaigns"){
      this.setState({SelectCampaigns:SelectedTimeline});
      this.props.actions.getCamapaignEfficiency(WeekToShow,agentId,SelectedTimeline,options);
    }
  }

  goBackWeek = ()=>{

    this.props.actions.deleteStore();
    this.setState({TimelineFade:false});
    this.setState({WeekToShow:moment().isoWeek()-1,WeekValue:"PreviousWeek"});
    setTimeout(()=>{
      this.setState({TimelineFade:true});
    },0);
    this.getAllDataApiCall(moment().isoWeek()-1);
  }

  goForwardWeek = ()=>{

    this.props.actions.deleteStore();
    this.setState({TimelineFade:false});
    this.setState({WeekToShow:moment().isoWeek(),WeekValue:"CurrentWeek"});
    setTimeout(()=>{
      this.setState({TimelineFade:true});
    },0);
    this.getAllDataApiCall(moment().isoWeek());
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

  showFunctionStore = (SampleObject)=>{
    let value;

    (Object.keys(SampleObject).length > 0) ?
    value=1:
    value=0

    return value;
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
    let { agentStore, leadsStore,commitmentsStore,jointCallsStore,campaignEfficiencyStore } = this.props;

    //  for agent Info
    let showAgentInfo = this.showFunctionStore(agentStore);
    let { AgentNum,EmployeeName,AgentChannel,AgentDesignation } = agentStore;

    //  for Lead Info
    let showLeadStore = this.showFunctionStore(leadsStore);
    let { Lead_Total,Lead_New,Lead_PositiveClosure,Lead_FollowUp,Lead_NegativeClosure,Lead_Invalid,Lead_LCR,Lead_LAR,Lead_MET } = leadsStore;
    let Lead_Actual_LAR_Percent = Math.round( Number(Lead_LAR)*100);
    let Lead_Actual_LCR_Percent = Math.round( Number(Lead_LCR)*100);
    let Lead_Actual_MET_Percent = Math.round( Number(Lead_MET)*100);

    // for commitements
    let showcommitmentsStore = this.showFunctionStore(commitmentsStore);
    let { CommentManagerComment,CommentSelfComment } = commitmentsStore;

    console.log(CommentManagerComment,CommentSelfComment);

    //  for Joint Call
    console.log(jointCallsStore);
    let showjointCallsStore = this.showFunctionStore(jointCallsStore);
    let { JointCallTarget,JointCallActual,JointCallPositiveClosure } = jointCallsStore;
    let ratioJointCall = (!JointCallTarget) ? 0:1;
    console.log(JointCallTarget,JointCallActual,JointCallPositiveClosure);

    // for campaign Efficiency
    // campaignEfficiencyStore=[];
    // showjointCallsStore=1;
    // showLeadStore=1;
    // showAgentInfo=1;


    let wholeCampaginEfficiency = (campaignEfficiencyStore === undefined) ? 1:0;

    let showcampaignEfficiencyStore=0;
    if(!wholeCampaginEfficiency){
      showcampaignEfficiencyStore = (campaignEfficiencyStore.length>0)?1:0;
    }

    console.log("Agent Store : ",agentStore);
    console.log("Leads Store : ",leadsStore);

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
                    {
                      (showAgentInfo) ?
                        <Grid item xs={12} sm={6} md={6} lg={6} className="WHOLE_DESIGNATION_BOX">
                          {
                            (!!AgentNum)?
                              <span>
                                <img src={PROFILE_LOGO} className="DASHBOARD_PROFILE_IMAGE" alt="Profile Icon"/>
                                <p style={{padding:"0px",margin:"0px",marginTop:"15px"}}>
                                  <span className="DASHBOARD_PROFILE_NAME">
                                    <b>{EmployeeName+","}</b> {AgentChannel}
                                  </span>
                                </p>
                                <p className="DASHBOARD_PROFILE_DESIGNATION">{AgentDesignation}</p>
                              </span>
                            :
                              <Grid container>
                                <Grid item xs={12} className="flex-row flex-justify-center">
                                  <span>Unable to Fetch Agent Info</span>
                                </Grid>
                              </Grid>
                          }
                        </Grid>
                      :
                      <span></span>
                    }

                    {
                        (showcommitmentsStore) ?
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                          <Grid container style={{marginLeft:"17px"}}>
                            <Grid item xs={1}>
                              {
                                (!!commitmentsStore.CommentsAgentID && !!CommentSelfComment )?
                                  <img src={LEFT_QUOTE} style={{height:"25px"}}alt="My Commitment"/>
                                :
                                <span></span>

                              }
                            </Grid>
                            <Grid item xs={10} className="DASHBOARD_COMMITMENT_CONTAINER">
                              <Grid container>
                                <Grid item xs={12}>
                                  <span className="DASHBOARD_MY_COMMITMENT" > MY COMMITMENT </span>
                                </Grid>
                                <Grid item xs={12} style={{marginTop:"-5px"}}>
                                    {
                                      (!!commitmentsStore.CommentsAgentID)?
                                        (!!CommentSelfComment)?
                                          <span className="DASHBOARD_COMMENTS_SELF" >{CommentSelfComment}</span>
                                        :
                                        (Auth.getUserDataByKey('Id') === Number(agentId)) ?
                                            <Button size="small" className="DASHBOARD_MANAGER_BUTON" onClick={this.showAddSelfCommentDialog}>
                                              <span><img src={ADD_COMMENT_IMAGE} style={{height:"7px",marginRight:"2px"}} alt="Add Comment" /></span>
                                              <span className="DASHBOARD_COMMENTS_BUTTON">Click to Add Comment</span>
                                            </Button>
                                        :
                                        <span className="DASHBOARD_COMMENTS_SELF" >{" "}</span>
                                      :
                                      <span className="DASHBOARD_COMMENTS_SELF" ></span>
                                    }
                                </Grid>
                                <Grid item xs={12} style={{textAlign:"right",paddingRight:"7px"}}>
                                  <Grid container>
                                    <Grid item xs={12}>
                                      {
                                        (!!commitmentsStore.CommentsAgentID)?
                                          (!!CommentManagerComment)?
                                            <Grid container>
                                              <Grid item xs={11} className="hey" >
                                                <span className="DASHBOARD_COMMENTS_MANAGER" >
                                                  {CommentManagerComment}
                                                </span>
                                              </Grid>
                                              <Grid item xs={1}>
                                                <img src={RIGHT_QUTOE} style={{height:"25px",marginTop:"15px",marginLeft:"5px"}} alt="My Commitment"/>
                                              </Grid>
                                            </Grid>
                                          :
                                          (Auth.getUserDataByKey('Role') === "SLL" || Auth.getUserDataByKey('Role') === "FLL") ?
                                            <Button size="small" className="DASHBOARD_MANAGER_BUTON" onClick={this.showAddManagerCommentDialog}>
                                              <span className="DASHBOARD_COMMENTS_BUTTON">Click to Add Manager Comments </span>
                                              <span><img src={BACK_IMAGE} style={{height:"7px",marginLeft:"2px"}} alt="Back_Image"/></span>
                                            </Button>
                                          :
                                          <span className="DASHBOARD_COMMENTS_SELF" >{" "}</span>
                                        :
                                        <span className="DASHBOARD_COMMENTS_MANAGER" ></span>
                                      }
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item xs={1}>
                            </Grid>
                          </Grid>
                        </Grid>
                        :
                        <span/>
                    }
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
                  <Grid item xs={2} sm={4} className="flex-row flex-justify-end">
                    <IconButton onClick={this.goBackWeek} disabled={arrow_left_State} color="secondary" aria-label="Show More" style={{borderRadius:"50%",marginTop:"-10px"}}>
                      <Icon style={{fontSize:"34px"}}>arrow_left</Icon>
                    </IconButton>
                  </Grid>
                  <Grid item xs={8} sm={4} className="DASHBOARD_TIMINGS">
                    <Fade in={this.state.TimelineFade}>
                      <Typography align="center" style={{fontSize:"18px",color:"#58595b",fontStyle:"italic"}}>
                        <span style={{padding:"0px",margin:"0px",fontSize:"18px",color:"#9b9b9b"}} >{WeekToShowFrontendMondayArray[0]} </span>
                        <span style={{padding:"0px",margin:"0px"}}> {WeekToShowFrontendMondayArray[1] + " "+WeekToShowFrontendMondayArray[2] + "-"}
                        </span> <span style={{padding:"0px",margin:"0px",fontSize:"18px",color:"#9b9b9b"}}>  {WeekToShowFrontendSundayArray[0]} </span>
                         <span style={{padding:"0px",margin:"0px"}} >{WeekToShowFrontendSundayArray[1]+" "+ WeekToShowFrontendSundayArray[2]}</span>
                      </Typography>
                    </Fade>
                  </Grid>
                  <Grid item xs={2} sm={4}>
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

                        {
                          (showLeadStore) ?

                          <Fade in={this.state.TimelineFade}>

                          <Grid item xs={12} style={{backgroundColor:"white",border:"1px solid #d8d8d8",marginBottom:"9px"}}>
                            <BoxHeader LeftHeading="My leads" RightHeading="Leads"/>
                            <Grid container style={{marginTop:"10px",marginBottom:"10px"}}>
                              <Grid item xs={12}>
                                <Grid container>
                                  <Grid item xs={6} style={{fontSize:"14px",marginTop:"5px",marginLeft:"12px",color:"#444444"}}> Lead funnel ( Total : <span> {Lead_Total} </span> )</Grid>
                                  <Grid item xs={1} className="flex-row flex-justify-center" style={{marginTop:"-10px",fontSize:"40px",fontStyle:"italic",fontWeight:"bold",color:"#4a4a4a"}}> {Lead_Total}</Grid>
                                  <Grid item xs={4} className="flex-row flex-justify-end">
                                    <FormControl>
                                      <Select
                                        name="SelectLeads"
                                        disableUnderline={true}
                                        style={{color:"#444444",paddingTop:"2px",paddingLeft:"10px",fontWeight:"bold",fontSize:"10px",borderRadius:"4px",border:"solid 1px #e3e3e3"}}
                                        value={SelectLeads}
                                        onChange={this.handleSelectToggleChange}
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

                                   <Grid item xs={3} className="flex-row flex-justify-center"> {Lead_New}</Grid>
                                   <Grid item xs={3} className="flex-row flex-justify-center"> {Lead_FollowUp}</Grid>
                                   <Grid item xs={3} className="flex-row flex-justify-center"> {Lead_PositiveClosure}</Grid>
                                   <Grid item xs={3} className="flex-row flex-justify-center"> {Lead_NegativeClosure}</Grid>

                                   <Grid item xs={12} style={{marginBottom:"5px"}}></Grid>
                                   <Grid item xs={4} className="flex-row flex-justify-center"> LAR %</Grid>
                                   <Grid item xs={4} className="flex-row flex-justify-center"> MET %</Grid>
                                   <Grid item xs={4} className="flex-row flex-justify-center"> LCR %</Grid>

                                   <Grid item xs={4} className="flex-row flex-justify-center"> <hr style={{width:"100%",border:"1px solid #959595",backgroundColor:"#959595"}} /></Grid>
                                   <Grid item xs={4} className="flex-row flex-justify-center"> <hr style={{width:"100%",border:"1px solid #f7941d",backgroundColor:"#f7941d"}} /></Grid>
                                   <Grid item xs={4} className="flex-row flex-justify-center"> <hr style={{width:"100%",border:"1px solid #3cb878",backgroundColor:"#3cb878"}}/></Grid>

                                   <Grid item xs={4} className="flex-row flex-justify-center"> {Lead_Actual_LAR_Percent+"%"}</Grid>
                                   <Grid item xs={4} className="flex-row flex-justify-center"> {Lead_Actual_MET_Percent+"%"}</Grid>
                                   <Grid item xs={4} className="flex-row flex-justify-center"> {Lead_Actual_LCR_Percent+"%"}</Grid>

                                   <Grid item xs={4} style={{marginBottom:"5px"}}> </Grid>
                                   <Grid item xs={12} className="flex-row flex-justify-center">
                                     <Button  style={{minHeight:"2px",height:"25px",padding:"0px",textTransform:"none",width:"80%",fontSize:"12px",fontWeight:"500",color:"white",backgroundColor:"#1095ff",borderRadius:"30px",marginBottom:"5px"}} onClick={this.viewLeadDetails}>  view lead details </Button>
                                   </Grid>
                                 </Grid>
                               </Grid>
                               <Grid item xs={1}></Grid>

                              </Grid>
                            </Grid>
                          </Fade>
                          :
                          <span></span>
                        }

                        {
                          (showjointCallsStore) ?
                          <Fade in={this.state.TimelineFade}>
                            <Grid item xs={12} style={{backgroundColor:"white",border:"1px solid #d8d8d8",marginBottom:"9px"}}>
                              <BoxHeader LeftHeading="Manager Support" RightHeading="Joint Call"/>
                              <Grid container style={{marginTop:"10px",marginBottom:"10px"}}>
                                <Grid item xs={12}>
                                  <Grid container>
                                    <Grid item xs={6} className="flex-row flex-justify-center"></Grid>
                                    <Grid item xs={1} className="flex-row flex-justify-center" style={{marginTop:"-10px",fontSize:"40px",fontStyle:"italic",fontWeight:"bold"}}>
                                      {
                                          <span>
                                            <span style={{color:"#71c093"}}>{JointCallPositiveClosure}</span>
                                            <span style={{color:"#4a4a4a"}}>{"/"+JointCallTarget}</span>
                                          </span>
                                      }
                                    </Grid>
                                    <Grid item xs={5} className="flex-row flex-justify-end" style={{paddingRight:"14px"}}>
                                      <FormControl>
                                        <Select
                                          name="SelectJointCalls"
                                          disableUnderline={true}
                                          style={{color:"#444444",paddingTop:"2px",paddingLeft:"10px",fontWeight:"bold",fontSize:"10px",borderRadius:"4px",border:"solid 1px #e3e3e3"}}
                                          value={SelectJointCalls}
                                          onChange={this.handleSelectToggleChange}
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

                                     <Grid item xs={4} className="flex-row flex-justify-center" style={{textAlign:"center"}}> Target</Grid>
                                     <Grid item xs={4} className="flex-row flex-justify-center" style={{textAlign:"center"}}> Actual</Grid>
                                     <Grid item xs={4} className="flex-row flex-justify-center" style={{textAlign:"center"}}> +ve Closure</Grid>

                                     <Grid item xs={4} className="flex-row flex-justify-center"> <hr style={{width:"100%",border:"1px solid #727272",backgroundColor:"#727272"}} /></Grid>
                                     <Grid item xs={4} className="flex-row flex-justify-center"> <hr style={{width:"100%",border:"1px solid #0072bc",backgroundColor:"#0072bc"}} /></Grid>
                                     <Grid item xs={4} className="flex-row flex-justify-center"> <hr style={{width:"100%",border:"1px solid #92278f",backgroundColor:"#92278f"}}/></Grid>

                                     <Grid item xs={4} className="flex-row flex-justify-center">{JointCallTarget}</Grid>
                                     <Grid item xs={4} className="flex-row flex-justify-center">{JointCallActual}</Grid>
                                     <Grid item xs={4} className="flex-row flex-justify-center">{JointCallPositiveClosure}</Grid>

                                   </Grid>
                                 </Grid>
                                 <Grid item xs={1}></Grid>

                                </Grid>
                            </Grid>
                          </Fade>
                          :
                          <span></span>

                        }

                        {
                          (!wholeCampaginEfficiency) ?

                          <Fade in={this.state.TimelineFade}>
                            <Grid item xs={12} style={{position:"relative",backgroundColor:"white",height:"200px",overflow:"scroll",border:"1px solid #d8d8d8",marginBottom:"9px"}}>
                              <BoxHeader LeftHeading="Campaign Efficiency" RightHeading="Leads"/>
                                <Grid container style={{marginTop:"10px",marginBottom:"10px"}}>
                                  <Grid item xs={12} className="flex-row flex-justify-end" style={{paddingRight:"12px"}}>
                                      <FormControl>
                                        <Select
                                          name="SelectCampaigns"
                                          disableUnderline={true}
                                          style={{color:"#444444",paddingTop:"2px",paddingLeft:"10px",fontWeight:"bold",fontSize:"10px",borderRadius:"4px",border:"solid 1px #e3e3e3"}}
                                          value={SelectCampaigns}
                                          onChange={this.handleSelectToggleChange}
                                        >
                                          <MenuItem value={"weekly"}>WTD</MenuItem>
                                          <MenuItem value={"monthly"}>MTD</MenuItem>
                                          <MenuItem value={"quarterly"}>QTD</MenuItem>
                                        </Select>
                                      </FormControl>
                                  </Grid>

                                   {
                                     (showcampaignEfficiencyStore)?
                                     campaignEfficiencyStore.map((data,index)=>
                                     <Grid container key={index}>
                                       <Grid item xs={12} style={{marginTop:"10px"}}>
                                         <Grid container>
                                           <Grid item xs={7} style={{paddingTop:"8px",fontSize:"14px",marginTop:"5px",paddingLeft:"12px",color:"#444444"}}> <span style={{fontWeight:"800"}}> {data.CampaignName} </span> (Total Leads: <span> {data.CampaignEfficienyTotalLeads} </span> )</Grid>
                                           <Grid item xs={2} className="flex-row flex-justify-center" style={{marginTop:"-10px",fontSize:"40px",fontStyle:"italic",fontWeight:"bold",color:"#4a4a4a"}}> {data.CampaignEfficienyTotalLeads}</Grid>
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

                                           <Grid item xs={3} className="flex-row flex-justify-center"> {data.CampaignEfficienyNew} </Grid>
                                           <Grid item xs={3} className="flex-row flex-justify-center"> {data.CampaignEfficienyFollowUp} </Grid>
                                           <Grid item xs={3} className="flex-row flex-justify-center"> {data.CampaignEfficienyPositiveClosure + data.CampaignEfficienySystemPositiveClosure} </Grid>
                                           <Grid item xs={3} className="flex-row flex-justify-center"> {data.CampaignEfficienyNegativeClosure} </Grid>

                                         </Grid>
                                       </Grid>
                                       <Grid item xs={1}></Grid>
                                     </Grid>
                                     )
                                     :
                                     <Grid container>
                                       <Grid item xs={12} className="flex-row flex-justify-center">
                                          <br/><br/>
                                       </Grid>
                                       <Grid item xs={12} className="flex-row flex-justify-center">
                                          <span>No Campaigns yet</span>
                                       </Grid>

                                     </Grid>

                                   }

                                  </Grid>

                            </Grid>

                          </Fade>
                          :
                          <span></span>
                        }

                        {/* Training Card it will be used later therefore commenting */}

                        {/* <Grid item xs={12} style={{backgroundColor:"white",border:"1px solid #d8d8d8",marginBottom:"9px"}}>
                          <BoxHeader LeftHeading="Training" RightHeading=""/>
                          <Grid container style={{marginTop:"10px",marginBottom:"10px"}}>
                            <Grid item xs={12}>
                              <Grid container>
                                <Grid item xs={12} className="flex-row flex-justify-end" style={{paddingRight:"14px"}}>
                                  <FormControl>
                                    <Select
                                      name="SelectTraining"
                                      disableUnderline={true}
                                      style={{color:"#444444",paddingTop:"2px",paddingLeft:"10px",fontWeight:"bold",fontSize:"10px",borderRadius:"4px",border:"solid 1px #e3e3e3"}}
                                      value={SelectTraining}
                                      onChange={this.handleSelectToggleChange}
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
                        </Grid> */}



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
    campaignEfficiencyStore: !!state.dashboardStore.campaignEfficiencyStore ? state.dashboardStore.campaignEfficiencyStore : undefined,

    commitmentsStore: !!state.dashboardStore.commitmentsStore ? state.dashboardStore.commitmentsStore : {},

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

    getCommitments: (week,agentId,options) =>dispatch(DashboardAction.getCommitments(week,agentId,options)),
    deleteStore: ()=>dispatch(DashboardAction.deleteStore())
    }
  }
}

export default addUrlProps({ urlPropsQueryConfig })(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
