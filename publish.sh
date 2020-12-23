case $1 in
  major | minor | patch)
    npm version $1;
    git push;
    npm publish;;
  *) echo 'Version should be one of: major, minor, patch';;
esac;