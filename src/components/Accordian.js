import React from 'react';
import Grid from 'material-ui/Grid';
import ExpansionPanel, { ExpansionPanelDetails, ExpansionPanelSummary } from 'material-ui/ExpansionPanel';
import TableRows from './TableRows';
import InfoTag from './InfoTag';



const Accordian = (props) => {
  const { copyTextToClipboard, handleAccordionChange, toExpandPanel, panelKey, applicationData } = props;
  let panelVal = '';
  if(!!panelKey){ panelVal = ['PANEL', panelKey].join(''); }

  return (

    <div style={{padding: '0px 35px'}}>
      <div style={{padding: '10px 10px'}}>
        <TableRows appdata={applicationData}  />
      </div>
    </div>


  );
};

export default Accordian;
