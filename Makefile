.PHONY: clean start

help:
	@echo "clean - remove junk files"

clean:
	find . -name '*.pyc' -exec rm -f {} +
	find . -name '*.pyo' -exec rm -f {} +
	find . -name '*~' -exec rm -f {} +
	find . -name '__pycache__' -exec rm -rf {} +

start:
	python app.py
	tsc --watch
