<script context="module">
	export const prerender = true;
</script>

<script>
// @ts-nocheck

	import Hero from "$lib/Hero/HomeHero.svelte"

	let Window;

</script>

<svelte:head>
	<title>Job FInder Pro - India's No.1 Job Portal</title>
	<meta name="description" content="Connect with 20000+ employers. Apply to millions of job opportunities across top companies, industries and locations on India's No.1 job site. Apply online." />
</svelte:head>

<svelte:window bind:innerWidth={Window} />
<section>

	<Hero/>

</section>


<section class="section is-clipped">
	<div class="container is-relative" style="background-color: rgb(192,32,38);">
	  <div class="is-absolute is-top-0 is-bottom-0 is-left-0 is-right-0 my-8 -mx-8 has-background-light"></div>
	  <div style="background-image: url(/img/cta-lines.svg );" class="is-relative ">
	
		<div class="columns is-vcentered is-multiline is-relative">
		  <div style="padding: 10%;" class="column is-8 pl-40-desktop mb-8 mb-0-desktop">
			<span class="subtitle has-text-white">Discover More</span>
			<h2 class="title is-3 is-size-2-tablet has-text-white mt-2 mb-14">Are You an Employer?</h2>
			<a class="button is-link" href="/auth/signup?type=employer">Signup Now!</a>
		  </div>
		  <div class="column is-4 is-relative" class:p-0={Window>800} class:pb-0={Window<800}>
			<img class="image is-fullwidth" style="height: 384px; object-fit: cover;" src="https://workplacerightslaw.com/wp-content/uploads/2021/09/shutterstock_1531283741-e1630694073872.jpg" alt="">
		  </div>
		</div>
	  </div>
	</div>
  </section>

<style>

</style>
