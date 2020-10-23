import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, SafeAreaView, Image, SectionList, Button} from 'react-native';
import background from "../assets/background.png";
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import ArrowRight from '../assets/arrow-right.png';
import BottomTabs from '../components/BottomTabs';
import * as LocalAuthentication from 'expo-local-authentication';
import db from "../userdata.json";
class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            permanentScreenActive: true,
            result: '',
            permanentListData: db.permanentAccess,
            temporaryListData: db.temporaryAccess
        };
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

    scanFingerprint = async () => {
        let result = await LocalAuthentication.authenticateAsync(
            {promptMessage: "Scan your fingerprint to open the door"}
        );
        console.log('Scan Result:', result);
        this.setState({
            result: JSON.stringify(result),
        });
    };

    leftAction = ({item}) => {
        return (
            <View style={styles.leftActionContainer}>
                <Text style={styles.leftActionText}>{item.title} was successfully opened </Text>
            </View>
        );
    };
    renderItemPermList = ({item}) => (
        <Swipeable
            renderLeftActions={this.leftAction.bind(this, {item})}
        >
            <View style={styles.itemContainer}>
                <View style={styles.itemLeftContainer}>
                    <Text style={styles.itemTitle}> {item.title} </Text>
                </View>
                <View style={styles.itemRightContainer}>
                    <Text style={{marginEnd: 10, fontSize: 14, color:"#788795"}}>Swipe to open</Text>
                    <Image
                        style={styles.itemIcon}
                        source={ArrowRight}
                    />
                </View>
            </View>
        </Swipeable>
    );
    renderItemTempList = ({item}) => (
        <Swipeable
            renderLeftActions={this.leftAction.bind(this, {item})}
            onSwipeableWillOpen={this.scanFingerprint}
        >
            <View style={[styles.itemContainer, {paddingVertical: 10}]}>
                <View style={styles.itemLeftContainer}>
                    <View>
                        <Text style={{fontSize: 18, color: '#fff', textAlign: 'left'}}> {item.title} </Text>
                        <Text style={{fontSize: 18, color: '#fff', textAlign: 'left', color: "#FDFDFD99"}}> {item.name} </Text>
                    </View>
                </View>
                <View style={styles.itemRightContainer}>
                    <Text style={{marginEnd: 10, fontSize: 14, color:"#788795"}}>Swipe to open</Text>
                    <Image
                        style={styles.itemIcon}
                        source={ArrowRight}
                    />
                </View>
            </View>
        </Swipeable>
    );
    
    renderItemHeader = ({ section: { title } }) => (<Text style={{color: "white", paddingHorizontal: 10, fontSize: 18}}>{title}</Text>);
    
    render() {
        if(this.state.permanentScreenActive) {
            //-------------------------------------- PERMANENT LIST -------------------------------------------->
            return (
                <ImageBackground style={styles.container} source={background}>
                    <View style={styles.menuContainer}>
                        <View style={[styles.menuItemLeft, {backgroundColor: '#18314AA0'}]}>
                            <TouchableOpacity
                                style={{paddingVertical: 12}}
                                onPress={() =>{this.setState({permanentScreenActive: true})}}
                            >
                                <Text style={{color: '#FFF', fontSize: 22, fontWeight: "bold", width: 120}}>Permanent</Text>
                            </TouchableOpacity>
                        </View>
                        <View style = {[styles.menuItemRight]}>
                            <TouchableOpacity
                                style={{paddingVertical: 10}}
                                onPress={() =>{this.setState({permanentScreenActive: false})}}
                            >
                                <Text style={{color: '#FFF', fontSize: 22, width: 120}} >Temporary</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <SafeAreaView style={styles.listContainer}>
                        <FlatList
                        keyExtractor={(item) => item.id}
                        data={this.state.permanentListData}
                        renderItem={this.renderItemPermList}
                        />
                    </SafeAreaView>
                    <BottomTabs navigation={this.props.navigation}/>
                </ImageBackground>
            );
        }else {
            //-------------------------------------- TEMPORARY LIST -------------------------------------------->
            return (
                <ImageBackground style={styles.container} source={background}>
                    <View style={styles.menuContainer}>
                        <View style={styles.menuItemLeft}>
                            <TouchableOpacity
                                style={{paddingVertical: 12}}
                                onPress={() => this.setState({permanentScreenActive: true})}
                            >
                                <Text style={{color: '#FFF', fontSize: 22, width: 120}}>Permanent</Text>
                            </TouchableOpacity>
                        </View>
                        <View style = {[styles.menuItemRight, {backgroundColor: '#18314A'}]}>
                            <TouchableOpacity
                                style={{paddingVertical: 12}}                            
                                onPress={() => this.setState({permanentScreenActive: false})}
                            >
                                <Text style={{color: '#FFF', fontSize: 22 ,fontWeight: "bold", width: 120}} >Temporary</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <SafeAreaView style={styles.listContainer}>
                        <SectionList
                            keyExtractor={(item) => item.id}
                            sections={this.state.temporaryListData}
                            renderItem={this.renderItemTempList}
                            renderSectionHeader={this.renderItemHeader}
                        />
                    </SafeAreaView>
                    <BottomTabs navigation={this.props.navigation}/>
                </ImageBackground>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        margin: 10,
        width: '80%',
        marginTop: 20,
        marginBottom: 20
    },
    inputFieldContainer: {
        padding: 10,
        marginTop: 20

    },
    listContainer: {
        flex: 1,
        width: '100%',
        marginTop: 50
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#18314AB6',
        marginVertical: 8,
        marginHorizontal: 8,
        padding: 20
    },
    itemLeftContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    itemRightContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    }, 
    itemTitle: {
        fontSize: 20,
        color: '#fff',
        textAlign: 'left'
    },
    itemIcon: {
        marginEnd: 10
    },
    leftActionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '95%',
        backgroundColor: "#295283",
        padding: 20,
        marginVertical: 9.5,
        marginHorizontal: '2.5%'
    },
    leftActionText: {
        color: '#fff',
        fontSize: 18
    },
    menuContainer: {
        flexDirection: 'row',
        backgroundColor: '#18314A90',
        marginVertical: 50,
    },
    menuItemLeft: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        borderColor: "white",
        borderEndWidth: 1
    },
    menuItemRight: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        borderStartWidth: 1,
        borderColor: "white"
    }
});
export default Home;