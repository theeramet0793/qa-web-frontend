import './countNoti.scss'

export interface CountNotiProps{
 notiUnreadAmount: number;
}
const CountNoti:React.FC<CountNotiProps> = ({notiUnreadAmount}) =>{

  return(
    <div className="noti-count-container">
      {notiUnreadAmount}
    </div>
  )
}

export default CountNoti;