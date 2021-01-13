import React, { useState, useEffect } from 'react';

interface ReturnedData<T> {
    data?: T;
    isLoading?: boolean;
}

export const useHttp = <FetchedData>(url: string, dependencies: any[]): ReturnedData<FetchedData> => {
    const [fetchedData, setFetchedData] = useState<
        ReturnedData<FetchedData>
    >({
        isLoading: true
    });

    useEffect(() => {
        console.log('Sending HTTP Requests');
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch.');
                }
                return response.json();
            })
            .then(data => {
                setFetchedData({ data, isLoading: false });
            })
            .catch(err => {
                setFetchedData({ data: undefined, isLoading: false });
                console.log(err);
            });
    }, dependencies)
    return fetchedData;
}




























/* ReturnedData<T> is an interface which describes data returned by
hook. Here we use previous interface body but we need to add generics
type. Thanks to that it is more reusable and data can be any of type
passed as T.*/
// interface ReturnedData<T> {
//     data?: T;
//     error?: string;
//     loading: boolean;
//   }

//   // FetchedData is a type passed to useFetch during calling a hook.
//   export const useFetch = <FetchedData>(
//     url: string
//   // ReturnedData<FetchedData> - We pass here data type to our generic
//   // interface.
//   ): ReturnedData<FetchedData> => {
//     const [fetchedData, setFetchedData] = React.useState<
//       ReturnedData<FetchedData>
//     >({
//       loading: true
//     });

//     React.useEffect(() => {
//       const fetchData = async (): Promise<void> => {
//         try {
//           // Static url replaced by dynamic param passed to hook 
//           const { data } = await axios.get(`${base}${url}`);

//           setFetchedData({ data, loading: false, error: undefined });
//         } catch {
//           setFetchedData({
//             data: undefined,
//             loading: false,
//             error: "Sth went wrong."
//           });
//         }
//       };

//       fetchData();
//     }, []);

//     return fetchedData;
//   };