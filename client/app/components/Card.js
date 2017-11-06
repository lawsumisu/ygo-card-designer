import React from 'react';

class CardStats extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <div>
                    <input type="text" value={this.props.stats.type} onChange={(event) => this.props.onStatUpdate.type(event)}/>
                </div>
                <div>
                    <input type="text" value={this.props.stats.effect} onChange={(event) => this.props.onStatUpdate.effect(event)}/>
                </div>
                <div>
                    <input type="text" value={this.props.stats.attack} onChange={(event) => this.props.onStatUpdate.attack(event)}/>
                    <input type="text" value={this.props.stats.defense} onChange={(event) => this.props.onStatUpdate.defense(event)}/>
                </div>
            </div>
        )
    }
}
class Card extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            level: 7,
            effect: '',
            attack: 0,
            defense: 0,
            type: '',
            onStatUpdate: {
                attack: (event) => this.setState({
                    attack: event.data
                }),
                defense: (event) => this.setState({
                    defense: event.data
                }),
                type: (event) => this.setState({
                    type: event.data
                }),
                effect: (event) => this.setState({
                    effect: event.data
                })
            }
        }

    }
    updateName(event){
        this.setState({
            name: event.data
        });
    }
    getLevelAsDisplay(){
        return '\u272a'.repeat(this.state.level);
    }

    getStats(){
        return {
            attack: this.state.attack,
            defense: this.state.defense,
            effect: this.state.effect,
            type: this.state.type
        }
    }
    render(){
        return (
            <div>
                <div>
                    <input type="text" value={this.state.name} onChange={(event) => this.updateName(event)}/> {'\u5149'}

                </div>
                <div>
                    {this.getLevelAsDisplay()}
                </div>
                <div>
                    <img/>
                </div>
                <CardStats onStatUpdate={this.state.onStatUpdate} stats={() => this.getStats()}/>
            </div>
        )
    }
}

export {Card};