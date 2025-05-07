import express from 'express';
import userController from '../controllers/userController.js'
import socketController from '../controllers/socketController.js'

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));


router.get('/session', userController.session);

//api for pictures
router.get('/api', userController.api);

//api for search query
router.get('/api/search', userController.search);

//logout
router.get('/logout', userController.logout);

//add user
router.post('/add', userController.addUser);

//login user
router.post('/login', userController.login);

router.post('/notify', socketController.notify);

export default router;
