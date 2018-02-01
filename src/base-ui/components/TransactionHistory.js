import React from 'react';
import {
  Loader,
  Table,
  Card,
} from 'semantic-ui-react';

export default function TransactionHistory(props) {
  const { title, messages } = props;
  return (
    <Card style={{ width: '100%', marginBottom: 20 }}>
      <Card.Content header={title} />
      <Card.Content>
        {
          messages.length !== 0 ? (
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
                  messages.slice(0, 20).map(message => (
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
      </Card.Content>
    </Card>
  );
}
