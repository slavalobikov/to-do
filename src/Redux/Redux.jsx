
import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import ToDoReducer from "./Reducers/ToDoReducer";

let reducers = combineReducers({
    ToDoReducer,
});

const persistConfig = {
    key: 'toDo',
    storage: storage,
    whitelist: ['ToDoReducer'] // which reducer want to store
};
const pReducer = persistReducer(persistConfig, reducers);
const middleware = applyMiddleware(thunk);
const store = createStore(pReducer, middleware);
const persistor = persistStore(store);
export { persistor, store };


