function createheart() {
    const heart = document.createElement('div')

    heart.innerHTML = 'heart'
    heart.style.position = 'fixed'
    heart.style.fontSize = '20px'

    heart.style.top = '50px'
    heart.style.left = `${Math.random() * window.innerWidth}px`
    heart.style.opacity = 1
    heart.style.zIndex = 9999
    heart.style.transition = 'transform 4s, opacity 4s ease-in'

    document.body.appendChild(heart)

    requestAnimationFrame(() => {
        heart.style.transform = `translateY(${window.innerHeight + 50}px)`
        heart.style.opacity = 0.3
    })
}