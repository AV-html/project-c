import { goToLoginRoute } from 'app/app-router/app-router-configs'

import { LOCAL_STORAGE_TOKEN_KEY } from './rtk-query-constants'

export const logout = () => {
  localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY)
  window.location.replace(`${window.location.origin}/${goToLoginRoute()}`)
}
