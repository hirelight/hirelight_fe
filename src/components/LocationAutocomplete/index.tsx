"use client";

import { Loader } from "@googlemaps/js-api-loader";
import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";

interface ILocationAutocomplete extends React.HTMLProps<HTMLInputElement> {
    title: string;
    required?: boolean;
    placeholder?: string;
    handlePlaceChange: any;
}

const LocationAutocomplete = (props: ILocationAutocomplete) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const { id, className, title, required, handlePlaceChange, ...rest } =
        props;

    const handlePlaceSelect = React.useCallback(
        (place: any) => {
            // Handle the selected place data here
            // console.log("Selected Place:", place);
            console.log(place);
            // You can access various details about the selected place, for example:
            const { formatted_address } = place;

            // console.log("Formatted Address:", formatted_address);
            // console.log("Latitude:", location.lat());
            // console.log("Longitude:", location.lng());
            handlePlaceChange(formatted_address);
            // You can use this data to update your application's state or perform other actions.
        },
        [handlePlaceChange]
    );

    React.useEffect(() => {
        // const loader = new Loader({
        //     apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string, // Replace with your API key
        //     version: "weekly", // Use the latest version
        //     libraries: ["places"],
        // });
        // loader
        //     .load()
        //     .then(google => {
        //         if (inputRef.current) {
        //             const autocomplete = new google.maps.places.Autocomplete(
        //                 inputRef.current,
        //                 {
        //                     types: ["geocode"], // Restrict to geocoding results,
        //                     fields: [
        //                         "place_id",
        //                         "geometry",
        //                         "name",
        //                         "address_component",
        //                         "formatted_address",
        //                     ],
        //                 }
        //             );
        //             // Listen for the place selected event
        //             autocomplete.addListener("place_changed", () => {
        //                 const place = autocomplete.getPlace();
        //                 handlePlaceSelect(place);
        //             });
        //         }
        //     })
        //     .catch(err => {});
    }, [handlePlaceSelect]);

    return (
        <div className="w-full">
            <label
                htmlFor={id}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                {required && <span className="text-red-500 mr-1">*</span>}
                {title}
            </label>
            <input
                {...rest}
                ref={inputRef}
                id={id}
                onChange={e => handlePlaceChange(e.target.value)}
                className={[
                    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                    className,
                ].join(" ")}
            />
        </div>
    );
};

export default LocationAutocomplete;
