import axios, { AxiosRequestConfig } from "axios";
import {useEffect, useState } from "react"

const api: string = ""

export const useFetch = <T = unknown>(url: string, options?: AxiosRequestConfig) => {
    const [data, setData] = useState<T | null>(null)
    const [isFetching, setIsFetching] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        axios.get(api + url)
            .then(response => {
                setData(response.data)
            })
            .catch(err => {
                setError(err)
            })
            .finally(() => {
                setIsFetching(false)
            })
    }, [])

    return { data, isFetching, error }
}