const express = require("express")
const app = express()
const mongoose = require("mongoose")
//mongoose.connect("mongodb+srv://nuxt-user:nuxt123!@cluster0-jzamu.mongodb.net/todo?retryWrites=true&w=majority",{ userNewUrlParser: true })
mongoose.connect("mongodb://localhost/todo-app",{ userNewUrlParser: true })



/*Örnek Şablon
{
    _id : AudioTrack,
    text : ""
}
*/
const TodoModel = mongoose.model('todo', {text : String})

//Routing
app.get("/get-all",(req,res)=>{
  TodoModel.find({},(err,docs)=>{
    res.status(200).json({
      docs: docs
    })
  })
})
app.post("/save", (req, res) => {
    const newTodoItem = new TodoModel({
      text : req.body.todoText
    })
    newTodoItem.save()
      .then(response => {
        res.status(200).json({
          data : response
        })
      })
  })
app.delete("/delete",(req,res)=>{
  let todo=req.body.todo
  TodoModel.findOneAndRemove({_id : todo._id},()=>{ //BİR TANE KAYIT BUL VE SİL 
    res.status(204).json({ //res.status(204) burdaki 204 işlem başarılı geriye birşey döndürme anlamına geliyor
      message : "deleted"
    })
  })
})
app.put("/update" ,(req,res)=>{
  let updatedTodo = req.body.todo
  TodoModel.findOneAndUpdate({_id : updatedTodo._id}, {text : updatedTodo.text},()=>{ //BHANGİ KAYDI NE İLE DEĞİŞTİRECEĞİMİZİ SÖYLÜYORUZ
    res.status(200).json({ //res.status(204) burdaki 204 işlem başarılı geriye birşey döndürme anlamına geliyor
      message : "UPDATED"
    })
  })
})



module.exports={
    path : "/api",
    handler : app
}