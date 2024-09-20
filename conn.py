import cx_Oracle
import os
from flask import Flask, render_template, request, redirect, url_for

username = 'system'
password = 'diks2004'

connection = cx_Oracle.connect(username, password, 'localhost:1521/xe')
cursor = connection.cursor()

app = Flask(_name_)

@app.route('/', method=['GET', 'POST'])
def index():
    # Your Python logic to generate output
    # total bookings
    if request.method == 'POST':
        id_value = request.form['id']
        name = request.form['name']
        skill1 = request.form['skill1']
        skill2 = request.form.get('skill2', '')  # Default empty string if not provided
        skill3 = request.form.get('skill3', '')
        skill4 = request.form.get('skill4', '')
        skill5 = request.form.get('skill5', '')
        skill6 = request.form.get('skill6', '')
        skill7 = request.form.get('skill7', '')
        skill8 = request.form.get('skill8', '')

        insert_query = '''
        INSERT INTO SKILLS_DATA (ID, NAME, SKILL)
        VALUES (:1, :2, :3, :4, :5, :6, :7, :8, :9, :10);'''
        
        cursor.execute(insert_query, (id_value, name, skill1, skill2, skill3, skill4, skill5, skill6, skill7, skill8))

        # Commit the transaction to save the changes
        connection.commit()

        # Redirect to the same page or another page after insertion
        return redirect(url_for('index'))

    # Render the form if it's a GET request
    return render_template('index.html')

if _name_ == '_main_':
    app.run(debug=True)


