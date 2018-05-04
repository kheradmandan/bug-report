export default function ( sequelize, DataTypes ){
  const group = sequelize.define( 'group',
    {
      group_uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: sequelize.fn( 'gen_random_uuid' )
      },
      organ_id: { type: DataTypes.INTEGER, allowNull: false, unique: 'unique_group_title_oran_id' },
      name: { type: DataTypes.STRING( 64 ), allowNull: false, unique: 'unique_group_title_oran_id' },
      description: { type: DataTypes.TEXT },
      op_status_id: { type: DataTypes.INTEGER, allowNull: false }
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