import Bus from "../models/Bus.js";

// Get all buses
export const getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find().populate("assignedStudents");
    res.json(buses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single bus
export const getBus = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id).populate("assignedStudents");
    if (!bus) return res.status(404).json({ message: "Bus not found" });
    res.json(bus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create bus
export const createBus = async (req, res) => {
  try {
    const bus = new Bus(req.body);
    const savedBus = await bus.save();
    res.status(201).json(savedBus);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update bus
export const updateBus = async (req, res) => {
  try {
    const updatedBus = await Bus.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBus);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete bus
export const deleteBus = async (req, res) => {
  try {
    await Bus.findByIdAndDelete(req.params.id);
    res.json({ message: "Bus deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};