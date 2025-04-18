<template>
    <div>
        <Navbar/>

        <div style="height: 60vh; overflow: hidden;">
            <img 
            :src="adventure.image"
            class="img-fluid h-100 w-100"
            style="object-fit: cover;"
            alt="Adventure image"
            >
        </div>    
        <ShortInfo :adventureSt="adventure" ></ShortInfo>
        <AdventureFullView class="ps-5" :fullInfo="adventure"></AdventureFullView>

        <Footer></Footer>
    </div>
</template>

<script>

    import { adventureStore } from '@/stores/adventureStore';
    import Navbar from '@/components/Navbar.vue';  
    import ShortInfo from '@/components/AdventureDetails/ShortInfo.vue';
    import AdventureFullView from '@/components/AdventureDetails/AdventureFullView.vue';
    import Footer from '@/components/Footer.vue';
    export default {
        data() {
            return {
            adventureStore,
            adventure:{}

            }
        },
        methods:{

        },
        components:{Navbar, ShortInfo, AdventureFullView,Footer },

        async created() {
            let _id = this.$route.params.id;
            console.log(_id);
             this.adventure = await this.adventureStore.getAdventure(_id)
            // console.log(adventureStore.adventure)
        },

    }
</script>

<style>

</style>