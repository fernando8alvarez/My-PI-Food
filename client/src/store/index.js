import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import rootReducer from '../reducer/index.js';


 const store = createStore(
    rootReducer,//conectar el reducer y el store
    composeWithDevTools(applyMiddleware(thunk))//para manejar la extension
);

export default store;