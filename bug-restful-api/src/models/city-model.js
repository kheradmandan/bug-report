export default function ( sequelize, DataTypes ){
  const city = sequelize.define( 'city',
    {
      city_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
      province_id: { type: DataTypes.INTEGER, allowNull: false },
      name: { type: DataTypes.STRING( 64 ), allowNull: false, unique: true }
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