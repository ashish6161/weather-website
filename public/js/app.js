console.log('js file is loaded')

const weatherForm = document.querySelector('form')
const message = document.querySelector('#message')
weatherForm.addEventListener('submit', (e) => {
    // This let browser know that js valued need not to be refreshed so that input values remain even after search and page refresh
    e.preventDefault()
    const search = document.querySelector('#location')
    

    fetch('http://localhost:3000/weather?search=' + search.value).then((response)=>{
        response.json().then((data)=>{
            //console.log(data)
            message.textContent = data.data
        })
    })
}) 