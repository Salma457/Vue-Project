<template>
    <div >
        <Navbar/>

        <div style="height: 60vh; overflow: hidden;">
            <img 
            :src="adventureStore.adventure[0].image"
            class="img-fluid h-100 w-100"
            style="object-fit: cover; object-position: center;"
            alt="Adventure image"
            >
        </div>    
        <ShortInfo :adventureSt="adventureStore.adventure[0]" ></ShortInfo>
        <AdventureFullView class="" :fullInfo="adventureStore.adventure[0]"></AdventureFullView>
    </div>
</template>

<script>

    import { adventureStore } from '@/stores/adventureStore';
    import Navbar from '@/components/Navbar.vue';  
    import ShortInfo from '@/components/AdventureDetails/ShortInfo.vue';
    import AdventureFullView from '@/components/AdventureDetails/AdventureFullView.vue';
    export default {
        data() {
            return {
            adventureStore,
            

            }
        },
        methods:{

        },
        components:{Navbar, ShortInfo, AdventureFullView},

        async created() {
            let _id = this.$route.params.id;
            console.log(_id);
            await this.adventureStore.getAdventure(_id)
            console.log(adventureStore.adventure)
        },

    }
</script>

<style>

</style>