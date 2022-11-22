import { ReactNode } from 'react';
import './roundLabel.scss'
import classNames from 'classnames'

export interface RoundLabelProps{
  children: ReactNode | undefined;
}

const RoundLabel: React.FC<RoundLabelProps> = ({children}) => {

  return(
    <div className={classNames('round-label')}>
      {children}
    </div>
  )
}

export default RoundLabel;
