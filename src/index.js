document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/ramens")
    .then((resp) => resp.json())
    .then((data) => renderRamen(data))
})



function renderRamen(ramenArr) {
    const div = document.querySelector("#ramen-menu")
    ramenArr.forEach(ramen => {
        const img = document.createElement('img')
        img.src = ramen.image
        img.addEventListener('click', (e) => ramenDetails(e, ramen))
        div.append(img)
    })
}

function ramenDetails(e, ramen) {
    const img = document.querySelector(".detail-image")
    const h2 = document.querySelector(".name")
    const h3 = document.querySelector(".restaurant")
    const rating = document.querySelector("#rating-display")
    const comment = document.querySelector("#comment-display")
    img.src = ramen.image
    h2.textContent = ramen.name
    h3.textContent = ramen.restaurant
    rating.textContent = ramen.rating
    comment.textContent = ramen.comment
}



addRamen()

function addRamen () {
    const form = document.querySelector("#new-ramen")
    // console.log(form)
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        console.log(e)
        const name = e.target.name.value
        const rest = e.target.restaurant.value
        const img = e.target.image.value
        const rating = e.target.rating.value
        const text = document.querySelector("#new-comment").value
        // const comment = e.input.comment.value
        const newRamen = {
            id: "", 
            name: name,
            restaurant: rest,
            image: img,
            rating: rating,
            comment: text
        }
        ramenDetails(e, newRamen)
        postRamen(newRamen)
        form.reset()
    })
}

function postRamen(ramen) {
    fetch("http://localhost:3000/ramens", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(ramen),
    })
    .then((resp) => resp.json())
    .then((data) = renderRamen(data))
}

