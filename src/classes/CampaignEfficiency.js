const KEY_MAP = {
    CampaignEfficienyNew:"New",
    CampaignEfficienyFollowUp:"Follow-Up",
    CampaignEfficienyNegativeClosure:"Negative Closure",
    CampaignEfficienyPositiveClosure:"Positive Closure",
    CampaignEfficienySystemPositiveClosure:"System Positive Closure",
    CampaignEfficienyVerificationPending:"Verification Pending",
    CampaignEfficienyInvalid:"Invalid",
    CampaignEfficienyUnqualified:"Unqualified",
    CampaignEfficienyHibernate:"Hibernate",
    CampaignEfficienyCustomerConcern:"Customer Concern",
    CampaignEfficienyPaymentPending:"Payment Pending",
    CampaignEfficienyRegenerate:"Regenerate",
    CampaignEfficienyTotalLeads:"Total"
}


const CampaignName = "CampaignName";

export class CampaignEfficiency{

  constructor(key="",apiObj = {}) {
    const _this = this;

    Object.keys(KEY_MAP).forEach((key) => {
         const keyMap = KEY_MAP[key];
        _this[key] = (!!apiObj[keyMap]) ? Number(apiObj[keyMap])  : 0;
    });

    // let TotalLeadsCount=0;

    // Object.keys(KEY_MAP).forEach((key)=>{
    //   TotalLeadsCount=TotalLeadsCount+_this[key];
    // });

    _this[CampaignName]=key;

  }
}
