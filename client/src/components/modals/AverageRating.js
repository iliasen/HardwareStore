import React, { useState, useEffect } from "react";
import {getAverageRating} from "../../http/itemAPI";

const AverageRating = ({ itemId }) => {
    const [average, setAverage] = useState(0);
    useEffect(() => {
        getAverageRating(itemId).then((avg) => {
            setAverage(avg);
        });
    }, [itemId]);
    return (
        <div>
            {average}
        </div>
    );
};
export default AverageRating;