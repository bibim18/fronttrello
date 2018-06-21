import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import 'bootstrap/dist/css/bootstrap.min.css'
import FontAwesome from 'react-fontawesome'

const store = createStore(rootReducer, applyMiddleware(thunk))
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()

//ทุกครั้งที่แก้อะไรใน app มันจะดูว่าจริงๆแก้อะไรไปบ้าง ก็จะ refresh แค่ส่วนนั้นให้เลย
// if (module.hot) {
//   module.hot.accept('./App', () => {
//     const NextApp = require('./App').default
//     ReactDOM.render(<NextApp />, document.getElementById('root'))
//   })
// }
