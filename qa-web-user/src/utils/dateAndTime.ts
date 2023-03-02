
export const nowDate = () =>{
  var now = new Date();
  return now.getFullYear()+'-'+((now.getMonth()+1<10? '0':'')+now.getMonth())+'-'+((now.getDate()<10? '0':'')+now.getDate());
}

export const nowTime = () =>{
  var now = new Date();
  return now.getHours()+':'+((now.getMinutes()<10? '0':'')+now.getMinutes())+':'+((now.getSeconds()<10? '0':'')+now.getSeconds());
}

export const nowDateTime = () =>{
  return nowDate()+'_'+nowTime();
}