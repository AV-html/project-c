import { Alert } from 'antd'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { App } from 'app/App'
import { StoreProvider } from 'app/store/store-provider'

import { DeviceProvider } from 'core/providers/device-provider'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <BrowserRouter>
    <StoreProvider>
      <DeviceProvider>
        <Alert.ErrorBoundary>
          <App/>
        </Alert.ErrorBoundary>
      </DeviceProvider>
    </StoreProvider>
  </BrowserRouter>
)
