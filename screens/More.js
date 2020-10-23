import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ImageBackground, SafeAreaView, Image, SectionList} from 'react-native';
import background from "../assets/background.png";
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import ArrowRight from '../assets/arrow-right.png';
import BottomTabs from '../components/BottomTabs';

class More extends Component {
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
    render() {
        return (
            <ImageBackground style={styles.container} source={background}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>
                        This application is a native prototype of a UI for a smartlock application created for the university course Mobile Computing at Chalmers University of Technology
                    </Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>
                        Created by Simon Duchén and Linnea Bark
                    </Text>
                </View>
                <View style={{justifyContent: "flex-end", width: '100%', flex: 1}}>
                    <BottomTabs navigation={this.props.navigation}/>
                </View>
            </ImageBackground>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    textContainer: {
        flexDirection: 'row',
        width: "100%",
        flex: 1,
        padding: 20,
        justifyContent: "center",
    },
    text: {
        color: "white",
        fontSize: 18,
        alignItems: 'center'
    }
});

export default More;