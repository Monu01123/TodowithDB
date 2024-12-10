import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  task: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
});

const Todo = mongoose.model("Todo", TodoSchema);

export default Todo;
