import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Container, Divider } from 'semantic-ui-react';
import { fetchBitcoinRate } from './actions';
import {
  BTCDisplayConverter,
  InputBTCConverter,
  TransactionHistory,
} from './base-ui';
import { currencies, cryptoCurrencies } from './common';

class App extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      lastPrice: 0,
      amount: 1,
      isBTC: true,
    };
  }

  componentDidMount() {
    this.getBitcoinPrice();
    this.connection = new WebSocket('wss://ws.blockchain.info/inv');
    this.connection.onmessage = (evt) => {
      this.setState({
        messages: JSON.parse(evt.data).x.inputs.concat(this.state.messages),
      });
    };

    setInterval(() => {
      this.connection.send(JSON.stringify({ op: 'unconfirmed_sub' }));
    }, 2000);

    setInterval(() => this.getBitcoinPrice(), 2000);
  }

  async getBitcoinPrice() {
    await this.props.fetchBitcoinRate();
    const { USD } = this.props.bitcoinRate.data;
    this.setState({
      lastPrice: USD,
    });
  }

  render() {
    return (
      <Container>
        <Header
          as="h1"
          content="Bitcoin Price Tracker"
          style={{
            fontSize: '4em', fontWeight: 'normal', marginBottom: 0, marginTop: '3em',
          }}
          textAlign="center"
        />
        <Divider />
        <BTCDisplayConverter
          isBTC={this.state.isBTC}
          amount={this.state.amount}
          lastPrice={this.state.lastPrice}
          buy="XBT"
          sell="USD"
          onClick={() => this.setState({ isBTC: !this.state.isBTC })}
        />
        <InputBTCConverter
          amount={this.state.amount}
          onChange={event => this.setState({ amount: event.target.value })}
          buyOptions={this.state.isBTC ? cryptoCurrencies : currencies}
          buyValue={this.state.isBTC ? cryptoCurrencies[0].value : currencies[0].value}
          onClick={() => this.setState({ isBTC: !this.state.isBTC })}
          sellOptions={!this.state.isBTC ? cryptoCurrencies : currencies}
          sellValue={!this.state.isBTC ? cryptoCurrencies[0].value : currencies[0].value}
        />
        <TransactionHistory
          title="Transaction History"
          messages={this.state.messages}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  bitcoinRate: state.bitcoinRateStore.bitcoinRate,
});

const mapDispatchToProps = dispatch => ({
  fetchBitcoinRate: () => dispatch(fetchBitcoinRate()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
