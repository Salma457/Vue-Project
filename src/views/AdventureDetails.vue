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
        <div class="card text-center">
            <div class="card-header">
                <ul class="nav nav-tabs card-header-tabs">
                    <li class="nav-item">
                        <a :class="targetComp=='AdventureFullView'? 'nav-link active': 'nav-link text-decoration-none text-dark'" @click.prevent="targetComp='AdventureFullView'" aria-current="true" href="#">Full Information</a>
                    </li>
                    <li class="nav-item">
                        <a :class="targetComp=='Reviews'? 'nav-link active': 'nav-link text-decoration-none text-dark'" @click.prevent="targetComp='Reviews'" aria-current="true" href="#">Reviews</a>
                    </li>
                </ul>
            </div>
            <div class="card-body">
                    <component :fullInfo="adventure" :is="targetComp"/>
            </div>
        </div>

        <Footer></Footer>
    </div>
</template>

<script>

    import { adventureStore } from '@/stores/adventureStore';
    import Navbar from '@/components/Navbar.vue';  
    import ShortInfo from '@/components/AdventureDetails/ShortInfo.vue';
    import AdventureFullView from '@/components/AdventureDetails/AdventureFullView.vue';
    import Reviews from '@/components/AdventureDetails/Reviews.vue';
    import Footer from '@/components/Footer.vue';
    export default {
        data() {
            return {
            adventureStore,
            adventure:{},
            targetComp:'AdventureFullView'

            }
        },
        methods:{

        },
        components:{Navbar, ShortInfo, AdventureFullView, Footer, Reviews,  },

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