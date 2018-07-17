export default {
    ssr: [
        {
            path: "/",
            page: "/index",
            prepare: ["ads"]
        },
        {
            path: "/ad/:id",
            page: "/ad",
            prepare: ["ads"]
        }
    ],
    spa: [
        {
            path: "/profile",
            head: "<script type='text/javascript'>alert('Hello world')</script>"
        }
    ]
};
//# sourceMappingURL=routes.js.map