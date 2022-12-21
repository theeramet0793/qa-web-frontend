
export const nowDate = () =>{
  var now = new Date();
  return now.getFullYear()+'-'+(now.getMonth()+1)+'-'+now.getDate();
}

export const nowTime = () =>{
  var now = new Date();
  return now.getHours()+':'+((now.getMinutes()<10? '0':'')+now.getMinutes());
}

export const nowDateTime = () =>{
  return nowDate()+'_'+nowTime();
}