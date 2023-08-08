// action creator
// who is submitting the form

// ist action creator
const newbooking = (name, amount) => {
  return {
    type: "NEW_BOOKING",
    // this is a convention type with capital letter seprated by underscore
    payload: {
      name,
      amount,
      // if key and value are same name according to es8 we can modify it
    },
  };
};
// second action creator
const cancelBooking = (name, refundAmount) => {
  return {
    type: "CANCEL_BOOKING",
    payload: {
      name,
      refundAmount,
    },
  };
};
// reducers
// reducer 1
const ReservationHistory = (oldreservationList = [], action) => {
  if (action.type === "NEW_BOOKING") {
    return [...oldreservationList, action.payload];
  } else if (action.type === "CANCEL_BOOKING") {
    return oldreservationList.filter((record) => {
      return record.name !== action.payload.name;
    });
  }
  return oldreservationList;
};
// reducer 2
const cancellationHistory = (oldcancellationList = [], action) => {
  if (action.type === "CANCEL_BOOKING") {
    return [...oldcancellationList, action.payload];
  }
  return oldcancellationList;
};
// reducer 3
const accounting = (totalMoney = 100, action) => {
  if (action.type === "NEW_BOOKING") {
    return totalMoney + action.payload.amount;
  } else if (action.type === "CANCEL_BOOKING") {
    return totalMoney - action.payload.refundAmount;
  }
  return totalMoney;
};
// redux store
console.log(Redux);
const { createStore, combineReducers } = Redux;
const railwayCentralStore = combineReducers({
  accounting: accounting,
  ReservationHistory: ReservationHistory,
  cancellationHistory: cancellationHistory,
});
const store = createStore(railwayCentralStore);
// const action =newbooking("saveen",22)
// store.dispatch(action)
newbooking("saveen", 22);
store.dispatch(newbooking("saveen", 50));
store.dispatch(cancelBooking("naveen", 10));
console.log(store.getState());
