<template>
  <div class="container main-container pt-5">
    <h3 class="text-center">Express.js ile ToDo App | Nuxt.js</h3>
    <!--TodoForm'undan addTodoEvent'i gelicek. Gelirse bana bir fonksiyon çalıştır
    ve $eventla bu değeri al addTodo methoduna yolla-->
    <TodoForm @addTodoEvent="addTodo($event)"/>
    <h3 class="text-center mt-5 mb-3">Yapılacaklar Listesi</h3>
    <Alert v-if="todos.length === 0"/>
    <Todos
    v-else
    @deleteTodoEvent = "deleteTodo($event)"
    @updateTodoEvent =  "showUpdateContainer($event)"
    :todos ="todos"/>
    
    <UpdateTodo 
    @updateTodoEvent="updateTodo($event)"
    :todo = "toUpdateTodo"
    @hideUpdateContainerEvent ="showUpdate = false"
    :class="{'show-update-container' : showUpdate} "/> 
  </div>
</template>

<script>
import Todos from "@/components/todo/Todos"
import TodoForm from "@/components/todo/TodoForm"
import UpdateTodo from "@/components/todo/UpdateTodo"
import Alert from "@/components/todo/Alert"
export default {
  components : {
    Todos,
    TodoForm,
    UpdateTodo,
    Alert
  },
  data(){
    return {
      showUpdate : false,
      toUpdateTodo : null
    }
  },
  methods :{
    addTodo(todo){
      this.$store.dispatch("addTodo",todo)//todo paramtresini addTodoya gönderdik
    },
    deleteTodo(todo){
      this.$store.dispatch("deleteTodo",todo)
    },
    showUpdateContainer(todo){
      this.showUpdate = true
      this.toUpdateTodo = todo
    },
    updateTodo(updatedTodo){
      this.showUpdate = false
      this.$store.dispatch("updateTodo",updatedTodo)
    }
  },
  computed : {
    todos(){
      return this.$store.getters.getTodos
    }
  }
  
}
</script>
