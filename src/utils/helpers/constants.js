// Routes in the app
export const ROUTES = {
  home: "*",
  search: '/search',
  provider: {
    login: "/provider/login",
    register: "/provider/register",
    home: "/provider/home",
    myServices: "/provider/my-services",
    createService: "/provider/create-service",
    editProfile: '/provider/edit-profile',
    profile: '/provider/profile/:providerId',
  },
  customer: {
    login: "*",
    register: "/customer/register",
    home: "/customer/home",
    serviceType: "/customer/home/service/:id",
    verify: "/customer/verify/:customerId/:token",
    services: "/customer/services",
  },
  admin: {
    login: "/admin/login",
    register: "/admin/register",
    home: "/admin/home",
    newProviders: "/admin/new-providers"
  },
  service: {
    serviceInfo: '/service/:serviceId',
    serviceRequests: '/service/:serviceId/request',
    serviceRequest: '/service-requests/:requestId',
    myRequests: '/service-requests'
  }
};

// Breakpoints for media queries
const size = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px",
};

export const device = {
  mobileS: `(max-width: ${size.mobileS})`,
  mobileM: `(max-width: ${size.mobileM})`,
  mobileL: `(max-width: ${size.mobileL})`,
  tablet: `(max-width: ${size.tablet})`,
  laptop: `(max-width: ${size.laptop})`,
  laptopL: `(max-width: ${size.laptopL})`,
  desktop: `(max-width: ${size.desktop})`,
  desktopL: `(max-width: ${size.desktop})`,
};

// Default profile and service images
export const PROFILE_IMAGE =
  "https://findaservice.blob.core.windows.net/app/user.png";

export const SERVICE_IMAGE = "https://findaservice.blob.core.windows.net/app/service.jpg"

// Service categories
export const SERVICE_CATEGORIES = [
  "Cleaning",
  "Babysitting",
  "Pest Control",
  "Plumbing",
  "Electrical Repairs",
  "Beauty",
  "Miscellaneous",
];
