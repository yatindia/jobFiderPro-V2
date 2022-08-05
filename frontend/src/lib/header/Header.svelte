<script>
 export let login = false
 let mobileMenu = false

</script>

<!-- svelte-ignore a11y-no-#C02026undant-roles -->
<nav class="navbar" style="height: 10vh;" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a href="/" class="navbar-item">
      <!-- svelte-ignore a11y-missing-attribute -->
      <img src="/img/logo.svg" style="all:unset; height: 100%;">
    </a>

    <a on:click|preventDefault={()=> {mobileMenu = !mobileMenu}} href="/" role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample"  class:is-active={mobileMenu} class="navbar-menu">
    <!-- <div class="navbar-start">
      <a href="/" class="navbar-item">
        Home
      </a>

      <a href="/" class="navbar-item">
        Documentation
      </a>

      <div class="navbar-item has-dropdown is-hoverable">
        <a href="/" class="navbar-link">
          More
        </a>

        <div class="navbar-dropdown">
          <a href="/" class="navbar-item">
            About
          </a>
          <a href="/" class="navbar-item">
            Jobs
          </a>
          <a href="/" class="navbar-item">
            Contact
          </a>
          <hr class="navbar-divider">
          <a href="/" class="navbar-item">
            Report an issue
          </a>
        </div>
      </div>
    </div> -->

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
       {#if login}
       <a href="/user/home" class="button is-light">
        Account
      </a>
        <a href="/" on:click|preventDefault={()=>{localStorage.clear(); location.href="/"}} class="button is-danger" style="background-color:#03045e;">
          <strong>Logout</strong>
        </a>
       {:else}
          <a href="/auth/signup" class="button is-danger" style="background-color:#C02026;">
            <strong>Sign up</strong>
          </a>
          <a href="/auth/login" class="button is-light">
            Log in
          </a>
       {/if}
        </div>
      </div>
    </div>
  </div>
</nav>

<style>
  .navbar {
    background-color: #b6d5eb;
  }
</style>