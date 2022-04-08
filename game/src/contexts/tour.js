import React, { useContext, useState }  from "react";

const TourContext = React.createContext();

const TourProvider = ({children}) => {
    const [tour, setTour] = useState(1);

    const counterTour = data => {
        let eskiTour = tour;
        eskiTour = eskiTour + data;
        setTour(eskiTour);
    }

    return (
        <TourContext.Provider
            value={{
                tour,
                setTour,
                counterTour
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