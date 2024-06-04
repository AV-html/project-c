export interface IUserState {
  userInfo: IUser | null
}

interface IUserRole {
  id: number
  name: string
}

interface ISession {
  id: number
  ip: string | ''
  type: 'auth-token' | 'ldap-token'
}

interface IUserTenantInfo {
  id: number
  title: string
}

export interface IUser {
  id: number
  name: string | null
  email: string
  login: string
  is_blocked: boolean
  user_source: 'LOCAL' | 'LDAP'
  avatar: string | null
  roles: IUserRole[]
  tenants: IUserTenantInfo[]
  created_at?: string
  last_login_at?: string | null
  event_permissions: IEventPermissions
  system_permissions: ISystemPermissions
  created_by?: {
    id: number
    full_name: string
  } | null
  active_sessions: ISession[]
  current_session: ISession | null
}

export interface ISystemPermissions {
  dashboard_view: boolean
  dashboard_edit: boolean
  dashboard_owner: boolean
  dashboard_export_report: boolean
  view_all_events: boolean
  event_view_edit: boolean
  event_import: boolean
  event_export: boolean
  dashboard_view_edit: boolean
  dashboard_import: boolean
  dashboard_export: boolean
  users_view_edit: boolean
  settings_ldap_view_edit: boolean
  settings_smtp_view_edit: boolean
  settings_system_components_view_edit: boolean
  scheduled_reports_view_edit: boolean
  event_processing_view: boolean
  event_processing_edit: boolean
  tenant_view: boolean
  tenant_edit: boolean
  role_edit: boolean
}

export type TSystemPermissionsKeys = keyof ISystemPermissions

export interface IEventPermissions {
  field: string
  values: string[]
  description?: string
}
