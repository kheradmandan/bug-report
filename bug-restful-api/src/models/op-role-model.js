export default function ( sequelize,DataTypes ){
  const op_role = sequelize.define( 'op_role',
    {
      op_role_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
      name: { type: DataTypes.STRING( 64 ), allowNull: false, unique: true }
    },
    {
      timestamps: false,
      paranoid: true
    }
  );

  return op_role;
}