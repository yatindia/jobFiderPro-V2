<script>
import {createEventDispatcher} from "svelte"
import { countries } from "$lib/data/countries";
import { API } from "$lib/config";
import Swal from "sweetalert2"
    let data = {
        orgLogo: "",
        orgName: "",
        orgEmail: "",
        orgPhone: "",
        orgAddress: "",
        orgWebsite: "",
        orgCountry: "",
        pan: "",
        gstin: ""
    }

let dispatch = createEventDispatcher()

async function setProfile(){

    let login = localStorage.getItem("login")
    
   

    if(login !== null){
       

        console.log(data);
        await fetch(`${API}/profile/signupcomplete`,{
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
                Swal.fire({
                    icon:"success",
                    titleText:"Profile Updated"
                })
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

    <form on:submit|preventDefault={()=>{setProfile()}}>
        <h2 class="is-size-3 has-text-centered">Complete Your Profile</h2>
        <h3 class="is-size-6 mb-5 has-text-centered is-danger" style="color:#C02026;">
            you need to complete your profile to couintine
        </h3>

        <div class="columns">
            <div class="column">
                <div class="field">
                    <!-- svelte-ignore a11y-label-has-associated-control -->
                    <label>Organization Name</label>
                    <div class="control">
                    <input bind:value={data.orgName} class="input" type="text" placeholder="Organization Name">
                    </div>
                </div>
            </div>

            <div class="column">
                <div class="field">
                    <!-- svelte-ignore a11y-label-has-associated-control -->
                    <label>Contact Number</label>
                    <div class="control">
                    <input  bind:value={data.orgPhone} class="input" type="text" placeholder="Contact Number">
                    </div>
                </div>
            </div>
        </div>


        <div class="columns">
            <div class="column">
                <div class="field">
                    <!-- svelte-ignore a11y-label-has-associated-control -->
                    <label>PAN Number</label>
                    <div class="control">
                    <input bind:value={data.pan}  class="input" type="text" placeholder="PAN Number">
                    </div>
                </div>              
            </div>

            <div class="column">
                <div class="field">
                    <!-- svelte-ignore a11y-label-has-associated-control -->
                    <label>GSTIN Number</label>
                    <div class="control">
                    <input bind:value={data.gstin}  class="input" type="text" placeholder="GSTIN Number">
                    </div>
                </div>                
            </div>
        </div>








        <div class="field">
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label>Wesite</label>
            <div class="control">
            <input bind:value={data.orgWebsite}  class="input" type="text" placeholder="Wesite">
            </div>
        </div>

        <div class="field">
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label class="label">Address</label>
            <div class="control">
            <textarea bind:value={data.orgAddress}  class="textarea" placeholder="Address"></textarea>
            </div>
        </div>

        <div class="field">
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label class="label">Country</label>
            <!-- <div class="control">
            <textarea bind:value={data.orgCountry}  class="textarea" placeholder="Land Mark"></textarea>
            </div> -->

            <div class="control">
                <div class="select">
                  <select bind:value={data.orgCountry}>
                    <option value="">Select Country</option>
                    {#each countries as country}
                    <option value={country}>{country}</option>
                    {/each}

                  </select>
                </div>
              </div>


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
                    on:click={()=>{localStorage.clear(); window.location.reload()}} 
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
        
        form {

            background-color: #fff;
            padding: 2%;
            border-radius: 10px;
            width: 95%;
            max-width: 800px;
            max-height: 90vh;
            overflow: scroll;
        }
        
    }

</style>