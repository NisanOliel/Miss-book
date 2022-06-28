import bookAdd from "../cmps/book-add.cmp.js"


export default {
    props: ['books'],

    template: `
 <section class="book-filter">
    <label>Filter :</label>
 <input type="search" placeholder="Search here.." v-model="filterBy.byName" @input="filter">
 price:
 <input type="range" v-model="filterBy.price" @input="filter" :min="minPrice" :max="maxPrice"  v-model.number="filterBy.price">
 {{filterBy.price}}
 
 <book-add></book-add>
</section>
`,
    data() {
        return {
            filterBy: {
                title: '',
                price: '',
            },

        };
    },
    created() {
        this.filterBy.price = this.minPrice

    },
    methods: {
        filter() {
            this.$emit("filtered", this.filterBy);
        },
    },
    computed: {
        minPrice() {
            return Math.min(...this.books.map((book) => book.listPrice.amount))
        },
        maxPrice() {
            return Math.max(...this.books.map((book) => book.listPrice.amount))
        },
    },
    components: {
        bookAdd,

    },
    unmounted() { },
};