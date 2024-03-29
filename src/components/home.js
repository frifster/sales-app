import React, { useEffect } from 'react'
import axios from 'axios'
import { useImmer } from 'use-immer'
import { Select, InputNumber } from 'antd'
import { RedoOutlined } from '@ant-design/icons'

import 'antd/dist/antd.less'
import '../less/app.less'
import Invoice from './Invoice'
import { FUNCTIONS_URL, STORES } from '../constants/app'

const { Option } = Select

function Home () {
  const [state, setState] = useImmer({
    data: {},
    selectedOrderId: '',
    shippingFee: 0.00,
    loading: false,
    storeId: ''
  })

  const setLoading = boolean => setState(draft => { draft.loading = boolean })

  useEffect(() => {
    state.storeId && requestData()
  }, [state.storeId])

  const requestData = async () => {
    if (state.loading) return

    setLoading(true)

    const url = `${FUNCTIONS_URL}/invoice`
    const spreadsheetId = STORES[state.storeId].spreadsheetId
    const response = await axios.post(url, { spreadsheetId })
    const { data } = response
    setState(draft => {
      draft.data = data
      draft.selectedOrderId = ''
      draft.loading = false
    })
  }

  const orderIds = Object.keys(state.data)

  const handleChange = value => {
    if (!value) return
    setState(draft => {
      draft.selectedOrderId = value
      draft.shippingFee = state.data[value].shippingFee ? Number(state.data[value].shippingFee) : 0
    })
  }

  const handleStoreChange = storeId => {
    setState(draft => {
      draft.storeId = storeId
    })
  }
  const onChangeFee = shippingFee => setState(draft => { draft.shippingFee = shippingFee })

  const storeIds = Object.keys(STORES)

  return (
    <main className='main-container'>
      <div className='menu'>
        <p className='emphasize'>1. Select a store: </p>
        <Select placeholder='select a store' onChange={handleStoreChange}>
          {
            storeIds.map(storeId => (
              <Option value={storeId} key={storeId}>{STORES[storeId].name}</Option>
            ))
          }
        </Select>
        <p className='emphasize'>2. Please select the order id to create invoice: </p>
        <Select placeholder='select invoice' onChange={handleChange}>
          {
            !state.selectedOrderId && !orderIds.length && (
              <Option value=''>No Available Invoice</Option>
            )
          }
          {
            orderIds.map(orderId => (
              <Option value={orderId} key={orderId}>{state.data[orderId].contactPerson} - {orderId}</Option>
            ))
          }
        </Select>
        <RedoOutlined className='redo-icon' title='Refresh List' onClick={requestData} />

        <p className='emphasize'>3. Shipping fee (Change shipping fee if needed)</p>
        <InputNumber min={0.00} max={2000.00} value={state.shippingFee} onChange={onChangeFee} />
      </div>
      <div className='createInvoice'>
        {
          state.selectedOrderId && (
            <Invoice transaction={state.data[state.selectedOrderId]} shippingFee={state.shippingFee} selectedStore={state.storeId} />
          )
        }
      </div>
    </main>
  )
}

export default Home
