import App from "./App";
import Home from "./pages/Home";

const Routes = [
    {
        ...App,
        routes: [{
            path: '/',
            exact: true,
            ...Home
        }]
    }
];

export default Routes;