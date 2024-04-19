import * as Controller from "../app/controllers";
import * as Validation from "../utility/validations";

const applyRoutes = (app) => {

    app.get("/", (req, res) => 
        res.send('Hello World!')
    );

    app.post('/user', Validation.validateCreateUser,  Controller.createUser);

    app.post('/login', Validation.validateloginUser,  Controller.loginUser);

    app.get('/search-user', Validation.validateSearchUser, Controller.searchUser);

    app.post('/channel', Validation.validateCreateChannel, Controller.createChannel);

    app.get('/channel-list', Validation.validateGetChannelList, Controller.getChannelList);

    app.post('/message', Validation.validateAddMessage, Controller.sendMessage);
};

export default applyRoutes;