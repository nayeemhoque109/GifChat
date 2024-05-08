
import * as Controller from "../app/controllers";
import * as Validation from "../utility/validations";
const express = require('express');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });


const app = express();

app.use(express.json());

const applyRoutes = (app) => {

    app.get("/", (req, res) => 
        res.send('Hello World!')
    );

    app.post('/user', Validation.validateCreateUser,  Controller.createUser);

    app.get('/search-user', Validation.validateSearchUser, Controller.searchUser);

    app.post('/channel', Validation.validateCreateChannel, Controller.createChannel);

    app.get('/channel-list', Validation.validateGetChannelList, Controller.getChannelList);

    app.post('/message', Validation.validateAddMessage, Controller.sendMessage);

    app.post('/upload', upload.single('file'), (req, res) => {
        res.json({ path: '/uploads/' + req.file.filename });
      });


    
};

export default applyRoutes;



