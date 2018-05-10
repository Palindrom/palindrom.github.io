echo "Installing deps..."
npm install
echo "Done"
echo "Building React site..."
npm run build
echo "Done"
echo "Fetching docs..."
cd docs-site
rm -rf docs
git clone --depth=1 https://github.com/Palindrom/Palindrom.git 
cp -r Palindrom/docs docs
rm -rf Palindrom
echo "Done..."
echo "Installing mkdocs..."
python -m pip install mkdocs
echo "Done"
python -m mkdocs build
echo "Bulding docs..."
cp docs/css/style.css site/css/custom_style.css
echo "Done"
mv site ../build/docs
rm -rf docs
