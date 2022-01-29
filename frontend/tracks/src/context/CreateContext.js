import React from "react";
import { createContext, useReducer } from "react";

export default (reducer, actions, defaultValue) => {
  const Context = createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultValue);
    const mappedDispatchtoActions = actions(dispatch);

    return (
      <Context.Provider value={{ state, ...mappedDispatchtoActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};
