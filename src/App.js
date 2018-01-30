import React, { Component } from 'react';
import {
  Header,
  Container,
  Loader,
  Table,
  Form,
  Divider,
  Segment,
  Button,
  Icon,
} from 'semantic-ui-react';

const currencies = [
  {
    text: 'USD',
    value: 'USD',
    icon: 'dollar',
  },
];

const cryptoCurrencies = [
  {
    text: 'XBT - Bitcoin',
    value: 'XBT',
    icon: 'bitcoin',
  },
];

class App extends Component {
  constructor() {
    super();
    this.state = {
      messages: '',
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
        messages: JSON.parse(evt.data).x.inputs,
      });
    };

    setInterval(() => {
      this.connection.send(JSON.stringify({ op: 'unconfirmed_sub' }));
    }, 2000);

    setInterval(() => this.getBitcoinPrice(), 2000);
  }

  getBitcoinPrice() {
    fetch('https://blockchain.info/ticker')
      .then(response => response.json())
      .then(result => this.setState({
        lastPrice: result.USD.last,
      }));
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
        <Container>
          <Segment>
            <Header
              as="h3"
              content={`${this.state.amount} ${this.state.isBTC ? 'XBT' : 'USD'}`}
              style={{ fontWeight: 'normal', color: '#888', fontSize: '1.5em' }}
              textAlign="center"
            />
            <Header
              as="h2"
              content={this.state.isBTC ?
                (this.state.amount * this.state.lastPrice).toFixed(2)
                : parseFloat((this.state.amount / this.state.lastPrice).toFixed(7))}
              style={{ fontSize: '2.5em', fontWeight: 'normal', color: '#015b9d' }}
              textAlign="center"
            />
            <Header
              as="h3"
              content={`${this.state.isBTC ? 'USD' : 'XBT'}`}
              style={{ fontSize: '1.5em', fontWeight: 'normal', color: '#888' }}
              textAlign="center"
            />
            <Button icon basic fluid onClick={() => this.setState({ isBTC: !this.state.isBTC })}>
              <Icon name="resize vertical icon" />
            </Button>
          </Segment>
        </Container>
        <Container>
          <Segment>
            <Form>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  placeholder="Amount"
                  defaultValue={this.state.amount}
                  onChange={event => this.setState({ amount: event.target.value })}
                />
                <Form.Dropdown
                  fluid
                  search
                  selection
                  options={this.state.isBTC ? cryptoCurrencies : currencies}
                  value={this.state.isBTC ? cryptoCurrencies[0].value : currencies[0].value}
                />
                <Form.Button fluid basic color="blue" onClick={() => this.setState({ isBTC: !this.state.isBTC })}>
                  <Icon name="resize horizontal icon" />
                </Form.Button>
                <Form.Dropdown
                  fluid
                  search
                  selection
                  options={!this.state.isBTC ? cryptoCurrencies : currencies}
                  value={!this.state.isBTC ? cryptoCurrencies[0].value : currencies[0].value}
                />
              </Form.Group>
            </Form>
          </Segment>
        </Container>
        {
          this.state.messages !== '' ? (
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Sequence</Table.HeaderCell>
                  <Table.HeaderCell>TX Index</Table.HeaderCell>
                  <Table.HeaderCell>Value</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {
                this.state.messages.map((message) => (
                  <Table.Row key={message.time}>
                    <Table.Cell>{message.sequence}</Table.Cell>
                    <Table.Cell>{message.prev_out.tx_index}</Table.Cell>
                    <Table.Cell>{message.prev_out.value}</Table.Cell>
                  </Table.Row>
                ))
              }
              </Table.Body>
            </Table>
          ) : (
            <Loader active />
          )
        }
      </Container>
    );
  }
}

export default App;
