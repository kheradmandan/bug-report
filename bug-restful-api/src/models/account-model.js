export default function ( sequelize, DataTypes ){
  const account = sequelize.define( 'account',
    {
      account_uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: sequelize.fn( 'gen_random_uuid' )
      },
      name: { type: DataTypes.STRING( 64 ), allowNull: false },
      family: { type: DataTypes.STRING( 64 ), allowNull: false },
      email: { type: DataTypes.STRING( 355 ), allowNull: false, unique: true, isEmail: true },
      password: { type: DataTypes.STRING( 256 ), allowNull: false },
      mobile: { type: DataTypes.STRING( 13 ) },
      last_login_at: { type: DataTypes.DATE },
      created_at: { type: DataTypes.DATE },
      updated_at: { type: DataTypes.DATE },
      deleted_at: { type: DataTypes.DATE },
      op_role_id: { type: DataTypes.INTEGER, allowNull: false },
      op_status_id: { type: DataTypes.INTEGER, allowNull: false }
    },
    {
      timestamps: true,
      paranoid: true,
      underscored: true
    }
  );

  account.associate = function ( models ){
    account.belongsTo( models.op_role, { foreignKey: 'op_role_id' } );
    account.belongsTo( models.op_status, { foreignKey: 'op_status_id' } );
  };
  return account;
}