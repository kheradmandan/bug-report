export default function ( sequelize, DataTypes ){
  const organ = sequelize.define( 'organ',
    {
      organ_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
      city_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: 'unique_organ_name_city_id',
        notNull: true,
        isInt: true
      },
      name: {
        type: DataTypes.STRING( 64 ),
        allowNull: false,
        unique: 'unique_organ_name_city_id',
        notNull: true,
        max: 64
      }
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