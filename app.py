from flask import Flask, render_template, request
import json
import game
import time
app = Flask(__name__)
player = ''
board = ""

# {"res":'success'}
# {"res": 'error'}


@app.route('/', methods = ['POST','GET'])
def main():
    return render_template('index.html')

@app.route('/move', methods = ['POST','GET'])
def move():
    result = json.loads(request.data)
    player = result['player']
    board = result['board']
    move = result['move']
    if game.is_valid_move(move,board):
        board = game.add_move(move,board,player)
        row_res = game.check_row(board,player)
        col_res = game.check_col(board, player)
        print(row_res)
        diag_res = game.check_diag(board, player)
        if row_res:
            return json.dumps({'success': True, 'win': True, 'row': row_res})
        
        if col_res:
            return json.dumps({'success': True, 'win': True, 'col': col_res})
        
        if diag_res:
            return json.dumps({'success': True, 'win': True, 'diag': diag_res})
        
        return json.dumps({'success': True})
    else:
        return json.dumps({'success': False})

if __name__ == '__main__':
    app.run(debug = True)