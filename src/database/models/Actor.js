module.exports = (sequelize, DataTypes) => {
    const Actor = sequelize.define("Actor", {
        id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        rating: {
            type: DataTypes.DECIMAL(3,1),
            defaulValue: null
        },
        favorite_movie_id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            defaulValue: null
        }
    }, {
        tableName: 'actors',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });
    return Actor;
}