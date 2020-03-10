import React from "react";
import JoyRide from "react-joyride";

const TOUR_STEPS = [
  {
    target: ".tour-search",
    content: "This is where you can search the dashboard."
  },
  {
    target: ".tour-orders",
    content:
      "Bar chart for total order. You can see beautiful graphs here, thanks to creative tim for such UI."
  },
  {
    target: ".tour-external-links",
    content: "This is where you can find the external links."
  },
  {
    target: ".tour-footer",
    content: "This is where you can see the footer links."
  }
];

// Tour component
const Tour = () => {
  return (
    <>
      <JoyRide
        steps={TOUR_STEPS}
        continuous={true}
        showSkipButton={true}
        styles={{
          tooltipContainer: {
            textAlign: "left"
          },
          buttonNext: {
            backgroundColor: "green"
          },
          buttonBack: {
            marginRight: 10
          }
        }}
        locale={{
          last: "End tour",
          skip: "Close tour"
        }}
      />
    </>
  );
};

export default Tour;
