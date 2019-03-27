import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, FlatList, Image, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import Button from 'apsl-react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-video';
import _ from 'lodash';
import moment from 'moment';
import * as Animatable from 'react-native-animatable';

import Styles from '../../styles';

import { changeNameOfCity, getWeatherOfTheCity, changeSelectedDayByUser, changeSelectedHourByUser } from '../../actions/appActions';
import { moderateScale, scale, verticalScale } from '../../sizes';
import { isNullOrUndefined } from '../../utils';

const colorOfContent = '#bfbfbf';

class Main extends Component {
  componentDidMount() {
    this.props.getWeatherOfTheCity( this.props.nameOfCity)
  }

  renderWeekDay( weekDay ) {
    return(
      <TouchableWithoutFeedback onPress={() => {
        //Muda o dia selecinado
        this.props.changeSelectedDayByUser( this.props.weatherData, weekDay.day );
      }}>
        <View style={ styles.weekDayContainer }>
          <Icon name='calendar-o' style={ styles.calendarIcon }/> 
          <Text style={ styles.calendarDateLabel }>{moment(weekDay.day).format('DD')}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  renderHourOfTheDay( hourOfTheDay ) {
    return(
      <TouchableWithoutFeedback onPress={() => this.props.changeSelectedHourByUser( this.props.weatherData, hourOfTheDay.dt ) }>
        <View style={ styles.hourOfTheDayContainer }>
          <Image
            style={ styles.hourOfTheDayIcon }
            source={{ uri: hourOfTheDay.icon }}
            resizeMode='contain'
          />
          <Text style={ styles.hourLabel }>{hourOfTheDay.hour}</Text>
          <Text style={ styles.maxTemperatureLabel }>{hourOfTheDay.maxTemperature}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
  
  renderBackgroundVideo() {
    console.tron.log(this.props.selectedHour.backgroundVideo);
    //Infelizmente o componente background video não aceita concatenação de nome no require do source do vídeo
    //Dessa forma, tive que fazer essa rotina "não muito bonita" para renderização dinamica do vídeo de acordo com a hora selecionada pelo usuário
    switch (this.props.selectedHour.backgroundVideo) {
      //DIA
      case 'céulimpod':
        return(
          <Video source={require(`../../weatherVideos/clearskyd.mp4`)}   // Can be a URL or a local file.
            ref={(ref) => { this.player = ref }}                                      // Store reference
            onBuffer={this.onBuffer}                // Callback when remote video is buffering
            onError={this.videoError}               // Callback when video cannot be loaded
            style={styles.backgroundVideo} 
            resizeMode="cover" 
            repeat={true}
            volume={1} 
            muted={true}
          />
        )
        break;
      case 'céupouconubladod':
        return(
          <Video source={require(`../../weatherVideos/fewcloudsd.mp4`)}   // Can be a URL or a local file.
            ref={(ref) => { this.player = ref }}                                      // Store reference
            onBuffer={this.onBuffer}                // Callback when remote video is buffering
            onError={this.videoError}               // Callback when video cannot be loaded
            style={styles.backgroundVideo} 
            resizeMode="cover" 
            repeat={true}
            volume={1} 
            muted={true}
          />
        )
        break;
      case 'nuvensdispersasd':
        return(
          <Video source={require(`../../weatherVideos/scatteredcloudsd.mp4`)}   // Can be a URL or a local file.
            ref={(ref) => { this.player = ref }}                                      // Store reference
            onBuffer={this.onBuffer}                // Callback when remote video is buffering
            onError={this.videoError}               // Callback when video cannot be loaded
            style={styles.backgroundVideo} 
            resizeMode="cover" 
            repeat={true}
            volume={1} 
            muted={true}
          />
        )
      case 'nuvensquebradasd':
      case 'nubladod':
        return(
          <Video source={require(`../../weatherVideos/brokencloudsd.mp4`)}   // Can be a URL or a local file.
            ref={(ref) => { this.player = ref }}                                      // Store reference
            onBuffer={this.onBuffer}                // Callback when remote video is buffering
            onError={this.videoError}               // Callback when video cannot be loaded
            style={styles.backgroundVideo} 
            resizeMode="cover" 
            repeat={true}
            volume={1} 
            muted={true}
          />
        )  
        break;
      case 'showerraind':
        return(
          <Video source={require(`../../weatherVideos/showerraind.mp4`)}   // Can be a URL or a local file.
            ref={(ref) => { this.player = ref }}                                      // Store reference
            onBuffer={this.onBuffer}                // Callback when remote video is buffering
            onError={this.videoError}               // Callback when video cannot be loaded
            style={styles.backgroundVideo} 
            resizeMode="cover" 
            repeat={true}
            volume={1} 
            muted={true}
          />
        )  
        break;  
      case 'chuvad':
      case 'chuvafracad':
      case 'chuvamoderadad':
        return(
          <Video source={require(`../../weatherVideos/raind.mp4`)}   // Can be a URL or a local file.
            ref={(ref) => { this.player = ref }}                                      // Store reference
            onBuffer={this.onBuffer}                // Callback when remote video is buffering
            onError={this.videoError}               // Callback when video cannot be loaded
            style={styles.backgroundVideo} 
            resizeMode="cover" 
            repeat={true}
            volume={1} 
            muted={true}
          />
        )  
      case 'tempestaded':
      case 'tempestadesd':
      case 'tempestadederaiosd':
      case 'tempestadesderaiosd':
        return(
          <Video source={require(`../../weatherVideos/thunderstormd.mp4`)}   // Can be a URL or a local file.
            ref={(ref) => { this.player = ref }}                                      // Store reference
            onBuffer={this.onBuffer}                // Callback when remote video is buffering
            onError={this.videoError}               // Callback when video cannot be loaded
            style={styles.backgroundVideo} 
            resizeMode="cover" 
            repeat={true}
            volume={1} 
            muted={true}
          />
        )  
        break; 
      case 'neved':
      case 'nevefracad':
        return(
          <Video source={require(`../../weatherVideos/snowd.mp4`)}   // Can be a URL or a local file.
            ref={(ref) => { this.player = ref }}                                      // Store reference
            onBuffer={this.onBuffer}                // Callback when remote video is buffering
            onError={this.videoError}               // Callback when video cannot be loaded
            style={styles.backgroundVideo} 
            resizeMode="cover" 
            repeat={true}
            volume={1} 
            muted={true}
          />
        )  
      case 'mistd':
        return(
          <Video source={require(`../../weatherVideos/mistd.mp4`)}   // Can be a URL or a local file.
            ref={(ref) => { this.player = ref }}                                      // Store reference
            onBuffer={this.onBuffer}                // Callback when remote video is buffering
            onError={this.videoError}               // Callback when video cannot be loaded
            style={styles.backgroundVideo} 
            resizeMode="cover" 
            repeat={true}
            volume={1} 
            muted={true}
          />
        )  
        break;
      //NOITE
      case 'céulimpon':
        return(
          <Video source={require(`../../weatherVideos/clearskyn.mp4`)}   // Can be a URL or a local file.
            ref={(ref) => { this.player = ref }}                                      // Store reference
            onBuffer={this.onBuffer}                // Callback when remote video is buffering
            onError={this.videoError}               // Callback when video cannot be loaded
            style={[styles.backgroundVideo, { top: -50 }]} 
            resizeMode="cover" 
            repeat={true}
            volume={1} 
            muted={true}
          />
        )
        break;
      case 'céupouconubladon':
        return(
          <Video source={require(`../../weatherVideos/fewcloudsn.mp4`)}   // Can be a URL or a local file.
            ref={(ref) => { this.player = ref }}                                      // Store reference
            onBuffer={this.onBuffer}                // Callback when remote video is buffering
            onError={this.videoError}               // Callback when video cannot be loaded
            style={styles.backgroundVideo} 
            resizeMode="cover" 
            repeat={true}
            volume={1} 
            muted={true}
          />
        )
        break;
      case 'nuvensdispersasn':
      case 'nuvensquebradasn':
      case 'nubladon':
        return(
          <Video source={require(`../../weatherVideos/scatteredcloudsn.mp4`)}   // Can be a URL or a local file.
            ref={(ref) => { this.player = ref }}                                      // Store reference
            onBuffer={this.onBuffer}                // Callback when remote video is buffering
            onError={this.videoError}               // Callback when video cannot be loaded
            style={styles.backgroundVideo} 
            resizeMode="cover" 
            repeat={true}
            volume={1} 
            muted={true}
          />
        )
      
      case 'showerrainn':
        return(
          <Video source={require(`../../weatherVideos/showerrainn.mp4`)}   // Can be a URL or a local file.
            ref={(ref) => { this.player = ref }}                                      // Store reference
            onBuffer={this.onBuffer}                // Callback when remote video is buffering
            onError={this.videoError}               // Callback when video cannot be loaded
            style={styles.backgroundVideo} 
            resizeMode="cover" 
            repeat={true}
            volume={1} 
            muted={true}
          />
        )  
        break;  
      case 'chuvan':
      case 'chuvafracan':
      case 'chuvamoderadan':
        return(
          <Video source={require(`../../weatherVideos/rainn.mp4`)}   // Can be a URL or a local file.
            ref={(ref) => { this.player = ref }}                                      // Store reference
            onBuffer={this.onBuffer}                // Callback when remote video is buffering
            onError={this.videoError}               // Callback when video cannot be loaded
            style={styles.backgroundVideo} 
            resizeMode="cover" 
            repeat={true}
            volume={1} 
            muted={true}
          />
        )  
      case 'tempestaden':
      case 'tempestadesn':
      case 'tempestadederaiosn':
      case 'tempestadesderaiosn':
        return(
          <Video source={require(`../../weatherVideos/thunderstormn.mp4`)}   // Can be a URL or a local file.
            ref={(ref) => { this.player = ref }}                                      // Store reference
            onBuffer={this.onBuffer}                // Callback when remote video is buffering
            onError={this.videoError}               // Callback when video cannot be loaded
            style={styles.backgroundVideo} 
            resizeMode="cover" 
            repeat={true}
            volume={1} 
            muted={true}
          />
        )  
        break; 
      case 'neven':
      case 'nevefracan':
        return(
          <Video source={require(`../../weatherVideos/snown.mp4`)}   // Can be a URL or a local file.
            ref={(ref) => { this.player = ref }}                                      // Store reference
            onBuffer={this.onBuffer}                // Callback when remote video is buffering
            onError={this.videoError}               // Callback when video cannot be loaded
            style={styles.backgroundVideo} 
            resizeMode="cover" 
            repeat={true}
            volume={1} 
            muted={true}
          />
        )  
      case 'mistn':
        return(
          <Video source={require(`../../weatherVideos/mistn.mp4`)}   // Can be a URL or a local file.
            ref={(ref) => { this.player = ref }}                                      // Store reference
            onBuffer={this.onBuffer}                // Callback when remote video is buffering
            onError={this.videoError}               // Callback when video cannot be loaded
            style={styles.backgroundVideo} 
            resizeMode="cover" 
            repeat={true}
            volume={1} 
            muted={true}
          />
        )  
        break;   
      default:
        break;
    }
    
  }

  renderWeatherDetails() {
    const { actualTemperature, minTemperature, maxTemperature, pressure, humidity, description, icon, cityDayAndHour } = this.props.selectedHour;
    return(
      <View style={ Styles.container }>
        { this.renderBackgroundVideo() }
        
        <Animatable.View animation='fadeIn' useNativeDriver duration={1200} style={ styles.nameOfCityAndButtonContainer }>
          <View style={ styles.textInputContainer }>
            <TextInput 
              style={ Styles.textInput }
              underlineColorAndroid='transparent'
              returnKeyType='done'
              onSubmitEditing={() => this.props.getWeatherOfTheCity( this.props.nameOfCity) }
              autoCorrect={false}
              value={this.props.nameOfCity}
              onChangeText={(nameOfCity) => this.props.changeNameOfCity(nameOfCity)}
              placeholder='digite o nome da cidade...'
            />
          </View>
          <View style={ styles.buttonContainer }>
            <Button
              isLoading={this.props.gettingWeatherOfCity}
              style={ Styles.buttonContainer }
              textStyle={Styles.buttonText}
              onPress={() => { this.props.getWeatherOfTheCity( this.props.nameOfCity) }}
              activityIndicatorColor='white'
            >
              <Icon name='search' style={ styles.searchButtonIcon }/>
            </Button>
          </View>
        </Animatable.View>
        <Animatable.View animation='fadeIn' useNativeDriver duration={1200} style={ styles.weatherContainer }>
          <View style={ styles.detailOfTheDayContainer }>
            <View style={ styles.detailOfTheDayHeader }>
              <Text style={ styles.detailsLabel }>{cityDayAndHour}</Text>
            </View>
            <View style={ styles.detailOfTheDayInfo }>
              <View style={ styles.detailOfTheDaySides }>
                <Text style={ styles.detailsLabel }>Máx</Text>
                <Text style={ styles.detailsLabel }>{maxTemperature}</Text>
                <Text style={ styles.detailsLabel }>Min</Text>
                <Text style={ styles.detailsLabel }>{minTemperature}</Text>
              </View>
              <View style={ styles.detailOfTheDayCenter }>
                <Text style={ styles.actualTemperatureLabel }>{actualTemperature}</Text>
                <Text style={ styles.descriptionLabel }>{description}</Text>
                
              </View>
              <View style={[ styles.detailOfTheDaySides, { marginRight: scale(15)} ]}>
                <Text style={ styles.detailsLabel }>Pressão</Text>
                <Text style={ styles.detailsLabel }>{pressure}</Text>
                <Text style={ styles.detailsLabel }>Humidade</Text>
                <Text style={ styles.detailsLabel }>{humidity}</Text>
              </View>
            </View>
          </View>
          <View style={ styles.daysContainer }>
            <View style={ styles.hoursOfTheDay }>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.dt.toString()}
                data={ this.props.hoursOfTheDay }
                renderItem={( data ) =>  this.renderHourOfTheDay(data.item) }
              />
            </View>
            <View style={ styles.weekDays }>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.dt.toString()}
                data={ this.props.weekDays }
                renderItem={( data ) =>  this.renderWeekDay(data.item) }
              />
            </View>
          </View>
        </Animatable.View>
      </View>
    )
  }

  renderWaitingWeatherData() {
    return(
      <View style={ styles.waiting }>
        <Icon name='clock-o' style={ styles.waitingIcon } />
        <Text style={ styles.waitingLabel }>Aguarde...</Text>
      </View>
    )
  }

  render() {
    return(
      ( !isNullOrUndefined(this.props.selectedHour.maxTemperature) ? this.renderWeatherDetails() : this.renderWaitingWeatherData() )
    )
  }
}

const styles = StyleSheet.create({
  nameOfCityAndButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchButtonIcon: {
    color: 'white',
    fontSize: moderateScale(19)
  },
  textInputContainer: {
    flex: 6,
    marginRight: scale(5)
  },
  buttonContainer: {
    flex: 1,
    marginLeft: scale(5)
  },
  weatherContainer: {
    flexDirection: 'column'
  },
  detailOfTheDayContainer: {
    flexDirection: 'column',
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: verticalScale(15),
  },
  detailOfTheDayHeader: {
    alignItems: 'center' 
  },
  backgroundVideo: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: -10, 
    bottom: -10
  },
  daysContainer: {
    flexDirection: 'column',
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: verticalScale(15),
    marginTop: verticalScale(25)
  },
  hoursOfTheDay: {
    alignItems: 'center'
  },
  weekDays: {
    alignItems:'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#f2f2f2',
    paddingTop: verticalScale(15),
  },
  calendarIcon: {
    fontSize: moderateScale(35),
    //marginTop: verticalScale(35)
    color: colorOfContent
  },
  calendarDateLabel: {
    fontSize: moderateScale(15),
    //marginRight: scale(-25),
    marginTop: verticalScale(-27),
    color: colorOfContent
  },
  weekDayContainer: {
    //flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: scale(10),
    height: verticalScale(45)  
  },
  hourOfTheDayContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: verticalScale(10),
    marginHorizontal: scale(10)
  },
  hourOfTheDayIcon: {
    height: verticalScale(50),
    width: scale(50)
  },
  hourLabel: {
    fontSize: moderateScale(15),
    color: colorOfContent
  },
  maxTemperatureLabel: {
    fontSize: moderateScale(15),
    fontWeight: 'bold',
    color: colorOfContent
  },
  detailOfTheDayInfo: {
    flexDirection: 'row',
    marginTop: verticalScale(25)
  },
  detailOfTheDaySides: {
    flexDirection: 'column',
    flex: 1
  },
  detailOfTheDayCenter: {
    flexDirection: 'column',
    flex: 2
  },
  actualTemperatureLabel: {
    fontSize: moderateScale(26),
    textAlign: 'center',
    color: colorOfContent
  },
  descriptionLabel: {
    fontSize: moderateScale(22),
    textAlign: 'center',
    color: colorOfContent
  },
  internalSidesView: {
    flexDirection: 'row',
    flex: 1
  },
  detailsLabel: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    textAlign: 'center',
    color: colorOfContent
  },
  waiting: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#336699',
    alignItems: 'center',
    justifyContent: 'center'
  },
  waitingIcon: {
    fontSize: moderateScale(48),
    color: 'white'
  },
  waitingLabel: {
    fontSize: moderateScale(24),
    color: 'white'
  }
})

const mapStateToProps = state => ({
  nameOfCity: state.appReducer.nameOfCity,
  gettingWeatherOfCity: state.appReducer.gettingWeatherOfCity,
  weatherData: state.appReducer.weatherData,
  weekDays: state.appReducer.weekDays,
  hoursOfTheDay: state.appReducer.hoursOfTheDay,
  selectedHour: state.appReducer.selectedHour
});

          
export default connect( mapStateToProps, { changeNameOfCity, getWeatherOfTheCity, 
                                           changeSelectedDayByUser, changeSelectedHourByUser })(Main);