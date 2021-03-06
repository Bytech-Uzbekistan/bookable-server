import { Router } from 'express';
import bcrypt from 'bcrypt';
import User from '../../models/user.model.js';
import jwt from 'jsonwebtoken';
import { verifyTokenAndAdmin } from '../../middleware/verifyToken.js';

const router = Router();

//Only admins can register new user

router.post('/', verifyTokenAndAdmin, async (req, res, next) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  try {
    const user = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      phoneNumber: req.body.phoneNumber,
      dateOfBirth: req.body.dateOfBirth,
      gender: req.body.gender,
      course: req.body.course,
    });
    console.log('User has been created');
    user.password = undefined;
    const accessToken = jwt.sign({ data: user }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });
    res.status(201).json({ accessToken: accessToken });
  } catch (e) {
    console.log('Error creating user');
    res.status(401).json({ error: e });
  }
});

export default router;
