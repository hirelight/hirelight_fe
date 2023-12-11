"use client";

import { Loader } from "@googlemaps/js-api-loader";
import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";

import styles from "./styles.module.scss";

interface ILocationAutocomplete extends React.HTMLProps<HTMLInputElement> {
    title: string;
    required?: boolean;
    placeholder?: string;
    handlePlaceChange: (value: string) => void;
    errorText?: string;
}

const LocationAutocomplete = (props: ILocationAutocomplete) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const {
        id,
        className,
        title,
        required,
        handlePlaceChange,
        errorText,
        ...rest
    } = props;

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
                className={
                    styles.input__label + ` ${errorText ? styles.error : ""}`
                }
            >
                {required && <span className="text-red-500 mr-1">*</span>}
                {title}
            </label>
            <input
                {...rest}
                ref={inputRef}
                id={id}
                onChange={e => handlePlaceChange(e.target.value)}
                className={`${styles.input__box} ${
                    errorText ? styles.error : ""
                } ${className ? className : ""}`}
            />
            {errorText && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium">{errorText} </span>
                </p>
            )}
        </div>
    );
};

export default LocationAutocomplete;
