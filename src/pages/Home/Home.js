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
        backgroundColor: "white"
    },
    todo: {
        marginTop: 20,
        marginLeft: 50,
    },
    itemContainer: {
        display: 'flex',
        flexDirection: 'row',
        paddingRight: 50,
        paddingBottom: 20,
    },
    textItem: {
        flex: 1,
        color: 'white',
    },
    removeItem: {
        flex: 1,
        textAlign: 'right',
        color: 'red',
    }
});


// On envoie des données des stores dans la page
@inject(({ todoStore }) => ({
    todoList: todoStore.todoList,
    addListTodo: (item, index) => todoStore.addListTodo(item, index),
    removeListTodo: item => todoStore.removeListTodo(item),
    setSelectedTodo: index => todoStore.setSelectedTodo(index),
}))
@observer
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            todoList: [],
            index: 0,
        };
    }

    // Fonction appelé quand le texte de l'input change
    onInputChangeText = text => {
        this.setState({ text: text });
    };

    // Fonction  appelé quand on sauvegarde la todo via le state
    saveTodoList = () => {
        this.setState(prevState => ({
            todoList: [...prevState.todoList, this.state.text]
        }))
        this.setState({ text: "" });
    };

    // Fonction permettant de changer de page
    goToDetail = i => {
        this.props.setSelectedTodo(i)
        this.props.navigation.navigate('detailsTodo');
    }

    // Fonction qui permet de save la todo via le store
    saveToStoreTodo = () => {
        this.props.addListTodo(this.state.text, this.state.index);
        this.setState({ index: this.state.index + 1 });
        this.setState({ text: "" });
    }

    render() {

        return (

            // // PREMIERE ETAPE

            // <View style={styles.container}>
            //     <View style={styles.header}>
            //         <Text style={styles.welcome}>Bienvenue sur la TodoList</Text>
            //     </View>
            //     <View>
            //         <TextInput
            //             style={styles.input}
            //             onChangeText={text => this.onInputChangeText(text)}
            //             value={this.state.text}
            //             returnKeyType="done"
            //             onSubmitEditing={() => this.saveTodoList()}
            //         />
            //     </View>

            //     <View style={styles.todo}>
            //         {this.state.todoList.map((todo, id) => <Text key={id}>{todo}</Text>)}
            //     </View>

            //     <Button
            //         onPress={this.goToDetail}
            //         title="Voir plus"
            //         color="#841584"
            //     />
            // </View>


            // DEUXIEME ETAPE
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.welcome}>Bienvenue sur la TodoList</Text>
                </View>
                <View>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => this.onInputChangeText(text)}
                        value={this.state.text}
                        returnKeyType="done"
                        onSubmitEditing={() => this.saveToStoreTodo()}
                    />
                </View>

                <View style={styles.todo}>
                    {this.props.todoList.map((l, i) => {
                        return <View key={i} style={styles.itemContainer}>
                            <Text style={styles.textItem} onPress={() => this.goToDetail(i)}>{l.name.toUpperCase()}</Text>
                            <Text style={styles.removeItem} onPress={() => this.props.removeListTodo(l)}>Supp.</Text>
                        </View>
                    })}
                </View>
            </View>
        );
    }
}
