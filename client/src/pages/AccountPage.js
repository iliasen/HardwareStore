import React, {useContext, useState} from 'react'
import { Context } from '../index'
import { useNavigate } from 'react-router-dom'
import {LOGIN_ROUTE, SHOP_ROUTE} from '../utils/consts'

import '../styles/AccountPage.css'
import Delete from "../components/modals/DelAccount";
import ChangePass from "../components/modals/ChangePass";
const AccountPage = () => {
  const {user} = useContext(Context)
  const [delVisible, setDelVisible] = useState(false)
  const [changeVisible, setChangeVisible] = useState(false)

  let nav = useNavigate()
  const logOut = async () => {
    user.setUser({})
    user.setAuth(false)
    localStorage.clear();
    nav(SHOP_ROUTE)
  }

  const switch_account = async () => {
      nav(LOGIN_ROUTE)
  }

  return (
  <div className='Account'>
      <div className="User_data">
        <div className='Logo_account'></div>
        <div className='User_info'>
          <div>
            <span className='title-characteristics_acc'>email:</span>{user.user.email}
          </div>
          <div>
            <span className='title-characteristics_acc'>id:</span>{user.user.id}
          </div>
          <div>
            <span className='title-characteristics_acc'>role:</span>{user.user.role}
          </div>
        </div>
        <div className='interactions_with_acc'>
          <div className='switch_account_button' onClick={() => setChangeVisible(true)}>Изменить пароль</div>
          <div className='logOut_button' onClick={() => setDelVisible(true)}>Удалить аккаунт</div>
        </div>
        <div className='change_acc_buttons'>
          <button id='change' onClick={switch_account}>Сменить аккаунт</button>
          <button id='logOut' onClick={logOut}>Выйти</button>
        </div>

        <Delete show={delVisible} onHide={() => setDelVisible(false)}></Delete>
        <ChangePass show={changeVisible} onHide={() => setChangeVisible(false)}></ChangePass>
      </div>

  </div>
  )
}

export default AccountPage
