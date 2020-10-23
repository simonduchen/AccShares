import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Image, ImageBackground, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, AsyncStorage} from 'react-native';
import Logo from "../assets/Logo.png";
import background from "../assets/background.png";
import * as LocalAuthentication from 'expo-local-authentication';
import db from "../userdata.json";
import { asin } from 'react-native-reanimated';
class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            compatible: false,
            fingerprints: false,
            result: ''
        };
      }
      
    componentDidMount() {
        this.checkDeviceForHardware();
        this.checkForFingerprints();
    }
    
    checkDeviceForHardware = async () => {
        let compatible = await LocalAuthentication.hasHardwareAsync();
        this.setState({ compatible });
    };

    checkForFingerprints = async () => {
        let fingerprints = await LocalAuthentication.isEnrolledAsync();
        this.setState({ fingerprints });
    };

    scanFingerprint = async () => {
        let result = await LocalAuthentication.authenticateAsync(
            {promptMessage: "Scanning your fingerprint to sign in"}
        );
        console.log('Scan Result:', result);
        this.setState({
            result: JSON.stringify(result),
        });
        if(result) 
            this.props.navigation.navigate('Home');
            this.props.navigation.reset({index: 0, routes: [{name: 'Home'}]})
        
    };

    passwordAuth = () => {
        let userAuth = false;
        let pwAuth = false;
        
        db.authorized.forEach((user) => {
            if(user.username.toLowerCase() === this.state.username.toLowerCase())
               userAuth = true;
        }); 
        db.authorized.forEach((user) => {
            if(user.password === this.state.password) 
                pwAuth = true; 
        }); 
        
        if(userAuth && pwAuth) 
            this.props.navigation.navigate('Home');
        else
            return Alert.alert(
                "Authentication Failed",
                "Wrong username or password",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
              );
    }
    
    render() {
        return (
            <ImageBackground style={styles.container} source={background}>
                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                    style = {styles.container}
                >
                    <Image
                        style={{height:80, width: 330, marginBottom: 80}}
                        source={Logo}
                    />
                    <View style={styles.inputFieldContainer}>
                        <TextInput
                            style={{height: 40}}
                            placeholder="Username"
                            onChangeText={(username) => this.setState({username})}
                            value={this.state.username}
                            />
                    </View>
                    <View style={styles.inputFieldContainer}>
                        <TextInput
                            style={{height: 40}}
                            placeholder="Password"
                            secureTextEntry={true}
                            onChangeText={(password) => this.setState({password})}
                            value={this.state.password}
                            />
                    </View>
                    <View style={styles.buttonContainer}> 
                        <TouchableOpacity style={styles.button} onPress={this.passwordAuth}>
                            <Text>Sign in</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{color:"white"}}>Or</Text>
                    <View style={styles.buttonContainer}> 
                        <TouchableOpacity style={styles.button} onPress={this.scanFingerprint}>
                            <Text>Sign in with TouchID</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <View>
                            <Text style={{color:'grey', fontSize: 16}}>Forgot password?</Text>
                        </View>
                        <View style={{marginHorizontal: 10, width: 60}}>
                            <Text style={{color:"#fff", fontSize: 16, fontWeight: 'bold', textDecorationLine: 'underline'}}>Sign Up</Text>
                        </View>
                    </View>                   
                </KeyboardAvoidingView>
            </ImageBackground>
            
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%'
    },
    buttonContainer: {
        margin: 10,
        width: '80%',
        marginTop: 20,
        marginBottom: 20,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3B91E3',
        padding: 10,
        height: 50,
        borderRadius: 5
    },
    inputFieldContainer: {
        padding: 10,
        marginTop: 20,
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 5
    }
});

export default Login;