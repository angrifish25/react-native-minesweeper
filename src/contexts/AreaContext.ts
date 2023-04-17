import {createContext, useContext} from 'react';
import type {TAreaContext} from '../types';

const AreaContext = createContext<TAreaContext>();

export const AreaContextProvider = AreaContext.Provider;

export const useAreaContext = () => useContext(AreaContext);
