<script>

    export let result = {
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
</script>


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
                <h3 class="has-text-weight-bold">Job Type</h3>
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


<style lang="scss">

    .result {
        width:90%;
        max-width: 800px;
        margin: auto;
        border:1px solid #03045e;
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