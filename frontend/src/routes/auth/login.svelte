<script>
      import {fade} from "svelte/transition"
      import {API} from "$lib/config"
      import {onMount} from "svelte"

      onMount(()=>{
        let login = localStorage.getItem("login")
        if(login){
          window.location.href = "/user/home"
        }
      })

      let email = "sdfsdf@sdasd.asd"
      let password = "1212"

      let response = {
        error: false,
        message: ""
      }

      async function submit() {
          
          await fetch(`${API}/account/login`,{
              method: "POST",
              headers: {
                  "Content-Type" : "application/json"
              },
              body: JSON.stringify({email, password})
          })
          .then(res => res.json())
          .then(res => {

            if (res.message == "Please confirm your verification e-mail") {
          
              response.error = true
              response.message = res.message
              
            }else if(res.error){
              alert(res.message)
              response.error = false
              response.message = ""
            }else {
              
              localStorage.setItem("login", res.data.authToken)
              window.location.href = "/user/home"
            }
          })
      }

   


</script>

<svelte:head>
    <title>JobsFinderPro - Login</title>
</svelte:head>

<div in:fade class="form">

    <form on:submit|preventDefault={()=>submit()}>
        <h1 
            class="has-text-centered is-capitalized is-size-1 has-text-weight-bold"
            style="color:#C02026;"
            >
            LOGIN
        </h1>
        <div class="field">
            <label class="label" for="email">Email</label>
            <div class="control has-icons-left has-icons-right">
              <input bind:value={email} class="input" id="email" type="email" placeholder="Email input" >
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
            </div>
          </div>
        
          <div class="field">
            <label class="label" for="password">Password</label>
            <div class="control has-icons-left has-icons-right">
              <input bind:value={password} class="input" id="password" type="password" placeholder="Password input" >
              <span class="icon is-small is-left">
                <i class="fas fa-key"></i>
              </span>
            </div>
          </div>
          <div class="field">
            <a style="color:#C02026" href="./forgotpassword">Forgot Password?</a>
          </div>

          {#if response.error}
          <p style="color:#C02026">{response.message} <a href="./reverify">(Click Here)</a></p>
          {:else}
          <p style="color:green">{response.message}</p>
          {/if}

        
          <div class="field">
            
              <button class="button is-fullwidth has-text-weight-bold" style="background-color:#C02026;color:#fff; max-width:100%">LOGIN</button>
           
        
          </div>
    </form>
</div>

<style>
    .form {
        min-height: 70vh;
        display: flex;
        justify-content: center;
        
    }
    form {
        width: 90%;
        max-width: 380px;
        margin: auto;
        box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
        padding: 2%;
        border-radius: 10px;
    }
</style>