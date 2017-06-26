import psycopg2
import os
import urllib
import sys
import config
import public_config
import private_config


def getDbConfig(settings):
    db_settings = settings['db_settings']

    is_dev = True
    is_test = False
    is_prod = False

    if is_dev:
        return db_settings['dev']
    elif is_test:
        return db_settings['test']
    elif is_prod:
        return db_settings['prod']
    return dict()


def handle_database(command):
    try:
        urllib.parse.uses_netloc.append('postgres')
        url = urllib.parse.urlparse(os.environ.get('DATABASE_URL'))
        conn = psycopg2.connect(
            database=url.path[1:],
            user=url.username,
            password=url.password,
            host=url.hostname,
            port=url.port
        )
        conn.autocommit = True
        cursor = conn.cursor()
        cursor.execute(command)
        if "SELECT" in command:
            table = cursor.fetchall()
            return table
        cursor.close()
        conn.close()
    except psycopg2.DatabaseError as e:
        error_message = "Uh oh, can't connect. Invalid dbname, user or password? \n" + str(e)
        print(error_message)
        sys.exit()


def handle_query(sql_query):
    result = handle_database(sql_query)
    return result