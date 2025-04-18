<template>
  <div class="submit-page">
    <h1 class="title">Book Your Adventure</h1>
    <form @submit.prevent="submitForm">
      <input type="text" v-model="name" placeholder="Your Name" required />
      <input type="email" v-model="email" placeholder="Your Email" required />
      <textarea v-model="message" placeholder="Message or Notes" rows="5"></textarea>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Submit',
  data() {
    return {
      name: '',
      email: '',
      message: ''
    }
  },
  methods: {
    submitForm() {
      alert(`Thank you, ${this.name}! We will contact you soon.`);
      this.name = ''
      this.email = ''
      this.message = ''
    }
  }
}
</script>

<style scoped>
.submit-page {
  padding: 30px;
  font-family: 'Segoe UI', sans-serif;
  max-width: 600px;
  margin: auto;
}

.title {
  font-size: 28px;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
}

input, textarea {
  margin-bottom: 15px;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

button {
  background-color: #009688;
  color: white;
  border: none;
  padding: 12px;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background-color: #00796b;
}
</style>
