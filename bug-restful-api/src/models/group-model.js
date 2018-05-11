module.exports = function ( sequelize, DataTypes ){
  const group = sequelize.define( 'group',
    {
      group_uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: sequelize.fn( 'gen_random_uuid' )
      },
      organ_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: 'unique_group_name_organ_id',
        notNull: true,
        isInt: true
      },
      name: {
        type: DataTypes.STRING( 64 ),
        allowNull: false,
        unique: 'unique_group_name_organ_id',
        notNull: true,
        max: 64
      },
      description: { type: DataTypes.TEXT },
      op_status_id: { type: DataTypes.INTEGER, allowNull: false, notNull: true, isInt: true },
      created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: sequelize.fn( 'now' ) },
      updated_at: { type: DataTypes.DATE },
      deleted_at: { type: DataTypes.DATE },
    },
    {
      timestamps: true,
      paranoid: true,
      underscored: true
    }
  );

  group.associate = function ( models ){
    group.belongsTo( models.organ, { foreignKey: 'organ_id' } );
    group.belongsTo( models.op_status, { foreignKey: 'op_status_id' } );
  };
  return group;
}