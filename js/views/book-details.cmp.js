import longText from '../cmps/long-text.cmp.js'
import bookReview from '../cmps/review-add.cmp.js';
import reviewView from '../cmps/review-view.cmp.js';
import { bookService } from "../services/book-service.js";


export default {
    template: `
    <section v-if="book" class="book-details">
        <div class="left-side">
            <h2>{{book.title}}</h2>
            <h3>{{book.subtitle}}</h3>
            <h5>By: {{bookAuthors}}</h5>
            <h3>Language: {{book.language}}</h3>
            <h4 v-if="book.listPrice.isOnSale">On sale!</h4>
            <img :src="bookImg" alt="book img">
        </div>
        <div class="right-side">
            
            <h3>description:</h3>
            <long-text :text="book.description"></long-text>
            <h4>{{pageCount}}</h4>
            <h3>Categories: <span class="bcLight">{{bookCategories}}</span></h3>
            <h6>Price: <span :class="price">{{book.listPrice.amount}}  </span></h6>
            <p>{{publishDate}}</p>
            <router-link :to="'/book/' + nextBookId">Next book</router-link>
            <router-link class="back" :to="'/book/'">back</router-link>

            <book-review></book-review>
            <review-view></review-view>
            
            
        </div>

        
    </section>
`,
    data() {
        return {
            book: null,
            nextBookId: null

        };
    },
    created() {
        const id = this.$route.params.bookId
        bookService.get(id).then(book => this.book = book)
    },
    methods: {},
    computed: {
        bookAuthors() {
            return this.book.authors.join()
        },
        bookCategories() {
            return this.book.categories.join()
        },
        bookImg() {
            return this.book.thumbnail
        },
        pageCount() {
            if (this.book.pageCount > 500) return "Long reading"
            if (this.book.pageCount > 200) return "Decent reading"
            if (this.book.pageCount > 100) return "Light reading"

        },
        publishDate() {
            const today = new Date();
            const year = today.getFullYear();
            if (year - this.book.publishedDate > 10) return "Veteran Book"
            if (year - this.book.publishedDate <= 1) return "New Book!"
            else return
        },
        price() {
            if (this.book.listPrice.amount > 150) return "red"
            if (this.book.listPrice.amount < 20) return "green"
        }
    },
    watch: {
        '$route.params.bookId': {
            handler() {
                const id = this.$route.params.bookId
                bookService.get(id).then(book => {
                    this.book = book
                    bookService.getNextbookId(id)
                        .then(nextBookId => this.nextBookId = nextBookId)
                })
            },
            immediate: true
        }

    },
    unmounted() { },
    components: {
        longText,
        bookReview,
        reviewView,
    },
};

