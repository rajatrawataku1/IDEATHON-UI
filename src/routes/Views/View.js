import React, { Component } from 'react';
import { Auth } from '../../helpers';
import FllView from './FllView';
import SllView from './SllView';

export default class View extends Component {

  // constructor(props){
  //   super(props);
  // }

  render() {

    console.log(Auth.getUserDataByKey('Role') === 'FLL');

    return (
      <div>
        {
          // <SllView/>
          (Auth.getUserDataByKey('Role') === 'SLL')? <FllView/> : <FllView/>
        }
      </div>
    )

  }
}
