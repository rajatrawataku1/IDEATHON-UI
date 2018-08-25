import React, { Component } from 'react';
import { Auth } from '../../helpers';
import FllView from './FllView';
import SllView from './SllView';

export default class View extends Component {

  // constructor(props){
  //   super(props);
  // }

  render() {
    return (
      <div>
        {

          (Auth.getUserDataByKey('Role') === 'SLL')? <SllView/> : <FllView/>

          // (Auth.getUserDataByKey('Role') === 'SLL')? <SllView/> : <FllView/>
        }
      </div>
    )

  }
}
