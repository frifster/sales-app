import React, { useEffect } from 'react'
import axios from 'axios'
import { useImmer } from 'use-immer'
import { Select, InputNumber } from 'antd'
import { RedoOutlined } from '@ant-design/icons'

import 'antd/dist/antd.less'
import '../less/app.less'
import Invoice from './invoice'
import { FUNCTIONS_URL } from '../constants/app'

const { Option } = Select

function Home () {
  const [state, setState] = useImmer({
    data: {},
    selectedOrderId: '',
    shippingFee: 0.00,
    loading: false
  })

  const setLoading = boolean => setState(draft => { draft.loading = boolean })

  useEffect(() => {
    requestData()
  }, [])

  const requestData = async () => {
    if (state.loading) return console.log('RETURNING')

    setLoading(true)

    const url = `${FUNCTIONS_URL}/invoice`
    const response = await axios.get(url)
    const { data } = response
    setState(draft => {
      draft.data = data
      draft.loading = false
    })
  }

  const orderIds = Object.keys(state.data)

  const handleChange = value => {
    setState(draft => {
      draft.selectedOrderId = value
      draft.shippingFee = state.data[value].shippingFee ? Number(state.data[value].shippingFee) : 0
    })
  }
  const onChangeFee = shippingFee => setState(draft => { draft.shippingFee = shippingFee })

  return (
    <main className='main-container'>
      <div className='menu'>
        <p className='emphasize'>1. Please select the order id to create invoice: </p>
        <Select placeholder='select invoice' onChange={handleChange}>
          {
            orderIds.map(orderId => (
              <Option value={orderId} key={orderId}>{state.data[orderId].contactPerson} - {orderId}</Option>
            ))
          }
        </Select>
        <RedoOutlined className='redo-icon' title='Refresh List' onClick={requestData} />

        <p className='emphasize'>2. Shipping fee (Change shipping fee if needed)</p>
        <InputNumber min={0.00} max={2000.00} value={state.shippingFee} onChange={onChangeFee} />
      </div>
      <div className='createInvoice'>
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
