module.exports = {
				'roots': [
								'<rootDir>/server',
								'<rootDir>/client',
				],
				"moduleNameMapper": {
								"^@client(.*)$": '<rootDir>/client$1'
				},
				'transform': {
								'^.+\\.tsx?$': 'ts-jest',
				},
				'testRegex': '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|js|tsx)?$',
				'moduleFileExtensions': [
								'ts',
								'tsx',
								'js',
								'jsx',
								'json',
								'node',
				],
				"verbose": true,
				"testURL": "http://localhost/"
};
