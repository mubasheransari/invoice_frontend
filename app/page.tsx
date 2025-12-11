'use client';

import { FormEvent, useState } from 'react';

type InvoiceForm = {
  name: string;
  address: string;
  contact: string;
  plotNo: string;
  billMonth: string;
  dues: number;
  currentPayment: number;
};

export default function Page() {
  const [data, setData] = useState<InvoiceForm | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const formData: InvoiceForm = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      address: (form.elements.namedItem('address') as HTMLInputElement).value,
      contact: (form.elements.namedItem('contact') as HTMLInputElement).value,
      plotNo: (form.elements.namedItem('plotNo') as HTMLInputElement).value,
      billMonth: (form.elements.namedItem('billMonth') as HTMLInputElement).value,
      dues: Number(
        (form.elements.namedItem('dues') as HTMLInputElement).value || 0
      ),
      currentPayment: Number(
        (form.elements.namedItem('currentPayment') as HTMLInputElement).value ||
          0
      ),
    };

    setData(formData);
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const total =
    (data?.dues ?? 0) + (data?.currentPayment ?? 0);

  return (
    <main className="page">
      <section className="card no-print">
        <h1 className="title">Invoice Generator</h1>
        <p className="subtitle">
          Fill the form and get a printable, bill-style invoice with two copies
          (Society&apos;s Copy &amp; Residence&apos;s Copy).
        </p>

        <form className="form" onSubmit={handleSubmit}>
          <div className="grid">
            <label className="field">
              <span>Resident Name</span>
              <input name="name" type="text" required />
            </label>

            <label className="field">
              <span>Contact Number</span>
              <input name="contact" type="text" required />
            </label>
          </div>

          <label className="field">
            <span>Address</span>
            <input name="address" type="text" required />
          </label>

          <div className="grid">
            <label className="field">
              <span>House / Plot No.</span>
              <input name="plotNo" type="text" required />
            </label>

            <label className="field">
              <span>Billing Month</span>
              <input
                name="billMonth"
                type="text"
                placeholder="Sep 2025"
                required
              />
            </label>
          </div>

          <div className="grid">
            <label className="field">
              <span>Previous / Other Dues (PKR)</span>
              <input
                name="dues"
                type="number"
                min={0}
                step="0.01"
                defaultValue={0}
                required
              />
            </label>

            <label className="field">
              <span>Current Month Charges (PKR)</span>
              <input
                name="currentPayment"
                type="number"
                min={0}
                step="0.01"
                defaultValue={0}
                required
              />
            </label>
          </div>

          <button type="submit" className="primaryBtn">
            Generate Invoice
          </button>
        </form>
      </section>

      {data && (
        <section className="invoice-page">
          <div className="no-print actions">
            <button onClick={handlePrint} className="primaryBtn">
              Print / Download PDF
            </button>
          </div>

          {/* -------- Society Copy -------- */}
          <Invoice copyLabel="Society's Copy" data={data} total={total} />

          <div className="divider">
            <span>✂︎</span>
          </div>

          {/* -------- Resident Copy -------- */}
          <Invoice copyLabel="Resident's Copy" data={data} total={total} />
        </section>
      )}

      {/* -------- Styles (scoped to this page) -------- */}
      <style jsx>{`
        .page {
          min-height: 100vh;
          padding: 2rem 1rem 4rem;
          background: radial-gradient(circle at top left, #f5f7ff, #e4ebff);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          box-sizing: border-box;
        }

        .card {
          width: 100%;
          max-width: 900px;
          background: white;
          border-radius: 18px;
          padding: 1.75rem 1.5rem 1.5rem;
          box-shadow: 0 20px 40px rgba(15, 23, 42, 0.12);
          border: 1px solid rgba(148, 163, 184, 0.4);
        }

        .title {
          margin: 0 0 0.25rem;
          font-size: 1.6rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          color: #111827;
        }

        .subtitle {
          margin: 0 0 1.5rem;
          color: #6b7280;
          font-size: 0.95rem;
        }

        .form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1rem;
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          font-size: 0.9rem;
          color: #374151;
        }

        .field span {
          font-weight: 600;
        }

        .field input {
          border-radius: 10px;
          border: 1px solid #d1d5db;
          padding: 0.6rem 0.75rem;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }

        .field input:focus {
          border-color: #4f46e5;
          box-shadow: 0 0 0 1px rgba(79, 70, 229, 0.2);
        }

        .primaryBtn {
          align-self: flex-start;
          padding: 0.65rem 1.4rem;
          border-radius: 999px;
          border: none;
          background: linear-gradient(135deg, #4f46e5, #6366f1);
          color: white;
          font-weight: 600;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          font-size: 0.8rem;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          box-shadow: 0 12px 25px rgba(79, 70, 229, 0.35);
        }

        .primaryBtn:hover {
          transform: translateY(-1px);
          box-shadow: 0 16px 35px rgba(79, 70, 229, 0.4);
        }

        .actions {
          width: 100%;
          max-width: 900px;
          display: flex;
          justify-content: flex-end;
          margin-bottom: 0.75rem;
        }

        .invoice-page {
          width: 100%;
          max-width: 900px;
          background: white;
          border-radius: 16px;
          padding: 1.5rem 1.75rem 1.75rem;
          box-shadow: 0 16px 35px rgba(15, 23, 42, 0.15);
          border: 1px solid rgba(148, 163, 184, 0.5);
        }

        .divider {
          border-top: 1px dashed #9ca3af;
          margin: 1.5rem 0;
          position: relative;
          text-align: center;
        }

        .divider span {
          position: relative;
          top: -0.8rem;
          background: white;
          padding: 0 0.5rem;
          color: #9ca3af;
          font-size: 0.85rem;
        }

        @media print {
          .no-print {
            display: none !important;
          }

          .page {
            padding: 0;
            background: white;
          }

          .invoice-page {
            box-shadow: none;
            border-radius: 0;
            border: none;
            max-width: 100%;
            padding: 0.8rem 1rem 1rem;
          }
        }
      `}</style>
    </main>
  );
}

type InvoiceProps = {
  copyLabel: string;
  data: InvoiceForm;
  total: number;
};

function Invoice({ copyLabel, data, total }: InvoiceProps) {
  const issueDate = new Date();
  const dueDate = new Date();
  dueDate.setDate(issueDate.getDate() + 20);

  const fmt = (d: Date) =>
    d.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

  const currency = (value: number) =>
    value.toLocaleString('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 2,
    });

  return (
    <div className="invoice">
      <header className="invoice-header">
        <div>
          <h2 className="society-name">LUCKNOW CO-OPERATIVE HOUSING SOCIETY</h2>
          <p className="society-subtitle">Security and conservatory services</p>
        </div>
        <div className="copy-pill">{copyLabel}</div>
      </header>

      <section className="meta">
        <div className="meta-row">
          <div>
            <span className="meta-label">Issue Date</span>
            <span className="meta-value">{fmt(issueDate)}</span>
          </div>
          <div>
            <span className="meta-label">Due Date</span>
            <span className="meta-value">{fmt(dueDate)}</span>
          </div>
          <div>
            <span className="meta-label">Billing Month</span>
            <span className="meta-value">{data.billMonth}</span>
          </div>
        </div>

        <div className="meta-row">
          <div className="w-50">
            <span className="meta-label">Resident Name</span>
            <span className="meta-value">{data.name}</span>
          </div>
          <div>
            <span className="meta-label">Contact</span>
            <span className="meta-value">{data.contact}</span>
          </div>
          <div>
            <span className="meta-label">Plot / House No.</span>
            <span className="meta-value">{data.plotNo}</span>
          </div>
        </div>

        <div className="meta-row">
          <div className="w-100">
            <span className="meta-label">Address</span>
            <span className="meta-value">{data.address}</span>
          </div>
        </div>
      </section>

      <section className="charges">
        <table className="charges-table">
          <thead>
            <tr>
              <th className="left">Particulars</th>
              <th>Amount (PKR)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="left">Previous / Other Dues</td>
              <td>{currency(data.dues)}</td>
            </tr>
            <tr>
              <td className="left">Current Month Charges</td>
              <td>{currency(data.currentPayment)}</td>
            </tr>
            <tr className="total-row">
              <td className="left">Total Payable</td>
              <td>{currency(total)}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="footer">
        <div className="signatures">
          <div className="sig-col">
            <div className="sig-line" />
            <span className="sig-label">Date</span>
          </div>
          <div className="sig-col">
            <div className="sig-line" />
            <span className="sig-label">Office Secretary</span>
          </div>
        </div>
        <p className="note">
          Please make sure to pay the charges before the 10th of each month.
        </p>
      </section>

      <style jsx>{`
        .invoice {
          border-radius: 12px;
          border: 1px solid #d1d5db;
          padding: 1rem 1.25rem 1.25rem;
          font-size: 0.82rem;
          color: #111827;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
            sans-serif;
        }

        .invoice-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 2px solid #111827;
          padding-bottom: 0.5rem;
          margin-bottom: 0.7rem;
        }

        .society-name {
          margin: 0;
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .society-subtitle {
          margin: 0.1rem 0 0;
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: #4b5563;
        }

        .copy-pill {
          padding: 0.25rem 0.7rem;
          border-radius: 999px;
          border: 1px solid #6366f1;
          color: #4f46e5;
          font-weight: 600;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          background: linear-gradient(135deg, #eef2ff, #e0ecff);
        }

        .meta {
          margin-bottom: 0.7rem;
        }

        .meta-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 0.3rem;
        }

        .meta-row > div {
          min-width: 140px;
        }

        .w-50 {
          flex: 1.2;
        }

        .w-100 {
          flex: 1 1 100%;
        }

        .meta-label {
          display: block;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #6b7280;
        }

        .meta-value {
          display: block;
          font-size: 0.82rem;
          font-weight: 600;
          margin-top: 0.05rem;
        }

        .charges-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.8rem;
        }

        .charges-table th,
        .charges-table td {
          border: 1px solid #d1d5db;
          padding: 0.35rem 0.4rem;
          text-align: right;
        }

        .charges-table th.left,
        .charges-table td.left {
          text-align: left;
        }

        .charges-table thead {
          background: #f3f4f6;
        }

        .total-row td {
          font-weight: 700;
          background: #f9fafb;
        }

        .footer {
          margin-top: 0.9rem;
        }

        .signatures {
          display: flex;
          justify-content: space-between;
          gap: 1.2rem;
          margin-bottom: 0.5rem;
        }

        .sig-col {
          flex: 1;
          text-align: center;
        }

        .sig-line {
          border-bottom: 1px solid #9ca3af;
          margin: 0.9rem 0 0.25rem;
        }

        .sig-label {
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: #6b7280;
        }

        .note {
          font-size: 0.72rem;
          color: #6b7280;
          margin: 0;
        }

        @media print {
          .invoice {
            border-radius: 0;
          }
        }
      `}</style>
    </div>
  );
}
