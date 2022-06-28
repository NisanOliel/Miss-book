export default {
    template: `
        <header class="app-header">
            <div class="logo">
            <router-link to="/"><h1 >Books shop📚</h1></router-link>
            </div>
            <nav class="nav-bar">
                <router-link to="/">Home</router-link>
                <router-link to="/book">Books</router-link>
                <router-link to="/about">About</router-link>
            </nav>
        </header>
    
    `
}