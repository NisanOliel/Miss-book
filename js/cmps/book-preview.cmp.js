import { bookService } from "../services/book-service.js";
import { eventBus } from "../services/eventBus-service.js";


export default {
    props: ["book"],
    template: `
    <button @click="remove(book.id)">X</button>
   <h4>{{book.title}}</h4>
   <img :src="book.thumbnail" alt="" srcset="">
    <p>Price: <span :class="price">{{book.listPrice.amount}} {{currency}}</span></p>
`,
    data() {
        return {};
    },
    created() { },
    methods: {
        remove(idx) {
            console.log('idx:', idx)
            bookService.remove(idx)
            eventBus.emit('show-msg', { txt: 'Book Removed successfully', type: 'success' });



        }
    },
    computed: {
        currency() {
            if (this.book.listPrice.currencyCode === "EUR") return '€'
            if (this.book.listPrice.currencyCode === "ILS") return '₪'
            if (this.book.listPrice.currencyCode === "USD") return '$'
        },
        price() {
            if (this.book.listPrice.amount > 150) return "red"
            if (this.book.listPrice.amount < 20) return "green"
        },
    },
    unmounted() { },
};