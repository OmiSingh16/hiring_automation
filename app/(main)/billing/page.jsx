import React from 'react';

const BillingSection = () => {
  const plans = [
    {
      name: 'Basic',
      price: '$5',
      interviews: '20 interviews',
      features: ['Basic interview templates', 'Email support'],
    },
    {
      name: 'Standard',
      price: '$12',
      interviews: '50 interviews',
      features: ['All interview templates', 'Priority support', 'Basic analytics'],
      highlight: true,
    },
    {
      name: 'Pro',
      price: '$25',
      interviews: '120 interviews',
      features: ['All interview templates', '24/7 support', 'Advanced analytics'],
    },
  ];

  return (
    <div>
      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto grid max-w-6xl gap-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Billing</h1>
            <p className="text-muted-foreground">Manage your Payment and credits</p>
          </div>

          {/* Credits & Purchase Options */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Your Credits */}
            <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm md:col-span-2 lg:col-span-1">
              <div className="grid items-start gap-1.5 px-6">
                <div className="font-semibold leading-none">Your Credits</div>
                <div className="text-muted-foreground text-sm">
                  Current usage and remaining credits
                </div>
              </div>
              <div className="px-6 grid gap-6">
                <div className="rounded-lg border bg-card p-4 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-credit-card h-5 w-5 text-primary"
                      >
                        <rect width="20" height="14" x="2" y="5" rx="2" />
                        <line x1="2" x2="22" y1="10" y2="10" />
                      </svg>
                    </div>
                    <p className="text-xl font-bold text-primary">0 interviews left</p>
                  </div>
                </div>
                <button className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium text-primary-foreground shadow h-9 px-4 py-2 w-full bg-primary hover:bg-indigo-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-plus mr-2 h-4 w-4"
                  >
                    <path d="M5 12h14" />
                    <path d="M12 5v14" />
                  </svg>
                  Add More Credits
                </button>
              </div>
            </div>

            {/* Purchase Plans */}
            <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm md:col-span-2">
              <div className="grid items-start gap-1.5 px-6">
                <div className="font-semibold leading-none">Purchase Credits</div>
                <div className="text-muted-foreground text-sm">
                  Add more interview credits to your account
                </div>
              </div>
              <div className="px-6">
                <div className="grid gap-4 md:grid-cols-3">
                  {plans.map((plan) => (
                    <div
                      key={plan.name}
                      className={`flex flex-col gap-6 rounded-xl border py-6 shadow-sm ${
                        plan.highlight ? 'border-blue-200 bg-blue-50/50' : 'bg-card'
                      }`}
                    >
                      <div className="grid items-start gap-1.5 px-6 pb-2">
                        <div className="font-semibold text-lg">{plan.name}</div>
                      </div>
                      <div className="px-6">
                        <div className="text-2xl font-bold">{plan.price}</div>
                        <p className="text-sm text-muted-foreground">{plan.interviews}</p>
                        <ul className="mt-4 grid gap-2 text-sm">
                          {plan.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex items-center px-6 pt-4">
                        <button
                          type="button"
                          className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full"
                        >
                          Purchase Credits
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BillingSection;
