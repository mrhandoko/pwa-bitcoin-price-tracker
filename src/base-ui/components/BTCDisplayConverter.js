import React from 'react';
import {
  Header,
  Segment,
  Button,
  Icon,
} from 'semantic-ui-react';
import styles from '../styles/BTCDisplayConverter-style';

export default function BTCDisplayConverter(props) {
  const { isBTC, amount, lastPrice, buy, sell, onClick } = props;
  return (
    <Segment padded>
      <Header
        as="h3"
        content={`${amount} ${isBTC ? buy : sell}`}
        style={styles.buyText}
        textAlign="center"
      />
      <Header
        as="h2"
        content={isBTC ?
          (amount * lastPrice).toFixed(2)
          : parseFloat((amount / lastPrice).toFixed(7))}
        style={styles.valueText}
        textAlign="center"
      />
      <Header
        as="h3"
        content={`${isBTC ? sell : buy}`}
        style={styles.sellText}
        textAlign="center"
      />
      <Button icon basic fluid onClick={onClick}>
        <Icon name="resize vertical" />
      </Button>
    </Segment>
  );
}
