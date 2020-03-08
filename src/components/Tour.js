import React, { useReducer, useEffect } from "react";
import JoyRide, { ACTIONS, EVENTS, STATUS } from "react-joyride";

const TOUR_STEPS = [
  {
    target: ".tour-search",
    content: "This is where you can search the dashboard.",
    disableBeacon: true // This makes the tour to start automatically without clicking
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
  },
  {
    target: ".tour-link",
    content: "This is where you can start the tour again in future."
  }
];

const INITIAL_STATE = {
  key: new Date(), // This field makes the tour to re-render when we restart the tour
  run: false,
  continuous: true,
  loading: false,
  stepIndex: 0,
  steps: TOUR_STEPS
};

// Reducer will manage updating the local state
const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "START":
      return { ...state, run: true };
    case "RESET":
      return { ...state, stepIndex: 0 };
    case "STOP":
      return { ...state, run: false };
    case "NEXT_OR_PREV":
      return { ...state, ...action.payload };
    case "RESTART":
      return {
        ...state,
        stepIndex: 0,
        run: true,
        loading: false,
        key: new Date()
      };
    default:
      return state;
  }
};

// Tour component
const Tour = () => {
  // Tour state is the state which control the JoyRide component
  const [tourState, dispatch] = useReducer(reducer, INITIAL_STATE);

  useEffect(() => {
    // Auto start the tour if the tour is not viewed before
    if (!localStorage.getItem("tour")) {
      dispatch({ type: "START" });
    }
  }, []);

  // Set once tour is viewed, skipped or closed
  const setTourViewed = () => {
    // localStorage.setItem("tour", "1");
  };

  const callback = data => {
    const { action, index, type, status } = data;

    if (
      // If close button clicked, then close the tour
      action === ACTIONS.CLOSE ||
      // If skipped or end tour, then close the tour
      (status === STATUS.SKIPPED && tourState.run) ||
      status === STATUS.FINISHED
    ) {
      setTourViewed();
      dispatch({ type: "STOP" });
    } else if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
      // Check whether next or back button click and update the step.
      dispatch({
        type: "NEXT_OR_PREV",
        payload: { stepIndex: index + (action === ACTIONS.PREV ? -1 : 1) }
      });
    }
  };

  const startTour = () => {
    // Start the tour manually
    dispatch({ type: "RESTART" });
  };

  return (
    <>
      <li className="items-center tour-link" onClick={startTour}>
        <button className="text-gray-800 hover:text-gray-600 text-xs uppercase py-3 font-bold block">
          <i className="fas fa-fingerprint text-gray-500 mr-2 text-sm"></i>{" "}
          Start tour
        </button>
      </li>
      <JoyRide
        {...tourState}
        callback={callback}
        showSkipButton={true}
        styles={{
          tooltipContainer: {
            textAlign: "left"
          },
          buttonBack: {
            marginRight: 10
          }
        }}
        locale={{
          last: "End tour"
        }}
      />
    </>
  );
};

export default Tour;
