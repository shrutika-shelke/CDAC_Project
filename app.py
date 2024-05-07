from flask import Flask, render_template, request
from flask_mysqldb import MySQL

app = Flask(__name__)

# Configure MySQL
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '$HRutika0106'
app.config['MYSQL_DB'] = 'test'  # Your database name
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

# Initialize MySQL
mysql = MySQL(app)

@app.route('/')
def signup():
    return render_template('Signup.html')

@app.route('/signup', methods=['POST'])
def signup_post():
    try:
        username = request.form['username']
        EmpID = request.form['EmpID']
        mobno = request.form['mobno']
        emailID = request.form['emailID']
        passwd = request.form['password']
        confpasswd = request.form['confirmPassword']

        # Save data to MySQL
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO sign (username, EmpID, mobno, emailID, passwd, confpasswd) VALUES (%s, %s, %s, %s, %s, %s)", (username, EmpID, mobno, emailID, passwd, confpasswd))
        mysql.connection.commit()
        cur.close()

        return 'Signup successful!'
    except Exception as e:
        return f'An error occurred: {str(e)}'

if __name__ == '__main__':
    app.run(debug=True)
