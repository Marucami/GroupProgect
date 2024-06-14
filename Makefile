install:
	npm ci

make lint:
	npx eslint .

lint-fix:
	npx eslint . --fix

test:
	NODE_OPTIONS=--experimental-vm-modules npx jest

test-coverage:
	npm test -- --coverage --coverageProvider=v8
