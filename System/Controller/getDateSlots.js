import { fetchGetFunction } from "../Utility/MyLib";

export const getDateSlots = (forDate) => {
  return new Promise(async resolve => {
    await fetchGetFunction('date_slots/'+forDate).then(date => {
      resolve(date)
    })
  })
}
export const getTimeSlot = () => {
  return new Promise(async resolve => {
    await fetchGetFunction('time_slots').then(date => {
      resolve(date)
    })
  })
}
