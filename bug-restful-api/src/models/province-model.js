export default function ( sequelize, DataTypes ){
  const province = sequelize.define( 'province',
    {
      province_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
      name: { type: DataTypes.STRING(64), allowNull: false, unique: true }
    },
    {
      timestamps: false,
      paranoid: true
    }
  );

  return province;
}