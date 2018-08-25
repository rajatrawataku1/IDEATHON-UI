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
import SwipeableViews from 'react-swipeable-views';
import AppBar from 'material-ui/AppBar';
import { Tabs,Tab } from 'material-ui/Tabs';
import '../../CSS/dashboard.css';
import moment from 'moment';
import {CardActions, CardContent, CardHeader,CardMedia} from 'material-ui/Card';
import Card from  'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import MoreVertIcon from 'material-ui/MoreVert';


const urlPropsQueryConfig = {
  agentId: { type: UrlQueryParamTypes.string}
};


function ProductContainer(finalData) {

  console.log(finalData);

  return (
   "Hey"
  );
}



class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabValue:0
    };
  }

  // getAllDataApiCall = (weekNumber)=>{
  //
  //   // // agent ID
  //   let { agentId } = this.props;
  //   // // timeline
  //   let { SelectLeads, SelectJointCalls, SelectCampaigns, SelectTraining } = this.state;
  //
  //   let options = {
  //     afterSuccess: () => {
  //       console.log('success');
  //     },
  //     afterError: () => {
  //       console.log('error');
  //     }
  //   };
  //
  //   this.props.actions.getAgentInfo(agentId,options);
  //   this.props.actions.getLeadsInfo(weekNumber,agentId,SelectLeads,options);
  //   this.props.actions.getJointCall(weekNumber,agentId,SelectJointCalls,options);
  //   this.props.actions.getCamapaignEfficiency(weekNumber,agentId,SelectCampaigns,options);
  //   this.props.actions.getCommitments(weekNumber,agentId,options);
  //
  // }

  componentDidMount() {
    // const { history } = this.props;
    // if(!Auth.isLoggedIn()){
    //   history.push('/');
    // }else{
    //   this.getAllDataApiCall(moment().isoWeek());
    // }
  }

  // reloadPage() {
  //   let options = {
  //     afterSuccess: () => {},
  //     afterError: () => {}
  //   };
  //
  //   this.getAllDataApiCall(moment().isoWeek());
  // }


  // showAddAppDialog() {
  //   const dialogType = 'ADD_BRANCH';
  //   const dialogData = '';
  //   let dialogActions = {reloadPage: this.reloadPage};
  //   this.props.actions.openDialog(dialogType, dialogData, dialogActions);
  // }

  render() {

    let { productData } = this.props;
    let {tabValue} = this.state;

    console.log(productData);

    return (
        <section  className="DASHBOARD_MAIN">
          <Grid container className="DASHBOARD_CONTAINER">
            <Grid item xs={12} sm={12} md={12} className="flex-row">

            <Card className="AmazonChart">

              <Grid container>
              <Grid item xs={3} sm={3} md={3} className="flex-row flex-justify-center">
                <h1> Amazon</h1>
              </Grid>

              <Grid item xs={12}> <br/>
              </Grid>

              <Grid item xs={1}>
              </Grid>

              <Grid item xs={8} sm={8} md={8} className="flex-row">
                <Grid container className="DASHBOARD_CONTAINER">
                  <Grid item xs={4}>
                  <Card>
                      <CardHeader
                        avatar={
                          <Avatar aria-label="Recipe" >
                            R
                          </Avatar>
                        }
                        action={
                          <IconButton>
                            <MoreVertIcon />
                          </IconButton>
                        }
                        title="Shrimp and Chorizo Paella"
                        subheader="September 14, 2016"
                      />
                      <CardMedia
                        className={classes.media}
                        image="/static/images/cards/paella.jpg"
                        title="Contemplative Reptile"
                      />
                      <CardContent>
                        <Typography component="p">
                          This impressive paella is a perfect party dish and a fun meal to cook together with your
                          guests. Add 1 cup of frozen peas along with the mussels, if you like.
                        </Typography>
                      </CardContent>

                    </Card>
                  </Grid>
                </Grid>
              </Grid>
              </Grid>





            </Card>


            </Grid>
          </Grid>
        </section>
    );
  }
}

function mapStateToProps(state) {
  return {
      productData: !!state.userStore.productData ? state.userStore.productData : {},
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
    // openDialog: (dialogType, data, dataActions) => dispatch(DialogAction.open(dialogType, data, dataActions)),
    // openSnackbar: (data) => dispatch(SnackbarAction.show(data)),
    //
    // getAgentInfo: (agentId,options) =>dispatch(DashboardAction.getAgentInfo(agentId,options)),
    //
    // getLeadsInfo: (week,agentId,timeline,options) =>dispatch(DashboardAction.getLeadsInfo(week,agentId,timeline,options)),
    // getJointCall: (week,agentId,timeline,options) =>dispatch(DashboardAction.getJointCall(week,agentId,timeline,options)),
    // getCamapaignEfficiency: (week,agentId,timeline,options) =>dispatch(DashboardAction.getCamapaignEfficiency(week,agentId,timeline,options)),

    // getCommitments: (week,agentId,options) =>dispatch(DashboardAction.getCommitments(week,agentId,options)),
    deleteStore: ()=>dispatch(DashboardAction.deleteStore())
    }
  }
}

export default addUrlProps({ urlPropsQueryConfig })(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
