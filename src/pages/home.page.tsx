import { useEffect, useState } from "react";
import { getHomeApi } from "../services/api";

const HomePage = () => {

    const [chuoi, setChuoi] = useState<string>("");

    const fetchHello = async () => {
        const res = await getHomeApi();
        console.log(res.data);
        setChuoi(res.data);

    }

    useEffect(() => {
        fetchHello();
    }, [])

    return (
        <div><strong>Data API:</strong>{chuoi}</div>
    )
}
export default HomePage;