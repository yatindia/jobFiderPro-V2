<script>
    // @ts-nocheck
        import {protectedRoute, getProfile} from "$lib/functions"
        import {onMount} from "svelte"
        import {API} from "$lib/config"
        import PostJob from "$lib/modal/post/Job.svelte"
        import UpdateJob from "$lib/modal/update/Job.svelte"
        import Swal from "sweetalert2"

        onMount(()=>protectedRoute())

        let data = false;
        let post_job = false
        let update_job = false
        let update_job_data = {}
        let update_job_id;
        
        onMount(()=>getjobs())

        async function getjobs(){
            
            let login = localStorage.getItem("login")
            
            if(login !== null){

                await fetch(`${API}/job/getjobs`,{
                    method: "POST",
                    headers: {
                        "Content-Type" : "application/json",
                        "Authorization": `<Bearer> ${login}`
                    }
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


        async function deleteJob(_id){
            
            let login = localStorage.getItem("login")
            
            if(login !== null){

                await fetch(`${API}/job/removeJob`,{
                    method: "POST",
                    headers: {
                        "Content-Type" : "application/json",
                        "Authorization": `<Bearer> ${login}`
                    },
                    body : JSON.stringify({_id})
                })
                .then(res => res.json())
                .then(async (res) => {
                    if (res.error) {
                        await getjobs()

                        Swal.fire({
                            icon: "error",
                            titleText: "Failed to remove the job"
                        })
                    }else{
                        await getjobs()
                        Swal.fire({
                            icon: "success",
                            titleText: "Job Removed"
                        })
                    }
                })
                .catch(error => {
                    data =  false
                })

            }
        }
    
     
    
    </script>
    
 


{#if post_job}
    <PostJob 
    on:refresh={()=>{getjobs(); post_job = false;}} 
    on:cancel={()=>{post_job = false;}} 
    />
{/if}

{#if update_job}
    <UpdateJob
    _id={update_job_id}
    data={update_job_data}
    on:refresh={()=>{getjobs(); update_job = false;}} 
    on:cancel={()=>{update_job = false;}} 
    />
{/if}

{#if data && data != false}
    {#each data as job }
    <div class="result mb-5">
    
        <div class="title">
            <h2>
                <a href={`/user/jobs/appliedby/${job._id}`}
                    style="background-color:#C02026" 
                    class="button is-danger">
                    View Applied Candidates
                </a>
                {job.jobTitle} 
                
            </h2>
            <p class="subtitle is-6 hiddenParagraph mt-5">
                {job.jobDescription}
            </p>
        </div>
    
        <div class="details">
    
            <div class="columns titles">
                <div class="column">
                    <h3 class="has-text-weight-bold">Location</h3>
                    <div class="column"><h4>{job.jobCity}</h4></div>
                </div>
    
                <div class="column">
                    <h3 class="has-text-weight-bold">Deadline</h3>
                    <div class="column"><h4>{job.jobApplyEnd}</h4></div>
                </div>
    
                <div class="column">
                    <h3 class="has-text-weight-bold">Job Type</h3>
                    <div class="column"><h4>{job.jobType}</h4></div>
                </div>
                <div class="column">
                    <h3 class="has-text-weight-bold">Salary</h3>
                    <div class="column"><h4>{job.jobSalary}</h4></div>
                </div>
    
                <div class="column">
                    <button 
                        on:click={()=>{
                            update_job_id = job._id,
                            update_job_data = job
                            update_job = true
                        }}
                        class="button is-success">
                        Update
                    </button>

                    <button 
                        on:click={()=>{deleteJob(job._id)}}
                        style="background-color:#C02026" 
                        class="button is-danger">
                        Delete
                    </button>
                </div>
    
            </div>
            
        </div>
    
    </div>
    {/each}
    <div class="result mt-5">
       {#if data && data.length > 6}
       <p>You have reached maximum post limit!, remove some to post more</p>
       {:else}
        <button 
        on:click={()=>{post_job = true}}
        class="button is-link">
            Post Job
        </button>
       {/if}
    </div>
{:else}
 <div class="empty ">
     <h1>Jos Posted Yet!</h1>
     <button 
        on:click={()=>{post_job = true}}
        class="button is-link">
        Post Job
    </button>
 </div>
{/if}


<style lang="scss">

    .empty {
        width: 100%;
        height: 90vh;
        display:flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .result {
        width:90%;
        max-width: 800px;
        margin: auto;
        border:1px solid #C02026;
        padding: 2%;
        border-radius: 5px;
        
        .title {

            .hiddenParagraph {
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