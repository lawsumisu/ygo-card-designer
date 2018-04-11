import React from 'react';

class SelectInput extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            selectIsFocused: false
        }
    }

    getSelectedItemAsDisplay(){
        let shouldHideSelectedItem = false;
        if (this.props.shouldHideSelectedItem){
            shouldHideSelectedItem = this.props.shouldHideSelectedItem();
        }
        if (!shouldHideSelectedItem && !this.state.selectIsFocused && !this.props.showEditor){
            return (
                <span className='ygo-card-monster-type-selected'>{this.props.selectedItem}</span>
            );
        }
    }

    /* ------------------- +
     | DOM-related methods |
     + ------------------- */
    
    getSelectClassNames(){
        let classNames = ['ygo-card-monster-type-selector'];
        if (this.state.selectIsFocused || this.props.showEditor){
            classNames.push('ygo-card-monster-type-selector-visible');
        }
        return classNames.join(' ');
    }

    handleOnFocus(event){
        if (this.props.onFocus){
            this.props.onFocus(event);
        }
        this.setState({
           selectIsFocused: true 
        });
    }

    handleOnBlur(event){
        if (this.props.onBlur){
            this.props.onBlur(event);
        }
        this.setState({
            selectIsFocused: false
        });
    }

    handleOnChange(event){
        return this.props.onChange()
    }

    render(){
        return (
            <div className="ygo-card-monster-type">
                {this.getSelectedItemAsDisplay()}
                <select 
                    className={this.getSelectClassNames()}
                    onChange={(event) => this.props.onChange(event.target.value)}
                    onFocus={(event) => this.handleOnFocus(event)}
                    onBlur={(event) => this.handleOnBlur(event)}
                    value={this.props.selectedItem}>
                    {_.map(this.props.selectOptions, (item) => {
                        return (
                             <option key={item} value={item}>{item}</option>
                        );
                    })}
                </select>
            </div>
        )
    }
}

export {SelectInput};