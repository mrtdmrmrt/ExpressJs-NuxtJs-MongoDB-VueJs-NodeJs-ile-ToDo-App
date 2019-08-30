<template>
    <div class="update-container container-fluid d-flex flex-column justify-content-center align-items-center">
        <div class="card shadow pt-2 pb-2" style="width: 30rem;">
            <div class="card-body">
                <h5 class="card-title">Kaydı Düzenle</h5>
                <input v-model="loadedTodo.text" type="text" class="form-control mt-3 mb-3" value="Burada değişecek değer yazacak..">
                <a @click="$emit('hideUpdateContainerEvent',true)" href="#" class="card-link btn btn-sm btn-outline-danger">vazgeç</a>
                <a @click="$emit('updateTodoEvent',loadedTodo)" href="#" class="card-link btn btn-sm btn-outline-warning">Güncelle</a>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    props : ["todo"],
    computed : {
        loadedTodo(){
            return this.todo ? {...this.todo} : {//Eğer todo varsa ..this.todo yu bana komple içindekilerle ver yoksa eğer yeni object yarat ve null ver
                _id : null,
                text : ""
            }
        }
    }
}
</script>