export default function PricingFAQ() {
    const faqs = [
        {
            question: "Can I change plans anytime?",
            answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and we'll prorate your billing accordingly."
        },
        {
            question: "Is there a setup fee?",
            answer: "No setup fees, ever. You only pay the monthly or yearly subscription fee for your chosen plan."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept M-Pesa, Airtel Money, bank transfers, and major credit cards. All payments are processed securely."
        },
        {
            question: "Can I cancel anytime?",
            answer: "Yes, you can cancel your subscription anytime. Your account will remain active until the end of your billing period."
        },
    ];

    return (
        <div className={`mt-24`}>
            <h2 className={`text-3xl font-bold text-gray-900 text-center mb-12`}>Frequently Asked Questions</h2>

            <div className={`grid grid-cols-1 gap-8 lg:grid-cols-2`}>
                {faqs.map((faq, index) => (
                    <div key={index} className={`bg-gray-100 rounded-lg p-4`}>
                        <h3 className={`text-lg font-semibold text-gray-900 mb-3`}>{faq.question}</h3>
                        <p className={`text-gray-600`}>{faq.answer}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}