<script>
    import {onMount} from "svelte"

    let search = ""

    onMount(()=>{
        var span = document.querySelector(".typewriter span");
        // @ts-ignore
        var textArr = span.getAttribute("data-text").split(", "); 
        var maxTextIndex = textArr.length; 

        var sPerChar = 0.15; 
        var sBetweenWord = 1.5;
        var textIndex = 0; 

        typing(textIndex, textArr[textIndex]); 

        // @ts-ignore
        function typing(textIndex, text) {
            var charIndex = 0; 
            var maxCharIndex = text.length - 1; 
            
            var typeInterval = setInterval(function () {
                // @ts-ignore
                span.innerHTML += text[charIndex]; 
                if (charIndex == maxCharIndex) {
                    clearInterval(typeInterval);
                    setTimeout(function() { deleting(textIndex, text) }, sBetweenWord * 1000); 
                    
                } else {
                    charIndex += 1; 
                }
            }, sPerChar * 1000); 
        }

          // @ts-ignore
          function deleting(textIndex, text) {
              var minCharIndex = 0; 
              var charIndex = text.length - 1; 

              var typeInterval = setInterval(function () {
                  // @ts-ignore
                  span.innerHTML = text.substr(0, charIndex); 
                  if (charIndex == minCharIndex) {
                      clearInterval(typeInterval);
                      textIndex + 1 == maxTextIndex ? textIndex = 0 : textIndex += 1; 
                      setTimeout(function() { typing(textIndex, textArr[textIndex]) }, sBetweenWord * 1000); 
                  } else {
                      charIndex -= 1; 
                  }
              }, sPerChar * 1000); 
          }
              })
</script>

<section>
    <img class='logo' src="/img/logo.svg" alt="">
    
    
    <div class='pesquisa'>
      
      <i class="fa-solid fa-magnifying-glass"></i>
      
    <input type="text" bind:value={search} class=''>
      

      
    </div>

    <div class="container">
        <p class="typewriter">I'm a<span data-text="web developer., designer., photographer."></span>
        </p>
      </div>
    
    <div class="btn">
    <a href={`/search?s=${encodeURIComponent(search)}`} class="button p-5">Search Job</a>
      </div>
    
  </section>


<style>

*{
  margin:0;
  padding:0;
  box-sizing:border-box;
}

i{
  color: #c50000;
}

section{
  display:flex;
  flex-direction:column;
  align-items:center;
  width:100%;
  max-width:600px;
}

img{
  width:100%;
}

.logo{
  max-width:300px;
  height:100%;
  margin-bottom:40px;
  /* background-color: #fff; */
  border-radius: 10px;
  
}

.pesquisa{
   background-color:#ffffff;
   width: 100%;
   margin-bottom:40px;
   border-radius:100px;
   padding:10px;
   height: 44px;
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding: 0 20px;
}

.pesquisa:hover, button:hover{
  box-shadow: 1px 1px 3px 1px #ddd;
}

input[type='text']{
  width:100%;
  height:100%;
  border:none;
  outline: 0;
  padding: 0 10px;
}
 


.btn{
  display:flex;
}

button{
  width:fit-content;
  padding: 0 16px;
  height: 36px;
  border:none;
  border-radius:4px;
  color:#3c4043;
  background: #f8f9fa;
  cursor:pointer;
}




:root {
    --bg-color: #2E3D4B;
    --text-color: #6AE3FF;
}


.typewriter {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 20px;
    color: #fff;
    font-weight: bold;
    position: relative;
    margin: 0;
    top: 50%;
    transform: translateY(-50%);
}

.typewriter span {
    color: var(--text-color);
    text-transform: uppercase;
    padding: 10px;
    border-right: solid var(--text-color) 10px; 
    animation: cursor 1s ease-in-out infinite;
}

@keyframes cursor {
    from { border-color: var(--text-color); }
    to { border-color: transparent; }
}

@media (max-width: 576px) {
    .typewriter { font-size: 24px; }
}
@media (max-width: 768px) {
    .typewriter { font-size: 10px; }
}

  </style>