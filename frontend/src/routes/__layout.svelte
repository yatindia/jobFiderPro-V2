<script>
import Header from "$lib/header/Header.svelte";
import Footer from "$lib/footer/Footer.svelte";
import {onMount} from "svelte"


let loggedIn = false
onMount(()=>{
  let login = localStorage.getItem("login")
  login? loggedIn = true : loggedIn = false
})
</script>


<Header login={loggedIn}/>

<main style="min-height: 90vh;">
	<slot />
</main>

<Footer/>

