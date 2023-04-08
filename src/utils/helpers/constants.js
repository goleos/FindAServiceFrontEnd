// Routes in the app
export const ROUTES = {
    home: '*',
    provider: {
        login: '/provider/login',
        register: '/provider/register',
        home: '/provider/home',
        serviceRequests: '/provider/service-requests',
        myServices: '/provider/my-services',
        createService: '/provider/create-service'
    },
    customer: {
        login: '*',
        register: '/customer/register',
        home: '/customer/home',
        verify: '/customer/verify/:customerId/:token',
        myServiceRequests: '/customer/my-service-requests',
        services: '/customer/services'
    },
    admin: {
        login: '/admin/login',
        register: '/admin/register',
        home: '/admin/home',
        newProviders: '/admin/new-providers'
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

export const PROFILE_IMAGE = "https://findaservice.blob.core.windows.net/app/user.png"