import * as React from 'react';
import 'client/app/components/topBar/topBar.scss';

interface TopBarProps {

}

export class TopBar extends React.Component<TopBarProps> {
  public render(): React.ReactNode {
    return (
      <div className="navigation-bar--container">
        <div className='app-title'>Industrial Illusions</div>
        <div className="account-management--container">
          {/*<div>Username</div>*/}
          {/*<input type="button" value="Login"/>*/}
        </div>
      </div>
    );
  }
}