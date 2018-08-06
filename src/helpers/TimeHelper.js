
export class TimeHelper{

  static giveMeFormattedTime(unformatedDate=''){

    if(unformatedDate === ''){
      return "-"
    }else{
      let unformatedDateSplitHyphen = unformatedDate.split(" ")[0].split("-");
      let outputTime =  unformatedDateSplitHyphen[2]+"/"+unformatedDateSplitHyphen[1]+"/"+unformatedDateSplitHyphen[0];

      if(!!unformatedDateSplitHyphen[2] && !!unformatedDateSplitHyphen[1] && !!unformatedDateSplitHyphen[0]){
        return outputTime;
      }else{
        return '-'
      }

    }
  }

}
