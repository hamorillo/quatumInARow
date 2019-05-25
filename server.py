from flask import Flask
from flask import request
import json
app = Flask('__name__')
fileName = 'columnsHistory.csv'


@app.route("/start", methods=['POST'])
def start():
    clearFile()
    return ""


@app.route("/selectcolumn", methods=['POST'])
def selectcolumn():
    column = request.args.get('column', type=int)
    updateFileColumn(column)
    return str(column)

def removeFile():
    open(fileName, 'w').close()

def clearFile():
    removeFile()
    with open(fileName, 'r+') as file:
        data = []
        file.write(json.dumps(data))


def updateFileColumn(column: int):
    data = []
    with open(fileName, 'r') as file:
        data = json.loads(file.read())
        file.close

    data.append(column)
    removeFile()

    with open(fileName, 'r+') as file:
        file.write(json.dumps(data))
