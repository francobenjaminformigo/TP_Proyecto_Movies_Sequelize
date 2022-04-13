module.exports = (sequelize, DataTypes) => {
    let alias = 'Movie';
    let cols = {
        id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING(500),
            allowNull: false
        },
        rating: {
            type: DataTypes.DECIMAL(3,1).UNSIGNED,
            allowNull: false
        },
        awards: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            defaulValue: 0
        },
        release_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        length: {
            type: DataTypes.INTEGER(10).UNSIGNED
        },
        genre_id: {
            type: DataTypes.INTEGER(10).UNSIGNED
        }
    };
    let config = {
        tableName: 'movies',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    };
    const Movie = sequelize.define(alias, cols, config)

    return Movie
}