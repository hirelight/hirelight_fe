import currencies from "@/utils/shared/currencies.json";

export enum JobPostStatus {
    DRAFT = "DRAFT",
    PENDING_APPROVAL = "PENDING_APPROVAL",
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    TERMINATED = "TERMINATED",
}

export type CurrencyKey = keyof typeof currencies;
