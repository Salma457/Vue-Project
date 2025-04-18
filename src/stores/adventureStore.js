// store.js
import { reactive } from 'vue'

export const adventureStore = reactive({
  adventure:[],
  groupsize:'',
  async getAdventure(_id){

    try {
      let singleAdventure = await fetch(`http://localhost:5000/adventures?id=${_id}`);
      this.adventure = await singleAdventure.json();

      this.groupsize = this.adventure[0].groupSize;
      return this.adventure[0];
    
    } catch (error) {
      console.log(error)
    }

  }

})