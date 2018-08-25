import React, { Component } from 'react';
import { addUrlProps, UrlQueryParamTypes } from 'react-url-query';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import { BoxHeader } from '../../components';
import { DialogAction, SnackbarAction, UserAction } from '../../actions';
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
import ShoppingCart from 'material-ui/Icon';


const urlPropsQueryConfig = {
  productName: { type: UrlQueryParamTypes.string},
  pinCodeUrl: { type: UrlQueryParamTypes.string}
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
      tabValue:0,
      online:1,
      offline:0
    };
  }


  componentDidMount() {
      let _this = this;

      let { productName,pinCodeUrl } = this.props;

      console.log(productName);


      let form = {
        product:productName,
        pinCode:pinCodeUrl
      };

      const options = {
          afterSuccess: () => {
            _this.props.actions.openSnackbar('Product Fetching Successfull');
          },
          afterError: () => {
            _this.props.actions.openSnackbar('Product Fetching Failed');
          }
        };

      this.props.actions.getAllProducts(form, options);

      const options2 = {
          afterSuccess: () => {
            _this.props.actions.openSnackbar('Outlets Fetching Successfull');
          },
          afterError: () => {
            _this.props.actions.openSnackbar('Outlets Fetching Failed');
          }
        };

     this.props.actions.getOutlets(form, options2);


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
    let { outletData } = this.props;

    let {tabValue} = this.state;

    let { amazon,bigbasket,grofers,paytm,tata} = productData;

    let finalAmazon = (!!amazon) ? amazon :[];
    let finalbigBasket = (!!bigbasket) ? bigbasket :[];
    let finalgrofers = (!!grofers) ? grofers :[];
    let finalpaytm = (!!paytm) ? paytm :[];
    let finaltata = (!!tata) ? tata : [];

    let finaloutletData = (!!outletData ) ? outletData : [];
    let {offline, online} = this.state ;

    console.log(productData);

    // productData=[
    //   {
    //     title:"Rajat Rawat",
    //     link:"https://app.zeplin.io/project/5ab9e881fc00c7309625e097/screen/5ab9e911575f076233923c0e",
    //     image:"https://images-na.ssl-images-amazon.com/images/I/61VpNg3AmgL._SX466_.jpg",
    //     description:"I am gonna do this hey we have that format as well",
    //   },
    //   {
    //     title:"Rohan Chougule",
    //     link:"https://app.zeplin.io/project/5ab9e881fc00c7309625e097/screen/5ab9e911575f076233923c0e",
    //     image:"https://images-na.ssl-images-amazon.com/images/I/61VpNg3AmgL._SX466_.jpg",
    //     description:"I am gonna do this hey we have that format as well",
    //   },
    // ]
    //


    return(

        <section  className="DASHBOARD_MAIN">
          <Grid container className="DASHBOARD_CONTAINER">

          <Grid item xs={12}>
            <br/>
          </Grid>

          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={6} className="flex-row flex-justify-center">
                {
                  ( Object.keys(productData).length !=0)
                  ?
                    <Button variant="outlined" style={{textTransform:"none"}} className="onlineStore" onClick ={()=>{ this.setState({online:1,offline:0}) }}>
                      Search Result for online Stores
                    </Button>
                  :
                    <span> </span>

                }
              </Grid>

              <Grid item xs={6} className="flex-row flex-justify-center">

              {
                (finaloutletData.length !=0)
                ?
                  <Button variant="raised" className="offlineStore" onClick={ ()=>{ this.setState({offline:1,online:0}) }} >
                    See Result for offline Stores
                  </Button>
                :
                  <span> </span>
              }


              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <br/>
          </Grid>


          {
            (finaltata.length != 0 && online) ?

            <Grid item xs={12} sm={12} md={12} className="flex-row flex-justify-center">

            <Card className="AmazonChart">

              <Grid container>
              <Grid item xs={3} sm={3} md={3} className="flex-row flex-justify-center">
                <h1> Tata Sampann </h1>
              </Grid>
              <Grid item xs={12} sm={12} md={12} className="flex-row">
                <Grid container className="DASHBOARD_CONTAINER">
                {
                  finaltata.map((key,index)=>{

                    return (

                      <Grid item xs={6}>
                      <Card style={{height:"370px",overflow:"scroll",margin:"5px"}}>
                          <CardHeader
                            avatar={
                              <Avatar aria-label="Recipe" >
                                  {key.title.charAt(0)}
                              </Avatar>
                            }
                            action={
                              <IconButton onClick={()=>{window.open(key.link,"_blank")}}>
                                <Icon style={{color:"#e4e4e4",marginTop:"10px"}}> shopping_cart</Icon>
                              </IconButton>
                            }
                            title={key.title}
                          />
                          <CardMedia
                            style={{height:"30px",padding:"25.59%"}}
                            image={key.image}
                          />
                          <CardContent>
                            <Typography component="p">
                              { key.description}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>

                    )
                  })
                }

                </Grid>
              </Grid>

              <Grid item xs={12}> <br/>
              </Grid>

              </Grid>

            </Card>


            </Grid>

            :
            <span> </span>

          }

          {
            (finalAmazon.length != 0 && online) ?

            <Grid item xs={12} sm={12} md={12} className="flex-row flex-justify-center">

            <Card className="AmazonChart">

              <Grid container>
              <Grid item xs={3} sm={3} md={3} className="flex-row flex-justify-center">
                <h1> Amazon</h1>
              </Grid>
              <Grid item xs={12} sm={12} md={12} className="flex-row">
                <Grid container className="DASHBOARD_CONTAINER">
                {
                  finalAmazon.map(key=>{
                    return (

                      <Grid item xs={6}>
                      <Card style={{height:"370px",overflow:"scroll",margin:"5px"}}>
                          <CardHeader
                            avatar={
                              <Avatar aria-label="Recipe" >
                                {key.title.charAt(0)}
                              </Avatar>
                            }
                            action={
                              <IconButton onClick={()=>{window.open(key.link,"_blank")}}>
                                <Icon style={{color:"#e4e4e4",marginTop:"10px"}}> shopping_cart</Icon>
                              </IconButton>
                            }
                            title={key.title}
                          />
                          <CardMedia
                            style={{height:"30px",padding:"25.59%"}}
                            image={key.image}
                          />
                          <CardContent>
                            <Typography component="p">
                              { key.description}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>

                    )
                  })
                }

                </Grid>
              </Grid>

              <Grid item xs={12}> <br/>
              </Grid>

              </Grid>

            </Card>


            </Grid>

            :
            <span> </span>

          }


          {
            (finalbigBasket.length != 0 && online) ?

            <Grid item xs={12} sm={12} md={12} className="flex-row flex-justify-center">

            <Card className="AmazonChart">

              <Grid container>
              <Grid item xs={3} sm={3} md={3} className="flex-row flex-justify-center">
                <h1> Big Basket</h1>
              </Grid>
              <Grid item xs={12} sm={12} md={12} className="flex-row">
                <Grid container className="DASHBOARD_CONTAINER">
                {
                  finalbigBasket.map(key=>{
                    return (

                      <Grid item xs={6}>
                      <Card style={{height:"370px",overflow:"scroll",margin:"5px"}}>
                          <CardHeader
                            avatar={
                              <Avatar aria-label="Recipe" >
                                { key.title.charAt(0) }
                              </Avatar>
                            }
                            action={
                              <IconButton onClick={()=>{window.open(key.link,"_blank")}}>
                                <Icon style={{color:"#e4e4e4",marginTop:"10px"}}> shopping_cart</Icon>
                              </IconButton>
                            }
                            title={key.title}
                          />
                          <CardMedia
                            style={{height:"30px",padding:"25.59%"}}
                            image={key.image}
                          />
                          <CardContent>
                            <Typography component="p">
                              { key.description}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>

                    )
                  })
                }

                </Grid>
              </Grid>

              <Grid item xs={12}> <br/>
              </Grid>

              </Grid>

            </Card>
            </Grid>

            :
            <span> </span>

          }


          {
            (finalgrofers.length != 0 && online) ?

            <Grid item xs={12} sm={12} md={12} className="flex-row flex-justify-center">

            <Card className="AmazonChart">

              <Grid container>
              <Grid item xs={3} sm={3} md={3} className="flex-row flex-justify-center">
                <h1> Grofers </h1>
              </Grid>
              <Grid item xs={12} sm={12} md={12} className="flex-row">
                <Grid container className="DASHBOARD_CONTAINER">
                {
                  finalgrofers.map(key=>{
                    return (

                      <Grid item xs={6}>
                      <Card style={{height:"370px",overflow:"scroll",margin:"5px"}}>
                          <CardHeader
                            avatar={
                              <Avatar aria-label="Recipe" >
                                { key.title.charAt(0) }
                              </Avatar>
                            }
                            action={
                              <IconButton onClick={()=>{window.open(key.link,"_blank")}}>
                                <Icon style={{color:"#e4e4e4",marginTop:"10px"}}> shopping_cart</Icon>
                              </IconButton>
                            }
                            title={key.title}
                          />
                          <CardMedia
                            style={{height:"30px",padding:"25.59%"}}
                            image={key.image}
                          />
                          <CardContent>
                            <Typography component="p">
                              { key.description}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>

                    )
                  })
                }

                </Grid>
              </Grid>

              <Grid item xs={12}> <br/>
              </Grid>

              </Grid>

            </Card>
            </Grid>

            :
            <span> </span>

          }


        {
          (finalpaytm.length != 0 && online) ?

          <Grid item xs={12} sm={12} md={12} className="flex-row flex-justify-center">

          <Card className="AmazonChart">

            <Grid container>
            <Grid item xs={3} sm={3} md={3} className="flex-row flex-justify-center">
              <h1> Paytm Mall </h1>
            </Grid>
            <Grid item xs={12} sm={12} md={12} className="flex-row">
              <Grid container className="DASHBOARD_CONTAINER">
              {
                finalpaytm.map(key=>{
                  return (

                    <Grid item xs={6}>
                    <Card style={{height:"370px",overflow:"scroll",margin:"5px"}}>
                        <CardHeader
                          avatar={
                            <Avatar aria-label="Recipe" >
                            { key.title.charAt(0) }
                            </Avatar>
                          }
                          action={
                            <IconButton onClick={()=>{window.open(key.link,"_blank")}}>
                              <Icon style={{color:"#e4e4e4",marginTop:"10px"}}> shopping_cart</Icon>
                            </IconButton>
                          }
                          title={key.title}
                        />
                        <CardMedia
                          style={{height:"30px",padding:"25.59%"}}
                          image={key.image}
                        />
                        <CardContent>
                          <Typography component="p">
                            { key.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>

                  )
                })
              }

              </Grid>
            </Grid>

            <Grid item xs={12}> <br/>
            </Grid>

            </Grid>

          </Card>
          </Grid>

          :
          <span> </span>

        }

        {
          ( finaloutletData.length!=0 && offline) ?

          <Grid item xs={12} sm={12} md={12} className="flex-row flex-justify-center">

          <Card className="AmazonChart">

            <Grid container>
            <Grid item xs={3} sm={3} md={3} className="flex-row flex-justify-center">
              <h1> Offline Stores </h1>
            </Grid>
            <Grid item xs={12} sm={12} md={12} className="flex-row">
              <Grid container className="DASHBOARD_CONTAINER">
              {
                finaloutletData.map(key=>{
                  return (

                    <Grid item xs={6}>
                    <Card style={{height:"200px",overflow:"scroll",margin:"5px"}}>
                        <CardHeader
                          avatar={
                            <Avatar aria-label="Recipe" >
                            { key.name.charAt(0) }
                            </Avatar>
                          }

                          title={key.name}
                        />

                        <CardContent>
                          <Typography component="p">
                            <Grid container>
                              <Grid item xs={8}>
                                {key.address}
                              </Grid>
                              <Grid item xs={4} className="flex-row flex-justify-end">
                              <Button mini variant="fab" aria-label="Add" onClick={ ()=>{ window.open("https://www.google.com/maps/search/"+key.address,"_blank")}}>
                                 <Icon> location_on </Icon>
                               </Button>
                              </Grid>
                            </Grid>
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>

                  )
                })
              }

              </Grid>
            </Grid>

            <Grid item xs={12}> <br/>
            </Grid>

            </Grid>

          </Card>
          </Grid>

          :
          <span> </span>

        }

        </Grid>
        </section>
    );
  }
}

function mapStateToProps(state) {
  return {
      outletData: !!state.userStore.outletData ? state.userStore.outletData : [],
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
    openSnackbar: (data) => dispatch(SnackbarAction.show(data)),
    getAllProducts: (form, options) => dispatch(UserAction.getAllProducts(form, options)),
    getOutlets: (pincode, options) => dispatch(UserAction.getOutlets(pincode, options)),
    }
  }
}

export default addUrlProps({ urlPropsQueryConfig })(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
