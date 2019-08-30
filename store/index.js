import Vuex from "vuex"

const createStore = () => {
    return new Vuex.Store({
        state : {
            todos : []
        },
        //CLIENT ISLEMLERI
        mutations : {
            setTodos (state,todos){
                state.todos = todos
            },
            addTodo(state,todo){
                state.todos.push(todo)
            },
            deleteTodo(state,todo){
                let todoIndex = state.todos.findIndex(t =>t._id == todo._id)
                if(todoIndex>-1)
                {
                    state.todos.splice(todoIndex,1)// 1 tane sil
                }
                
            },
            updateTodo(state,todo){
                let todoIndex = state.todos.findIndex(t =>t._id == todo._id)
                //state.todos[todoIndex]=todo
                if(todoIndex>-1)
                {
                    state.todos.splice(todoIndex, 1 , todo)// 1 tane sil yerine todoyu yaz
                }
            },
        },
        //BACKEBD ISLEMLERI
        actions : {
            nuxtServerInit(vuexContext,context){
                return context.$axios.get("/get-all")
                    .then(response=>{
                        //console.log(response.data.docs)
                        vuexContext.commit("setTodos",response.data.docs)
                    })
                
                
            },
    
            addTodo(vuexContext,todo){

                this.$axios.post("/save", { todoText : todo})
                .then(response => {
                    console.log(response)

                    let newTodo = {
                       // _id : Math.ceil(Math.random(9) * Math.random(9) * 1000),
                       _id : response.data.data._id,
                        text : todo
                    }
                    vuexContext.commit("addTodo", newTodo)
                })
                
                
            },
            
            deleteTodo(vuexContext,todo){
                this.$axios.delete("/delete",{data : {todo : todo}})
                .then(response=>{
                    vuexContext.commit("deleteTodo",todo)
                })
                
            },
            updateTodo(vuexContext,updatedTodo){
                this.$axios.put("/update",{todo : updatedTodo})
                .then(response=>{
                    vuexContext.commit("updateTodo",updatedTodo)
                })
                
            }
        },
        getters : {
             getTodos(state){
                 return state.todos
             }
        }
    })
   
}

export default createStore

