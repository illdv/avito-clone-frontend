module.exports = {
				'roots': [
								'<rootDir>/server',
								'<rootDir>/client'
				],
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
				'moduleNameMapper': {
								'^client(.*)$': '<rootDir>/client$1',
								'^server(.*)$': '<rootDir>/server$1',
				},
				'testURL': 'http://localhost',
};