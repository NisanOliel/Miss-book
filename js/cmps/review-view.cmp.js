import { bookService } from "../services/book-service.js";
import { eventBus } from "../services/eventBus-service.js";



export default {
    template: `
        <section v-if="reviews" class="reviews-container ">
            <h1 class="reviews-title">Reviews:</h1>
            <ul>
                <li class="review" v-for="review in book.reviews">
                    <h3>Name: {{review.name}}</h3>
                    <p>Stars: {{review.rate}}</p>
                    <p>Date: {{review.date}}</p>
                    <p>Review:</p> <pre>{{review.text}}</pre>
                    <button @click="removeReview(idx)">Delete</button>
                </li>
            </ul>
        </section>

        <div v-else><h2>No Reviews</h2></div>
`,
    data() {
        return {
            book: null,
            reviews: null,
        };
    },
    created() {
        const id = this.$route.params.bookId
        bookService.get(id).then(book => {
            this.book = book
            this.reviews = book.reviews
        })
        eventBus.on('addReview', (book) => {
            this.book = book
        })
    },
    methods: {
        removeReview(idx) {
            bookService.removeReview(this.book.id, idx).then(() => {
                this.book.reviews.splice(idx, 1)
                if (this.reviews.length === 0) this.reviews = null
                eventBus.emit('show-msg', { txt: 'Deleted review ', type: 'error' });
            })
        }
    },
    computed: {},
    unmounted() { },
};