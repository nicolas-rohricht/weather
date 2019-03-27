import Type from '../actions/actionsTypes';

const INITIAL_STATE = {
  nameOfCity: 'Blumenau',
  gettingWeatherOfCity: false,
  weatherData: {},
  weekDays: [],
  hoursOfTheDay: [],
  selectedHour: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Type.CHANGE_NAME_OF_CITY:
      return {
        ...state,
        nameOfCity: action.payload,
      }
    case Type.GETTING_WEATHER_OF_CITY:
      return {
        ...state,
        gettingWeatherOfCity: true
      }
    case Type.GETTING_WEATHER_OF_CITY_SUCCESS: 
      return {
        ...state,
        gettingWeatherOfCity: false,
        weekDays: action.payload.weekDays,
        weatherData: action.payload.weatherData
      }
    case Type.GETTING_WEATHER_OF_CITY_FAIL: 
      return {
        ...state,
        gettingWeatherOfCity: false,
      }
    case Type.CHANGE_HOURS_OF_THE_DAY: 
      return {
        ...state,
        hoursOfTheDay: action.payload
      }
    case Type.CHANGE_SELECTED_HOUR:
      return {
        ...state,
        selectedHour: action.payload
      }
    default:
    return state;
  }
};
