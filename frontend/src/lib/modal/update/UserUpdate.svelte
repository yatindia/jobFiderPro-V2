<script>
// @ts-nocheck

import {createEventDispatcher} from "svelte"
import {slide} from "svelte/transition"
import { countries } from "$lib/data/countries";
import {states} from "$lib/data/states";
import { API } from "$lib/config";

export let data = {
    dateOfBirth: "",
    jobTitle: "",
    gender: "",
    mobile: "",
    state: "",
    city: "",
    pastJobs: [["Nil", "0"]],
    qualifications: [
        ["", ""]
    ],
    techQualifications: [
        ["", ""]
    ]

}



    let date = new Date()

    let safeDate = `${date.getFullYear()-18}-01-01`


    

let dispatch = createEventDispatcher()

async function setProfile(){

    let login = localStorage.getItem("login")
    
   

    if(login !== null){
       

  
        await fetch(`${API}/profile/updateprofile2`,{
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                "Authorization": `<Bearer> ${login}`
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => {
            if (res.status) {
                // Swal.fire({
                //     icon:"success",
                //     titleText:"Profile Updated"
                // })
            }
        })
        .catch(error => {
            return false
        })
    }else{
        return false
    }

    dispatch("refresh")

    
}




</script>




<main>

    <form on:submit={(e)=>{e.preventDefault();setProfile()}}>
        <h2 class="is-size-3 has-text-centered">Complete Your Profile</h2>
        <h3 class="is-size-6 mb-5 has-text-centered is-danger" style="color:#C02026;">
            you need to complete your profile to couintine
        </h3>

        <div class="columns">
            <div class="column">
                <div class="field">
                    <!-- svelte-ignore a11y-label-has-associated-control -->
                    <label>Date of Birth</label>
                    <div class="control">
                    <input bind:value={data.dateOfBirth} class="input" type="date" max={safeDate} >
                    </div>
                </div>
        
            </div>
            <div class="column">
                <div class="field">
                    <!-- svelte-ignore a11y-label-has-associated-control -->
                    <label>Current Job Title</label>
                    <div class="control">
                    <input  bind:value={data.jobTitle} class="input" type="text" placeholder="Current Job Title">
                    </div>
                </div>
            </div>
        </div>

        <div class="columns">
            <div class="column">
                <div class="field">
                    <!-- svelte-ignore a11y-label-has-associated-control -->
                    <label>Gender</label>
                    <div class="control">
                        <div class="select">
                            <select bind:value={data.gender} >
                              <option value="">Select Gender</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                            </select>
                          </div>
                    </div>
                </div>
        
            </div>

            <div class="column">
                <div class="field">
                    <!-- svelte-ignore a11y-label-has-associated-control -->
                    <label>Mobile Number</label>
                    <div class="control">
                    <input bind:value={data.mobile}  class="input" type="text" placeholder="Mobile Number">
                    </div>
                </div>
            </div>
        </div>


        <div class="field">
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label>State</label>
            <div class="control">

                <div class="select">
                    <select bind:value={data.state}>
                      <option value="">Select State</option>
                      {#each Object.entries(states) as state , cities}
                      <option value={state[0]}>{state[0]}</option>
                      {/each}
  
                    </select>
                  </div>
           
            </div>
        </div>

        {#if data.state != ""}
            <div in:slide class="field">
                <!-- svelte-ignore a11y-label-has-associated-control -->
                <label>City</label>
                <div class="control">
                    <div class="select">
                        <select bind:value={data.city}>
                        <option value="">Select City</option>
                        {#each states[`${data.state}`] as city}
                        <option value={city}>{city}</option>
                        {/each}
                        </select>
                    </div>
                </div>
            </div>
        {/if}

        <div class="field">
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label>Qualification</label>
            <div class="control">
                {#each data.qualifications as qualification, i}
                    <div class="control">

                        <div class="columns">
                            <div class="column">
                                <input required bind:value={qualification[0]}  class="input" type="text" placeholder="Qualification">
                            </div>
                            <div class="column">
                                <input required bind:value={qualification[1]}  class="input" type="number" placeholder="Percentage">
                            </div>
                            <div class="column">
                                {#if i !=0}
                                <button 
                                type="button"
                                on:click={()=> { 
                                    (data.qualifications).splice(i,1)
                                    data.qualifications = data.qualifications
                                 }}
                                class="button is-danger" 
                                style="background-color:#C02026;width:100%">
                                <i class="fa-solid fa-circle-xmark"></i> &nbsp;{i} Remove
                            </button>
                                {/if}
                            </div>
                          
                          </div>
                    </div>
                {/each}
            </div>

            <button 
                type="button"
                on:click={()=> { data.qualifications = [...data.qualifications,["",(data.qualifications).length+1]]}}
                class="button is-danger mt-5 mb-5" 
                style="background-color:#C02026;">
                <i class="fa-solid fa-circle-plus"></i>&nbsp; Qualification
            </button>

        </div>
       

        <div class="field">
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label>Technical Qualification</label>
            <div class="control">
                {#each data.techQualifications as techqualification, i}
                    <div class="control">

                        <div class="columns">
                            <div class="column">
                                <input required bind:value={techqualification[0]}  class="input" type="text" placeholder="Qualification">
                            </div>
                            <div class="column">
                                <input required bind:value={techqualification[1]}  class="input" type="number" placeholder="Years Of Experience">
                            </div>
                            <div class="column">
                                {#if i !=0}
                                <button 
                                type="button"
                                on:click={()=> { 
                                    (data.techQualifications).splice(i,1)
                                    data.techQualifications = data.techQualifications
                                 }}
                                class="button is-danger" 
                                style="background-color:#C02026;width:100%">
                                <i class="fa-solid fa-circle-xmark"></i> &nbsp;{i} Remove
                            </button>
                                {/if}
                            </div>
                          
                          </div>
                    </div>
                {/each}
            </div>

            <button 
                type="button"
                on:click={()=> { data.techQualifications = [...data.techQualifications,["",'undefined']]}}
                class="button is-danger mt-5 mb-5" 
                style="background-color:#C02026;">
                <i class="fa-solid fa-circle-plus"></i>&nbsp; Qualification
            </button>

        </div>

        <div class="field">
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label>Past Job Experience</label>
            <div class="control">
                {#each data.pastJobs as pastJob, i}
                    <div class="control">

                        <div class="columns">
                            <div class="column">
                                <input required bind:value={pastJob[0]}  class="input" type="text" placeholder="Qualification">
                            </div>
                            <div class="column">
                                <input required bind:value={pastJob[1]}  class="input" type="number" placeholder="Years Of Experience">
                            </div>
                            <div class="column">
                                {#if i !=0}
                                <button 
                                type="button"
                                on:click={()=> { 
                                    (data.pastJobs).splice(i,1)
                                    data.pastJobs = data.pastJobs
                                 }}
                                class="button is-danger" 
                                style="background-color:#C02026;width:100%">
                                <i class="fa-solid fa-circle-xmark"></i> &nbsp;{i} Remove
                            </button>
                                {/if}
                            </div>
                          
                          </div>
                    </div>
                {/each}
            </div>

            <button 
                type="button"
                on:click={()=> { data.pastJobs = [...data.pastJobs,["",0]]}}
                class="button is-danger mt-5 mb-5" 
                style="background-color:#C02026;">
                <i class="fa-solid fa-circle-plus"></i>&nbsp; Job Experience
            </button>

        </div>
       

        <div class="field is-grouped">
            <div class="control">
                <button 
                    type="submit"
                    style="background-color:#C02026;"
                    class="button is-link">Submit
                </button>
            </div>
            <div class="control">
                <button
                    on:click={()=>{dispatch("refresh")}} 
                    type="button" 
                    class="button is-danger is-light">Cancel
                </button>
            </div>
        </div>
    </form>

</main>

<style lang="scss">

    main {
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1000000;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: scroll;
        
        form {

            background-color: #fff;
            padding: 2%;
            border-radius: 10px;
            width: 95%;
            max-width: 800px;
            max-height: 90vh;
            overflow: scroll;
        }

        .select {
            width: 100%;

            select {
                width: 100%;
            }
        }
        
    }

</style>