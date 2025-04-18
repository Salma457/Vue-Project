<template>
    <div class="container mt-2 py-5">
      <div class="row align-items-baseline">
        <div class="col-2">
                <p class="fs-3">{{ adventureSt.host }}</p>
            </div>
        <div class="col-6 ">
          <h1 class="display-6 fw-bold mb-1">{{ adventureSt.title }}</h1>
          <p class="text-muted mb-2">
            <i class="bi bi-geo-alt-fill"></i> {{ adventureSt.subtitle }}
          </p>
          <div class="d-flex flex-wrap gap-3 align-items-center">
            <span class="d-flex align-items-center gap-1">
              <i class="bi bi-person"></i> {{ adventureSt.host }}
            </span>
            <span class="d-flex align-items-center gap-1">
              <i class="bi bi-calendar"></i> {{ adventureSt.duration }}
            </span>
            <span class="d-flex align-items-center gap-1">
              <i class="bi bi-people"></i> {{ adventureSt.groupSize }}
            </span>
            <span class="badge bg-danger text-white">
              {{ adventureSt.difficulty }}
            </span>
          </div>
        </div>
      </div>




    </div>
</template>

<script>
  export default {
    props:["adventureSt"]
  }
</script>

<style scoped>
.bi {
  font-size: 1rem;
  margin-right: 0.25rem;
}
</style>