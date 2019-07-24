.PHONY: clean start check format

help:
	@echo "clean - remove junk files"
	@echo "start - start the dev servers"
	@echo "flake8 - check the python code for PEP8"
	@echo "prettier - check with prettier and write"

clean:
	find . -name '*.pyc' -exec rm -f {} +
	find . -name '*.pyo' -exec rm -f {} +
	find . -name '*~' -exec rm -f {} +
	find . -name '__pycache__' -exec rm -rf {} +

start:
	python app.py
	tsc --watch

flake8:
	flake8 .

prettier:
	prettier ./**/*.{js,css,json,sass} --check
