import { configureStore } from "@reduxjs/toolkit";
import { logger } from "redux-logger";
import modeReducer from "../../redux/reducers/modeReducer";
import freReducer from "../../redux/reducers/freReducer";
import tableReducer from "../../redux/reducers/tableReducer";
import chartReducer from "../../redux/reducers/chartReducer";
import filterReducer from "../../redux/reducers/filterReducer";

export default function createStore() {
  const store = configureStore({
    reducer: {
      frequency: freReducer,
      table: tableReducer,
      chart: chartReducer,
      mode: modeReducer,
      filter: filterReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([logger]),
  });

  return store;
}
