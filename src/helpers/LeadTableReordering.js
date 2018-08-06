import * as _ from 'lodash';
export function LeadTableReordering(Data){

  let statusTypes= [
                      "New",
                      "Follow-Up",
                      "Customer Concern",
                      "Hibernate",
                      "Invalid",
                      "Negative Closure",
                      "Payment Pending",
                      "Positive Closure",
                      "Regenerate",
                      "System Positive Closure",
                      "Unqualified",
                      "Verification Pending"
                    ];

  let finalLeadData = [];

  statusTypes.forEach( (value)=>{
    let filteredData = _.filter(Data,{Status:value});
    finalLeadData.push(...filteredData);
  });

  console.log("Lead Filetered Data",finalLeadData);
  return finalLeadData;

}
