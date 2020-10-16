import App from "./App";
import Home from "./pages/Home";
import Countries from "./pages/Countries";
import Todos from "./pages/Todos";

const Routes = [
    {
        ...App,
        routes: [{
            path: '/',
            exact: true,
            ...Home
        }, {
            path: '/countries',
            exact: true,
            ...Countries
        }, {
            path: '/todos',
            exact: true,
            ...Todos
        }]
    }
];

export default Routes;