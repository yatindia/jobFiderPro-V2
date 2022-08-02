<script>
// @ts-nocheck


import {API} from "$lib/config"
import {onMount} from "svelte"
import AppliedJobsInfo from "$lib/info/JobInfo.svelte"

    let result = false


    async function getJob() {

        let login = localStorage.getItem("login")
        if(login !== null){
            await fetch(`${API}/job/searchoneseeker`,{
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization": `<Bearer> ${login}`
                }
            })
            .then(res => res.json())
            .then(res => {
                result = res.data;
                console.log(result);
            })

        }
    }



    onMount(()=>{getJob()})


</script>

<!-- svelte-ignore empty-block -->
{#if result != false && result.part1.appliedFor && result.part1.appliedFor.length >0}
    {#each result.part1.appliedFor as jobid}
    <AppliedJobsInfo {jobid} />
    {/each}
{:else}
<div class="empty">
    <img src="/img/search.gif" alt="">
    <h2 >You Haven't applied for any jobs!</h2>
    <a href="/search" class="button is-link"> Find Jobs</a>
</div>
{/if}

<style lang="scss">
    .empty {
        height: 90vh;
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        img {
            width: 20%;
        }
    }
</style>
