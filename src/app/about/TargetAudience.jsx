import React from "react";

export default function TargetAudience() {
    const audience = [
        {
            title: "Small Businesses",
            description: "Perfect for shops, boutiques, and small-scale operations looking to upgrade from spreadsheets and manual processes."
        },
        {
            title: "Growing Companies",
            description: "Scalable solution that grows with your business, from single location to multiple warehouses."
        },
        {
            title: "E-commerce Sellers",
            description: "Specially designed features for online sellers managing inventory across multiple platforms and marketplaces."
        }
    ];

    return (
        <section className={`py-16 bg-white`}>
            <div className={`container mx-auto px-4`}>
                <h2 className={`text-3xl font-bold mb-12 text-center font-gfs_didot`}>Who Finviq Is For</h2>

                <div className={`grid md:grid-cols-3 gap-8`}>
                    {audience.map((audience, index) => (
                        <div key={index} className={`bg-background p-8 rounded-lg`}>
                            <h3 className={`text-xl font-semibold mb-4`}>{audience.title}</h3>
                            <p className={`text-secondary`}>{audience.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}