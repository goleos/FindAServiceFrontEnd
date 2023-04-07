// Routes in the app
export const ROUTES = {
    home: '*',
    provider: {
        login: '/provider/login',
        register: '/provider/register',
        home: '/provider/home'
    },
    customer: {
        login: '*',
        register: '/customer/register',
        home: '/customer/home',
        verify: '/customer/verify/:customerId/:token'
    },
    admin: {
        login: '/admin/login',
        register: '/admin/register',
        home: '/admin/home'
    },
}

// Breakpoints for media queries
const size = {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    tablet: '768px',
    laptop: '1024px',
    laptopL: '1440px',
    desktop: '2560px'
}

export const device = {
    mobileS: `(max-width: ${size.mobileS})`,
    mobileM: `(max-width: ${size.mobileM})`,
    mobileL: `(max-width: ${size.mobileL})`,
    tablet: `(max-width: ${size.tablet})`,
    laptop: `(max-width: ${size.laptop})`,
    laptopL: `(max-width: ${size.laptopL})`,
    desktop: `(max-width: ${size.desktop})`,
    desktopL: `(max-width: ${size.desktop})`
}