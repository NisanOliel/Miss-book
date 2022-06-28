import { bookService } from "../services/book-service.js";
import { eventBus } from "../services/eventBus-service.js";
import bookList from "../cmps/book-list.cmp.js";
import bookDetails from "../views/book-details.cmp.js";
import bookFilter from "../cmps/book-filter.cmp.js";






export default {
    template: `
    <section class="books-app">
        <book-filter v-if="books" @filtered="setFilter" :books="books"></book-filter>
        <book-list :books="booksToShow" @selected="selectBook"></book-list>
       <book-details ></book-details> 
        
    </section>
`,
    components: {
        bookList,
        bookDetails,
        bookFilter,

    },
    data() {
        return {
            books: null,
            filterBy: null,
            selectedBook: null,


        };
    },
    created() {
        bookService.query().then(books => this.books = books)
        eventBus.on('addBook', (book) => {
            this.books.unshift(book)
        })



    },
    methods: {
        selectBook(book) {
            this.selectedBook = book;
        },
        setFilter(filterBy) {
            this.filterBy = filterBy;
        },
    },
    computed: {
        booksToShow() {
            if (!this.filterBy) return this.books;
            const regex = new RegExp(this.filterBy.byName, "i");
            return this.books.filter((book) => regex.test(book.title) && book.listPrice.amount >= this.filterBy.price);
        },
    },
    unmounted() { },
};