import { ReactNode } from 'react';
import './logoOblong.scss'

export interface LogoOblongProps{
  children: ReactNode | undefined;
}

const LogoOblong: React.FC <LogoOblongProps> = ({children}) =>{

  return(
    <div className='logo-oblong'>
      {children}
    </div>
  )
}

export default LogoOblong;
