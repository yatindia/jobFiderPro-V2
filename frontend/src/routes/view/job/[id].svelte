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
    let user = {}
    
        let data = {
            jobTitle: "",
            jobDescription: "",
            jobCity: "",
            jobSalary: "",
            jobRequirement: "",
            jobType: "",
            jobApplyEnd: "",
            jobCategory: "",
            jobSubCategory: ""
    
        }

        let org = {
            email: "",
            gstin: "",
            link_id: "",
            orgAddress: "d",
            orgCountry: "",
            orgEmail: "",
            orgLogo: "",
            orgName: "",
            orgPhone: "",
            orgWebsite: "",
            pan: ""
        }
    
        let date = new Date()
        let safeDate = `${date.getFullYear()}-${date.getDay()}-${date.getMonth()}`

        
   

    
    async function getJob(){
    
        let login = localStorage.getItem("login")
        
        if(login !== null){
           
            await fetch(`${API}/job/searchone`,{
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization": `<Bearer> ${login}`
                },
                body: JSON.stringify({jobid: job})
            })
            .then(res => res.json())
            .then(res => {
               if (!res.error) {
                   data = res.data.job
                   org = res.data.org
               }
            })
            .catch(error => {
                return false
            })
        }else{
            return false
        }
    
    
    }


    async function applyJob(){
    
        let login = localStorage.getItem("login")
        
        if(login !== null){
           
            await fetch(`${API}/job/apply`,{
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


    async function unApplyJob(){
    
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
    
    onMount(()=>{getJob(), user = tokenData()})


    </script>
    
    
    
    
    <main>
    
        <div class="mainCont">
            <h2 class="is-size-3 has-text-centered mb-5">Vacancy for: {data.jobTitle}</h2>


            <div class="columns">

                <div class="column">

                    <div class="field">
                        <!-- svelte-ignore a11y-label-has-associated-control -->
                        <label class='has-text-weight-bold'>Application Deadline</label>
                        <div class="control">
                        <p>{data.jobApplyEnd}</p>
                        </div>
                    </div>
                    
                </div>

                <div class="column">
                    <div class="field">
                        <!-- svelte-ignore a11y-label-has-associated-control -->
                        <label class='has-text-weight-bold'>Job Type</label>
                        <div class="control">
            
                            <p>{data.jobType}</p>
                       
                        </div>
                    </div>
                </div>

                <div class="column">
                    <div class="field">
                        <!-- svelte-ignore a11y-label-has-associated-control -->
                        <label class='has-text-weight-bold'>Job Category</label>
                        <div class="control">
            
                            <p>{data.jobCategory}</p>
                       
                        </div>
                    </div>
                </div>

            </div>

            <div class="columns">

      

                <div class="column">
                    <div class="field">
                        <!-- svelte-ignore a11y-label-has-associated-control -->
                        <label class='has-text-weight-bold'>Job Sub Category</label>
                        <div class="control">
            
                           <p>{data.jobSubCategory}</p>
                        </div>
                    </div>
                </div>

              
         
                <div class="column">
                    <div class="field">
                        <!-- svelte-ignore a11y-label-has-associated-control -->
                        <label class='has-text-weight-bold'>Salary Information</label>
                        <div class="control">
                        <p>{data.jobSalary}</p>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="field">
                        <!-- svelte-ignore a11y-label-has-associated-control -->
                        <label class='has-text-weight-bold'>Job Location</label>
                        <div class="control">
                        <p>{data.jobCity}</p>
                        </div>
                    </div>
            
                </div>
            </div>

            <div class="field">
                <!-- svelte-ignore a11y-label-has-associated-control -->
            <label class='has-text-weight-bold'>Job Description</label>
            <div class="control">
                <p class="paragraph">{data.jobDescription}</p>
            </div>
            </div>

            <div class="field">
                <!-- svelte-ignore a11y-label-has-associated-control -->
            <label class='has-text-weight-bold'>Skills</label>
            <div class="control">
                <p>{data.jobRequirement}</p>
            </div>
            </div>

            {#if user != {} && user.type !="employer"}
            
                {#if data.appliedBy && (data.appliedBy).includes(user.authid)}

                <div class="mt-5 is-grouped">
                    <div class="control">
                        <button 
                            on:click={()=>unApplyJob()}
                            type="button"
                            style="background-color:#C02026;"
                            class="button is-link">Remove Application
                        </button>
                    </div>
                </div>
          
                    
                {:else}

                <div class="mt-5 is-grouped">
                    <div class="control">
                        <button 
                            on:click={()=>applyJob()}
                            type="button"
                            style="background-color:#C02026;"
                            class="button is-link">Apply
                        </button>
                    </div>
                </div>

                {/if}

            
                
            {/if}
    
 
    


        </div>
    
    </main>
    
    <main class="prof mt-5 mb-5">

        <h1 class="is-size-2">Company Profile</h1>
        <section class="information">
            
            <div class="person">
                <h2 class="is-size-4">
                    { org.orgName }
                </h2> 

                
                <h3 class="is-size-5">
                    {org.orgAddress}
                </h3>
                <h4 class="is-size-5">
                    {org.orgCountry}
                </h4>
    
            </div>

            <div class="data">

                <span>Phone:</span> 
                <span> {org.orgPhone} </span>

                <span>Email:</span> 
                <span> {org.orgEmail} </span>

                <span>Website:</span> 
                <span> {org.orgWebsite} </span>

         

                <!-- <span>Mail:</span> <span>{profileCheck.data.part1.email}</span> -->
            </div>
        </section>

  



    </main>


    <style lang="scss">

        .field {
            border-bottom: 5px solid #C02026;
        }

        .columns {
            margin: 30px 0;
        }
        .paragraph {
            min-height: 10vh;
            border: 1px solid #C02026;
            padding: 5px;
            border-radius:5px 5px 0 0 ;
        }

        * {
            overflow: hidden !important;
        }

        .prof {
            flex-direction: column;
        margin-top: 5vh;
        h1{
            text-align: center;
            font-weight: bold;
        }
        section {
            width: 90%;
            margin: auto;
            max-width: 800px;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            gap: 5%;
            padding: 15px;
            border-bottom: 5px solid #C02026;
            box-shadow: 0px 0px 5px #ddd;

            @media only screen and (max-width: 700px){
                flex-direction: column;
                border: 0;
                border-bottom: 1px solid grey;
            }
            
        }

        .information {
            
            .person {
                flex:1;


                h2 {
                    color: #C02026;
                    word-break: break-all;
                }

                h3 {
                    color: rgb(33, 33, 33);
                    font-weight: bold;
                }


        
            }
            .data {
                flex: 1;
                display: grid;
                grid-template-columns: 1fr 2fr;
                padding: 15px;
                border-radius: 5px;
                box-shadow: 2px 2px 5px #ddd;

                // @media only screen and (max-width: 700px){
                //     border-left:20px solid #C02026
                // }


                span:nth-child(odd){
                    font-weight: bold;
                    color: black;
                }

                span {
                    margin-top: 5px;
                }


            }


        }
        }
    
        main {
 
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: scroll;
            
            .mainCont {
    
                background-color: #fff;
                padding: 2%;
                border-radius: 10px;
                width: 95%;
                max-width: 800px;
             
            }
    
            .select {
                width: 100%;
    
                select {
                    width: 100%;
                }
            }
            
        }
    
    </style>


