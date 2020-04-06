import AllBooks from './components/AllBooks';
import CurrentBooks from './components/CurrentBooks';
import FinishedBooks from './components/FinishedBooks';


export default {
    mode: 'history',

    routes: [
        {
            path: '/',
            component: AllBooks
        },

        {
            path: '/current',
            component: CurrentBooks
        },

        {
            path: '/done',
            component: FinishedBooks
        }
    ]
}