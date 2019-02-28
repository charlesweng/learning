###Setup
```
python3 -m venv /path/to/venv
source /path/to/venv/bin/activate
pip install --upgrade pip
pip install django
django-admin startproject blog
python manage.py runserver 8000
initdb --pgdata db
pg_ctl -D db -l logfile start
createdb blog_api -h localhost -p 7999
createuser --interactive blog_api_user -h localhost -p 7999
psql blog_api -h localhost -p 7999
GRANT ALL PRIVILEGES ON DATABASE "blog_api" TO blog_api_user;
REVOKE ALL PRIVILEGES ON DATABASE "blog_api" FROM blog_api_user;
django-admin startapp posts
```
### Install stunnel
```
brew install stunnel
location: /usr/local/etc/stunnel/stunnel.pem
```
###Generate server certificate:
```
openssl genrsa -out ca.key 4096
openssl req -new -x509 -days 365 -key ca.key -out ca.crt
```
###Generate client certificate:
```
openssl genrsa -out client.key 4096
openssl req -new -key client.key -out client.csr

# self-signed
openssl x509 -req -days 365 -in client.csr -CA ca.crt -CAkey ca.key -set_serial 01 -out client.crt
```
###Convert client key to PKCS (for browsers):
```
openssl pkcs12 -export -clcerts -in client.crt -inkey client.key -out client.p12
```
