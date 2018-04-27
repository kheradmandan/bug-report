export default function ( Sequelize, sequelize, province ){
  const city = sequelize.define( 'city',
    {
      city_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      province_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: province,
          key: 'province_id',
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

  return city;
}