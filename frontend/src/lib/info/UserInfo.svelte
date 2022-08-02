<script>
// @ts-nocheck
    import UserUpdate from "$lib/modal/update/UserUpdate.svelte";
    
    export let data
    let update = false
   
</script>

{#if data.dateOfBirth !=""}
<main>

    {#if update}
        <UserUpdate on:refresh={()=>{window.location.reload() }} {data}/>
    {/if}

    <h1 class="is-size-2 mt-5">Extended Profile</h1>
    <section class="information">
 
        <div class="data">
            <span>qualifications:</span> 
            {#each data.qualifications as qualification}
            <div>
                <span>{qualification[0]} - {qualification[1]}</span>
            </div>
                
            {/each}
            

            <span>Technical Qualifications:</span> 
            {#each data.techQualifications as qualification}
            <div>
                <span>{qualification[0]} - {qualification[1]}</span>
            </div>
                
            {/each}

            <span>Past Jobs Experience:</span> 
            {#each data.pastJobs as pastJob}
            <div>
                <span>{pastJob[0]} - {pastJob[1]}</span>
            </div>
                
            {/each}

            <button 
                on:click={()=>{update = !update}}
                class="button is-danger mt-5" 
                style="background-color:#C02026;" >
                Update Extended Profile
            </button>

        </div>
    
    </section>

</main>
{/if}


<style lang="scss">
    main {
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
            border-bottom: 1px solid grey;
            box-shadow: 0px 0px 5px #ddd;

            @media only screen and (max-width: 700px){
                flex-direction: column;
                border: 0;
                border-bottom: 1px solid grey;
            }
            
        }

        .information {
            

            .data {
                flex: 1;
                display: grid;
                grid-template-columns: 1fr 3fr;
                padding: 15px;
                border-bottom: 5px solid #C02026;
                
                @media only screen and (max-width: 800px) {
                    grid-template-columns: 1fr;
                }

            

                span:nth-child(even){
                    @media only screen and (max-width: 800px) {
                    margin-bottom: 10px;
                }
                }
                span:nth-child(odd){
                    font-weight: bold;
                    color: black;
                    padding-left: 0px;
                }

                span {
                    margin-top: 5px;
                    padding-left: 10px;
                }


            }


        }
    }
</style>