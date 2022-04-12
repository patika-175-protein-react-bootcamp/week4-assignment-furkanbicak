import React, { useContext, useState }  from "react";

const TourContext = React.createContext();

const TourProvider = ({children}) => {
    const [tour, setTour] = useState(1);

    return (
        <TourContext.Provider
            value={{
                tour,
                setTour,
            }}
        >
            {children}
        </TourContext.Provider>
    )
}

function useTour() {
    return useContext(TourContext);
}

export {TourContext, TourProvider, useTour}