/* Instruments */
import { counterSlice, creditCardSlice } from './slices'

export const reducer = {
  counter: counterSlice.reducer,
  creditCard: creditCardSlice.reducer
}
