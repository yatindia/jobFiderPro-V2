<script>
    import {fade} from "svelte/transition"
    import {API} from "$lib/config"

    let email = ""

    let response = {
        error: false,
        message:""
    }

    async function submit() {
        
        await fetch(`${API}/account/recoverPassword`,{
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({email})
        })
        .then(res => res.json())
        .then(res => {
            if (res.error) {
               response.error = true
               response.message = res.message
            }else {
                response.error = false
               response.message = res.message
            }
        })
    }
</script>

<svelte:head>
  <title>JobsFinderPro - Password Recovery</title>
</svelte:head>

<div in:fade class="form">

  <form on:submit|preventDefault={()=>{submit()}}>
      <h1 
          class="has-text-centered is-capitalized is-size-3 has-text-weight-bold"
          style="color:#C02026;"
          >
          Recover Password
      </h1>
      <div class="field">
          <label class="label" for="email">Email</label>
          <div class="control has-icons-left has-icons-right">
            <input required bind:value={email} class="input" id="email" type="email" placeholder="Email input" >
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
          </div>
        </div>

        {#if response.error}
        <p style="color:#C02026">{response.message}</p>
        {:else}
        <p style="color:green">{response.message}</p>
        {/if}

        
      
        <div class="field">
          
            <button class="button is-fullwidth has-text-weight-bold" style="background-color:#C02026;color:#fff; max-width:100%">Recover</button>
         
      
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