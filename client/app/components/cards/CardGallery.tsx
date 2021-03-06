import * as React from 'react';
import * as _ from 'lodash';
import { AppState } from "client/app/redux/store";
import { Dispatch } from "redux";
import { addCard, updateCard } from "client/app/redux/card/actions";
import CardEditor from 'client/app/components/cards/CardEditor';
import { connect } from "react-redux";
import 'client/app/components/cards/cardGallery.scss';
import { v4 } from 'uuid';
import { updateSet } from "client/app/redux/set/actions";

interface CardGalleryProps {
  setId: string | null;
}

interface CardGalleryStateMappedProps {
  ids: string[],
}

interface CardGalleryDispatchMappedProps {
  actions: {
    addCard: (cardId: string) => any;
    addCardToSet: (cardId: string, setId: string, cards: string[]) => any;
  }
}

type CardGalleryAllProps = CardGalleryProps & CardGalleryStateMappedProps & CardGalleryDispatchMappedProps;

class CardGallery extends React.Component<CardGalleryAllProps> {
  public static mapStateToProps(state: AppState, props: CardGalleryProps): CardGalleryStateMappedProps {
    if (props.setId){
      return {
        ids: state.entities.sets.byId[props.setId].cards,
      }
    } else {
      return {
        ids: state.entities.cards.allIds
      }
    }

  }

  public static mapDispatchToProps(dispatch: Dispatch<any>): CardGalleryDispatchMappedProps {
    return {
      actions: {
        addCard: (cardId: string) => {
          dispatch(addCard(cardId));
        },
        addCardToSet: (cardId: string, setId: string, cards: string[]) => {
          dispatch(addCard(cardId));
          dispatch(updateSet({id: setId, cards}));
        }
      }
    }
  }

  public render(): React.ReactNode {
    return (
      <div className='card-gallery--container'>
        <input type="button" value='Add New Card' onClick={this.addNewCardToSet}/>
        <div className={'cards--container'}>
          {_.map(this.props.ids, (id: string) => (
            <CardEditor key={id} id={id}/>
          ))}
        </div>
      </div>
    )
  }

  private addNewCardToSet = (): void => {
    const cardId = v4();
    if (this.props.setId){
      const newCards = this.props.ids.concat(cardId);
      this.props.actions.addCardToSet(cardId, this.props.setId, newCards);
    } else {
      this.props.actions.addCard(cardId);
    }

  }
}

export default connect(CardGallery.mapStateToProps, CardGallery.mapDispatchToProps)(CardGallery);