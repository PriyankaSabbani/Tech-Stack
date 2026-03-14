const Material = require('../models/Material');
const path = require('path');

// Get all materials (limit 50)
exports.getMaterials = async (req, res) => {
  try {
    const materials = await Material.find().limit(50).sort({ createdAt: -1 });
    res.json(materials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create JSON material (links/notes)
exports.createMaterial = async (req, res) => {
  try {
    const material = new Material(req.body);
    await material.save();
    res.status(201).json(material);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Upload file material
exports.uploadMaterial = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const materialData = {
      title: req.body.title,
      type: req.body.type,
      subject: req.body.subject,
      date: req.body.date,
      description: req.body.description,
      uploadedBy: 'Faculty',
      filePath: `/uploads/${req.file.filename}`,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size
    };

    const material = new Material(materialData);
    await material.save();
    res.json({ success: true, material });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
