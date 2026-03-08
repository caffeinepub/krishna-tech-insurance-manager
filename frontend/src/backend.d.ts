import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type Time = bigint;
export interface Policy {
    documents: Array<ExternalBlob>;
    validFrom: Time;
    insuranceCompany: string;
    policyType: string;
    validTo: Time;
    customerId: Principal;
    roadTaxExpiry: Time;
    policyNumber: string;
}
export interface Customer {
    name: string;
    address: string;
    phone: string;
}
export interface Alert {
    id: bigint;
    alertType: string;
    message: string;
    timestamp: Time;
}
export interface backendInterface {
    addCustomer(name: string, phone: string, address: string): Promise<void>;
    addPolicy(policyNumber: string, policyType: string, insuranceCompany: string, customerId: Principal, validFrom: Time, validTo: Time, roadTaxExpiry: Time, documents: Array<ExternalBlob>): Promise<void>;
    getAlerts(): Promise<Array<Alert>>;
    getCustomer(id: Principal): Promise<Customer>;
    getCustomerPolicies(customerId: Principal): Promise<Array<Policy>>;
    getPolicy(policyNumber: string): Promise<Policy>;
    getUpcomingExpirations(days: bigint): Promise<Array<Policy>>;
    listCustomers(): Promise<Array<[Principal, Customer]>>;
    listPolicies(): Promise<Array<[string, Policy]>>;
}
