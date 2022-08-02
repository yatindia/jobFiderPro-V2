<script>
    // @ts-nocheck
    import { slide } from "svelte/transition"
    import { states } from "$lib/data/states";
    import { API } from "$lib/config";
    import { categories } from "$lib/data/categories"
    import { subCategories } from "$lib/data/subCategories"
    import SearchResult from "$lib/search/SearchResult.svelte"

    let data = {
        jobTitle: "d",
        jobType: "",
        jobCategory: "",
        jobSubCategory: "",
        state: "",
        city: ""
    }

    let skip = 0
    let limit = 2

    let results = [[], 0]
    let noOfPages = 1
    $: noOfPages = results[1]/limit




    async function search() {

        let login = localStorage.getItem("login")
        if(login !== null){
            await fetch(`${API}/job/search`,{
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization": `<Bearer> ${login}`
                },
                body: JSON.stringify({
                    limit, skip, ...data
                })
            })
            .then(res => res.json())
            .then(res => {
                results = res.data;
            })
            .catch(error => {
                data =  false
            })

        }
    }

    async function nextpage(){skip = skip+limit;await search()}
    async function previous(){skip = skip-limit; await search()}

</script>




<main>

    <form on:submit|preventDefault={()=>{search()}}>

        <div class="columns">

            <div class="column is-half">
                <div class="field">
                    <!-- svelte-ignore a11y-label-has-associated-control -->
                    <label>Search Input</label>
                    <div class="control">
                        <input bind:value={data.jobTitle} class="input" type="text" placeholder="Search...">
                    </div>
                </div>
            </div>

            <div class="column">

                <div class="field">
                    <!-- svelte-ignore a11y-label-has-associated-control -->
                    <label>Exprience Level</label>
                    <div class="control">
                        <div class="select">
                            <select bind:value={data.jobType}>
                                <option value="">Select job Type</option>

                                <option value="Internship">Internship</option>
                                  <option value="Full Time">Full Time</option>
                                  <option value="Part Time">Part Time</option>
                                  <option value="Remote Full Tile">Remote Full Tile</option>
                                  <option value="Remote Part Time">Remote Part Time</option>

                            </select>
                        </div>
                    </div>
                </div>

            </div>


            <div class="column">
                <div class="field">
                    <!-- svelte-ignore a11y-label-has-associated-control -->
                    <label>State</label>
                    <div class="control">
                        <div class="select">
                            <select bind:value={data.state}>
                                <option value="">Select State</option>
                                {#each Object.entries(states) as state , cities}
                                    <option value={state[0]}>{state[0]}</option>
                                {/each}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {#if data.state != ""}
            <div class="column">
                <div in:slide class="field">
                    <!-- svelte-ignore a11y-label-has-associated-control -->
                    <label>City</label>
                    <div class="control">
                        <div class="select">
                            <select bind:value={data.city}>
                            <option value="">Select City</option>
                            {#each states[`${data.state}`] as city}
                            <option value={city}>{city}</option>
                            {/each}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            {/if}

              

            <div class="column">
                <div class="field is-full">
                    <label for=""> &nbsp;</label>
                    <div class="control">
                        <button 
                            type="submit"
                            style="background-color:#C02026; width:100%"
                            class="button is-link is-full">Search
                        </button>
                    </div>
                
                </div>
            </div>

            </div>

            <div class="columns">

                <div class="column">

                    <div class="field">
                        <!-- svelte-ignore a11y-label-has-associated-control -->
                        <label>Job Category</label>
                        <div class="control">
            
                            <div class="select">
                                <select bind:value={data.jobCategory}>
                                  <option value="">Select Category</option>
                                  {#each categories as category }
                                  <option value={category.category}>{category.category}</option>
                                  {/each}
              
                                </select>
                            </div>
                        </div>
                    </div>
                 
                </div>

                <div class="column">
                    <div class="field">
                        <!-- svelte-ignore a11y-label-has-associated-control -->
                        <label>Job Sub Category</label>
                        <div class="control">
                            <div class="select">
                                <select bind:value={data.jobSubCategory}>
                                  {#if data.jobCategory !=""}
                                  {#each subCategories[data.jobCategory] as subCategory }
                                    <option value={subCategory}>{subCategory}</option>
                                  {/each}
                                  {/if}
                                </select>
                              </div>
                        </div>
                    </div>
                </div>
            </div>

            
        </form>
    
</main>

    {#if results && results[0].length > 0}
    <p style="max-width: 800px;margin:auto" class="mt-5">Total {results[1]} Results</p>
        {#each results[0] as result }
        
            <SearchResult {result}/>
        {/each}

        {#if results[1] > limit}
        <nav style=" max-width: 800px; margin:auto" class="pagination mt-5" role="navigation" aria-label="pagination">

            <button 
            type="button" on:click={()=>previous()} disabled={skip < limit} class="pagination-previous button is-link">Previous</button>

            {#if skip+limit < results[1]}
            <button type="button" on:click={()=>nextpage()} class="pagination-next button is-link">Next page</button>
            {/if}
 
          </nav> 

        {/if}


    
    {:else}
        <div class="noResults">
            <p>No Results</p>
        </div>
    {/if}

   
    
    <style lang="scss">

        .noResults {
            width: 100%;
            min-height: 20vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    
        main {
            width: 100vw;
            min-height: 10vh;
            background-color: #C02026;
            padding: 20px 0;

            z-index: 1000000;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: scroll;
            
            form {
    
                background-color: #fff;
                padding: 2%;
                border-radius: 10px;
                width: 80%;
                max-height: 90vh;
                overflow: scroll;
            }
    
            .select {
                width: 100%;
    
                select {
                    width: 100%;
                }
            }
            
        }
    
    </style>