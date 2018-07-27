import React from 'react';
import { Link } from "react-router-dom";
import Menu, { MenuItem, MenuList } from 'material-ui/Menu';
import { withRouter } from 'react-router'
import {LEFT_ARROW, PROFILE_ICON, COLORS, FONTS} from '../constants';
import { Auth } from '../helpers';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';

class HeaderLeft extends React.Component {

  constructor(props){
    super(props);
  }

  goBack = ()=>{
    const { history } = this.props
    history.goBack();
  }

  render(){

    const { match, location, history } = this.props

    return(

      <Grid container>
        {
          (location.pathname === '/view') ?
            <Grid item xs={1}>
            </Grid>
          :
          <Grid item xs={2}>
            <IconButton onClick={this.goBack}color="#58595b" aria-label="Show More" style={{borderRadius:"50%",marginTop:"7px"}}>
              <Icon style={{fontSize:"34px"}}>arrow_left</Icon>
            </IconButton>
            {/* <img src={LEFT_ARROW} className="LEFT_ARROW_STYLE"/> */}
          </Grid>

        }
        <Grid item xs={10}>
          <p className="HEADER_LEFT_PAGE_HEADING" > Next page heading  </p>
        </Grid>
      </Grid>

    )
  }

}

// const HeaderLeft = ({}) => {
//
//   const { location } = this.props;
//   console.log(location);
//
//   return (
//     <Grid container>
//       <Grid item xs={2}>
//         <IconButton color="#58595b" aria-label="Show More" style={{borderRadius:"50%",marginTop:"7px"}}>
//           <Icon style={{fontSize:"34px"}}>arrow_left</Icon>
//         </IconButton>
//         {/* <img src={LEFT_ARROW} className="LEFT_ARROW_STYLE"/> */}
//       </Grid>
//       <Grid item xs={10}>
//         <p className="HEADER_LEFT_PAGE_HEADING" > Next page heading  </p>
//       </Grid>
//     </Grid>
//   );
//
// };

export default withRouter(HeaderLeft);
