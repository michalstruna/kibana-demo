import UserRole from './Constants/UserRole'

export type UserSimple = {
    name: string
}

export type Identity = UserSimple & {
    token: string
    role: UserRole
}

export type Credentials = {
    email: string,
    password: string
}

export type ResetPasswordCredentials = {
    password: string
    token: string
}

export type RegistrationData = Credentials & {
    passwordAgain: string
}

export type ForgotPasswordData = {
    email: string
}

export type ExternalCredentials = {
    token: string
}