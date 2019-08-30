<template>
    <div class="row">
        <Todo
        @updateTodoEvent="$emit('updateTodoEvent',$event)"
        @deleteTodoEvent="$emit('deleteTodoEvent', $event)" 
        v-for="(todo,index) in todos" 
        :todo="todo" 
        :key="todo._id"/>
    </div>
</template>
<script>
import Todo from "@/components/todo/Todo"
export default {
    components : {
        Todo
    },
    props : {
        todos:{
            type : Array,
            required : false
        }
    }
    
}
</script>