export {
  DefaultModelConfig,
  RealityModelConfig,
}

// Reality model strategies to simple tables
const RealityModelConfig = {
  timestamps: false,
  paranoid: false,
  underscored: true,
  freezeTableName: true,
};

// Model strategies
const DefaultModelConfig = {
  timestamps: true,
  paranoid: true,
  underscored: true,
  freezeTableName: true,
};