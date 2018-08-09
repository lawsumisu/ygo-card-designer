import * as React from 'react';
import 'client/app/components/topBar/topBar.scss';

interface TopBarProps {

}

export class TopBar extends React.Component<TopBarProps> {
  public render(): React.ReactNode {
    return (
      <div className="navigation-bar--container">
        Industrial Illusions
        <div className="account-management--container">
          Account Management
          <div>Username</div>
          <input type="button" value="Login"/>
        </div>
      </div>
    );
  }
}