<script context="module">
    // @ts-ignore
    export function load({params}){
        return {
            props: {
                id: params.id
            }
        }
    }
</script>



<script>
    // @ts-nocheck
    import { API } from "$lib/config";
    import {tokenData} from "$lib/functions"
    import {onMount} from "svelte"
    import Print from "print-html-element"

    export let id
    let data = {}
   

    
    async function getSeeker(){
    
        let login = localStorage.getItem("login")
        
        if(login !== null){
           
            await fetch(`${API}/job/seeker`,{
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization": `<Bearer> ${login}`
                },
                body: JSON.stringify({_id: id})
            })
            .then(res => res.json())
            .then(res => {

                if (!res.error) {
                    data = res.data
                    console.log(data);
                }else{
                    data = {}
                }
             
                   
               
            })
            .catch(error => {
                return false
            })
        }else{
            return false
        }
    
    
    }



    
    onMount(()=>{getSeeker()})


    </script>


{#if data != {} && data.part1 }
<div class="card" id="card">

    <div class="card-content">
      <div class="media">
        <div class="media-left">
            <figure class="image image">
              <!-- svelte-ignore a11y-img-redundant-alt -->
              <img style="width:130px !important" src="/img/logo.svg" alt="Placeholder image">
            </figure>
          </div>

        <div class="media-content">
          <p class="title is-4">{data.part2.firstName} {data.part2.lastName}</p>
          <p class="subtitle is-6">{data.part1.jobTitle}</p>
        </div>
      </div>
      <hr>
      <div class="content">


        <table class="table">
          
            <tbody>
                <tr>
                    <!-- svelte-ignore a11y-missing-attribute -->
                    <td><a on:click|preventDefault >Date Of Birth</a> 
                    
                    <td>{data.part1.dateOfBirth}</td>
                    
                </tr>
                <tr>
                    <!-- svelte-ignore a11y-missing-attribute -->
                    <td><a on:click|preventDefault >Email</a> </td>
                    <td>{data.part1.email}</td>
                </tr>
                    
                <tr>
                    <!-- svelte-ignore a11y-missing-attribute -->
                    <td><a on:click|preventDefault >Gender</a> </td>
                    <td>{data.part1.gender}</td>
                </tr>
                
                <tr>
                    <!-- svelte-ignore a11y-missing-attribute -->
                    <td><a on:click|preventDefault >Job Title</a> </td>
                    <td>{data.part1.jobTitle}</td>
                </tr>
                
                <tr>
                    <!-- svelte-ignore a11y-missing-attribute -->
                    <td><a on:click|preventDefault >id</a> </td>
                    <td>{data.part1.link_id}</td>
                </tr>
                
                <tr>
                    <!-- svelte-ignore a11y-missing-attribute -->
                    <td><a on:click|preventDefault >mobile</a> </td>
                    <td>{data.part1.mobile}</td>
                </tr>

                <tr>
                    <!-- svelte-ignore a11y-missing-attribute -->
                    <td><a on:click|preventDefault >Past Experience</a> </td>
                    <td>
                        {#each data.part1.pastJobs as info }
                            <p>{info[0]} - ({info[1]} year{info[1] > 1?"'s":""})</p>
                        {/each}

                    </td>
                </tr>
                
                <tr>
                    <!-- svelte-ignore a11y-missing-attribute -->
                    <td><a on:click|preventDefault >Qualifications</a> </td>
                    <td>
                        {#each data.part1.qualifications as info }
                            <p>{info[0]} -({info[1]}%) </p>
                        {/each}

                    </td>
                </tr>

                <tr>
                    <!-- svelte-ignore a11y-missing-attribute -->
                    <td><a on:click|preventDefault >Technical Qualifications</a> </td>
                    <td>
                        {#each data.part1.techQualifications as info }
                            <p>{info[0]} - {info[1]} year{info[1] > 1?"'s":""} </p>
                        {/each}

                    </td>
                </tr>

            </tbody>
          </table>


      </div>
    </div>
  </div>

  <div class="card mt-5">
    <button class=" button is-danger" on:click={()=>Print.printElement( document.getElementById('card'))}>Print</button>
  </div>
  
{/if}
    
    



    

<style lang="scss">

.card {
    
    width: 90%;
    margin: auto;
    max-width: 800px;
}

button {
    width: 100%;
}

</style>


