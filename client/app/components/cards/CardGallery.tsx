import * as React from 'react';
import * as _ from 'lodash';
import { AppState } from "client/app/redux/store";
import { CardFields } from "client/app/redux/card/state";
import { Dispatch } from "redux";
import { addCard, updateCard } from "client/app/redux/card/actions";
import CardEditor from 'client/app/components/cards/CardEditor';
import { connect } from "react-redux";
import 'client/app/components/cards/cardGallery.scss';

interface CardGalleryStateMappedProps {
  cards: CardFields[],
}

interface CardGalleryDispatchMappedProps {
  actions: {
    updateCard: (cardFields: Partial<CardFields>) => any;
    addCard: () => any;
  }
}

class CardGallery extends React.Component<CardGalleryStateMappedProps & CardGalleryDispatchMappedProps> {
  public static mapStateToProps(state: AppState): CardGalleryStateMappedProps {
    const cards = state.entities.cards;
    return {
      cards: _.map(cards.allIds, (id: string) => cards.byId[id])
    }
  }

  public static mapDispatchToProps(dispatch: Dispatch<any>): CardGalleryDispatchMappedProps {
    return {
      actions: {
        addCard: () => dispatch(addCard()),
        updateCard: (cardFields: Partial<CardFields>) => dispatch(updateCard(cardFields)),
      }
    }
  }

  public render(): React.ReactNode {
    return (
      <div className='card-gallery--container'>
        <input type="button" value='Click Me!' onClick={() => this.props.actions.addCard()}/>
        <div className={'cards--container'}>
          {_.map(this.props.cards, (card: CardFields) => (
            <CardEditor key={card.id} id={card.id}/>
          ))}
        </div>

      </div>
    )
  }
}

export default connect(CardGallery.mapStateToProps, CardGallery.mapDispatchToProps)(CardGallery);