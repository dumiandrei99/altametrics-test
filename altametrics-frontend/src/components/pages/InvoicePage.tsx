import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchInvoices } from '../../state/slices/invoiceSlice';
import InvoicePopup from '../popups/InvoicePopup';
import { AppDispatch, RootState } from '../../state/store';

const InvoicePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const invoices = useSelector((state: RootState) => state.invoice.invoices);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchInvoices());
  }, [dispatch]);

  const formatDateString = (isoDateString: string): string => {
    console.log(isoDateString);
    const date = new Date(isoDateString);  
    console.log(date);
    return new Intl.DateTimeFormat('en-US').format(date);
  }

  const handleRowClick = (invoiceId: string) => {
    setSelectedInvoiceId(invoiceId);
  };
  
  return (
    <div>
      <h1>Invoices</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id} onClick={() => handleRowClick(invoice.id)}>
              <td>{formatDateString(invoice.due_date)}</td>
              <td>{invoice.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedInvoiceId && <InvoicePopup invoiceId={selectedInvoiceId} onClose={() => setSelectedInvoiceId(null)} formatDateString={(date: string) => formatDateString(date)}/>}
    </div>
  );
};

export default InvoicePage;
