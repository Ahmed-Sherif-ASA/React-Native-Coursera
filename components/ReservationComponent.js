// import React, { Component } from 'react'
// import { Alert, Button, StyleSheet, Switch, Text, View } from 'react-native'
// import { Picker } from '@react-native-community/picker'
// import * as Animatable from 'react-native-animatable' // Assignment 3 Task 1
// import { Card } from 'react-native-elements'
// import * as Notifications from 'expo-notifications'
// import * as Permissions from 'expo-permissions'
// import RNDateTimePicker from '@react-native-community/datetimepicker'
// import moment from 'moment'
// import * as Calendar from 'expo-calendar'
// import { deleteCalendarAsync } from 'expo-calendar'

// class Reservation extends Component {
// 	constructor (props) {
// 		super(props)
// 		this.state = {
// 			guests: 1,
// 			smoking: false,
// 			date: new Date(),
// 			showModal: false,
// 			isDatePickerOpen: false,
// 			isTimePickerOpen: false,
// 		}
// 	}

// 	static navigationOptions = {
// 		title: 'Reserve a Table'
// 	}

// 	handleReservation () {
// 		Alert.alert(
// 			'Your Reservation OK?',
// 			`Number of Guests: ${this.state.guests}\nSmoking? ${this.state.smoking}\nDate and Time: ${this.state.date}`,
// 			[
// 				{
// 					text: 'Cancel',
// 					style: 'cancel',
// 					onPress: () => this.resetForm()
// 				},
// 				{
// 					text: 'Ok',
// 					style: 'default',
// 					onPress: async () => {
// 						await this.presentLocalNotification(this.state.date)
// 						await this.addReservationToCalendar(this.state.date)
// 						this.resetForm()
// 					}
// 				}
// 			],
// 			{ cancelable: false }
// 		)
// 	}

// 	resetForm () {
// 		this.setState({
// 			guests: 1,
// 			smoking: false,
// 			date: new Date(),
// 			showModal: false
// 		})
// 	}

// 	async obtainNotificationPermission () {
// 		let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS)
// 		if (permission.status !== 'granted') {
// 			permission = Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS)
// 			if (permission.status !== 'granted') {
// 				Alert.alert('Permission not granted to show notification')
// 			}
// 		}
// 		return permission
// 	}

// 	async presentLocalNotification (date) {
// 		await this.obtainNotificationPermission()
// 		await Notifications.presentNotificationAsync({
// 			title: 'Your Reservation',
// 			body: 'Reservation for ' + date + ' requested',
// 			ios: {
// 				sound: true
// 			},
// 			android: {
// 				sound: true,
// 				vibrate: true,
// 				color: '#512DA8'
// 			}
// 		})
// 	}

// 	/**
// 	 * Task 2
// 	 */
// 	async obtainCalendarPermission() {
// 		let permission = await Permissions.getAsync(Permissions.CALENDAR)
// 		if (permission.status !== 'granted') {
// 			permission = Permissions.askAsync(Permissions.CALENDAR)
// 			if (permission.status !== 'granted') {
// 				Alert.alert('Permission not granted to access calendar')
// 			}
// 		}
// 		return permission
// 	}

// 	/**
// 	 * Task 2
// 	 */
// 	async addReservationToCalendar (date) {
// 		await this.obtainCalendarPermission()
// 		await Calendar.createEventAsync('1', {
// 			title: 'Con Fusion Table Reservation',
// 			startDate: new Date(Date.parse(date)),
// 			endDate: new Date(Date.parse(date) + (2 * 60 * 60 * 1000)),
// 			timeZone: 'Asia/Hong_Kong',
// 			location: '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong'
// 		})
// 	}

// 	handleDatePicker = (e, date) => {
// 		this.setState({ date: date, isDatePickerOpen: !this.state.isDatePickerOpen })
// 	}

// 	handleTimePicker = (e, date) => {
// 		this.setState({ date: date, isTimePickerOpen: !this.state.isTimePickerOpen })
// 	}

// 	render () {
// 		/* Assignment 3 Task 1 */
// 		return (
// 			<Animatable.View
// 				animation="zoomIn" duration={2000}>
// 				<Card>
// 					<View style={styles.formRow}>
// 						<Text style={styles.formLabel}>Number of Guests</Text>
// 						<Picker style={styles.formItem}
// 						        selectedValue={this.state.guests}
// 						        onValueChange={(itemValue, itemIndex) => this.setState({ guests: itemValue })}>
// 							<Picker.Item label="1" value={1} key="1"/>
// 							<Picker.Item label="2" value={2} key="2"/>
// 							<Picker.Item label="3" value={3} key="3"/>
// 							<Picker.Item label="4" value={4} key="4"/>
// 							<Picker.Item label="5" value={5} key="5"/>
// 							<Picker.Item label="6" value={6} key="6"/>
// 						</Picker>
// 					</View>
// 					<View style={styles.formRow}>
// 						<Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
// 						<Switch style={styles.formItem} value={this.state.smoking} trackColor="#512DA8"
// 						        onValueChange={(value => this.setState({ smoking: value }))}/>
// 					</View>
// 					<View style={styles.formRow}>
// 						<Text style={styles.formLabel}>Reservation Date</Text>
// 						<Text onPress={() => this.setState({ isDatePickerOpen: true })}>
// 							{moment(this.state.date).format('YYYY-MM-DD')}
// 						</Text>
// 						{this.state.isDatePickerOpen ? <RNDateTimePicker mode='date'
// 						                                                 value={this.state.date}
// 						                                                 is24Hour={true}
// 						                                                 onChange={this.handleDatePicker}/>
// 							: null}
// 					</View>
// 					<View style={styles.formRow}>
// 						<Text style={styles.formLabel}>Reservation Time</Text>
// 						<Text onPress={() => this.setState({ isTimePickerOpen: true })}>
// 							{moment(this.state.date).format('HH:mm')}
// 						</Text>
// 						{this.state.isTimePickerOpen ? <RNDateTimePicker mode='time'
// 						                                                 value={this.state.date}
// 						                                                 is24Hour={true}
// 						                                                 onChange={this.handleTimePicker}/>
// 							: null}
// 					</View>
// 					<View style={styles.formRow}>
// 						<Button title="Reserve" color="#512DA8" onPress={() => this.handleReservation()}
// 						        accessibilityLabel="Learn more.."/>
// 					</View>
// 				</Card>
// 			</Animatable.View>
// 		)
// 	}
// }
// const styles = StyleSheet.create({
// 	modal: {
// 		justifyContent: 'center',
// 		marginTop: 100,
// 		backgroundColor: '#fff',
// 		shadowColor: '#000',
// 		shadowOffset: { width: 0, height: 20 },
// 		shadowOpacity: 0.05,
// 		shadowRadius: 10,
// 		elevation: 10,
// 	},
// 	modalTitle: {
// 		fontSize: 18,
// 		fontWeight: 'bold',
// 		backgroundColor: '#512DA8',
// 		textAlign: 'center',
// 		color: 'white',
// 		marginBottom: 20,
// 		paddingVertical: 10
// 	},
// 	modalText: {
// 		fontSize: 18,
// 		margin: 10
// 	},
// 	formRow: {
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 		flex: 1,
// 		flexDirection: 'row',
// 		margin: 20
// 	},
// 	formLabel: {
// 		fontSize: 12,
// 		color: '#000',
// 		flex: 2,
// 	},
// 	formItem: {
// 		flex: 1
// 	}
// })

// export default Reservation;



import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Button, Modal, Alert } from 'react-native';
import { Card } from 'react-native-elements';
import DatePicker from 'react-native-datepicker'
import * as Animatable from 'react-native-animatable';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions'


class Reservation extends Component {

    constructor(props) {
        super(props);

        this.state = {
          guests: 1,
          smoking: false,
          date: '',
          showModal: false
        }
    }

    static navigationOptions = {
        title: 'Reserve Table',
    };

    toggleModal() {
      this.setState({showModal: !this.state.showModal});
    }

    handleReservation() {
        console.log(JSON.stringify(this.state));
        this.toggleModal();
    }

    resetForm() {
        this.setState({
            guests: 1,
            smoking: false,
            date: '',
            showModal: false
        });
    }

    async obtainNotificationPermission() {
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to show notifications');
            }
        }
        return permission;
    }

    async presentLocalNotification(date) {
        await this.obtainNotificationPermission();
        Notifications.presentLocalNotificationAsync({
            title: 'Your Reservation',
            body: 'Reservation for '+ date + ' requested',
            ios: {
                sound: true
            },
            android: {
                sound: true,
                vibrate: true,
                color: '#512DA8'
            }
        });
    }

    
    render() {
        return(
            <Animatable.View animation="zoomIn" duration={2000} delay={1000}>
                <ScrollView>
                    <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Number of Guests</Text>
                    <Picker
                        style={styles.formItem}
                        selectedValue={this.state.guests}
                        onValueChange={(itemValue, itemIndex) => this.setState({guests: itemValue})}>
                        <Picker.Item label="1" value="1" />
                        <Picker.Item label="2" value="2" />
                        <Picker.Item label="3" value="3" />
                        <Picker.Item label="4" value="4" />
                        <Picker.Item label="5" value="5" />
                        <Picker.Item label="6" value="6" />
                    </Picker>
                    </View>
                    <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
                    <Switch
                        style={styles.formItem}
                        value={this.state.smoking}
                        onTintColor='#512DA8'
                        onValueChange={(value) => this.setState({smoking: value})}>
                    </Switch>
                    </View>
                    <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Date and Time</Text>
                    <DatePicker
                        style={{flex: 2, marginRight: 20}}
                        date={this.state.date}
                        format=''
                        mode="datetime"
                        placeholder="select date and Time"
                        minDate="2017-01-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                        // ... You can check the source to find the other keys. 
                        }}
                        onDateChange={(date) => {this.setState({date: date})}}
                    />
                    </View>
                    <View style={styles.formRow}>
                    <Button
                        onPress={ () => {
                            Alert.alert(
                                'Your Reservation OK?',
                                'Number of guests: ' + this.state.guests + '\n' + 'Smoking? ' + this.state.smoking + '\n' +'Date & Time: ' + this.state.date,
                                [
                                    { 
                                        text: 'Cancel', 
                                        onPress: () => this.resetForm()
                                    },
                                    {
                                        text: 'OK',
                                        onPress: () => {
                                            this.presentLocalNotification(this.state.date)
                                            this.resetForm()
                                        }
                                    }
                                ],
                                { cancelable: false }
                            );
                            
                        }}
                        // onPress={() => this.handleReservation()}
                        title="Reserve"
                        color="#512DA8"
                        accessibilityLabel="Learn more about this purple button"
                        />
                    </View>
                    <Modal animationType = {"slide"} transparent = {false}
                        visible = {this.state.showModal}
                        onDismiss = {() => this.toggleModal() }
                        onRequestClose = {() => this.toggleModal() }>
                        <View style = {styles.modal}>
                            <Text style = {styles.modalTitle}>Your Reservation</Text>
                            <Text style = {styles.modalText}>Number of Guests: {this.state.guests}</Text>
                            <Text style = {styles.modalText}>Smoking?: {this.state.smoking ? 'Yes' : 'No'}</Text>
                            <Text style = {styles.modalText}>Date and Time: {this.state.date}</Text>
                            
                            <Button 
                                onPress = {() =>{this.toggleModal(); this.resetForm();}}
                                color="#512DA8"
                                title="Close" 
                                />
                        </View>
                    </Modal>
                </ScrollView>
            </Animatable.View>
        );
    }

};

const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
      justifyContent: 'center',
      margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
});

export default Reservation;