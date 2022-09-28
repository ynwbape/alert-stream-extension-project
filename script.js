const wrapper = document.getElementById('wrapper')
const index = document.getElementById('index')

// Position X de la souris lors de la manipulation de l'index (par rapport à la taille de wrapper)
let cursorPositionX = 0

// Configuration le l'index
const overflowMin = 15
const overflowMax = 15

const savedVolume = localStorage.getItem('volume')

// Si la position de l'index est sauvegardée en stockage local
if (savedVolume) index.style.left = savedVolume + 'px'

// Lorsque l'index est en mouvement
index.addEventListener('drag', event => {

    const { x } = event
    const { offsetWidth } = wrapper
    
    const calcul = Math.min(Math.max(-overflowMax, x - cursorPositionX), offsetWidth - index.offsetWidth + overflowMin)

    index.style.left = calcul + 'px'

})

// Lorsque l'index commence son mouvement
index.addEventListener('dragstart', event => {

    index.style.transition = "unset"

    const img = new Image()
    event.dataTransfer.setDragImage(img, 0, 0)

    cursorPositionX = event.x - index.offsetLeft

})

// Lorsque l'index finit son mouvement
index.addEventListener('dragend', event => {

    const calcul = Math.max(Math.min(event.x - cursorPositionX, wrapper.offsetWidth - index.offsetWidth + overflowMin), -overflowMax)
    index.style.left = calcul + 'px'

    // Sauvegarde de la position de l'index
    localStorage.setItem('volume', calcul)

})

// Lorsque l'utilisateur clique quelque part sur la barre de volume
wrapper.addEventListener('click' , event => {

    index.style.transition = "left .5s"
    index.style.left = event.offsetX - index.offsetWidth  + 'px'

})