mysql_install_db --user= \
--basedir=/usr/local/Cellar/mariadb/10.3.14/ \
--datadir=./datadir
mysqld_safe --datadir=./datadir/
mysql -uroot -e "UPDATE mysql.user set Password=Password('pass') where User = 'root'"
