import { RealityModelConfig } from './global-config';

export default function ( sequelize, DataTypes ){
  const province = sequelize.define( 'province',
    {
      province_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING( 64 ),
        allowNull: false,
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