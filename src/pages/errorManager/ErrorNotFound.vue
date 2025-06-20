<template>
  <div class="fullscreen-container bg-gradient text-white text-center q-pa-md flex flex-center">
    <div class="error-content">
      <div class="error-code">
        404
      </div>

      <div class="error-message text-h4 q-mt-md">
        Oops. No encontramos lo que buscas...
      </div>

      <q-btn
        class="q-mt-xl go-back-btn"
        color="primary"
        icon="arrow_back"
        label="Regresar"
        @click="goBack"
        unelevated
        no-caps
      />
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: 'ErrorNotFound'
});

import { useRouter } from 'vue-router';

const router = useRouter();

function goBack() {
  router.back();
}
</script>

<style scoped>
.fullscreen-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #4a90e2, #50c6df);
}

.error-content {
  text-align: center;
  max-width: 600px;
}

.error-code {
  font-size: 25vh;
  font-weight: bold;
  line-height: 1;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.error-message {
  opacity: 0.7;
  margin-top: 10px;
}

.go-back-btn {
  border-radius: 25px;
  padding: 10px 30px;
  font-size: 1.1rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}
</style>
