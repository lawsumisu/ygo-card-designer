import * as React from 'react';
import { AppState } from 'client/app/redux/store';
import { Dispatch } from 'redux';
import { updateSet } from 'client/app/redux/set/actions';
import { connect } from 'react-redux';
import { AutoscalingInput } from 'client/app/components/common/autoscalingInput/autoscalingInput.component';
import 'client/app/components/setEditor/setEditor.scss';

interface SetEditorProps {
  id: string;
}

interface SetEditorStateMappedProps {
  name: string;
}

interface SetEditorDispatchMappedProps {
  updateName: (name: string) => any;
}

type SetEditorAllProps = SetEditorProps & SetEditorStateMappedProps & SetEditorDispatchMappedProps;

class SetEditor extends React.Component<SetEditorAllProps> {
  public static mapStateToProps(state: AppState, props: SetEditorProps): SetEditorStateMappedProps {
    return {
      name: state.entities.sets.byId[props.id].name,
    }
  }
  
  public static mapDispatchToProps(dispatch: Dispatch<any>, props: SetEditorProps): SetEditorDispatchMappedProps {
    const { id } = props;
    return {
      updateName: (name) => dispatch(updateSet({name, id})),
    }
  }
  
  public render(): React.ReactNode {
    return (
      <div className='set-editor--container'>
        <AutoscalingInput
          className='set-editor--input'
          value={this.props.name}
          onChange={(event) => this.props.updateName(event.target.value)}
        />
      </div>
    )
  }
}

// Hook up Redux store state to props of this Component.
export default connect(SetEditor.mapStateToProps, SetEditor.mapDispatchToProps)(SetEditor);