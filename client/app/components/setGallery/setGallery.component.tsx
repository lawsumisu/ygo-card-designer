import * as React from 'react'
import 'client/app/components/setGallery/setGallery.scss';
import boxImage from 'client/app/assets/legend_of_blue_eyes_1st.png';
import SetEditor from 'client/app/components/setEditor/setEditor.component';
import { AppState } from 'client/app/redux/store';
import { Dispatch } from 'redux';
import { addSet } from 'client/app/redux/set/actions';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import classNames from 'classnames';

interface SetGalleryProps {
  selectedId: string;
  onSelection: (id: string) => void;
}

interface SetGalleryStateMappedProps {
  ids: string[]
}

interface SetGalleryDispatchMappedProps {
  actions: {
    addCard: () => any;
  }
}

type SetGalleryAllProps = SetGalleryProps & SetGalleryStateMappedProps & SetGalleryDispatchMappedProps;

class SetGallery extends React.Component<SetGalleryAllProps> {

  public static mapStateToProps(state: AppState): SetGalleryStateMappedProps {
    return {
      ids: state.entities.sets.allIds
    }
  }

  public static mapDispatchToProps(dispatch: Dispatch<any>): SetGalleryDispatchMappedProps {
    return {
      actions: {
        addCard: () => dispatch(addSet()),
      }
    }
  }
  
  public render(): React.ReactNode {
    return (
      <div className='set-gallery--container'>
        Sets
        <div className='sets--container'>
          <img src={boxImage} className='set-gallery--image'/>
          {_.map(this.props.ids, (id: string) => (
            <div
              key={id}
              onClick={() => this.props.onSelection(id)}
              className={classNames(this.props.selectedId === id ? 'set--selected': null, 'set--container')}
            >
              <SetEditor id={id}/>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default connect(SetGallery.mapStateToProps, SetGallery.mapDispatchToProps)(SetGallery);