import homePage from './views/home-page.cmp.js';
import aboutPage from './views/about-page.cmp.js';
import bookApp from './views/book-app.cmp.js';
import bookDetails from './views/book-details.cmp.js';
import oneAbout from './cmps/one-about.cmp.js'
import twoAbout from './cmps/two-about.cmp.js'


const routes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/about',
        component: aboutPage,
        children: [
            {
                path: 'one',
                component: oneAbout,
            },
            {
                path: 'two',
                component: twoAbout,
            },
        ]
    },
    {
        path: '/book',
        component: bookApp
    },
    {
        path: '/book/:bookId',
        component: bookDetails
    },

]

export const router = VueRouter.createRouter({
    routes,
    history: VueRouter.createWebHashHistory()
})