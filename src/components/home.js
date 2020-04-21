import React, { useEffect } from 'react'
import axios from 'axios'
import { useImmer } from 'use-immer'
import { Select, InputNumber } from 'antd'
import 'antd/dist/antd.less'
import '../less/app.less'
import Invoice from './invoice'
import { FUNCTIONS_URL } from '../constants/app'

const { Option } = Select

function Home () {
  const [state, setState] = useImmer({
    data: {},
    selectedOrderId: '',
    shippingFee: 0.00

  })

  useEffect(() => {
    const url = `${FUNCTIONS_URL}/invoice`
    axios.get(url)
      .then(response => {
        const { data } = response
        console.log({ data })
        setState(draft => { draft.data = data })
      })
  }, [])

  const orderIds = Object.keys(state.data)

  const handleChange = value => setState(draft => { draft.selectedOrderId = value })
  const onChangeFee = shippingFee => setState(draft => { draft.shippingFee = shippingFee })

  return (
    <main>
      <div className='createInvoice'>
        <p className='emphasize'>Please select the order id to create invoice: </p>
        <Select placeholder='select invoice' onChange={handleChange}>
          {
            orderIds.map(orderId => (
              <Option value={orderId} key={orderId}>{state.data[orderId].contactPerson} - {orderId}</Option>
            ))
          }
        </Select>

        <p className='emphasize'>Shipping fee</p>
        <InputNumber min={0.00} defaultValue={state.shippingFee} onChange={onChangeFee} />

        {
          state.selectedOrderId && (
            <Invoice transaction={state.data[state.selectedOrderId]} shippingFee={state.shippingFee} />
          )
        }
      </div>
    </main>
  )
}

export default Home
