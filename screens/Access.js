import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ImageBackground, SafeAreaView, Image, SectionList, KeyboardAvoidingView} from 'react-native';
import background from "../assets/background.png";
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import BottomTabs from '../components/BottomTabs';
import db from "../userdata.json";

class Access extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchPhrase: '',
            list: db.userDatabase
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
    filterList(list) {
        if(this.state.searchPhrase.length == 0)
            return []
        else
            return list.filter(({title, id}) => title.toLowerCase().includes(this.state.searchPhrase.toLowerCase()));
    }
    renderItem = ({item}) => (
        <TouchableOpacity 
            style={styles.item} 
            onPress={()=>{this.props.navigation.navigate('Add', {name: "Pelle"})}}
        >
            <Text>{item.title}</Text>
        </TouchableOpacity>
    );
    render() {
        return (
            <ImageBackground style={styles.container} source={background}>
                <View style={{marginTop: 25}}>
                    <Text style={{fontSize: 20, color: "#fff"}}>
                        Search for users in our database
                    </Text>
                </View>
                <View style={styles.searchbarContainer}>
                    <TextInput
                        style={{height: 40}}
                        placeholder="Name,personal number, company..."
                        onChangeText={(searchPhrase) => this.setState({searchPhrase})}
                        value={this.state.searchPhrase}
                    />
                </View>
                <SafeAreaView style={styles.listContainer}>
                        <FlatList
                            keyExtractor={(item) => item.id}
                            data={this.filterList(this.state.list)}
                            renderItem={this.renderItem}
                        />
                </SafeAreaView>
                <View style={{marginVertical: 10}}>
                    <Text style={{fontSize: 20, color: "#fff"}}>
                        or
                    </Text>
                </View>
                <View style={{width: '90%'}}>
                    <TouchableOpacity 
                        style={{backgroundColor: "#3B91E3", padding: 20, borderRadius: 5, alignItems: 'center'}}
                        onPress={()=>{this.props.navigation.navigate('Add', {name: "Pelle"})}}
                    >
                        <Text style={{color:"#fff", fontSize: 16}}>Add user manually</Text>
                    </TouchableOpacity>
                </View>
                <KeyboardAvoidingView 
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                    style={{justifyContent: "flex-end", width: '100%', flex: 1}}
                >
                    <BottomTabs navigation={this.props.navigation}/>
                </KeyboardAvoidingView>
            </ImageBackground>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        
    },
    searchbarContainer: {
        backgroundColor: "#FFF",
        width: '90%',
        padding: 10,
        marginVertical: 15,
        borderRadius: 5
    },
    listContainer: {
        flex: 1,
        width: '90%'
    },
    item: {
        backgroundColor: "#fff",
        padding: 15,
        borderColor: "#000",
        borderTopWidth: 1,
    }
});

export default Access;