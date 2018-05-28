import React from 'react'
import PropTypes from 'prop-types'
import './TransactionItem.css'
import { RemoveIcon } from './RemoveIcon'

const TransactionItem = props => {
  return (
    <div
      className="transaction-item-set"
      data-uuid={props.uuid}
      data-index={props.itemIndex}
    >
      <span
        onClick={function() {
          return props.removeItem(props.itemIndex)
        }}
      >
        <RemoveIcon />
      </span>
      <input
        type="text"
        name="name"
        className="input-theme transaction-item-name"
        placeholder="item"
        value={props.namevalue}
        onChange={e => props.handleChange(e, props.itemIndex)}
      />
      <input
        type="text"
        name="price"
        value={props.price}
        className="input-theme transaction-item-value"
        placeholder="price"
        onChange={e => props.handleChange(e, props.itemIndex)}
      />
      <label className="quantity-label">Quantity</label>
      <input
        type="text"
        value={props.quantity}
        name="quantity"
        className="input-theme transaction-item-quantity"
        placeholder="1"
        onChange={e => props.handleChange(e, props.itemIndex)}
      />
    </div>
  )
}

TransactionItem.propTypes = {
  onClick: PropTypes.func,
  onChange: PropTypes.func
}

export { TransactionItem }
