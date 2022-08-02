<script context="module">
  export function load({url}) {
      return {
          props : {
              searchQuery : url
          }
      }
  }
</script>

<script>
// @ts-nocheck

    import {fade} from "svelte/transition"
    import compress from 'compress-base64';
    import {API} from "$lib/config"
    import {onMount} from "svelte"

    onMount(()=>{
      let login = localStorage.getItem("login")
      if(login){
        window.location.href = "/user/home"
      }
    })

    let showPassword = false
    let agreed = false

    let form = {
        firstName: "",
        lastName:"",
        type: "seeker",
        email: "",
        password: "",
        profileImage: "profile.png",
    }

    let confirmPassword = ""

    export let searchQuery
    searchQuery.searchParams.get("type") ? form.type = "employer" : null;

  
          /**
* @type {string | ArrayBuffer | null | undefined}
*/

let  avatar, fileinput;


const onFileSelected =(/** @type {{ target: { files: any[]; }; }} */ e)=>{
    let image = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = e => {
      compress(e.target.result, {
        width: 250,
        type: 'image/png', // default
        max: 200, // max size
        min: 20, // min size
        quality: 0.8
      }).then(result => {
        avatar = result
      });

    };
}
     

async function submit () {



  await fetch(`${API}/account/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(form)
  } )
  .then(res => res.json())
  .then(res => {
    if (res.error) {
      alert(res.message)
    }else {
      alert("success")
    }
  })
  .finally(()=>{
   form = {
        firstName: "",
        lastName:"",
        type: "seeker",
        email: "",
        password: "",
        profileImage: "profile.png",
    }

    agreed = false

  })


}

</script>

<svelte:head>
    <title>JobsFinderPro - Signup</title>
</svelte:head>

<div in:fade class="form">

    <form on:submit|preventDefault={()=>{submit()}}>
        <h1 
            class="has-text-centered is-capitalized is-size-1 has-text-weight-bold"
            style="color:#C02026;"
            >
            SIGNUP
        </h1>
        <!-- {#if avatar}

        <img class="avatar" style="display:block; margin: auto" src={avatar} alt="d" />
       
        {/if} -->
        
        
        <!-- <div class="field">
            <label class="label" for="fname">Profile Image</label>
            <div class="control has-icons-left has-icons-right">
              <div class="file has-name">
                <label class="file-label">
                  <input 
                  on:change={(e)=>onFileSelected(e)} bind:this={fileinput} 
                   class="file-input" type="file" name="resume">
                  <span class="file-cta">
                    <span class="file-icon">
                      <i class="fas fa-upload"></i>
                    </span>
                    <span class="file-label">
                      Choose a file…
                    </span>
                  </span>
                  <span class="file-name">
                    {#if avatar}
                    {avatar}
                      
                    {/if}
                  </span>
                </label>
              </div>
        
            </div>
          </div> -->
        
        <div class="field">
            <label class="label" for="fname">First Name</label>
            <div class="control has-icons-left has-icons-right">
              <input required 
              bind:value={form.firstName}
              class="input" id="fname" type="text" placeholder="First Name" >
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
            </div>
          </div>

        <div class="field">
            <label class="label" for="email">Last Name</label>
            <div class="control has-icons-left has-icons-right">
              <input required 
              bind:value={form.lastName}
              class="input" id="lname" type="text" placeholder="Last Name" >
              <span class="icon is-small is-left">
                <i class="fas fa-smile"></i>
              </span>
            </div>
          </div>

        <div class="field">
            <label class="label" for="email">Email</label>
            <div class="control has-icons-left has-icons-right">
              <input required
              bind:value={form.email}
              class="input" id="email" type="email" placeholder="Email input" >
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
            </div>
          </div>
        
          <div class="field">
            <label class="label" for="password">Password</label>
            <div class="control has-icons-left has-icons-right">
              <input required
              bind:value={form.password}
              class="input" id="password" type="password" placeholder="Password input" >
              <span class="icon is-small is-left">
                <i class="fas fa-key"></i>
              </span>
            </div>
          </div>
        
          <div class="field">
            <label class="label" for="confirmPassword">Confirm Password</label>
            <div class="control has-icons-left has-icons-right">
            {#if showPassword}
                <input required 
                bind:value={confirmPassword}
                class="input" id="confirmPassword" type="text" placeholder="Confirm Password input" >
            {:else}
                <input required 
                bind:value={confirmPassword}
                class="input" id="confirmPassword" type="password" placeholder="Confirm Password input" >
            {/if}
              <span class="icon is-small is-left">
                <i 
                style="color:#C02026" 
                
                class:fa-eye-slash={!showPassword}
                class:fa-eye={showPassword}
                class="fas fa-eye-slash"
                ></i>
              </span>
            </div>
            <span>
                <p 
                class="pointer"
                on:click={()=>{showPassword = !showPassword;}}>{showPassword?"Hide" : "Show"} Password
                </p>
            </span>
          </div>

                  
          <div class="button-container">
            <h2>I'am a{form.type == "employer"? "n":""}</h2>
            <div class="is-flex btns">
                <button 
                type="button"
                on:click={()=> form.type = "seeker" }
                class:selected={form.type == "seeker"}
                class="button is-fullwidth has-text-weight-bold" style="max-width:100%">JOB SEEKER</button>
             
        
                <button 
                type="button"
                on:click={()=> form.type = "employer" }
                class:selected={form.type == "employer"}
                class="button is-fullwidth has-text-weight-bold" style="max-width:100%">EMPLOYER</button>
             
            </div>
          </div>

          <label class="checkbox">
            <input required bind:value={agreed} type="checkbox">
            I agree to the <a href="/terms-and-conditions">terms and conditions</a>
          </label>
        
          <div class="field">
            <button 
                type="submit"
                class="button is-fullwidth has-text-weight-bold" style="background-color:#C02026;color:#fff; max-width:100%">
                SIGNUP
            </button>
          </div>
    </form>
</div>

<style>
    .selected {
        background-color:#C02026;color:#fff;
    }
    .button-container{
        margin-bottom: 20px;
    }
    .button-container > .btns > button {
        margin: 5px;
    }

    h2 {
        text-align: center;
    }
    .form {
        min-height: 90vh;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
        background-image: url("/img/#C02026-bg.jpg");
        background-repeat: no-repeat;
        background-size: cover;
    }
    form {
        width: 90%;
        max-width: 480px;
        margin: 5%auto;
        box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
        padding: 2%;
        border-radius: 10px;
        background-color: #fff;
     
    }

    .pointer:hover {
        cursor: pointer;
        text-decoration: underline;
    }
</style>