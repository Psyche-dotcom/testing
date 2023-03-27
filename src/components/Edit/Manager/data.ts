export enum PlanTypes {
    basic = "Basic",
    pro1 = "Pro 1",
    pro2 = "Pro 2",
    pro3 = "Pro 3",
}
export interface Plan {
    type: PlanTypes;
    storage: string;
    bandwidth: string;
    price: string;
    free?: boolean;
}

export const Plans: Plan[] = [
    {
        type: PlanTypes.basic,
        storage: "100mb",
        bandwidth: "400mb",
        price: "Free",
        free: true
    },
    {
        type: PlanTypes.pro1,
        storage: "1GB",
        bandwidth: "4GB",
        price: "19.95/mo"
    },
    {
        type: PlanTypes.pro2,
        storage: "2GB",
        bandwidth: "8GB",
        price: "39.95/mo"
    },
    {
        type: PlanTypes.pro3,
        storage: "3GB",
        bandwidth: "12GB",
        price: "59.95/mo"
    }
]