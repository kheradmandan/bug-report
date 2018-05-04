export default function ( sequelize, DataTypes ){
  const organ = sequelize.define( 'organ',
    {
      organ_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
      city_id: { type: DataTypes.INTEGER, allowNull: false },
      name: { type: DataTypes.STRING( 64 ), allowNull: false, unique: true }
    },
    {
      timestamps: false,
      paranoid: true,
      underscored: true
    }
  );

  organ.associate = function ( models ){
    organ.belongsTo( models.city, { foreignKey: 'city_id' } )
  };
  return organ;
}