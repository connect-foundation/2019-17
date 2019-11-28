module.exports = {
  transform: {
    "^.+\\.(jsx|js)?$": "babel-jest",
    "^.+\\.ts?$": "ts-jest"
  },
  testEnvironment: "node",
  testMatch: ["**/?(*.)+(spec|test).+(ts|tsx|js)"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
};
