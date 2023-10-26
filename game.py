def show_board(board):
    for l in board:
        for i in l:
            print(i, end = ' ')
        print('')


def check_draw(board):
    cnt = 0
    for l in board:
        for nl in l:
            if nl == 'X' or nl == 'O':
                cnt += 1

    # check draw
    if cnt == 9:
        return True

def check_row(board, player):
    for row in range(len(board)):
        if board[row].count(player) == 3:
            return str(row)

def check_col(board, player):
    if board[0][0] == player and board[1][0] == player and board[2][0] == player:
        return '0'
    if board[0][1] == player and board[1][1] == player and board[2][1] == player:
        return '1'
    if board[0][2] == player and board[1][2] == player and board[2][2] == player:
        return '2'

def check_diag(board, player):
    if board[0][0] == player and board[1][1] == player and board[2][2] == player:
        return '0'
    if board[2][0] == player and board[1][1] == player and board[0][2] == player:
        return '1'

def is_valid_move(move,board):
    # if the location is already occupied
    if move.isdigit():
        return True
    return False

def add_move(move,board,player):
    '''
    this will add move to the board
    '''
    for row in range(len(board)):
        for col in range(len(board[row])):
            if board[row][col] == move:
                if player == 'X':
                    board[row][col] = player
                else:
                    board[row][col] = player
    return board

# board = [[1,2,3],[4,5,6],[7,8,9]]

# show_board(board)
# player = 'X'
# while True:
#     loc = int(input('Enter your location: '))

#     # if its a valid input (loc)
    # if not(loc > 0 and loc < 10):
    #     print('Invalid input')
    #     continue

    # # if the location is already occupied
    # if loc not in board[0] and loc not in board[1] and loc not in board[2]:
    #     print('Location already occupied')
    #     continue

#     # add player to the location
#     for row in range(len(board)):
#         for col in range(len(board[row])):
#             if board[row][col] == loc:
#                 if player == 'X':
#                     board[row][col] = player
#                 else:
#                     board[row][col] = player
    
#     # check row
#     if check_row(board, player):
#         show_board(board)
#         print('Win')
#         break

#     # check col
#     if check_col(board, player):
#         show_board(board)
#         print('Win')
#         break

#     # check diagnol
#     if check_diag(board, player):
#         show_board(board)
#         print('Win')
#         break

#     # check for draw
#     if check_draw(board):
#         print('Draw')
#         break

#     if player == 'X':
#         player = 'O'
#     else:
#         player = 'X'

#     print("")
#     show_board(board)