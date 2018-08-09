import * as React from 'react'
import 'client/app/components/setGallery/setGallery.scss';
import boxImage from 'client/app/assets/legend_of_blue_eyes_1st.png';
import SetEditor from 'client/app/components/setEditor/setEditor.component';
import { AppState } from 'client/app/redux/store';
import { Dispatch } from 'redux';
import { addSet } from 'client/app/redux/set/actions';
import * as _ from 'lodash';
import { connect } from 'react-redux';

interface SetGalleryStateMappedProps {
  ids: string[]
}

interface SetGalleryDispatchMappedProps {
  actions: {
    addCard: () => any;
  }
}

type SetGalleryAllProps = SetGalleryStateMappedProps & SetGalleryDispatchMappedProps;

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
            <SetEditor key={id} id={id}/>
          ))}
        </div>
      </div>
    )
  }
}

export default connect(SetGallery.mapStateToProps, SetGallery.mapDispatchToProps)(SetGallery);