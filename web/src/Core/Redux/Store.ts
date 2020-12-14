import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { Reducer as UserReducer } from '../../User'
import { Reducer as ContentReducer } from '../../Data'
import CoreReducer from './Slice'

const RootReducer = combineReducers({
    user: UserReducer,
    content: ContentReducer,
    core: CoreReducer
})

const store = configureStore<typeof RootReducer>({ reducer: RootReducer })

export default store