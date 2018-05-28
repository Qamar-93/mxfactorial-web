import React from 'react'
import PropTypes from 'prop-types'

const SumItemValues = ({ transactionItems }) => {
  const priceTimesQuantity = transactionItems.map(item => {
    let price = parseFloat(item.price)
    if (isNaN(price)) {
      price = 0
    }
    let quantity = parseFloat(item.quantity)
    if (isNaN(quantity)) {
      quantity = 1
    }
    return price * quantity
  })

  const addPriceTimesQuantity = priceTimesQuantity.reduce(
    (accumulator, currentValue) => {
      return accumulator + currentValue
    },
    0
  )

  return (
    <span className="indicator sum-transaction-item-value-display-cell">
      {addPriceTimesQuantity}
    </span>
  )
}

const SumItemValuesEmpty = () => (
  <span className="indicator empty-sum-transaction-item-value-display-cell">
    total
  </span>
)

SumItemValues.propTypes = {
  transactionItems: PropTypes.arrayOf(PropTypes.object)
}

export { SumItemValues, SumItemValuesEmpty }
