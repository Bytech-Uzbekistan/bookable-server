import { Router } from 'express';
const router = Router();
import Floor from '../../models/floor.model.js';
import Building from '../../models/building.model.js';

import { verifyTokenAndAdmin } from '../../middleware/verifyToken.js';

router.get('/', verifyTokenAndAdmin, async (req, res) => {
  try {
    const floors = await Floor.find();
    res.status(200).json({ floors });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.post('/create', verifyTokenAndAdmin, async (req, res) => {
  try {
    const { name, building_id } = req.body;
    if (!name || !building_id) {
      res.status(400).json({ message: 'Please provide name and building_id' });
    }
    const floor = await Floor.create({ name: name });
    const building = await Building.findById(building_id);
    building.floors.push(floor._id);
    await building.save();
    res.status(200).json({ floor });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    const floor = await Flooor.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({ message: 'Floor has been deleted', floor });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    const { name, image } = req.body;
    const floor = await Floor.findOneAndUpdate(
      { _id: req.params.id },
      { name, image },
      { new: true }
    );
    await floor.save();
    res.status(200).json({ floor });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

export default router;
