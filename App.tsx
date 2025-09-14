import React, { useState } from "react";

export default function EasyLoans() {
  // Loan calculator state
  const [amount, setAmount] = useState(50000);
  const [years, setYears] = useState(3);
  const [rate, setRate] = useState(12.5);

  // Application form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    amount: 50000,
    purpose: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function monthlyPayment(principal, annualRate, years) {
    const r = annualRate / 100 / 12;
    const n = years * 12;
    if (r === 0) return principal / n;
    const top = r * Math.pow(1 + r, n);
    const bottom = Math.pow(1 + r, n) - 1;
    return principal * (top / bottom);
  }

  const monthly = monthlyPayment(amount, rate, years);
  const total = monthly * years * 12;

  function handleApply(e) {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.phone) {
      setError("Please fill in name, email and phone.");
      return;
    }
    if (form.amount <= 0) {
      setError("Loan amount must be greater than 0.");
      return;
    }
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 antialiased">
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/logo.png" 
              alt="Easy Loans Logo" 
              className="h-10 w-auto"
            />
            <div>
              <h1 className="text-lg font-semibold">Easyloans</h1>
              <p className="text-sm text-gray-500">Fast. Transparent. Trusted.</p>
            </div>
          </div>
          <nav className="space-x-4 text-sm">
            <a className="hover:underline" href="#calculator">Calculator</a>
            <a className="hover:underline" href="#apply">Apply</a>
            <a className="hover:underline" href="#faqs">FAQs</a>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero */}
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">Get the loan you need — in minutes.</h2>
            <p className="mt-4 text-gray-600">Simple online application, transparent terms, and fast decisions. Use our calculator to estimate monthly payments.</p>

            <div className="mt-6 flex gap-3">
              <a href="#apply" className="inline-flex items-center px-5 py-3 rounded-lg bg-indigo-600 text-white font-medium shadow">Apply Now</a>
              <a href="#calculator" className="inline-flex items-center px-5 py-3 rounded-lg border border-gray-200">Try Calculator</a>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3 text-sm text-gray-600">
              <div>
                <div className="font-semibold">3 min</div>
                <div>Avg. approval time</div>
              </div>
              <div>
                <div className="font-semibold">Transparent</div>
                <div>No hidden fees</div>
              </div>
              <div>
                <div className="font-semibold">Secured</div>
                <div>Bank-level security</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="text-xl font-semibold">Quick estimate</h3>
            <div className="mt-4 space-y-4">
              <div>
                <label className="text-sm text-gray-600">Loan amount</label>
                <input type="range" min="1000" max="500000" step="500" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full mt-2" />
                <div className="mt-2 font-medium">₹{amount.toLocaleString()}</div>
              </div>

              <div>
                <label className="text-sm text-gray-600">Term (years)</label>
                <input type="range" min="1" max="5" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full mt-2" />
                <div className="mt-2 font-medium">{years} years</div>
              </div>

              <div>
                <label className="text-sm text-gray-600">Annual rate (%)</label>
                <input type="range" min="1" max="24" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full mt-2" />
                <div className="mt-2 font-medium">{rate}%</div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-gray-600">Estimated monthly payment</div>
                    <div className="text-2xl font-bold">₹{Math.round(monthly).toLocaleString()}</div>
                  </div>
                  <div className="text-sm text-gray-500">Total: ₹{Math.round(total).toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h4 className="font-semibold">Personalized terms</h4>
            <p className="mt-2 text-sm text-gray-600">Flexible loan options tailored to your income and goals.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h4 className="font-semibold">Fast decisions</h4>
            <p className="mt-2 text-sm text-gray-600">Automated underwriting for quick approval or pre-qualification.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h4 className="font-semibold">Secure</h4>
            <p className="mt-2 text-sm text-gray-600">Your data is encrypted and protected with best practices.</p>
          </div>
        </section>

        {/* Apply form */}
        <section id="apply" className="mt-12 grid md:grid-cols-2 gap-8 items-start">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold">Start your application</h3>
            {submitted ? (
              <div className="mt-6 p-4 rounded-lg bg-emerald-50 border border-emerald-100">
                <div className="font-semibold">Application received</div>
                <div className="text-sm text-gray-600 mt-1">Thanks, {form.name || "applicant"}. We'll be in touch at {form.email} or {form.phone} with the next steps.</div>
              </div>
            ) : (
              <form onSubmit={handleApply} className="mt-4 space-y-4">
                <div>
                  <label className="text-sm text-gray-600">Full name</label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-2 w-full rounded-md border p-2" placeholder="Jane Doe" />
                </div>

                <div>
                  <label className="text-sm text-gray-600">Email</label>
                  <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-2 w-full rounded-md border p-2" placeholder="you@example.com" />
                </div>

                <div>
                  <label className="text-sm text-gray-600">Phone</label>
                  <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-2 w-full rounded-md border p-2" placeholder="+91 98xxxx" />
                </div>

                <div>
                  <label className="text-sm text-gray-600">Requested amount</label>
                  <input type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })} className="mt-2 w-full rounded-md border p-2" />
                </div>

                <div>
                  <label className="text-sm text-gray-600">Purpose</label>
                  <select value={form.purpose} onChange={(e) => setForm({ ...form, purpose: e.target.value })} className="mt-2 w-full rounded-md border p-2">
                    <option value="">Select</option>
                    <option value="home">Home improvement</option>
                    <option value="education">Education</option>
                    <option value="business">Business</option>
                    <option value="personal">Personal</option>
                  </select>
                </div>

                {error && <div className="text-red-600 text-sm">{error}</div>}

                <div className="flex items-center gap-3">
                  <button type="submit" className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium">Submit application</button>
                  <button type="button" onClick={() => { setForm({ name: "", email: "", phone: "", amount: 50000, purpose: "" }); setError(""); }} className="px-4 py-2 rounded-lg border">Reset</button>
                </div>

                <div className="text-xs text-gray-500">By submitting, you consent to a soft credit check. No impact to your credit score for pre-qualification.</div>
              </form>
            )}
          </div>

          <div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="font-semibold">Why choose us</h4>
              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                <li>Fast application and approval process</li>
                <li>Competitive interest rates</li>
                <li>Clear fees and repayment schedule</li>
                <li>Responsive customer support</li>
              </ul>
            </div>

            <div className="mt-6 bg-white p-6 rounded-lg shadow">
              <h4 className="font-semibold">Repayment example</h4>
              <div className="mt-3 text-sm text-gray-600">If you borrow ₹{amount.toLocaleString()} for {years} years at {rate}% APR, your estimated monthly payment is ₹{Math.round(monthly).toLocaleString()} (total ₹{Math.round(total).toLocaleString()}).</div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section id="faqs" className="mt-12">
          <h3 className="text-xl font-semibold">Frequently asked questions</h3>
          <div className="mt-4 grid gap-3">
            <details className="bg-white p-4 rounded-lg shadow-sm">
              <summary className="font-medium">How long does approval take?</summary>
              <div className="mt-2 text-sm text-gray-600">Most applicants get a decision within minutes. Some cases may require document review, which can take 1-3 business days.</div>
            </details>

            <details className="bg-white p-4 rounded-lg shadow-sm">
              <summary className="font-medium">What documents do I need?</summary>
              <div className="mt-2 text-sm text-gray-600">ID, proof of income, bank statements and address proof may be requested depending on loan type.</div>
            </details>

            <details className="bg-white p-4 rounded-lg shadow-sm">
              <summary className="font-medium">Can I prepay?</summary>
              <div className="mt-2 text-sm text-gray-600">Yes — prepayment options vary. Some loans have prepayment penalties; we'll show exact terms in your offer.</div>
            </details>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 bg-gradient-to-r from-indigo-600 to-emerald-400 rounded-2xl p-8 text-white">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-xl font-semibold">Ready to get started?</h4>
              <div className="text-sm mt-1">Apply now and get a personalised offer.</div>
            </div>
            <a href="#apply" className="inline-flex items-center px-6 py-3 rounded-lg bg-white text-indigo-700 font-semibold">Apply now</a>
          </div>
        </section>
      </main>

      <footer className="mt-12 bg-white border-t">
        <div className="max-w-6xl mx-auto px-6 py-8 grid md:grid-cols-3 gap-6 text-sm text-gray-600">
          <div>
            <div className="font-semibold">Easyloans</div>
            <div className="mt-2">© {new Date().getFullYear()} Easyloans Inc. All rights reserved.</div>
          </div>
          <div>
            <div className="font-semibold">Support</div>
            <div className="mt-2">easyloans@gmail.com</div>
            <div className="mt-1">+91 85004 85004</div>
          </div>
          <div>
            <div className="font-semibold">Legal</div>
            <div className="mt-2">Terms · Privacy</div>
          </div>
        </div>
      </footer>
    </div>
  );
}