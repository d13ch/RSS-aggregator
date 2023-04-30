install:
	npm ci
publish:
	npm publish --dry-run
lint:
	npx eslint .
serve:
	npx webpack serve
build:
	npx webpack --mode=development