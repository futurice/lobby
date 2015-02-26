cd /usr/lobby/
git checkout master
git clean -df
git reset --hard
git pull origin master
forever stopall
./start.sh

