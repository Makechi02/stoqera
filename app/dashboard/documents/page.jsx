'use client'

import React, {useRef, useState} from 'react';
import {Eye, Palette, Printer, Settings} from 'lucide-react';

const PrintingSystem = () => {
    const [activeDoc, setActiveDoc] = useState('receipt');
    const printRef = useRef();

    const [settings, setSettings] = useState({
        logo: '',
        companyName: 'TV CENTRE KENYA LTD',
        address: 'Ronald Ngala Street, RNG Plaza',
        phone: '0702297561',
        email: 'support@tvcentre.co.ke',
        themeColor: '#1e40af',
        bankDetails: {
            paybill: '222111',
            accountNo: '2232452',
            bankName: 'Family Bank',
            branch: 'Brandy Television Centre LTD',
            accountNumber: '012000057565'
        },
        showBankDetails: true,
        showSignature: true,
        signatureNames: 'Joseph/Simon',
        footerNote: 'Thank you for your business!'
    });

    const [sampleData, setSampleData] = useState({
        receipt: {
            number: 'RCPT176',
            date: '01-25-2025',
            customer: {
                name: 'Ann Gathoni',
                phone: '0715740677',
                email: '',
                address: '',
            },
            items: [
                { sr: 1, product: 'Tecno Pop 9 3/128GB', quantity: 1.00, rate: 12600.00, amount: 12600.00 },
            ],
            total: 12600.00,
            grandTotal: 12600.00,
            paid: 12600.00,
            paymentDate: '01-25-2025',
            balance: 0,
            note: ''
        },
        invoice: {
            number: 'INV-2024-001',
            date: '01-25-2025',
            dueDate: '02-25-2025',
            customer: {
                name: 'Acme Corporation',
                phone: '0712345678',
                email: 'contact@acme.com',
                address: '123 Business St, Nairobi',
            },
            items: [
                { sr: 1, product: 'Product A', quantity: 2, rate: 150.00, amount: 300.00 },
                { sr: 2, product: 'Product B', quantity: 1, rate: 200.00, amount: 200.00 },
            ],
            subtotal: 500.00,
            tax: 50.00,
            total: 550.00,
        },
    });

    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        const content = printRef.current.innerHTML;

        printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print Document</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: Arial, sans-serif; }
            @page { margin: 15mm; }
            @media print {
              body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            }
          </style>
        </head>
        <body>${content}</body>
      </html>
    `);

        printWindow.document.close();
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 250);
    };

    const ReceiptTemplate = () => (
        <div style={{ padding: '30px', maxWidth: '800px', margin: '0 auto', backgroundColor: 'white', fontFamily: 'Arial, sans-serif' }}>
            {/* Header - RECEIPT */}
            <div style={{ textAlign: 'center', marginBottom: '25px' }}>
                <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px', letterSpacing: '2px' }}>
                    RECEIPT
                </h1>

                {settings.logo && (
                    <img src={settings.logo} alt="Logo" style={{ maxWidth: '120px', marginBottom: '15px' }} />
                )}

                <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '5px' }}>
                    {settings.companyName}
                </div>
                <div style={{ fontSize: '14px', color: '#555', lineHeight: '1.6' }}>
                    {settings.address}<br />
                    {settings.phone}<br />
                    {settings.email}
                </div>
            </div>

            {/* Bill To Section */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px',
                marginBottom: '25px',
                padding: '15px 0',
                borderTop: '2px solid #000',
                borderBottom: '2px solid #000'
            }}>
                <div>
                    <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '14px' }}>Bill To</div>
                    <div style={{ fontSize: '15px', fontWeight: 'bold' }}>{sampleData.receipt.customer.name}</div>
                    <div style={{ fontSize: '14px', color: '#555' }}>{sampleData.receipt.customer.phone}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '3px' }}>
                        {sampleData.receipt.number}
                    </div>
                    <div style={{ fontSize: '14px', color: '#555' }}>
                        {sampleData.receipt.date}
                    </div>
                </div>
            </div>

            {/* Items Table */}
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                <thead>
                <tr style={{ backgroundColor: settings.themeColor, color: 'white' }}>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontSize: '13px', fontWeight: 'bold' }}>Sr no.</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontSize: '13px', fontWeight: 'bold' }}>Product</th>
                    <th style={{ padding: '12px 8px', textAlign: 'right', fontSize: '13px', fontWeight: 'bold' }}>Qty</th>
                    <th style={{ padding: '12px 8px', textAlign: 'right', fontSize: '13px', fontWeight: 'bold' }}>Rate</th>
                    <th style={{ padding: '12px 8px', textAlign: 'right', fontSize: '13px', fontWeight: 'bold' }}>Amount</th>
                </tr>
                </thead>
                <tbody>
                {sampleData.receipt.items.map((item, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #ddd' }}>
                        <td style={{ padding: '12px 8px', fontSize: '14px' }}>{item.sr}</td>
                        <td style={{ padding: '12px 8px', fontSize: '14px' }}>{item.product}</td>
                        <td style={{ padding: '12px 8px', textAlign: 'right', fontSize: '14px' }}>{item.quantity.toFixed(2)}</td>
                        <td style={{ padding: '12px 8px', textAlign: 'right', fontSize: '14px' }}>{item.rate.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        <td style={{ padding: '12px 8px', textAlign: 'right', fontSize: '14px' }}>{item.amount.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Note */}
            {sampleData.receipt.note && (
                <div style={{ marginBottom: '20px', fontSize: '13px', fontStyle: 'italic', color: '#666' }}>
                    <strong>Please Note:</strong> {sampleData.receipt.note}
                </div>
            )}

            {/* Totals */}
            <div style={{ marginLeft: 'auto', width: '100%', maxWidth: '400px', marginBottom: '30px' }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    fontSize: '15px',
                    fontWeight: 'bold'
                }}>
                    <span>Total</span>
                    <span>KES {sampleData.receipt.total.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    fontSize: '15px',
                    fontWeight: 'bold',
                    backgroundColor: '#f3f4f6'
                }}>
                    <span>Grand Total</span>
                    <span>KES {sampleData.receipt.grandTotal.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    fontSize: '14px',
                    borderBottom: '1px solid #ddd'
                }}>
                    <span>(-) Paid ({sampleData.receipt.paymentDate})</span>
                    <span>KES {sampleData.receipt.paid.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
            </div>

            {/* Signature and Banking Details */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '30px',
                marginTop: '40px',
                paddingTop: '20px',
                borderTop: '2px solid #000'
            }}>
                {settings.showSignature && (
                    <div>
                        <div style={{ marginBottom: '50px' }}>
                            <div style={{ fontSize: '14px', color: '#555', marginBottom: '3px' }}>
                                {settings.signatureNames}
                            </div>
                        </div>
                        <div style={{
                            borderTop: '1px solid #000',
                            paddingTop: '5px',
                            fontSize: '13px',
                            fontWeight: 'bold'
                        }}>
                            Signature
                        </div>
                    </div>
                )}

                {settings.showBankDetails && (
                    <div>
                        <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px' }}>
                            Banking Details
                        </div>
                        <div style={{ fontSize: '13px', lineHeight: '1.8', color: '#333' }}>
                            <div><strong>Paybill:</strong> {settings.bankDetails.paybill}</div>
                            <div><strong>Acc No:</strong> {settings.bankDetails.accountNo}</div>
                            <div style={{ marginTop: '8px', fontSize: '12px', fontWeight: 'bold' }}>Other Details</div>
                            <div>{settings.bankDetails.bankName}</div>
                            <div>{settings.bankDetails.branch}</div>
                            <div>Acc No: {settings.bankDetails.accountNumber}</div>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer Note */}
            {settings.footerNote && (
                <div style={{
                    marginTop: '30px',
                    textAlign: 'center',
                    fontSize: '12px',
                    color: '#666',
                    fontStyle: 'italic'
                }}>
                    {settings.footerNote}
                </div>
            )}
        </div>
    );

    const InvoiceTemplate = () => (
        <div style={{ padding: '30px', maxWidth: '800px', margin: '0 auto', backgroundColor: 'white', fontFamily: 'Arial, sans-serif' }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '25px' }}>
                <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px', letterSpacing: '2px' }}>
                    INVOICE
                </h1>

                {settings.logo && (
                    <img src={settings.logo} alt="Logo" style={{ maxWidth: '120px', marginBottom: '15px' }} />
                )}

                <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '5px' }}>
                    {settings.companyName}
                </div>
                <div style={{ fontSize: '14px', color: '#555', lineHeight: '1.6' }}>
                    {settings.address}<br />
                    {settings.phone}<br />
                    {settings.email}
                </div>
            </div>

            {/* Bill To and Invoice Details */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px',
                marginBottom: '25px',
                padding: '15px 0',
                borderTop: '2px solid #000',
                borderBottom: '2px solid #000'
            }}>
                <div>
                    <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '14px' }}>Bill To</div>
                    <div style={{ fontSize: '15px', fontWeight: 'bold' }}>{sampleData.invoice.customer.name}</div>
                    <div style={{ fontSize: '14px', color: '#555' }}>{sampleData.invoice.customer.phone}</div>
                    <div style={{ fontSize: '14px', color: '#555' }}>{sampleData.invoice.customer.email}</div>
                    {sampleData.invoice.customer.address && (
                        <div style={{ fontSize: '14px', color: '#555' }}>{sampleData.invoice.customer.address}</div>
                    )}
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '3px' }}>
                        {sampleData.invoice.number}
                    </div>
                    <div style={{ fontSize: '14px', color: '#555', marginBottom: '8px' }}>
                        Date: {sampleData.invoice.date}
                    </div>
                    <div style={{ fontSize: '14px', color: '#555' }}>
                        Due Date: {sampleData.invoice.dueDate}
                    </div>
                </div>
            </div>

            {/* Items Table */}
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                <thead>
                <tr style={{ backgroundColor: settings.themeColor, color: 'white' }}>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontSize: '13px', fontWeight: 'bold' }}>Sr no.</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', fontSize: '13px', fontWeight: 'bold' }}>Product</th>
                    <th style={{ padding: '12px 8px', textAlign: 'right', fontSize: '13px', fontWeight: 'bold' }}>Qty</th>
                    <th style={{ padding: '12px 8px', textAlign: 'right', fontSize: '13px', fontWeight: 'bold' }}>Rate</th>
                    <th style={{ padding: '12px 8px', textAlign: 'right', fontSize: '13px', fontWeight: 'bold' }}>Amount</th>
                </tr>
                </thead>
                <tbody>
                {sampleData.invoice.items.map((item, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #ddd' }}>
                        <td style={{ padding: '12px 8px', fontSize: '14px' }}>{item.sr}</td>
                        <td style={{ padding: '12px 8px', fontSize: '14px' }}>{item.product}</td>
                        <td style={{ padding: '12px 8px', textAlign: 'right', fontSize: '14px' }}>{item.quantity}</td>
                        <td style={{ padding: '12px 8px', textAlign: 'right', fontSize: '14px' }}>{item.rate.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        <td style={{ padding: '12px 8px', textAlign: 'right', fontSize: '14px' }}>{item.amount.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Totals */}
            <div style={{ marginLeft: 'auto', width: '100%', maxWidth: '400px', marginBottom: '30px' }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    fontSize: '15px',
                    borderBottom: '1px solid #ddd'
                }}>
                    <span>Subtotal</span>
                    <span>KES {sampleData.invoice.subtotal.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    fontSize: '15px',
                    borderBottom: '1px solid #ddd'
                }}>
                    <span>Tax</span>
                    <span>KES {sampleData.invoice.tax.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    backgroundColor: '#f3f4f6'
                }}>
                    <span>Total</span>
                    <span>KES {sampleData.invoice.total.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
            </div>

            {/* Banking Details and Signature */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '30px',
                marginTop: '40px',
                paddingTop: '20px',
                borderTop: '2px solid #000'
            }}>
                {settings.showBankDetails && (
                    <div>
                        <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px' }}>
                            Banking Details
                        </div>
                        <div style={{ fontSize: '13px', lineHeight: '1.8', color: '#333' }}>
                            <div><strong>Paybill:</strong> {settings.bankDetails.paybill}</div>
                            <div><strong>Acc No:</strong> {settings.bankDetails.accountNo}</div>
                            <div style={{ marginTop: '8px', fontSize: '12px', fontWeight: 'bold' }}>Other Details</div>
                            <div>{settings.bankDetails.bankName}</div>
                            <div>{settings.bankDetails.branch}</div>
                            <div>Acc No: {settings.bankDetails.accountNumber}</div>
                        </div>
                    </div>
                )}

                {settings.showSignature && (
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ marginBottom: '50px' }}>
                            <div style={{ fontSize: '14px', color: '#555', marginBottom: '3px' }}>
                                {settings.signatureNames}
                            </div>
                        </div>
                        <div style={{
                            borderTop: '1px solid #000',
                            paddingTop: '5px',
                            fontSize: '13px',
                            fontWeight: 'bold'
                        }}>
                            Signature
                        </div>
                    </div>
                )}
            </div>

            {settings.footerNote && (
                <div style={{
                    marginTop: '30px',
                    textAlign: 'center',
                    fontSize: '12px',
                    color: '#666',
                    fontStyle: 'italic'
                }}>
                    {settings.footerNote}
                </div>
            )}
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 text-background p-6">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Document Printing System</h1>
                    <p className="text-gray-600">Customize and print receipts and invoices with your branding</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Controls */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Document Type */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <Settings className="w-5 h-5" />
                                Document Type
                            </h2>
                            <div className="space-y-2">
                                <button
                                    onClick={() => setActiveDoc('receipt')}
                                    className={`w-full p-3 rounded text-left transition ${
                                        activeDoc === 'receipt'
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-100 hover:bg-gray-200'
                                    }`}
                                >
                                    Receipt
                                </button>
                                <button
                                    onClick={() => setActiveDoc('invoice')}
                                    className={`w-full p-3 rounded text-left transition ${
                                        activeDoc === 'invoice'
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-100 hover:bg-gray-200'
                                    }`}
                                >
                                    Invoice
                                </button>
                            </div>
                        </div>

                        {/* Branding */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <Palette className="w-5 h-5" />
                                Branding
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Company Name</label>
                                    <input
                                        type="text"
                                        value={settings.companyName}
                                        onChange={(e) => setSettings({...settings, companyName: e.target.value})}
                                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Address</label>
                                    <input
                                        type="text"
                                        value={settings.address}
                                        onChange={(e) => setSettings({...settings, address: e.target.value})}
                                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Phone</label>
                                    <input
                                        type="text"
                                        value={settings.phone}
                                        onChange={(e) => setSettings({...settings, phone: e.target.value})}
                                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Email</label>
                                    <input
                                        type="email"
                                        value={settings.email}
                                        onChange={(e) => setSettings({...settings, email: e.target.value})}
                                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Logo URL</label>
                                    <input
                                        type="text"
                                        value={settings.logo}
                                        onChange={(e) => setSettings({...settings, logo: e.target.value})}
                                        placeholder="https://example.com/logo.png"
                                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Theme Color</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="color"
                                            value={settings.themeColor}
                                            onChange={(e) => setSettings({...settings, themeColor: e.target.value})}
                                            className="h-10 w-20 rounded cursor-pointer"
                                        />
                                        <input
                                            type="text"
                                            value={settings.themeColor}
                                            onChange={(e) => setSettings({...settings, themeColor: e.target.value})}
                                            className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Used for table headers and accents</p>
                                </div>
                            </div>
                        </div>

                        {/* Banking & Signature */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-xl font-bold mb-4">Banking & Signature</h2>

                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={settings.showBankDetails}
                                        onChange={(e) => setSettings({...settings, showBankDetails: e.target.checked})}
                                        className="w-4 h-4"
                                    />
                                    <label className="text-sm font-medium">Show Banking Details</label>
                                </div>

                                {settings.showBankDetails && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Paybill</label>
                                            <input
                                                type="text"
                                                value={settings.bankDetails.paybill}
                                                onChange={(e) => setSettings({
                                                    ...settings,
                                                    bankDetails: {...settings.bankDetails, paybill: e.target.value}
                                                })}
                                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-2">Account No</label>
                                            <input
                                                type="text"
                                                value={settings.bankDetails.accountNo}
                                                onChange={(e) => setSettings({
                                                    ...settings,
                                                    bankDetails: {...settings.bankDetails, accountNo: e.target.value}
                                                })}
                                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-2">Bank Name</label>
                                            <input
                                                type="text"
                                                value={settings.bankDetails.bankName}
                                                onChange={(e) => setSettings({
                                                    ...settings,
                                                    bankDetails: {...settings.bankDetails, bankName: e.target.value}
                                                })}
                                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-2">Branch</label>
                                            <input
                                                type="text"
                                                value={settings.bankDetails.branch}
                                                onChange={(e) => setSettings({
                                                    ...settings,
                                                    bankDetails: {...settings.bankDetails, branch: e.target.value}
                                                })}
                                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-2">Full Account Number</label>
                                            <input
                                                type="text"
                                                value={settings.bankDetails.accountNumber}
                                                onChange={(e) => setSettings({
                                                    ...settings,
                                                    bankDetails: {...settings.bankDetails, accountNumber: e.target.value}
                                                })}
                                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                            />
                                        </div>
                                    </>
                                )}

                                <div className="flex items-center gap-2 pt-4 border-t">
                                    <input
                                        type="checkbox"
                                        checked={settings.showSignature}
                                        onChange={(e) => setSettings({...settings, showSignature: e.target.checked})}
                                        className="w-4 h-4"
                                    />
                                    <label className="text-sm font-medium">Show Signature Section</label>
                                </div>

                                {settings.showSignature && (
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Signature Names</label>
                                        <input
                                            type="text"
                                            value={settings.signatureNames}
                                            onChange={(e) => setSettings({...settings, signatureNames: e.target.value})}
                                            placeholder="Joseph/Simon"
                                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                        />
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium mb-2">Footer Note</label>
                                    <input
                                        type="text"
                                        value={settings.footerNote}
                                        onChange={(e) => setSettings({...settings, footerNote: e.target.value})}
                                        placeholder="Thank you for your business!"
                                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Preview */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <Eye className="w-5 h-5" />
                                    Preview
                                </h2>
                                <button
                                    onClick={handlePrint}
                                    className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                                >
                                    <Printer className="w-4 h-4" />
                                    Print
                                </button>
                            </div>

                            <div className="border rounded-lg overflow-auto bg-gray-50 p-4" style={{ maxHeight: '1000px' }}>
                                <div ref={printRef}>
                                    {activeDoc === 'receipt' && <ReceiptTemplate />}
                                    {activeDoc === 'invoice' && <InvoiceTemplate />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrintingSystem;