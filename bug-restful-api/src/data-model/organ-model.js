export default function ( Sequelize, sequelize, city ){
  const organ = sequelize.define( 'organ',
    {
      organ_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      city_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: city,
          key: 'city_id',
          deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
      },
      name: {
        type: Sequelize.DataTypes.STRING( 64 ),
        notNull: true,
        unique: true
      }
    },
    {
      timestamps: false,
      paranoid: false,
      underscored: true,
      freezeTableName: true,
    }
  );

  return organ;
}