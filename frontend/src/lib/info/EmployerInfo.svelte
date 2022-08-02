<script>
// @ts-nocheck
    import EmployerUpdate from "$lib/modal/update/EmployerUpdate.svelte";

    export let data
    let update = false
   
</script>
{#if update}
<EmployerUpdate on:refresh={()=>{window.location.reload() }} {data}/>
{/if}

{#if data.orgName !=""}
<main>

    <h1 class="is-size-2 mt-5">Organization Profile</h1>
    <section class="information">
 
        <div class="data">
            <span>Organization Name:</span> <span>{data.orgName}</span>
            <span>Organization Email:</span> <span>{data.orgEmail}</span>
            <span>Organization Phone:</span> <span>{data.orgPhone}</span>
            <span>Organization Address:</span> <span>{data.orgAddress}</span>

   


        </div>
        <div class="data">
            <span>Organization Id:</span> <span>{data._id}</span>
            <span>Organization Website:</span> <span>{data.orgWebsite}</span>
            <span>Organization PAN:</span> <span>{data.pan}</span>
            <span>Organization GST:</span> <span>{data.gstin}</span>
        </div>
        
        <button 
        on:click={()=>{update = !update}}
        class="button is-danger m-5" 
        style="background-color:#C02026;" >
        Update Organization Profile
    </button>
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
            display: grid;
            grid-template-columns: 1fr 1fr;
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
                grid-template-columns: 1fr;
            }
            
        }

        .information {
            

            .data {
                flex: 1;
                display: grid;
                grid-template-columns: 1fr;
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