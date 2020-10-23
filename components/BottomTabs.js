import React, { Component } from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import KeyIcon from '../assets/key.png';
import PeopleIcon from '../assets/people.png';
import DotsIcon from '../assets/dots.png';


class BottomTabs extends Component {

    render() {
        return (
            <View style={styles.container} >
                <View style={styles.leftContainer} >
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {this.props.navigation.navigate('Home')}}    
                    >
                        <Image style={styles.icon} source={KeyIcon} />
                        <Text style={styles.text}>My keys</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.midContainer} >
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {this.props.navigation.navigate('Access')}}                     
                    >
                        <Image style={styles.icon} source={PeopleIcon} />
                        <Text style={styles.text}> Give Access</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.rightContainer} >
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {this.props.navigation.navigate('More')}}                      
                    >
                        <Image style={styles.icon} source={DotsIcon} />
                        <Text style={styles.text}>More</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 100,
        backgroundColor: "#18314A61"
    },
    leftContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    midContainer: {
        flex: 1,
        flexDirection: 'row',
        borderEndWidth: 2,
        borderStartWidth: 2,
        borderColor: "#fff",
        justifyContent: 'center',
        alignItems: 'center'
    },
    rightContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: "#fff",
        alignSelf: 'center',
        marginTop: 5
    },
    icon: {
        alignSelf: 'center'
    },
    button: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
    }
});
export default BottomTabs;