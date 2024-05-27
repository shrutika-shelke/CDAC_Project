import time
import requests
import pymysql

# Replace the following with your actual credentials
thingspeak_channel_id = "2438231"
thingspeak_api_key = "XXGTIR3CRQ0SDIEG"
mysql_database_host = "localhost"
mysql_database_user = "root"
mysql_database_password = "root"
mysql_database_name = "project"
mysql_table_name = "helmett"

def fetch_and_store_data():
    # Fetch data from Thingspeak
    thingspeak_api_url = f"https://api.thingspeak.com/channels/{thingspeak_channel_id}/feeds.json?api_key={thingspeak_api_key}&results=1"
    thingspeak_data = None

    try:
        response = requests.get(thingspeak_api_url, timeout=10)
        response.raise_for_status()
        thingspeak_data = response.json()
    except (requests.exceptions.HTTPError, requests.exceptions.Timeout, requests.exceptions.ConnectionError) as e:
        print(f"Error fetching data from Thingspeak: {e}")

    if thingspeak_data and 'feeds' in thingspeak_data and thingspeak_data['feeds']:
        # Extract the required data
        field1_value = thingspeak_data["feeds"][0]["field1"]
        field2_value = thingspeak_data["feeds"][0]["field2"]
        field3_value = thingspeak_data["feeds"][0]["field3"]
        field4_value = thingspeak_data["feeds"][0]["field4"]

        # Store the data in the MySQL database
        connection = pymysql.connect(
            host=mysql_database_host,
            user=mysql_database_user,
            password=mysql_database_password,
            database=mysql_database_name,
        )

        try:
            with connection.cursor() as cursor:
                sql_query = f"INSERT INTO `{mysql_table_name}` (`G`, `T`, `H`, `P`) VALUES (%s, %s, %s, %s)"
                cursor.execute(sql_query, (field1_value, field2_value, field3_value, field4_value))
                connection.commit()
        finally:
            connection.close()

# Fetch and store data every 10 seconds
while True:
    fetch_and_store_data()
    time.sleep(10)
