# Palindrom Documentaion

After you update the docs in Palindrom repository, you'll have to update `palindrom.github.io`. To do this, you'll need:

1. Install [Python](https://www.python.org/downloads/).
2. Install MkDocs (in short run `python -m pip install mkdocs`);
3. In this dir, in your shell, execute `fetchandbuild.sh`. 

Now the site is built.

### Deploy

1. If you want to deploy, you'll need `gh-pages` command. If you don't have it execute `npm install -g gh-pages`.
2. Run `gh-pages -b master -d site`.

Done!
