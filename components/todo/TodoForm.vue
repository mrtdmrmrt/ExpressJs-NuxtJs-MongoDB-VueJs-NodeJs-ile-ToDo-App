<template>
    <div class="row">
        <div class="col-md-6 offset-3 mt-5 d-flex">
            <input 
            v-model="todoText" 
            ref="todoTextInput" 
            type="text" 
            :class="{'is-invalid' : isInvalid}"
            class="form-control form-control-lg mr-1">
            <button @click="addTodo" class="btn btn-outline-dark">Ekle</button>
        </div>
  </div>
</template>
<script>
export default {
    data(){
        return {
            todoText :"",
            isInvalid : false
        }
    },
    methods  :{
        addTodo(){
            if(this.todoText !== ""){
                this.$emit("addTodoEvent" , this.todoText)//todoText'i gönderdik
                this.todoText = ''
                this.$nextTick(()=>this.$refs.todoTextInput.focus())//nuxtJs özelliği imlecin inputta kalmasını sağlar
                 this.isInvalid = false
            }else{
                this.isInvalid = true
            }
                
        }
    }
    
}
</script>