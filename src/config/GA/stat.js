import ReactGA from 'react-ga'

export const initGA = () => {
    ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_CODE);
}

export const logPageView = () => {
    ReactGA.set({ page: window.location.pathname })
    ReactGA.pageview(window.location.pathname)
}

