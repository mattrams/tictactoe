let player = 'X'
let liveToast = document.querySelector('#liveToast')
let toastClose = document.querySelector('#liveToast .btn-close')
let modalWin = document.querySelector('.modal-win')
let rowLine = document.querySelector('.row-line')
let colLine = document.querySelector('.col-line')

toastClose.addEventListener('click', () => {
    liveToast.style.display = 'none'
})


document.addEventListener('click', (e) => {
    if (e.target.classList.contains('move')) {
        let board = []
        let boardCnt = 0
        let row = []
        for (span of document.querySelectorAll('.col span')) {
            row.push(span.innerText)
            boardCnt += 1
            if (boardCnt == 3) {
                board.push(row)
                row = []
                boardCnt = 0
            }
        }
        data = {
            'player': player,
            'move': e.target.classList.contains('col') ? e.target.querySelector('span').innerText : e.target.innerText,
            'board': board
        }
        fetch('/move', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                if (data['success'] == true) {
                    if (data['win'] == true) {
                        // setTimeout(() => {
                        //     modalWin.style.display = 'flex'
                        //     modalWin.querySelector('.modal-body p').innerHTML = `Player <span style="color:${player == 'X' ? 'red' : 'blue'}">${player}</span> won!`
                        // }, 2000);
                        keys_res = Object.keys(data)
                        if (keys_res.includes('row')) {
                            if (data['row'] == 0) {
                                rowLine.style.top = '50px'
                                rowLine.classList.add('row-line-width')
                            }
                            if (data['row'] == 1) {
                                rowLine.style.top = '150px'
                                rowLine.classList.add('row-line-width')
                            }
                            if (data['row'] == 2) {
                                rowLine.style.top = '250px'
                                rowLine.classList.add('row-line-width')
                            }
                        }
                        if (keys_res.includes('col')) {
                            if (data['col'] == 0) {
                                colLine.style.left = '47.5px'
                                colLine.classList.add('col-line-height')
                            }
                            if (data['col'] == 1) {
                                colLine.style.left = '147.5px'
                                colLine.classList.add('col-line-height')
                            }
                            if (data['col'] == 2) {
                                colLine.style.left = '247.5px'
                                colLine.classList.add('col-line-height')
                            }
                        }
                        if (keys_res.includes('diag')) {
                            if (data['diag'] == 0) {
                                colLine.style.left = '50px'
                                colLine.style.top = '50px'
                                colLine.style.transform = 'rotate(-45deg)'
                                colLine.classList.add('col-line-height')
                            }
                            if (data['diag'] == 1) {
                                
                                colLine.style.left = '250px'
                                colLine.style.top = '50px'
                                colLine.style.transform = 'rotate(45deg)'
                                colLine.classList.add('col-line-height')
                            }
                        }
                        let target = e.target.querySelector('span')
                        target.innerText = player
                        target.style.opacity = 1
                        if (player === 'X') {
                            target.style.color = "red"
                            target.style.fontSize = "26px"
                        }
                        else {
                            target.style.color = "blue"
                            target.style.fontSize = "26px"
                        }
                    }
                    else {
                        let target = e.target.classList.contains('col') ? e.target.querySelector('span') : e.target
                        target.innerText = player
                        target.style.opacity = 1
                        if (player === 'X') {
                            target.style.color = "red"
                            target.style.fontSize = "26px"
                            player = 'O'
                        }
                        else {
                            target.style.color = "blue"
                            target.style.fontSize = "26px"
                            player = 'X'
                        }
                    }
                }
                else {
                    liveToast.style.display = 'block'
                    liveToast.querySelector('.me-auto').innerText = 'Invalid Move'
                    liveToast.querySelector('.toast-body').innerText = 'Location already occupied.'
                }
            })
    }
})
