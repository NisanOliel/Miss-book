
export default {
    template: `
 <section class="about-page">
    <h1>This is an about page</h1>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus deserunt exercitationem odit nesciunt distinctio aliquid adipisci nostrum quos eos temporibus, doloremque nisi saepe eius explicabo deleniti aperiam ea eligendi alias.</p>
    <img src="https://wallpaperaccess.com/full/4742260.jpg" alt="" srcset=""><br>
     <router-link to="/about/one">one</router-link> | 
     <router-link to="/about/two">two</router-link>
     <router-view></router-view>
 </section>
`,
    data() {
        return {};
    },
    created() { },
    methods: {

    },
    computed: {},
    unmounted() { },
};