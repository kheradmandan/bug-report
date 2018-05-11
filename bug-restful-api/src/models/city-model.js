module.exports = function ( sequelize, DataTypes ){
  const city = sequelize.define( 'city',
    {
      city_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
      province_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: 'unique_city_name_province_id',
        notNull: true,
        isInt: true
      },
      name: {
        type: DataTypes.STRING( 64 ),
        allowNull: false,
        unique: 'unique_city_name_province_id',
        notNull: true,
        max: 64
      }
    },
    {
      timestamps: false,
      paranoid: true
    }
  );
  city.associate = function ( models ){
    city.belongsTo( models.province, { foreignKey: 'province_id' } )
  };
  return city;
}