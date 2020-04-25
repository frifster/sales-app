import React from 'react'
import firebase from 'firebase/app'
import { Input, Tooltip, Button, notification } from 'antd'
import { InfoCircleOutlined, MailOutlined, LockOutlined } from '@ant-design/icons'
import { useImmer } from 'use-immer'

const LoginPage = () => {
  const initialState = {
    email: '',
    password: ''
  }
  const [state, setState] = useImmer(initialState)

  const onChange = e => {
    e.persist()
    setState(draft => {
      draft[e.target.type] = e.target.value
    })
  }

  const onLogin = () => {
    const { email, password } = state
    if (!email || !password) {
      notification.error({ message: 'Please fill up the form correctly' })
      return
    }
    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(err => notification.error({ message: err.message }))
  }

  return (
    <div className='login-container'>
      <div className='login-form'>
        <span className='login-header'>Welcome to the Busy Peddlers!</span>
        <div className='form-container'>
          <Input
            value={state.email}
            onChange={onChange}
            type='email'
            placeholder='Email Address'
            prefix={<MailOutlined className='site-form-item-icon' />}
            suffix={
              <Tooltip title='Your registered Email address'>
                <InfoCircleOutlined />
              </Tooltip>
            }
          />
          <Input
            value={state.password}
            onChange={onChange}
            type='password'
            placeholder='Password'
            prefix={<LockOutlined className='site-form-item-icon' />}
            suffix={
              <Tooltip title='Your provided password'>
                <InfoCircleOutlined />
              </Tooltip>
            }
          />
        </div>
        <div className='form-actions'>
          <Button onClick={onLogin}>Log-in</Button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
