const weatherform = document.querySelector('form')
const search =document.querySelector('input')
const msg1 =document.querySelector('#msg1')
const msg2 =document.querySelector('#msg2')
const msg3 =document.querySelector('#msg3')


weatherform.addEventListener('submit',(e)=>{
   e.preventDefault()
   const location =search.value
   msg1.textContent='loading...'
msg2.textContent=''
msg3.textContent=''
  // fetch('http://localhost:3000/weather?address='+location).then((response)=>{  //local host
    fetch('/weather?address='+location).then((response)=>{   //heroku
    response.json().then((data)=>{
        if(data.error)
        {
            msg1.textContent=data.error
        }
        else{
            msg1.textContent=data.location 
            msg2.textContent=data.temperature +" degree temperature outside"
            msg3.textContent="It look like" + data.description 
        }
    })
})

})
