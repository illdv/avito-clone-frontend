export interface ISsrRoute {
    path: string;
    page: string;
    prepare: string[];
}

export interface ISpaRoute {
    path: string;
    head: string;
}

export interface IConfigRoutes {
    ssr: ISsrRoute[];
    spa: ISpaRoute[];
}

export default {
    ssr: [
        {
            path: "/",
            page: "/index",
            prepare: [ "ads" ]
        },
        {
            path: "/ad/:id",
            page: "/ad",
            prepare: [ "ads" ]
        }
    ],
    spa: [
        {
            path: "/profile",
            head: "<script type='text/javascript'>alert('Hello world')</script>"
        }
    ]
} as IConfigRoutes;