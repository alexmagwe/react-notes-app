import React from "react";
import axios from "axios"
export const fetch = async (url, method, payload = null) => {
    let res = null;
    try {
        // const json = await res.json();
        switch (method) {
            case "POST":
                if (payload) {
                    let res = await axios.post(url, payload)
                }
                else return
                break
            case "GET":
                res = await axios.get(url)
                break
            default:
                return

        }

    } catch (error) {
        return error;
    }
    return res
};



