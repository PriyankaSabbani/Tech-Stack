import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNumber: { type: String, required: true },
  assignedBus: { type: mongoose.Schema.Types.ObjectId, ref: "Bus" },
  contact: { type: String },
});

export default mongoose.model("Student", studentSchema);