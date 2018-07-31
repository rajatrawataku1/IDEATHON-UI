import React from 'react';
import { Link } from "react-router-dom";
import Menu, { MenuItem } from 'material-ui/Menu';
// import {SHOW_MORE,PROFILE_LOGO, PROFILE_ICON, COLORS, FONTS} from '../constants';
import { Auth } from '../helpers';
// import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';

const HeaderRightProfile = ({onLogoutClick, showHeaderMenu, closeHeaderMenu, headerAnchorEl}) => {
  // const userName = (!!Auth.isLoggedIn() && Auth.getUserDataByKey('Name')) || '';
  // const altImageText = ['user-profile', userName].join('-');

  const UserName = Auth.getUserDataByKey('Name');

  return (

    <div className="flex-row flex-align-center flex-justify-space-between" >
      <div className="HEADER_RIGHT_PROFILE_NAME" aria-owns={headerAnchorEl ? 'user-option-action' : null}>
        <div className="HEADER_WISH_TEXT" >Hi, {UserName}</div>
      </div>

      <span onClick={showHeaderMenu}>
        {/* <img className="HEADER_RIGHT_PROFILE_ICON"  src={PROFILE_LOGO} alt={altImageText} /> */}
        <IconButton color="default" aria-label="Show More" style={{borderRadius:"50%",marginTop:"2px",color:"#58595b !important"}}>
          {/* #58595b */}
          <Icon >more_vert</Icon>
        </IconButton>
      </span>

      <Menu
          id="user-option-action"
          anchorEl={headerAnchorEl}
          open={Boolean(headerAnchorEl)}
          onClose={closeHeaderMenu}
        >
        {
          (Auth.getUserDataByKey('Role') === 'SUPERADMIN') &&
          <MenuItem><Link to="/profile">Profile</Link></MenuItem>
        }
        <MenuItem onClick={onLogoutClick}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default HeaderRightProfile;
