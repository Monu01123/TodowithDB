import express from "express";
import Todo from "../model/todo.js"; 

const app = express.Router();

app.post("/todo", async (req, res) => {
  try {
    const newTodo = new Todo({
      task: req.body.task,
    });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

app.get("/todo", async (req, res) => {
  try {
    const todos = await Todo.find(); 
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});


app.put("/todo/:id", async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { isCompleted: req.body.isCompleted },
      { new: true }
    );
    res.status(200).json(updatedTodo);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

app.delete("/todo/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id); 
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

export default app;
