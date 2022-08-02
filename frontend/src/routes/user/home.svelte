<script>
// @ts-nocheck

    import EmpModal from "$lib/modal/EmployerComplete.svelte"
    import UserModal from "$lib/modal/UserComplete.svelte"
    import EmployerInfo from "$lib/info/EmployerInfo.svelte";
    import UserInfo from "$lib/info/UserInfo.svelte";
    import PostJob from "$lib/modal/post/Job.svelte"

    import {protectedRoute, getProfile} from "$lib/functions"
    import {onMount} from "svelte"


    let post_job = false

    let profileCheck = {error: false};
    onMount(()=>protectedRoute())
    
    onMount(async ()=> {
        // @ts-ignore
        let info = await getProfile()
        profileCheck = {
            ...profileCheck,
            ...info
        }

    })

    async function refresh(){
       window.location.reload()
    }

    $:console.log(profileCheck);

</script>


{#if (profileCheck.error)}
    {#if profileCheck.data && profileCheck.data.part1.type == "employer"}
        <EmpModal on:refresh={()=>refresh()}/>
    {:else}
        <UserModal on:refresh={()=>refresh()}/>
    {/if}
{:else}
<div></div>
{/if}

{#if post_job}
<PostJob on:refresh={()=>{ post_job = false;}}  on:cancel={()=>{post_job = false;}} />
{/if}
<div class="full-container">

    
    {#if profileCheck.data}
    <main>

        <h1 class="is-size-2">Your Profile</h1>
        <section class="information">
            <div class="person">
                <h2 class="is-size-4">
                    {profileCheck.data.part1.firstName}
                    {profileCheck.data.part1.lastName}
                </h2> 

                {#if profileCheck.data.part2.jobTitle}
                    <h3 class="is-size-5">
                        {profileCheck.data.part2.jobTitle}
                    </h3>
                    <h4 class="is-size-5">
                        {profileCheck.data.part2.city} |
                        {profileCheck.data.part2.state}
                    </h4>
                {/if}

                {#if profileCheck.data.part2.orgName}
                    <h3 class="is-size-5">
                        {profileCheck.data.part2.orgName}
                    </h3>
                    <h4 class="is-size-5">
                        {profileCheck.data.part2.orgAddress}
                    </h4>
                {/if}

                
                
            </div>
            <div class="data">

            {#if profileCheck.data.part2.gender}
                <span>Gender:</span> <span>{profileCheck.data.part2.gender}</span>
                <span>Date of Birth:</span> 
                <span>
                    {
                        ((profileCheck.data.part2.dateOfBirth).split("T"))[0]
                    }
                </span>
            {/if}
                

                <span>Phone:</span> 
                <span>
                    {
                        profileCheck.data.part2.mobile?
                        profileCheck.data.part2.mobile:
                        profileCheck.data.part2.orgPhone
                    }
                </span>

                <span>Mail:</span> <span>{profileCheck.data.part1.email}</span>
            </div>
        </section>
        {#if profileCheck.data && profileCheck.data.part1.type == "employer"}
            <div class="control-buttons">
                <button 
                    class="button is-danger" 
                    style="background-color: #C02026;"
                    on:click={()=> post_job = !post_job}>
                    Post a Job
                </button>
                <a href="/user/jobs" 
                    class="button is-danger" 
                    style="background-color: #C02026;">
                    View Posted Jobs
                </a>
            </div>
        {/if}
        {#if profileCheck.data && profileCheck.data.part1.type == "seeker"}
            <div class="control-buttons">
                <a href="/search" 
                    class="button is-danger" 
                    style="background-color: #C02026;">
                    Search Jobs
                </a>
      
                <a href="/view/job" 
                    class="button is-danger" 
                    style="background-color: #C02026;">
                    Applied Jobs
                </a>
            </div>
        {/if}




    </main>
    {/if}
    
    {#if profileCheck.data && profileCheck.data.part1.type == "employer"}
      <EmployerInfo data={profileCheck.data.part2} /> 
    {/if}

    {#if profileCheck.data && profileCheck.data.part1.type == "seeker"}
      <UserInfo data={profileCheck.data.part2} />
    {/if}

</div>

<style lang="scss">
    .control-buttons {
        width: 90%;
            margin: auto;
            max-width: 800px;
            padding-top: 10px;

    }

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
</style>