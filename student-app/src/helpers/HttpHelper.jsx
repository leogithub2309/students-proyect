export const helpHttp = () => {

    const customFetch = async (endpoint, options) => {

        const defaultHeaders = {
            accept: "application/json; charset=UTF-8"
        }

        const abortControllers = new AbortController();
        
        options.signal = !abortControllers.signal ? "" : abortControllers.signal;
        options.method = options.method || "GET";
        options.headers = options.headers 
        ? {...defaultHeaders, ...options.headers} 
        : defaultHeaders;
        
        options.body = JSON.stringify(options.body) || false;

        if(!options.body) delete options.body;

        setTimeout(() => abortControllers.abort(), 3000);

        try {
            let res = await fetch(endpoint, options);

            if(!res.ok) throw {
                err: true,
                status: res.status || "00",
                statusText: res.statusText || "Ocurrió un error durante la petición a la api"
            };

            let json = await res.json();

            return json;

        } catch (error) {
            console.log(error);
            return error;
        }
    }

    const get = (url, options = "") => customFetch(url, options);

    const post = (url, options) => {
        options.method = "POST";
        return customFetch(url, options);
    }

    const put = (url, options) => {
        options.method = "PUT";
        return customFetch(url, options);
    }

    const del = (url, options) => {
        options.method = "DELETE";
        return customFetch(url, options);
    }

    return {
        get,
        post,
        put,
        del
    }
}