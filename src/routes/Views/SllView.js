import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
// import Paper from 'material-ui/Paper';
// import Button from 'material-ui/Button';
import {SllTable } from '../../components';
import { DialogAction, SnackbarAction, SllAction } from '../../actions';
import { Auth } from '../../helpers';
// import Avatar from 'material-ui/Avatar';

// import { PROFILE_ICON, PROFILE_LOGO, COLORS, FONTS} from '../../constants';

// import Typography from 'material-ui/Typography';
  // import Menu, { MenuItem, MenuList } from 'material-ui/Menu';
// import { FormControl, FormHelperText } from 'material-ui/Form';
// import Select from 'material-ui/Select';
import orderBy from "lodash/orderBy";
import Input, {InputAdornment } from 'material-ui/Input';
import Icon from 'material-ui/Icon';
// import Fade from 'material-ui/transitions/Fade';


class SllView extends Component {
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
    // const { history } = this.props;

    const sllId = Auth.getUserDataByKey('Id');

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

    if(!!sllId){
      console.log(sllId);
      // this.props.actions.getSllInfo(sllId,options);
    }else{
      console.log("cant make request");
    }
  }


  reloadPage() {
    let options = {
      afterSuccess: () => {},
      afterError: () => {}
    };
    this.props.actions.getAllApps(options);
  }


  showAddAppDialog() {
    const dialogType = 'ADD_BRANCH';
    const dialogData = '';
    let dialogActions = {reloadPage: this.reloadPage};
    this.props.actions.openDialog(dialogType, dialogData, dialogActions);
  }


  onInputChange= (event)=>{
    let  { value } = event.target;
    // console.log(value);
    this.setState({ query:value });
  }

  resetSearch= ()=>{
  }

  showInputBox = () =>{
    this.setState({showInput:true});
  }


  render() {

    // let arraObject=[1,2,3];
    // const { expanded } = this.state;

    // const { sllInfo,sllExpandInfo } = this.props;

    // const { sllInfo } = this.props ? this.props : [];

    // BranchId: Number(value.BranchId)

    const sllExpandInfo = [
      {
        AgentId:"101",
        CommentCurrentWeekManagerComment:" my current",
        CommentCurrentWeekSelfComment:"my current ",
        CommentPreviousWeekManagerComment:"I will be meeting atleast 25 leads this week.Seeing 10 other potential leads too.",
        CommentPreviousWeekSelfComment:"I will be meeting atleast 25 leads this week.Seeing 10 other potential leads too.I hey there I am going to work hard",
        Name:"Rajat Rawat"
      },
      {
        AgentId:"102",
        CommentCurrentWeekManagerComment:" my current",
        CommentCurrentWeekSelfComment:"my current ",
        CommentPreviousWeekManagerComment:" my previous ",
        CommentPreviousWeekSelfComment:"my previous ",
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
        AgentId:"104",
        CommentCurrentWeekManagerComment:" my current manager comment",
        CommentCurrentWeekSelfComment:"my current self Comment",
        CommentPreviousWeekManagerComment:" my previous manager comment",
        CommentPreviousWeekSelfComment:"my previous self comment",
        Name:"Swastik Shrivastava"
      },
      {
        AgentId:"105",
        CommentCurrentWeekManagerComment:" my current manager comment",
        CommentCurrentWeekSelfComment:"my current self Comment",
        CommentPreviousWeekManagerComment:" my previous manager comment",
        CommentPreviousWeekSelfComment:"my previous self comment",
        Name:"Swastik Shrivastava"
      },
      {
        AgentId:"106",
        CommentCurrentWeekManagerComment:" my current manager comment",
        CommentCurrentWeekSelfComment:"my current self Comment",
        CommentPreviousWeekManagerComment:" my previous manager comment",
        CommentPreviousWeekSelfComment:"my previous self comment",
        Name:"Swastik Shrivastava"
      },
      {
        AgentId:"107",
        CommentCurrentWeekManagerComment:" my current manager comment",
        CommentCurrentWeekSelfComment:"my current self Comment",
        CommentPreviousWeekManagerComment:" my previous manager comment",
        CommentPreviousWeekSelfComment:"my previous self comment",
        Name:"Swastik Shrivastava"
      },
      {
        AgentId:"108",
        CommentCurrentWeekManagerComment:" my current manager comment",
        CommentCurrentWeekSelfComment:"my current self Comment",
        CommentPreviousWeekManagerComment:" my previous manager comment",
        CommentPreviousWeekSelfComment:"my previous self comment",
        Name:"Swastik Shrivastava"
      },
      {
        AgentId:"109",
        CommentCurrentWeekManagerComment:" my current manager comment",
        CommentCurrentWeekSelfComment:"my current self Comment",
        CommentPreviousWeekManagerComment:" my previous manager comment",
        CommentPreviousWeekSelfComment:"my previous self comment",
        Name:"Swastik Shrivastava"
      }


    ]


    const sllInfo= [
      {
        AgentId:"101",
        CommentCurrentWeekManagerComment:" my current",
        CommentCurrentWeekSelfComment:"my current ",
        CommentPreviousWeekManagerComment:"I will be meeting atleast 25 leads this week.Seeing 10 other potential leads too.I am gonna",
        CommentPreviousWeekSelfComment:"I will be meeting atleast 25 leads this week.Seeing 10 other potential leads too.I am gonna",
        Name:"Rajat Rawat"
      },
      {
        AgentId:"102",
        CommentCurrentWeekManagerComment:" my current ",
        CommentCurrentWeekSelfComment:"my current ",
        CommentPreviousWeekManagerComment:" my previous ",
        CommentPreviousWeekSelfComment:"my previous ",
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
        AgentId:"104",
        CommentCurrentWeekManagerComment:" my current manager comment",
        CommentCurrentWeekSelfComment:"my current self Comment",
        CommentPreviousWeekManagerComment:" my previous manager comment",
        CommentPreviousWeekSelfComment:"my previous self comment",
        Name:"Swastik Shrivastava"
      },
      {
        AgentId:"105",
        CommentCurrentWeekManagerComment:" my current manager comment",
        CommentCurrentWeekSelfComment:"my current self Comment",
        CommentPreviousWeekManagerComment:" my previous manager comment",
        CommentPreviousWeekSelfComment:"my previous self comment",
        Name:"Swastik Shrivastava"
      },
      {
        AgentId:"106",
        CommentCurrentWeekManagerComment:" my current manager comment",
        CommentCurrentWeekSelfComment:"my current self Comment",
        CommentPreviousWeekManagerComment:" my previous manager comment",
        CommentPreviousWeekSelfComment:"my previous self comment",
        Name:"Swastik Shrivastava"
      },
      {
        AgentId:"107",
        CommentCurrentWeekManagerComment:" my current manager comment",
        CommentCurrentWeekSelfComment:"my current self Comment",
        CommentPreviousWeekManagerComment:" my previous manager comment",
        CommentPreviousWeekSelfComment:"my previous self comment",
        Name:"Swastik Shrivastava"
      },
      {
        AgentId:"108",
        CommentCurrentWeekManagerComment:" my current manager comment",
        CommentCurrentWeekSelfComment:"my current self Comment",
        CommentPreviousWeekManagerComment:" my previous manager comment",
        CommentPreviousWeekSelfComment:"my previous self comment",
        Name:"Swastik Shrivastava"
      },
      {
        AgentId:"109",
        CommentCurrentWeekManagerComment:" my current manager comment",
        CommentCurrentWeekSelfComment:"my current self Comment",
        CommentPreviousWeekManagerComment:" my previous manager comment",
        CommentPreviousWeekSelfComment:"my previous self comment",
        Name:"Swastik Shrivastava"
      }

    ]

    // sllInfo.map((value,index)=>{
    //   sllInfo[index].Sno=index+1;
    // })
    //
    // sllExpandInfo.map((value,index)=>{
    //   sllExpandInfo[index].Sno=index+1;
    // })


    const lowerCaseQuery = this.state.query.toLowerCase();

    return (
        <section className="LEAD_MAIN" >

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
                disableUnderline={true}
                style={{ border:"1px solid #d8d8d8",borderRadius:"5px",padding:"4px",color:"#58595b"}}
                placeholder="Search by Agent ID"
                startAdornment={
                  <InputAdornment position="start">
                    <Icon style={{color:"#e4e4e4"}}>search</Icon>
                  </InputAdornment>
                }
                className="LEAD_INPUT"
                />
            </Grid>

          </Grid>

          <Grid container className="LEAD_CONTAINER">

            <Grid item xs={12} className="flex-row" style={{justifyContent:"center"}} >
              <SllTable
                getExpandSllInfo = {this.props.actions.getExpandSllInfo}

                sllInfoFinal={orderBy(
                  this.state.query
                    ? sllInfo.filter(x =>
                        x[this.state.columnToQuery]
                          .toLowerCase()
                          .includes(lowerCaseQuery)
                      )
                    : sllInfo,
                  this.state.columnToSort,
                  this.state.sortDirection
                )}

                sllExpandInfoFinal={orderBy(
                  this.state.query
                    ? sllExpandInfo.filter(x =>
                        x[this.state.columnToQuery]
                          .toLowerCase()
                          .includes(lowerCaseQuery)
                      )
                    : sllExpandInfo,
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
    sllInfo: !!state.sllStore.sllInfo ? state.sllStore.sllInfo : [],
    sllExpandInfo: !!state.sllStore.sllExpandInfo ? state.sllStore.sllExpandInfo : [],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      openDialog: (dialogType, data, dataActions) => dispatch(DialogAction.open(dialogType, data, dataActions)),
      openSnackbar: (data) => dispatch(SnackbarAction.show(data)),
      getSllInfo: (sllId,options) => dispatch(SllAction.getSllInfo(sllId,options)),
      getExpandSllInfo: (sllId,options) => dispatch(SllAction.getExpandSllInfo(sllId,options))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SllView);
