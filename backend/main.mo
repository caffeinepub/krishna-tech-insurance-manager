import Time "mo:core/Time";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import List "mo:core/List";
import Int "mo:core/Int";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Order "mo:core/Order";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";

actor {
  include MixinStorage();

  type Customer = {
    name : Text;
    phone : Text;
    address : Text;
  };

  type Policy = {
    policyNumber : Text;
    policyType : Text;
    insuranceCompany : Text;
    customerId : Principal;
    validFrom : Time.Time;
    validTo : Time.Time;
    roadTaxExpiry : Time.Time;
    documents : [Storage.ExternalBlob];
  };

  type Alert = {
    id : Nat;
    timestamp : Time.Time;
    message : Text;
    alertType : Text;
  };

  let customers = Map.empty<Principal, Customer>();
  let policies = Map.empty<Text, Policy>();
  let alerts = Map.empty<Nat, Alert>();
  var nextAlertId = 0;

  module Policy {
    public func compareByExpiry(policy1 : Policy, policy2 : Policy) : Order.Order {
      Int.compare(policy1.validTo, policy2.validTo);
    };
  };

  public shared ({ caller }) func addCustomer(name : Text, phone : Text, address : Text) : async () {
    let newCustomer : Customer = {
      name;
      phone;
      address;
    };
    customers.add(caller, newCustomer);
  };

  public query ({ caller }) func getCustomer(id : Principal) : async Customer {
    switch (customers.get(id)) {
      case (null) { Runtime.trap("Customer with id not found!") };
      case (?customer) { customer };
    };
  };

  public query ({ caller }) func listCustomers() : async [(Principal, Customer)] {
    customers.toArray();
  };

  public shared ({ caller }) func addPolicy(
    policyNumber : Text,
    policyType : Text,
    insuranceCompany : Text,
    customerId : Principal,
    validFrom : Time.Time,
    validTo : Time.Time,
    roadTaxExpiry : Time.Time,
    documents : [Storage.ExternalBlob],
  ) : async () {
    if (customers.get(customerId) == null) {
      Runtime.trap("Trying to create policy for non-existent customer...");
    };
    let newPolicy : Policy = {
      policyNumber;
      policyType;
      insuranceCompany;
      customerId;
      validFrom;
      validTo;
      roadTaxExpiry;
      documents;
    };
    policies.add(policyNumber, newPolicy);
    let renewalAlert : Alert = {
      id = nextAlertId;
      timestamp = validTo;
      message = "Policy " # policyNumber # " is expiring soon!";
      alertType = "Renewal";
    };
    alerts.add(nextAlertId, renewalAlert);
    nextAlertId += 1;
  };

  public query ({ caller }) func listPolicies() : async [(Text, Policy)] {
    policies.toArray();
  };

  public query ({ caller }) func getPolicy(policyNumber : Text) : async Policy {
    switch (policies.get(policyNumber)) {
      case (null) { Runtime.trap("Policy with ID not found!") };
      case (?policy) { policy };
    };
  };

  public query ({ caller }) func getUpcomingExpirations(days : Nat) : async [Policy] {
    let currentTime = Time.now();
    let upperLimit = currentTime + (days * 24 * 60 * 60 * 1000000000);
    let filtered = policies.values().toArray().filter(
      func(policy) {
        policy.validTo <= upperLimit and policy.validTo >= currentTime;
      }
    );
    filtered.sort(Policy.compareByExpiry);
  };

  public query ({ caller }) func getAlerts() : async [Alert] {
    alerts.values().toArray().sort(
      func(a, b) { Int.compare(b.timestamp, a.timestamp) }
    );
  };

  public query ({ caller }) func getCustomerPolicies(customerId : Principal) : async [Policy] {
    policies.values().toArray().filter(
      func(policy) { Principal.equal(policy.customerId, customerId) }
    );
  };
};
