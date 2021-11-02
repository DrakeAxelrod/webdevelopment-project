<template>
  <footer class="position-relative fixed-bottom py-5">
    <div class="container">
      <div class="row align-items-center justify-content-md-between">
        <div class="col-md-6">
          <div class="copyright text-white">
            &copy; {{ year }} Group 35 WebDev
          </div>
        </div>
        <div class="col-md-6">
          <ul class="nav nav-footer justify-content-end">
            <li class="nav-item">
              <a
                class="text-white"
                href="https://github.com/DrakeAxelrod"
                target="_blank"
                rel="noopener"
                >Drake Axelrod
              </a>
              <i class="text-white"> - </i>
              <a
                class="text-white"
                href="https://github.com/Axel-J-L"
                target="_blank"
                rel="noopener"
                >Axel Lindmark
              </a>
              <i class="text-white"> - </i>
              <a
                class="text-white"
                href="https://github.com/MrJonte"
                target="_blank"
                rel="noopener"
                >Jonatan Andersson</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  name: 'app-footer',
  data() {
    return {
      year: new Date().getFullYear()
    }
  }
}
</script>
<style>
footer {
  background-color: transparent;
  border: 0;
  box-shadow: none;
}
</style>
