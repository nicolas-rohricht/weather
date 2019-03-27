import { Alert } from 'react-native';
import Type from './actionsTypes';
import { Api } from '../config';
import moment from 'moment';
import _ from 'lodash';

export const changeNameOfCity = ( nameOfCity ) => ({
  type: Type.CHANGE_NAME_OF_CITY,
  payload: nameOfCity
})

export const getWeatherOfTheCity = ( nameOfCity) => (dispatch) => {
  dispatch({ type: Type.GETTING_WEATHER_OF_CITY });

  const params = {};
  params.q=`${nameOfCity},br`;
  params.appid = 'ccb2259295ec5499c4c4626544e8dcfe';
  params.lang = 'pt';
  params.units = 'metric';

  Api.get(`/data/2.5/forecast`, params)
  .then(response => {
    if (response.ok) {
      //Adiciona os campos que serão usados na tela para tratamento
      response.data.list.map(element => {
        const newElement = element;
        newElement.day = moment(element.dt_txt).format('YYYY-MM-DD');
        newElement.hour = moment(element.dt_txt).format('HH:mm');
        newElement.icon = `http://openweathermap.org/img/w/${element.weather[0].icon}.png`
        return newElement;
      });
      
      //Salva nessa constante pois irá usar ela como base para as rotinas abaixo
      const searchedCity = response.data.city.name;

      const weatherData = response.data.list.map(element => {
        const newElement = element;
        newElement.city = searchedCity;

        return newElement;
      });
      
      //Monta o array de dias da semana
      const weekDays = _(weatherData)
      .groupBy('day')
      .map(element => {
        const newElement = {} ;
        newElement.dt = element[0].dt;
        newElement.day = element[0].day;
        return newElement;
      }).value();
      
      //Monta o array as horas do dia selecionado
      changeSelectedDay( weatherData, weekDays[0].day, dispatch );
      
      //Evolui no state o array de dias da semana
      dispatch({ type: Type.GETTING_WEATHER_OF_CITY_SUCCESS,
        payload: { weatherData, weekDays } });
        
        
    } else {
      if (response.data.cod == 404) {
        Alert.alert('Cidade não encontrada');

        dispatch({ type: Type.GETTING_WEATHER_OF_CITY_FAIL });
      }
    }
  })
}

const changeSelectedDay = ( weatherData, selectedDay, dispatch ) => {
  //Monta o array as horas do dia de acordo com o dia selecionado
  const hoursOfTheDay = weatherData
  .filter(element =>  element.day === selectedDay )
  .map(element => { 
    const hourObject = {};
    hourObject.dt = element.dt;
    hourObject.icon = element.icon;
    hourObject.hour = element.hour;
    hourObject.maxTemperature = `${element.main.temp_max.toString().substring(0,2)}°C`;
    hourObject.selected = false;
    return hourObject;
  }); 

  //Seta como hora selecionada a primeira do dia para preencher as informações da view principal
  changeSelectedHour( weatherData, hoursOfTheDay[0].dt, dispatch );

  //Evolui no state o array de horas do dia
  dispatch({ type: Type.CHANGE_HOURS_OF_THE_DAY,
             payload: hoursOfTheDay });
}

const changeSelectedHour = ( weatherData, selectedHour, dispatch ) => {
  //Monta o objeto de informações da hora selecionada
  const infosOfSelectedHour = weatherData
  .filter(element => element.dt === selectedHour)
  .map(element => {
    console.tron.log(weatherData);
    const newElement = {};
    newElement.actualTemperature = `${element.main.temp.toString().substring(0,2)}°C`;
    newElement.minTemperature = `${element.main.temp_min.toString().substring(0,2)}°C`;
    newElement.maxTemperature = `${element.main.temp_max.toString().substring(0,2)}°C`;
    newElement.pressure = `${element.main.pressure.toString().substring(0,4)}hPa`;
    newElement.humidity = `${element.main.humidity}%`;
    newElement.description = element.weather[0].description;
    newElement.icon = element.icon;
    newElement.backgroundVideo = `${element.weather[0].description.replace(/\s/g, "")}${element.sys.pod}`;
    newElement.cityDayAndHour = `${element.city} -  ${moment(element.day).format('DD/MM')} ${element.hour}`;
    return newElement;
  });

  //Evolui no state o objeto de informações da hora selecionada
  dispatch({ type: Type.CHANGE_SELECTED_HOUR,
             payload: infosOfSelectedHour[0] });

}

export const changeSelectedDayByUser = ( weatherData, selectedDay ) => ( dispatch ) => {
  changeSelectedDay( weatherData, selectedDay, dispatch );
}

export const changeSelectedHourByUser = ( weatherData, selectedHour ) => ( dispatch ) => {
  changeSelectedHour( weatherData, selectedHour, dispatch );
}
