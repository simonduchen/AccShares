import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ImageBackground, SafeAreaView, Image, SectionList} from 'react-native';
import background from "../assets/background.png";
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import ArrowDown from '../assets/arrowdown.png';
import RadioButtonRN from 'radio-buttons-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import db from "../userdata.json";


class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            pno: "",
            phone: "",
            devices: db.devices,
            currentDevice: "Front door",
            showDevices: false,
            type: "",
            fromDate: new Date(),
            toDate:  new Date(),
            showFromDatePicker: false,
            showToDatePicker: false,
            mode: ''
        }
    }
    componentDidMount() {
        this.props.navigation.setOptions({headerRight: () => 
            (
                <View>
                    <TouchableOpacity style={{width: 80}} onPress={() => (this.props.navigation.navigate('Login'))}>
                        <Text style={{color: "white", fontWeight: 'bold'}}>Sign Out</Text>
                    </TouchableOpacity>
                </View>
            )
        });
    }
    showToDateTimePicker = (mode) => {
        this.setState({showToDatePicker: true, mode});
    }
    showFromDateTimePicker = (mode) => {
        this.setState({showFromDatePicker: true, mode});
    }
    onSubmit = () => {
        this.props.navigation.navigate('Home');
    }
    onToDateChanged = (event, selectedDate) => {
        const currentDate = selectedDate || this.state.toDate;
        this.setState({toDate: currentDate, showToDatePicker: false});
    }
    onFromDateChanged = (event, selectedDate) => {
        const currentDate = selectedDate || this.state.fromDate;
        this.setState({fromDate: currentDate, showFromDatePicker: false});
    }
    fromDateComponent = () => {
        if(this.state.type == "Temporary") {
            return (<View style={[styles.inputSection, {marginBottom: 0}]}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>
                        From:
                    </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                        onPress={this.showFromDateTimePicker.bind(this, 'date')}
                        style={{backgroundColor: '#fff', flexDirection: "row", padding: 15, borderRadius: 5, width: 200}}
                    >
                        <View style={{flex:1, justifyContent: 'center', alignItems: 'center', borderEndWidth: 1, borderColor: "#000"}}>
                            <Text>
                                {this.state.fromDate.getFullYear()}
                            </Text>
                        </View>
                        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text>
                                {this.state.fromDate.getMonth()}
                            </Text>
                        </View>
                        <View style={{flex:1, justifyContent: 'center', alignItems: 'center',borderStartWidth: 1, borderColor: "#000"}}>
                            <Text>
                                {this.state.fromDate.getDate()}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.showFromDateTimePicker.bind(this, 'time')}
                        style={{backgroundColor: '#fff', flexDirection: "row", padding: 15, borderRadius: 5, width: 100, marginStart: 30}}
                    >
                        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text>
                                {this.state.fromDate.getHours() + " : " + this.state.fromDate.getMinutes()}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                    
                {(this.state.showFromDatePicker && <DateTimePicker
                    testID="dateTimePicker"
                    value={this.state.fromDate}
                    mode={this.state.mode}
                    is24Hour={true}
                    display="default"
                    onChange={this.onFromDateChanged}
                />)}
            </View>
            )
        }
    }
    toDateComponent = () => {
        if(this.state.type == "Temporary") {
            return (
                <View style={[styles.inputSection, {marginTop: 0}]}>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>
                            To:
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity
                            onPress={this.showToDateTimePicker.bind(this, 'date')}
                            style={{backgroundColor: '#fff', flexDirection: "row", padding: 15, borderRadius: 5, width: 200}}
                        >
                            <View style={{flex:1, justifyContent: 'center', alignItems: 'center', borderEndWidth: 1, borderColor: "#000"}}>
                                <Text>
                                    {this.state.toDate.getFullYear()}
                                </Text>
                            </View>
                            <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                                <Text>
                                    {this.state.toDate.getMonth()}
                                </Text>
                            </View>
                            <View style={{flex:1, justifyContent: 'center', alignItems: 'center',borderStartWidth: 1, borderColor: "#000"}}>
                                <Text>
                                    {this.state.toDate.getDate()}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.showToDateTimePicker.bind(this, 'time')}
                            style={{backgroundColor: '#fff', flexDirection: "row", padding: 15, borderRadius: 5, width: 100, marginStart: 30}}
                        >
                            <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                                <Text>
                                    {this.state.toDate.getHours() + " : " + this.state.toDate.getMinutes()}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    
                    {(this.state.showToDatePicker && <DateTimePicker
                        testID="dateTimePicker"
                        value={this.state.toDate}
                        mode={this.state.mode}
                        is24Hour={true}
                        display="default"
                        onChange={this.onToDateChanged}
                    />)}
                </View>
            )
        }
    }
    renderItem = ({item}) => (
        <TouchableOpacity 
            style={styles.item} 
            onPress={()=>{
                this.setState({currentDevice: item.title, showDevices: false})
            }}
        >
            <Text>{item.title}</Text>
        </TouchableOpacity>
    );
    render() {
        return (
            <ScrollView contentContainerStyle={{minHeight: '100%'}} nestedScrollEnabled>
                <ImageBackground style={styles.container} source={background}>
                        <View style={styles.inputSection}>
                            <View style={styles.textContainer}>
                                <Text style={styles.text}>
                                    Personal Security Number
                                </Text>
                            </View>
                            <View style={styles.inputFieldContainer}>
                                <TextInput
                                    style={{height: 30}}
                                    placeholder="YYYYMMDD-XXXX"
                                    onChangeText={(pno) => this.setState({pno})}
                                    value={this.state.pno}
                                />
                            </View>
                        </View>
                        <View style={styles.inputSection}>
                            <View style={styles.textContainer}>
                                <Text style={styles.text}>
                                    Name
                                </Text>
                            </View>
                            <View style={styles.inputFieldContainer}>
                                <TextInput
                                    style={{height: 30}}
                                    placeholder="For example: Anna"
                                    onChangeText={(name) => this.setState({name})}
                                    value={this.state.name}
                                />
                            </View>
                        </View>
                        <View style={styles.inputSection}>
                            <View style={styles.textContainer}>
                                <Text style={styles.text}>
                                    Phone Number
                                </Text>
                            </View>
                            <View style={styles.inputFieldContainer}>
                                <TextInput
                                    style={{height: 30}}
                                    placeholder="07x-xxx xx xx"
                                    onChangeText={(phone) => this.setState({phone})}
                                    value={this.state.phone}
                                />
                            </View>
                        </View>
                        <View style={styles.inputSection}>
                            <TouchableOpacity 
                                style={{backgroundColor: '#FFF', padding: 15, borderRadius: 5, flexDirection: 'row', flex: 1}}
                                onPress = {() => this.setState({showDevices: !this.state.showDevices})}
                            >
                                <View style={{flexDirection: "row", flex: 1}}>
                                    <Text>
                                        {this.state.currentDevice}
                                    </Text>
                                </View>
                                <View style={{flexDirection: "row", flex: 1, alignItems: "center", justifyContent: "flex-end"}}>
                                    <Image source={ArrowDown} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        {(
                            this.state.showDevices && <SafeAreaView style={styles.listContainer}>
                                <FlatList
                                    keyExtractor={(item) => item.id}
                                    data={db.devices}
                                    renderItem={this.renderItem}
                                />
                            </SafeAreaView>
                        )}
                        <View style={styles.inputSection}>
                            <View style={styles.textContainer}>
                                <Text style={styles.text}>
                                    Access Type
                                </Text>
                            </View>
                            <View>
                                <RadioButtonRN
                                    data={[{label: "Permanent"}, {label: "Temporary"}]}
                                    selectedBtn={(e) => this.setState({type: e.label})}
                                    initial={1}
                                />
                            </View>
                        </View>

                        {this.toDateComponent()}
                        {this.fromDateComponent()}
                        <View style={styles.inputSection}>
                            <TouchableOpacity 
                                style={{backgroundColor: '#3B91E3', padding: 15, borderRadius: 5, alignItems: 'center'}}
                                onPress={this.onSubmit}
                            >
                                <Text>
                                    Add user Access
                                </Text>
                            </TouchableOpacity>
                        </View>
                </ImageBackground>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        
    },
    inputSection: {
        width: '80%',
        marginVertical: 10
    },
    inputFieldContainer: {
        padding: 10,
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 5
    },
    textContainer:{
        padding: 5
    },
    text: {
        color: "white",
        fontSize: 16
    },
    listContainer: {
        flex: 1,
        width: '80%',
        borderRadius: 5
    },
    item: {
        backgroundColor: "#fff",
        padding: 15,
        borderColor: "#000",
        borderTopWidth: 1,
    }
});

export default Add;