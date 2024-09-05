
module.exports = {
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
    },
    // moduleNameMapper: {
    //   '\\.(css|less|scss|sass)$': 'identity-obj-proxy', 
    // },
    transformIgnorePatterns: [
        '/node_modules/(?!@amcharts).+\\.js$',
        // "/node_modules/(?!react-icons|@amcharts/amcharts5|other-modules-to-transform)/",
    ],
    moduleFileExtensions: ["js", "jsx", "json", "node", 'ts', 'tsx'],
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
        "^@amcharts/amcharts5$": "<rootDir>/__mocks__/@amcharts/amcharts5.js",
    },
    //   setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
};
