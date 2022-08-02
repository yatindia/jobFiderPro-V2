<script>

import {API} from "$lib/config"
    import {onMount} from "svelte"

    // @ts-ignore
    export let jobid;

    let result = {
        dateOfAdd: "",
        jobApplyEnd: "",
        jobCategory: "",
        jobCity: "",
        jobDescription: "",
        jobRequirement: "",
        jobSalary: "",
        jobSubCategory: "",
        jobTitle: "",
        jobType: "",
        link_id: "",
        __v: 0,
        _id: "",
    }


    async function getJob() {

        let login = localStorage.getItem("login")
        if(login !== null){
            await fetch(`${API}/job/searchone`,{
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization": `<Bearer> ${login}`
                },
                // @ts-ignore
                body: JSON.stringify({jobid})
            })
            .then(res => res.json())
            .then(res => {
                
                if (!res.error) {
                    result = res.data.job;
                }

               

            })

        }
    }


    // @ts-ignore
    async function unApplyJob(job){
    
    let login = localStorage.getItem("login")
    
    if(login !== null){
       
        await fetch(`${API}/job/unapply`,{
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                "Authorization": `<Bearer> ${login}`
            },
            body: JSON.stringify({jobid: job})
        })
        .then(res => res.json())
        .then(res => {
         getJob()
        })
        .catch(error => {
            return false
        })
    }else{
        return false
    }
    
}



    onMount(()=>{getJob()})


</script>


{#if  result.jobTitle != ""}

<div class="result mt-5">
    
    <div class="title">
        <h2>{result.jobTitle}</h2>
        <p class="subtitle is-6">{result.jobDescription}</p>
    </div>

    <div class="details">

        <div class="columns titles">
            <div class="column">
                <h3 class="has-text-weight-bold">Location</h3>
                <div class="column"><h4>{result.jobCity}</h4></div>
            </div>

            <div class="column">
                <h3 class="has-text-weight-bold">Deadline</h3>
                <div class="column"><h4>{result.jobApplyEnd}</h4></div>
            </div>

            <div class="column">
                <h3 class="has-text-weight-bold">Job Level</h3>
                <div class="column"><h4>{result.jobType}</h4></div>
            </div>
            <div class="column">
                <h3 class="has-text-weight-bold">Salary</h3>
                <div class="column"><h4>${result.jobSalary}</h4></div>
            </div>

            <div class="column">
                <h3 class="has-text-weight-bold">Action</h3>
                <a href={`/view/job/${result._id}`} class="button is-warning">View</a>
            </div>

        </div>
  
    
        
    </div>

</div>
{:else}
<div class="result">
    <p>This Job Now Not Avaliable any More &nbsp; 
        <button on:click={()=>{unApplyJob(result._id)}} class="button is-danger">Remove</button>
    </p>
</div>
    
{/if}

<style lang="scss">

    .result {
        width:90%;
        max-width: 800px;
        margin: auto;
        border:1px solid #C02026;
        padding: 2%;
        border-radius: 5px;
        
        .title {

            p {
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2; /* number of lines to show */
                        line-clamp: 2; 
                -webkit-box-orient: vertical;
            }

        }

        .details {

            * {
                text-align: center;
            }

            .columns {
                @media only screen and (max-width:800px) {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    place-content: center;
                }
            }

            button {
                width: 100%;
                margin-bottom: 2px;

            }

            
        }
    }

</style>