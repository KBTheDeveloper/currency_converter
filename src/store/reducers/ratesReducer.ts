import { AnyAction } from "@reduxjs/toolkit";
export type RatesType = {
  rates: any,
  baseCurrency: string,
  amount: number
};
export const ratesUrl = "https://api.exchangerate.host/latest";
const initialRatesState = {
  rates: { RUB: 62.50 },
  baseCurrency: "RUB",
  amount: 0
};
export const ratesReducer = ((state: RatesType = initialRatesState, action: AnyAction) => {
  switch (action.type) {
    case "SET_RATES":
      return {
        ...state,
        rates: { ...state.rates, ...action.payload },
      };
    case "SET_AMOUNT": 
      return {
        ...state,
        amount: action.payload
      }  
    case "SET_BASE_CURRENCY":
      return {
        ...state,
        baseCurrency: action.payload
      };
    default:
      return state;
  }
});


