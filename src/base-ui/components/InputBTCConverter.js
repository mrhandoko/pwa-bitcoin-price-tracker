import React from 'react';
import { Form, Segment, Icon } from 'semantic-ui-react';

export default function InputBTCConverter(props) {
  const { amount, onChange, buyOptions, buyValue, onClick, sellOptions, sellValue } = props;
  return (
    <Segment padded>
      <Form>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            placeholder="Amount"
            defaultValue={amount}
            onChange={onChange}
          />
          <Form.Dropdown
            fluid
            search
            selection
            options={buyOptions}
            value={buyValue}
          />
          <Form.Button fluid basic color="blue" onClick={onClick}>
            <Icon name="resize horizontal icon" />
          </Form.Button>
          <Form.Dropdown
            fluid
            search
            selection
            options={sellOptions}
            value={sellValue}
          />
        </Form.Group>
      </Form>
    </Segment>
  );
}
