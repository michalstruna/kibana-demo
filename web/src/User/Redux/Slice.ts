import Cookies from 'js-cookie'

import { Cookie } from '../../Native'
import { Redux } from '../../Data'
import UserRole from '../Constants/UserRole'
import { Credentials, ExternalCredentials, Identity, ResetPasswordCredentials, UserSimple } from '../types'
import { Requests } from '../../Async'

const Slice = Redux.slice(
    'user',
    {
        identity: Redux.async<Identity>(Cookies.getJSON(Cookie.IDENTITY.name)),
        forgotPassword: Redux.async<void>()
    },
    ({ set, async, plain }) => ({
        login: async<Credentials, Identity>('identity', ({ email, password }) => Requests.post('auth', { name: email, password }), {
            onSuccess: (state, action) => {
                state.identity.payload = action.payload
                Cookies.set(Cookie.IDENTITY.name, action.payload, { expires: Cookie.IDENTITY.expiration })
            }
        }),
        signUp: async<Credentials, Identity>('identity', ({ email, password }) => Requests.post('auth/new', { name: email, password }), {
            onSuccess: (state, action) => {
                state.identity.payload = action.payload
                Cookies.set(Cookie.IDENTITY.name, action.payload, { expires: Cookie.IDENTITY.expiration })
            }
        }),
        logout: plain<void>(state => {
            state.identity.payload = null
            Cookies.remove(Cookie.IDENTITY.name)
        }),
        forgotPassword: async<string, void>('forgotPassword', username => Requests.post('auth/password/reset', { username })),
        resetPassword: async<ResetPasswordCredentials, void>('forgotPassword', credentials => Requests.post('auth/password', credentials))
    })
)

export default Slice.reducer
export const { login, signUp, logout, forgotPassword, resetPassword } = Slice.actions