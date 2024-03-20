import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState: CreditCardSliceState = {
    number: "23333",
    expire: "",
    cvc: "",
    name: "",
    focus: ""
}

export const creditCardSlice = createSlice({
    name: 'creditCard',
    initialState,
    reducers: {
        save: (state, action: PayloadAction<CreditCardSliceState>) => {
            state.number = action.payload.number
            state.expire = action.payload.expire
            state.cvc = action.payload.cvc
            state.name = action.payload.name
        }
    }
});

export const { save } = creditCardSlice.actions;


export type CreditCardSliceState = {
    number: string,
    expire: string,
    cvc: string,
    name: string,
    focus: string
}