import { ReactNode } from "react";
import './rectangleCard.scss'

export interface RectangleCardProps{
  children: ReactNode | undefined;
}

const RectangleCard: React.FC<RectangleCardProps> = ({children}) =>{
  
  return(
    <div className="rectangle-card">
      {children}
    </div>
  )
}

export default RectangleCard;