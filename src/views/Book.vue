<template>
  <div>
    <Navbar/>
    <div class="container py-4" v-if="adventureStore.adventure.length > 0 ">
      <div class="row g-4">
        <!-- Booking Form Section -->
        <div class="col-lg-8">
          <div class="card shadow-sm">
            <div class="card-body">
              <h5 class="my-3">{{ adventureStore.adventure[0].title }}</h5>
              <h4 class="card-title mb-4">Book Your Adventure</h4>
              <div class="row g-3">
                <!-- Date Picker -->
                <div class="col-md-4">
                  <label for="advDate" class="form-label fw-bold">Date</label>
                  <input 
                    type="date" 
                    class="form-control form-control-lg" 
                    v-model="adventureDate" 
                    id="advDate"
                  >
                </div>
                
                <!-- Time Selector -->
                <div class="col-md-4">
                  <label class="form-label fw-bold">Time</label>
                  <select 
                    class="form-select form-select-lg" 
                    v-model="adventureTime"
                  >
                    <option value="" disabled selected>Select time</option>
                    <option 
                      v-for="time in timeOptions" 
                      :key="time" 
                      :value="time"
                    >
                      {{ time }}
                    </option>
                  </select>
                </div>
                
                <!-- Group Size -->
                <div class="col-md-4">
                  <label class="form-label fw-bold">Group Size</label>
                  <select 
                    class="form-select form-select-lg" 
                    v-model="groupsize"
                  >
                    <option value="0" disabled selected>Select group size</option>
                    <option 
                      v-for="size in groupSizeRange" 
                      :key="size" 
                      :value="size"
                    >
                      {{ size }} {{ size === 1 ? 'person' : 'people' }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="row">
        <!-- Price Summary Section -->
        <div class="col-lg-4 mt-5">
          <div class="card shadow-sm">
            <div class="card-body">
              <h4 class="card-title mb-4">Price Summary</h4>
              
              <div class="d-flex justify-content-between mb-2">
                <span>Price per person:</span>
                <span class="fw-bold">${{ adventureStore.adventure[0].price }}</span>
              </div>
              
              <div class="d-flex justify-content-between mb-3" v-if="groupsize > 0">
                <span>
                  {{ groupsize }} {{ groupsize === 1 ? 'person' : 'people' }}:
                </span>
                <span class="fw-bold">${{ totalPrice }}</span>
              </div>
              
              <div class="alert alert-info" v-else>
                Please select group size
              </div>
              
              <button 
                class="btn btn-primary w-100 py-2" 
                :disabled="!isFormComplete"
                @click="addBooking"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center d-flex align-items-center justify-content-center flex-column" style="height: 100vh;" v-else>
      <h2 class=" mb-5" >Please select an adventure first!</h2>
      <router-link to="/adventures">
        <button class="btn btn-primary">Browse Adventures</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { adventureStore } from '@/stores/adventureStore';
import Navbar from '@/components/Navbar.vue';
export default {
  data() {
    return {
      adventureStore,
      adventureDate: '',
      adventureTime: '',
      groupsize: 0,
      timeOptions: [
        '6:00 AM', '6:30 AM',
        '7:00 AM', '7:30 AM',
        '8:00 AM', '8:30 AM',
        '9:00 AM', '9:30 AM',
        '10:00 AM', '10:30 AM',
        '11:00 AM', '11:30 AM',
        '12:00 PM', '12:30 PM',
        '1:00 PM', '1:30 PM',
        '2:00 PM', '2:30 PM',
        '3:00 PM', '3:30 PM',
        '4:00 PM', '4:30 PM',
        '5:00 PM', '5:30 PM',
        '6:00 PM', '6:30 PM'
      ],
      Bookings:[]
    };
  },
  components:{Navbar}
  ,
  computed: {

    groupSizeRange() {
      const groupSizeString = this.adventureStore.adventure[0]?.groupSize || "0 people";
      const numbers = groupSizeString.match(/\d+/g);
      if (!numbers || numbers.length < 2) return [];
      const start = parseInt(numbers[0]);
      const end = parseInt(numbers[1]);
      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    },

    totalPrice() {
      return this.groupsize * (this.adventureStore.adventure[0]?.price || 0);
    },

    isFormComplete() {
      return this.adventureDate && this.adventureTime && this.groupsize > 0;
    }
  },

  methods:{

    async addBooking(){

      let newId = this.Bookings?.[this.Bookings.length - 1]?.id + 1 ?? 1;
      let user = JSON.parse(localStorage.getItem('currentUser'));

      let bookingData ={
        id:newId,
        adventureId: adventureStore.adventure[0].id,
        userId:user.email,
        date: this.adventureDate,
        time: this.adventureTime,
        participants: this.groupsize,
        status:'confirmed',
        totalPrice: this.totalPrice,
      } 
      // console.log(bookingData)
      await this.pushBooking(bookingData);
      // console.log(this.Bookings);
    },

    async pushBooking(bookingDt){

      await fetch('http://localhost:5000/bookings',{
        method:"POST",
        header:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(bookingDt)
      })
      this.Bookings.push(bookingDt);
    }


  },

  async created(){
    let fetchedBookings = await fetch(`http://localhost:5000/bookings`);
    this.Bookings = await fetchedBookings.json();
  }
};
</script>

<style scoped>
.card {
  border-radius: 12px;
  border: none;
}

.form-control, .form-select {
  border-radius: 8px;
  border: 1px solid #dee2e6;
}

.btn-primary {
  border-radius: 8px;
  font-weight: 500;
}
</style>