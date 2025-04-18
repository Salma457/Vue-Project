<template>
  <div class="container">
    <div class="row">
        <div class="mb-3 col-3">
            <label for="advDate" class="form-label">Date:</label>
            <input type="date" class="form-control" v-model="adventureDate" id="advDate" >
        </div>
        <div class="mb-3 col-3">
            <label for="advTime" class="form-label">Time:</label>
            <div class="dropdown">
                <button
                class="btn btn-outline-secondary w-100 dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                >
                {{ adventureTime || 'Select Time' }}
                </button>
                <ul class="dropdown-menu w-100">
                <li
                    v-for="time in timeOptions"
                    :key="time"
                    @click="selectTime(time)"
                >
                    <button class="dropdown-item" type="button">{{ time }}</button>
                </li>
                </ul>
            </div>
        </div>
        <div class="mb-3 col-3">
            <label for="groupSize" class="form-label">Group Size:</label>
            <div class="dropdown">
                <button
                class="btn btn-outline-secondary w-100 dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                >
                {{ groupsize || 'Select Time' }}
                </button>
                <ul class="dropdown-menu w-100">
                <li
                    v-for="gsize in groupSizes"
                    :key="time"
                    @click="selectTime(time)"
                >
                    <button class="dropdown-item" type="button">{{ time }}</button>
                </li>
                </ul>
            </div>
        </div>


        
    </div>
  </div>
</template>

<script>
export default {

    data() {
        return {
            adventureDate:'',
            adventureTime:'',
            groupsize:0,
            timeOptions:[
                '1:00 AM',  '1:30 AM',
                '2:00 AM',  '2:30 AM',
                '3:00 AM',  '3:30 AM',
                '4:00 AM',  '4:30 AM',
                '5:00 AM',  '5:30 AM',
                '6:00 AM',  '6:30 AM',
                '7:00 AM',  '7:30 AM',
                '8:00 AM',  '8:30 AM',
                '9:00 AM',  '9:30 AM',
                '10:00 AM', '10:30 AM',
                '11:00 AM', '11:30 AM',
                '12:00 PM', '12:30 PM',
                '1:00 PM',  '1:30 PM',
                '2:00 PM',  '2:30 PM',
                '3:00 PM',  '3:30 PM',
                '4:00 PM',  '4:30 PM',
                '5:00 PM',  '5:30 PM',
                '6:00 PM',  '6:30 PM',
                '7:00 PM',  '7:30 PM',
                '8:00 PM',  '8:30 PM',
                '9:00 PM',  '9:30 PM',
                '10:00 PM', '10:30 PM',
                '11:00 PM', '11:30 PM',
                '12:00 AM', '12:30 AM'
            ],
            groupSizes:[4,5,6,7,8,9]

        }
    },
    methods:{
        selectTime(slectedTiem){
            this.adventureTime = slectedTiem;
            console.log(this.adventureTime)
        }
    }
}
</script>

<style>
.dropdown-menu {
  max-height: 200px; /* Adjust this value as needed */
  overflow-y: auto;
}
</style>