import { useEffect, useState } from "react";
import axios from "axios"


export default function useDebounce<T>(val: T, timeout?: number): T {
    const [data, setData] = useState(val);

    useEffect(() => {
        const _timeout = setTimeout(() => setData(val), timeout || 500);
        return () => clearTimeout(_timeout);
    }, [val]);

    return data;
}
