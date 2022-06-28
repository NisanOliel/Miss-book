import { bookService } from "../services/book-service.js"
import { eventBus } from "../services/eventBus-service.js";


export default {
    template: `
<section>
    <form>
        <label for="add-book">Add Book: </label>
        <input type="search" name="add-book" v-model="searchValue" placeholder="Name book here..">
        <button @click="searchBooks">Search</button>
        <ul>
            <li v-for="book in books">{{book.title}}  <button class="addPlus" @click="addBook(book,$event)">+</button></li>
           
        </ul>
        </form>
    </section>`,
    data() {
        return {
            searchValue: null,
            books: null,
        };
    },
    created() { },
    methods: {
        searchBooks(ev) {
            ev.preventDefault()
            bookService.getBooksList(this.searchValue).then(books => this.books = books)
        },
        addBook(book, ev) {
            ev.preventDefault()
            bookService.save(book)
            eventBus.emit('show-msg', { txt: 'Added Book successfully', type: 'success' });
            eventBus.emit('addBook', book)


        }
    },
    computed: {},
    unmounted() { },
};