import App from "./App";
import Home from "./pages/Home";
import Todos from "./pages/Todos";

const Routes = [
    {
        ...App,
        routes: [{
            path: '/',
            exact: true,
            ...Home
        }, {
            path: '/todos',
            exact: true,
            ...Todos
        }]
    }
];

export default Routes;