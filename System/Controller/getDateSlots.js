import { fetchGetFunction } from "../Utility/MyLib";

export const getDateSlots = (forDate) => {
  return new Promise(async resolve => {
    await fetchGetFunction('date_slots/'+forDate).then(date => {
      resolve(date)
    })
  })
}
export const getTimeSlot = (selectedDay) => {
  let day = (selectedDay === 'today') ? 'today' : null
  return new Promise(async resolve => {
    await fetchGetFunction('time_slots/'+ day).then(date => {
      resolve(date)
    })
  })
}
