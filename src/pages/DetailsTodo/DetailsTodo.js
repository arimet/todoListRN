import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, TextInput, Button } from "react-native";
import { observer, inject } from 'mobx-react/native'

const styles = StyleSheet.create({
    header: {
        marginTop: 50
    },
    container: {
        flex: 1,
        backgroundColor: '#2dc5c7',
    },
    welcome: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
        color: 'white',
    },
    input: {
        height: 30,
        marginHorizontal: 50,
        borderColor: "gray",
        borderWidth: 1,
        backgroundColor: "white",
        marginTop: 20,
    },
    list: {
        paddingHorizontal: 50,
        paddingTop: 20,
    },
});

// On envoie des données des stores dans la page
@inject(({ todoStore }) => ({
    selectedTodo: todoStore.selectedTodo,
    addItem: (todo, text) => todoStore.addItem(todo, text),
}))
@observer
export default class DetailsTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            index: 0,
        };
    }

    // Fonction appelé quand le texte de l'input change
    onInputChangeText = text => {
        this.setState({ text: text });
    };

    goToHome = () => {
        this.props.navigation.navigate('home');
    }

    // Fonction qui permet de save la todo via le store
    saveToStoreItem = () => {
        this.props.addItem(this.props.selectedTodo, this.state.text);
        this.setState({ text: "" });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.welcome}>{this.props.selectedTodo.name}</Text>
                </View>

                {this.props.selectedTodo.items.map((l, i) => {
                    return <View key={i} style={styles.list}>
                        <Text style={{ color: 'white' }}>{l}</Text>
                    </View>
                })}

                <TextInput
                    style={styles.input}
                    onChangeText={text => this.onInputChangeText(text)}
                    value={this.state.text}
                    returnKeyType="done"
                    onSubmitEditing={() => this.saveToStoreItem()}
                />

                <Button
                    onPress={this.goToHome}
                    title="Retour à l'accueil"
                    color="#841584"
                />
            </View>
        );
    }
}
