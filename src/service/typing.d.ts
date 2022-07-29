export type RouteResponse = {
    path: string;
    name: string;
    component?: string;
    index?: boolean;
    children?: RouteResponse[];
};
