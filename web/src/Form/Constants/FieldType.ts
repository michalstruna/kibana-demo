import { Validator } from '../../Native'

export default {

    TEXT: {
        name: 'text',
        validator: () => true
    },

    NUMBER: {
        name: 'number',
        validator: (value: any) => /[0-9]*/.test(value)
    },

    EMAIL: {
        name: 'email',
        validator: Validator.isEmail
    },

    PASSWORD: {
        name: 'password',
        validator: () => true
    },

    TEXTAREA: {
        name: 'textarea',
        validator: () => true
    },

    DATE: {
        name: 'date',
        validator: () => true // TODO: Validate date.
    },

    SELECT: {
        name: 'select',
        validator: () => true
    }

}