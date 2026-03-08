import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Customer, Policy, Alert } from '../backend';
import { Principal } from '@icp-sdk/core/principal';
import { ExternalBlob } from '../backend';

export function useListCustomers() {
  const { actor, isFetching } = useActor();

  return useQuery<Array<[Principal, Customer]>>({
    queryKey: ['customers'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listCustomers();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetCustomer(id: Principal | null) {
  const { actor, isFetching } = useActor();

  return useQuery<Customer | null>({
    queryKey: ['customer', id?.toString()],
    queryFn: async () => {
      if (!actor || !id) return null;
      return actor.getCustomer(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useAddCustomer() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, phone, address }: { name: string; phone: string; address: string }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addCustomer(name, phone, address);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
  });
}

export function useListPolicies() {
  const { actor, isFetching } = useActor();

  return useQuery<Array<[string, Policy]>>({
    queryKey: ['policies'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listPolicies();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetPolicy(policyNumber: string | null) {
  const { actor, isFetching } = useActor();

  return useQuery<Policy | null>({
    queryKey: ['policy', policyNumber],
    queryFn: async () => {
      if (!actor || !policyNumber) return null;
      return actor.getPolicy(policyNumber);
    },
    enabled: !!actor && !isFetching && !!policyNumber,
  });
}

export function useAddPolicy() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      policyNumber,
      policyType,
      insuranceCompany,
      customerId,
      validFrom,
      validTo,
      roadTaxExpiry,
      documents,
    }: {
      policyNumber: string;
      policyType: string;
      insuranceCompany: string;
      customerId: Principal;
      validFrom: bigint;
      validTo: bigint;
      roadTaxExpiry: bigint;
      documents: ExternalBlob[];
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addPolicy(
        policyNumber,
        policyType,
        insuranceCompany,
        customerId,
        validFrom,
        validTo,
        roadTaxExpiry,
        documents
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['policies'] });
      queryClient.invalidateQueries({ queryKey: ['alerts'] });
      queryClient.invalidateQueries({ queryKey: ['upcomingExpirations'] });
    },
  });
}

export function useGetUpcomingExpirations(days: number) {
  const { actor, isFetching } = useActor();

  return useQuery<Policy[]>({
    queryKey: ['upcomingExpirations', days],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getUpcomingExpirations(BigInt(days));
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAlerts() {
  const { actor, isFetching } = useActor();

  return useQuery<Alert[]>({
    queryKey: ['alerts'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAlerts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetCustomerPolicies(customerId: Principal | null) {
  const { actor, isFetching } = useActor();

  return useQuery<Policy[]>({
    queryKey: ['customerPolicies', customerId?.toString()],
    queryFn: async () => {
      if (!actor || !customerId) return [];
      return actor.getCustomerPolicies(customerId);
    },
    enabled: !!actor && !isFetching && !!customerId,
  });
}
