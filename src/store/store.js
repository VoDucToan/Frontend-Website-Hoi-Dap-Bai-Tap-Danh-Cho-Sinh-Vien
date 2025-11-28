import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice';
import loadingReducer from './slices/loadingSlice';
import notFoundReducer from './slices/notFoundSlice';

export default configureStore({
    reducer: {
        auth: authReducer,
        loading: loadingReducer,
        notFound: notFoundReducer,
    }
})