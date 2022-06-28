import { bookService } from "../services/book-service.js";
import { eventBus } from "../services/eventBus-service.js";



export default {
    template: `
    <section  class="review-add">
        <form  @submit.prevent="addReview(book.id)">
            <label for="name">Name: </label>
            <input v-model="review.name" ref="input"  type="name" placeholder="Name here..">
            <label>Rate:</label>
            <select  v-model="review.rate">
                <option>Rate:</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <div class="date">
                <label>Date of reading:</label>
                <input  v-model="review.date" type="date">
            </div>
            <textarea  v-model="review.text" name="txt-review" cols="40" rows="6" placeholder="Enter your review..."></textarea>
            <button>Post</button>
        </form>
    </section>
`,
    data() {
        return {
            book: null,
            review: {
                name: 'Books Reader',
                rate: 1,
                date: null,
                text: '',
            },
        };
    },
    created() {
        const id = this.$route.params.bookId
        bookService.get(id).then(book => this.book = book)
    },
    methods: {
        addReview(bookId) {
            bookService.addReview(bookId, this.review).then(book => {
                eventBus.emit('addReview', book)
            })
            this.review = {
                name: 'Books Reader',
                rate: 1,
                date: null,
                text: '',
            }
            eventBus.emit('show-msg', { txt: 'Added review successfully', type: 'success' });


        },
    },
    computed: {},
    mounted() {
        this.$refs.input.focus()
    },

};

