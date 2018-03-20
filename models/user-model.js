module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING
        },
        googleId: {
            type: DataTypes.STRING
        },
        thumbnail: {
            type: DataTypes.STRING
        },
        adminAccess: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });

    return User;
}