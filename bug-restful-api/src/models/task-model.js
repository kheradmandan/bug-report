export default function ( sequelize, DataTypes ){
  const task = sequelize.define( 'task',
    {
      task_uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: sequelize.fn( 'gen_random_uuid' )
      },
      global_seq: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: sequelize.fn( 'nextval', 'task_global_seq' )
      },
      owner_account_uuid: { type: DataTypes.UUID, allowNull: false },
      handler_group_uuid: { type: DataTypes.UUID, allowNull: false },
      organ_id: { type: DataTypes.INTEGER, allowNull: false },
      title: { type: DataTypes.STRING( 256 ), allowNull: false },
      explanation: { type: DataTypes.TEXT },
      priority: { type: DataTypes.INTEGER, allowNull: false },
      op_status_id: { type: DataTypes.INTEGER, allowNull: false },
      op_flag_id: { type: DataTypes.INTEGER, allowNull: false },
      created_at: { type: DataTypes.DATE },
      updated_at: { type: DataTypes.DATE },
      deleted_at: { type: DataTypes.DATE },
      closed_at: { type: DataTypes.DATE },
    },
    {
      timestamps: true,
      paranoid: true,
      underscored: true
    }
  );
  task.associate = function ( models ){
    task.belongsTo( models.account, { foreignKey: 'owner_account_uuid' } );
    task.belongsTo( models.group, { foreignKey: 'handler_group_uuid' } );
    task.belongsTo( models.organ, { foreignKey: 'organ_id' } );
    task.belongsTo( models.op_flag, { foreignKey: 'op_flag_id' } );
    task.belongsTo( models.op_status, { foreignKey: 'op_status_id' } );
  };
  return task;
}