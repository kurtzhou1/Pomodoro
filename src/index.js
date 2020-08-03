import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/module';
import {Provider} from 'react-redux';
import {createStore} from 'redux'
import {initState, reducer} from './reducers/index'

const store = createStore(reducer,initState)

export const APP= ()=><Provider store={store}><App /></Provider>

ReactDOM.render(<APP/>,  document.getElementById('root'));

// Functional map

// 待辦事項
  // 設定待辦事項名稱或內容
  // 設定待辦事項成已完成狀態
  // 調整排列順序

// 蕃茄鐘
  // 固定時間區間
    // 主工作時間：25 分鐘
    // 短休息時間：5 分鐘
  // 時間倒數介面
    // 顯示進行中待辦事項
    // 有開始鍵能啟動倒數
    // 能暫停倒數
    // 能略過倒數（作廢）
    // 顯示倒數時間
    // 提示鈴聲選項

// 狀態報表
  // 當天使用蕃茄鐘的記錄與成效
  // 當週使用蕃茄鐘的記錄與成效 　