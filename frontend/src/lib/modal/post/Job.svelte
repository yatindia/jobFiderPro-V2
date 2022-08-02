<script>
    // @ts-nocheck
    
    import {createEventDispatcher} from "svelte"
    import { API } from "$lib/config";
    import  { categories } from "$lib/data/categories"
    import {subCategories} from "$lib/data/subCategories"
    
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
    
        let date = new Date()
        let safeDate = `${date.getFullYear()}-${date.getDay()}-${date.getMonth()}`

        
    
    
        
    
    let dispatch = createEventDispatcher()
    
    async function createJob(){
    
        let login = localStorage.getItem("login")
        
        if(login !== null){
           
            await fetch(`${API}/job/create`,{
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization": `<Bearer> ${login}`
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                  alert(res.message)
                }
            })
            .catch(error => {
                return false
            })
        }else{
            return false
        }
    
        dispatch("refresh")
    
        
    }
    
    
    
    
    </script>
    
    
    
    
    <main>
    
        <form on:submit={(e)=>{e.preventDefault();createJob()}}>
            <h2 class="is-size-3 has-text-centered">Post A Job</h2>
            <h3 class="is-size-6 mb-5 has-text-centered is-danger" style="color:#C02026;">
                You can post up to 7 posts
            </h3>
    
            <div class="field">
                <!-- svelte-ignore a11y-label-has-associated-control -->
                <label>Job Title</label>
                <div class="control">
                <input required  bind:value={data.jobTitle} class="input" type="text" placeholder="Job Title">
                </div>
            </div>

            <div class="columns">

                <div class="column">
                    <div class="field">
                        <!-- svelte-ignore a11y-label-has-associated-control -->
                        <label>Application Deadline</label>
                        <div class="control">
                        <input required bind:value={data.jobApplyEnd} class="input" type="date" max={safeDate} >
                        </div>
                    </div>
                </div>

                <div class="column">

                    <div class="field">
                        <!-- svelte-ignore a11y-label-has-associated-control -->
                        <label>Job Type</label>
                        <div class="control">
            
                            <div class="select">
                                <select required bind:value={data.jobType}>
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

            </div>

            <div class="columns">

                <div class="column">

                    <div class="field">
                        <!-- svelte-ignore a11y-label-has-associated-control -->
                        <label>Job Category</label>
                        <div class="control">
            
                            <div class="select">
                                <select required bind:value={data.jobCategory}>
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
                                <select required bind:value={data.jobSubCategory}>
                                    
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

            <div class="columns">
                <div class="column">
                    <div class="field">
                        <!-- svelte-ignore a11y-label-has-associated-control -->
                        <label>Salary Information</label>
                        <div class="control">
                        <input required  bind:value={data.jobSalary} class="input" type="text" placeholder="Salary Information">
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="field">
                        <!-- svelte-ignore a11y-label-has-associated-control -->
                        <label>Job Location</label>
                        <div class="control">
                        <input required bind:value={data.jobCity} class="input" type="text" placeholder="Job Location">
                        </div>
                    </div>
            
                </div>
            </div>

            <div class="field">
                <!-- svelte-ignore a11y-label-has-associated-control -->
            <label>Job Description</label>
            <div class="control">
                <textarea required bind:value={data.jobDescription}  class="textarea" placeholder="Job Description"></textarea>
            </div>
            </div>

            <div class="field">
                <!-- svelte-ignore a11y-label-has-associated-control -->
            <label>Skills - <small style="color:#C02026">Use (,) to seperate the requirements</small></label>
            <div class="control">
                <input required  bind:value={data.jobRequirement} class="input" type="text" placeholder="Ex: good comunication, html, css, driving, own bike, etc">
            </div>
            </div>
    
 
    
            <div class="field is-grouped">
                <div class="control">
                    <button 
                        type="submit"
                        style="background-color:#C02026;"
                        class="button is-link">Submit
                    </button>
                </div>
                <div class="control">
                    <button
                        on:click={()=>{dispatch("cancel")}} 
                        type="button" 
                        class="button is-danger is-light">Cancel
                    </button>
                </div>
            </div>
        </form>
    
    </main>
    
    <style lang="scss">
    
        main {
            width: 100vw;
            height: 100vh;
            background-color: rgba(0, 0, 0, 0.5);
            position: fixed;
            top: 0;
            left: 0;
            z-index: 1000000;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: scroll;
            
            form {
    
                background-color: #fff;
                padding: 2%;
                border-radius: 10px;
                width: 95%;
                max-width: 800px;
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


