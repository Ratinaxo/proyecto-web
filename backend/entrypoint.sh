#!/bin/sh
set -e

host="db"
port="3306"

echo "Waiting for MySQL to be available..."
until nc -z $host $port; do
  sleep 1
done
echo "MySQL is up and running!"

flask db upgrade

exec flask run --host=0.0.0.0