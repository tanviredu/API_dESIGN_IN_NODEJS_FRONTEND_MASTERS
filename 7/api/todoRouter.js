const router   = require("express").Router();
const mongoose = require("mongoose");
const Todo     = require("../model/db"); 

router.get("/",(req,res)=>{
    Todo.find({},(err,task)=>{
        if(err){
            res.json(err)
        }
        res.json(task);
    })
})

router.get("/:id",(req,res)=>{
    Todo.findById(req.params.id,(err,task)=>{
        if(err){
            res.json(err);
        }
        res.json(task);
    })
})


router.post("/",async (req,res)=>{
    const todo = new Todo({
        content:req.body.content
    });
    try{
        await todo.save();
        res.json(todo);
    }catch(err){
        res.json(err);
    }
})


router.put("/:id",async (req,res)=>{
    update = req.body;
    try{
        await Todo.findByIdAndUpdate(req.params.id,update)
        res.json(update);
    }catch(err){
        res.json(err);
    }
    
})


router.delete("/:id",async (req,res)=>{
    try{
        await Todo.findByIdAndRemove(req.params.id);
        res.json({
            message:"Removed"
        })
    }catch(err){
        res.json(err);
    }
})

module.exports = router;