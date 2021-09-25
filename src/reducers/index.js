import { combineReducers } from "redux";
import transactions from "./transactions";

const rootReducers = combineReducers({
    transactions,
})


export default rootReducers;