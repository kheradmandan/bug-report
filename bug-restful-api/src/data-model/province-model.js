export default function ( Sequelize, sequelize ){
  const province = sequelize.define( 'province',
    {
      province_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
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

  return province;
}