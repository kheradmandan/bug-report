export default function ( Sequelize, sequelize ){
  const account = sequelize.define( 'account',
    {
      account_id: {
        type: Sequelize.DataTypes.UUID,
        primaryKey: true,
      },
      name: {
        type: Sequelize.DataTypes.STRING( 64 ),
        notNull: true,
      },
      family: {
        type: Sequelize.DataTypes.STRING( 64 ),
        notNull: true,
      },
      email: {
        type: Sequelize.DataTypes.STRING( 355 ),
        notNull: true,
        isUnique: true,
        isEmail: true,
      },
      password: {
        type: Sequelize.DataTypes.STRING( 256 ),
        notNull: true,
      },
      mobile: {
        type: Sequelize.DataTypes.STRING( 13 ),
      },
      last_login_at: {
        type: Sequelize.DataTypes.DATE,
      },
      created_at: {
        type: Sequelize.DataTypes.DATE,
      },
      updated_at: {
        type: Sequelize.DataTypes.DATE,
      },
      deleted_at: {
        type: Sequelize.DataTypes.DATE,
      }
    },
    {
      timestamps: true,
      paranoid: true,
      underscored: true,
      freezeTableName: true,
    }
  );

  return account;
}