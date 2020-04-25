import React from 'react'
import header from '../images/header.png'
import { FacebookFilled, HomeFilled, PhoneFilled } from '@ant-design/icons'
import { STORES } from '../constants/app'

function Invoice ({ transaction, shippingFee, selectedStore }) {
  const {
    dateOrdered,
    contactPerson,
    contactNumber,
    address,
    orders,
    orderId
  } = transaction

  const shippingIsValid = shippingFee && typeof shippingFee !== 'string' && Number(shippingFee) > 0

  const subtotal = orders.reduce((currentTotal, order) => {
    currentTotal = currentTotal + Number(order.amount.replace(/[$,]+/g, ''))
    return currentTotal
  }, 0.00)

  const vatSales = subtotal * 0.88
  const vat = subtotal - vatSales
  const totalAmount = shippingIsValid ? subtotal + shippingFee : subtotal
  const store = STORES[selectedStore]
  const headClass = selectedStore === 'NM' ? 'invoice' : 'invoice secondary'

  return (
    <div className={headClass}>
      <div className='invoice-header'>
        <div className='company-logo'>
          {
            selectedStore === 'NM' ? <img src={header} alt='Nourish Me Company Logo' /> : store.name
          }
        </div>
        <div className='company-info-field'>
          <span className='info-field'> <FacebookFilled /> {store.facebookLink}</span>
          <span className='info-field'> <HomeFilled /> {store.address}</span>
          <span className='info-field'> <PhoneFilled /> {store.contact}</span>
        </div>
      </div>
      <div className='invoice-body'>
        <div className='invoice-info'>
          <div className='emphasize'>Invoice #</div>
          <div>{orderId}</div>
          <div>{dateOrdered}</div>
        </div>
        <div className='customer-info'>
          <span className='emphasize'>BILLED TO:</span>
          <span>{contactPerson}</span>
          <span>{contactNumber}</span>
          <span>{address}</span>
        </div>
        <div className='orders-table'>
          <div className='order-headers emphasize'>
            <div>QUANTITY</div>
            <div>UOM</div>
            <div>ITEM</div>
            <div>UNIT COST</div>
            <div>AMOUNT</div>
          </div>
          {
            orders.map((order, index) => (
              <div className='order-content' key={index}>
                <div>{order.quantity}</div>
                <div>bottle/s</div>
                <div>{order.item}</div>
                <div>₱ {order.unitCost}</div>
                <div>₱ {order.amount}</div>
              </div>
            ))
          }
        </div>
        <div className='summary'>
          <div className='summary-content'>
            <div className='grid-two'>
              <div className='less-emphasis'>VAT SALES</div>
              <div className='less-emphasis'>₱ {vatSales.toFixed(2)}</div>
            </div>
            <div className='grid-two'>
              <div className='less-emphasis'>VAT</div>
              <div className='less-emphasis'>₱ {vat.toFixed(2)}</div>
            </div>
            <div className='grid-two'>
              <div>SUBTOTAL</div>
              <div>₱ {subtotal.toFixed(2)}</div>
            </div>
            <div className='grid-two'>
              <div>SHIPPING FEE</div>
              <div>{shippingIsValid ? '₱ ' + Number(shippingFee).toFixed(2) : 'Free'}</div>
            </div>
            <div className='grid-two border-two'>
              <div className='emphasize'>TOTAL AMOUNT</div>
              <div className='emphasize'>₱ {totalAmount.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Invoice
