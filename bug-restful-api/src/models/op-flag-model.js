export default function ( sequelize ,DataTypes){
  const op_flag = sequelize.define( 'op_flag',
    {
      op_flag_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
      name: { type: DataTypes.STRING( 64 ), allowNull: false, unique: true }
    },
    {
      timestamps: false,
      paranoid: true,
      underscored: true
    }
  );
  return op_flag;
}