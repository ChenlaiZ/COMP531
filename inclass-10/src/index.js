//
// Inclass React ToDo Exercise
// ============================
//
// Using the views as described in our previous exercise
// re-implement the ToDo App using React.
// 
// Below you will transpile the h() function calls
// into JSX and implement ToDos.addTodo()
//
;(function() {

'use strict'

class ToDoItem extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            done: false
        }
    }

    render() { 
    	return (	
    		<li>
    			<i className="check glyphicon glyphicon-check" onClick={()=>this.toggleDone()}></i>
    			<span className={this.state.done ? "completed" : ""}>{this.props.text}</span>
    			<i className="destroy glyphicon glyphicon-remove" onClick={()=>this.props.remove()}></i>
    		</li>
    )}

	toggleDone() {
		this.setState({ 
			done: !this.state.done
        })
	}

}

class ToDos extends React.Component {

    constructor(props) {
        super(props)
        this.nextId = 2;
        this.state = {
            todoItems: [
                {id:0, text:"This is an item"},
                {id:1, text:"Another item" }
            ]
        }
    }


    addTodo() {
        // IMPLEMENT ME!
        this.setState({ todoItems: [
                ...this.state.todoItems, 
                {id:this.nextId++, text:this.refs.addText.value}
            ]
        })
    }
//this.refs.addText.value
    removeTodo(removeId) {
        this.setState({ 
            todoItems: this.state.todoItems.filter(({id, text}) => id != removeId)
        })
    }
//ref="addText"
    render() { return (
        <div>
            <input id="newTODO" type="text" placeholder="To Do" ref="addText"></input> 
            <button onClick={() => this.addTodo()}>Add Item</button>
            <span className="submit">
            	<a href="https://webdev-rice.herokuapp.com" target="_blank">Submit your exercise</a>
            </span>
            <ul className="todo">
            	{this.state.todoItems.map((x) => <ToDoItem key={x.id} text={x.text} remove={() => this.removeTodo(x.id)} />)}
            </ul>
        </div>

        /*
        h("div", { },
            h("input", { id: "newTODO", type: "text", placeholder: "To Do"}),
            h("button", { onClick: addItem }, "Add Item"),
            h("span", { className: "submit" }, [
                h("a", { href: "https://webdev-rice.herokuapp.com",
                     target: "_blank" }, "Submit your exercise"),
            ]),
            h("ul", { className: "todo" }, listItems)
        )
        */
    )}
}

ReactDOM.render(<ToDos/>, document.getElementById('app'));

})()
