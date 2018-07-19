module.exports = {
  "roots": [
    "<rootDir>/server"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
    //TODO: fix path
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|js|tsx)?$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
};
