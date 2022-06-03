import { Suspense } from "react";
import { Outlet } from "react-router-dom"
import Loading from "./Loding";

const Home: React.FC<{}> = props => {
    return <Suspense fallback={<Loading />}>
        <Outlet/>
    </Suspense>
}
export default Home;