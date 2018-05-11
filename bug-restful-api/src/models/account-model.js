module.exports = function ( sequelize, DataTypes ){
  const account = sequelize.define( 'account',
    {
      account_uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: sequelize.fn( 'gen_random_uuid' )
      },
      name: { type: DataTypes.STRING( 64 ), allowNull: false, notNull: true, max: 64 },
      family: { type: DataTypes.STRING( 64 ), allowNull: false, notNull: true, max: 64 },
      email: { type: DataTypes.STRING( 355 ), allowNull: false, unique: true, isEmail: true, notNull: true, max: 355 },
      password: { type: DataTypes.STRING( 256 ), allowNull: false, notNull: true, max: 256 },
      mobile: { type: DataTypes.STRING( 13 ) },
      last_login_at: { type: DataTypes.DATE },
      created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: sequelize.fn( 'now' ) },
      updated_at: { type: DataTypes.DATE },
      deleted_at: { type: DataTypes.DATE },
      op_role_id: { type: DataTypes.INTEGER, allowNull: false, notNull: true, isInt: true },
      op_status_id: { type: DataTypes.INTEGER, allowNull: false, notNull: true, isInt: true }
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