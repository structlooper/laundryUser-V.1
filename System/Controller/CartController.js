import { fetchAuthPostFunction } from "../Utility/MyLib";

export const placeOrder = (data) => {
  return new Promise(resolve => {
    fetchAuthPostFunction('cart/order_create',data).then(response => {
      resolve(response);
    })
  })
}
