import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchInvoice } from '../../state/slices/invoiceSlice';
import { AppDispatch, RootState } from '../../state/store';

interface InvoicePopupProps {
  invoiceId: string;
  onClose: () => void;
  formatDateString: (dateString: string) => string;
}
const InvoicePopup: React.FC<InvoicePopupProps> = ({invoiceId, onClose, formatDateString}) => {
  const dispatch = useDispatch<AppDispatch>();
  const invoice = useSelector((state: RootState) => state.invoice.currentInvoice);

  useEffect(() => {
    dispatch(fetchInvoice(invoiceId));
  }, [dispatch]);

  return (
    <div>
        {invoice && 
        
        <div className="invoice-popup">
            <div className="invoice-popup-content">
                 <button className="close-button" onClick={onClose}>&times;</button>
                 <h2>Information about Invoice with ID {invoice.id}</h2>
                 <span>Date: {formatDateString(invoice.due_date)}</span>
                 <span>Price amount: {invoice.amount}</span>
                 <span>Description: {invoice.description}</span>
                 <span>Payee: {invoice.user.name}</span>
            </div>
        </div>
        }
    </div>
  );
};

export default InvoicePopup;