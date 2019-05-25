from flask import Flask
from flask import request
import json
app = Flask('__name__')
fileName = 'columnsHistory.csv'

@app.route("/selectcolumn", methods=['POST'])
def hello():
    column = request.args.get('column', type=int)
    updateFileColumn(column)    
    return str(column)

def updateFileColumn(column: int):
    data = []
    with open(fileName, 'r') as file:
        data = json.loads(file.read())
        file.close
    
    data.append(column)
    open(fileName, 'w').close()

    with open(fileName, 'r+') as file:
        file.write(json.dumps(data))