const userServices = require('../services/user.services');

const getUsers = async (req, res) => {
    console.log('GET USERS');
    const users = await userServices.findAll();
    if (!users) {
        throw "Users empty";
    }
    return res.json({
        data: users,
        pagination: {
            totalItem: users.length
        }
    });
};

const getSelf = async (req, res) => {
    const {_id} = req.user;
    const user = await userServices.findById(_id);
    if (!user) {
        throw "Users empty";
    }
    return res.json({
        data: user
    });
};

const addUser = async (req, res) => {
    try {
        console.log('ADD USER');
        const body = req.body;
        const user = await userServices.create(body);
        return res.json(user)
    } catch (errors) {
        return res.json({
            errors
        });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const user = await userServices.update(id, req.body);
    return res.json({
        data: user
    });
};

const updateSelf = async (req, res) => {
    const {_id} = req.user;
    const user = await userServices.update(_id, req.body);
    return res.json({
        data: user
    });
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await userServices.deleteById(id);
        return res.json({
             message: "Successfully deleted user"
        });
    } catch (errors) {
        return res.json({
           errors
        });
    }
}

module.exports = {
    getUsers,
    getSelf,
    addUser,
    updateUser,
    updateSelf,
    deleteUser
}
