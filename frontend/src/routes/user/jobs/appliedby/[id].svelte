<script context="module">
    // @ts-ignore
    export function load({params}){
        return {
            props: {
                job: params.id
            }
        }
    }
</script>



<script>
    // @ts-nocheck
    import { API } from "$lib/config";
    import {tokenData} from "$lib/functions"
    import {onMount} from "svelte"

    export let job
    let data

    async function getjob(){
            
            let login = localStorage.getItem("login")
            
            if(login !== null){

                await fetch(`${API}/job/getsinglejob`,{
                    method: "POST",
                    headers: {
                        "Content-Type" : "application/json",
                        "Authorization": `<Bearer> ${login}`
                    },
                    body: JSON.stringify({jobid:job})
                })
                .then(res => res.json())
                .then(res => {

                    data = res.data

                    console.log(data);
                })
                .catch(error => {
                    data =  false
                })

            }
        }

        onMount(()=>getjob())
 

    </script>
    
    
  
 
{#if data && data.appliedBy}

<div class="titles">
    <p>{(data.appliedBy).length} Applicant{(data.appliedBy).length >1? "'s":""}</p>
</div>


    {#each data.appliedBy as applicant}

    <div class="columns">
        <div class="column">
            <p> Applicant Id: {applicant} </p>
            <a class="button is-link" href={`/view/seeker/${applicant}`}>View</a>
        </div>
    </div>

       
    {/each}
{/if}




<style lang="scss">

.titles {
    width:90%;
    max-width: 800px;
    margin: auto;
}

.columns {
    width:90%;
    max-width: 800px;
    margin: 20px auto;
    border: 1px #C02026 solid;

    .column {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        a {
            margin: 0 5%;
        }
    }
}

</style>


