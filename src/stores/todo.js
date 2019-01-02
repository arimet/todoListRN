import { observable, action } from 'mobx';

class TodoStore {
    @observable todoList = [];
    @observable selectedTodo = null;

    addListTodo(list, index) {
        this.todoList.push({
            name: list,
            items: [],
            index
        })
    }

    removeListTodo(list) {
        this.todoList = this.todoList.filter((l) => {
            return l.index !== list.index
        })
    }

    setSelectedTodo(index) {
        this.selectedTodo = this.todoList[index];
    }

    addItem(item, text) {
        this.todoList.forEach((l) => {
            if (l.index === item.index) {
                l.items.push(text)
            }
        })
    }
}

const singleton = new TodoStore();

export default singleton;
