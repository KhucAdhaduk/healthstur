'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import { DynamicIcon } from './DynamicIcon';
import StartApplicationDialog from './StartApplicationDialog';

export default function PricingSection() {
    const [durations, setDurations] = useState<any[]>([]);
    const [activeDuration, setActiveDuration] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [userCountry, setUserCountry] = useState<string | null>(null);
    const [countries, setCountries] = useState<any[]>([]);

    const [isAppOpen, setIsAppOpen] = useState(false);
    const [selectedProgram, setSelectedProgram] = useState('');
    const [selectedAmount, setSelectedAmount] = useState('');
    const [selectedCurrency, setSelectedCurrency] = useState('');

    useEffect(() => {
        // Init country from local storage
        const savedCountry = localStorage.getItem('selectedCountry');
        if (savedCountry) {
            setUserCountry(savedCountry);
        }

        // Listen for country changes
        const handleCountryChange = () => {
            setUserCountry(localStorage.getItem('selectedCountry'));
        };

        window.addEventListener('countryChange', handleCountryChange);

        const fetchData = async () => {
            try {
                const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
                const [pricingRes, countriesRes] = await Promise.all([
                    fetch(`${apiBase}/pricing/public`),
                    fetch(`${apiBase}/countries/active`)
                ]);

                if (pricingRes.ok) {
                    const data = await pricingRes.json();
                    const filteredData = data.filter((d: any) => d.plans && d.plans.length > 0);
                    setDurations(filteredData);
                    if (filteredData.length > 0) {
                        setActiveDuration(filteredData[0].id);
                    }
                }

                if (countriesRes.ok) {
                    const countryData = await countriesRes.json();
                    setCountries(countryData);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();

        return () => {
            window.removeEventListener('countryChange', handleCountryChange);
        };
    }, []);

    const activeDurationObj = durations.find(d => d.id === activeDuration);
    const currentPlans = activeDurationObj?.plans || [];

    const getPriceDisplay = (plan: any) => {
        let displayPrice = plan.price || '---';
        let symbol = '$';

        if (userCountry && plan.prices && plan.prices[userCountry]) {
            displayPrice = plan.prices[userCountry];
            const country = countries.find(c => c.id === userCountry);
            if (country) symbol = country.currencySymbol;
        }

        const cleanPrice = displayPrice.toString().replace(/^[^\d.]+/, '').trim();

        return <><span className="text-4xl md:text-5xl font-extrabold mr-2 transition-colors duration-300 text-white md:text-[#023051] group-hover:text-white">{symbol}{cleanPrice}</span></>;
    };

    const handleBuyClick = (plan: any) => {
        let displayPrice = plan.price || '---';
        let actCurrency = 'USD';

        if (userCountry && plan.prices && plan.prices[userCountry]) {
            displayPrice = plan.prices[userCountry];
            const country = countries.find(c => c.id === userCountry);
            if (country) { actCurrency = country.currencyCode; }
        }

        const cleanPrice = displayPrice.toString().replace(/^[^\d.]+/, '').trim();

        setSelectedProgram(plan.name);
        setSelectedAmount(cleanPrice);
        setSelectedCurrency(actCurrency);
        setIsAppOpen(true);
    };

    if (loading) {
        return (
            <section className="pb-18 md:pb-28 pt-10 md:pt-20 bg-white min-h-[50vh] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#023051]"></div>
            </section>
        );
    }

    if (durations.length === 0) {
        return null;
    }

    return (
        <section className="pb-18 md:pb-28 pt-10 md:pt-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                {/* Header */}
                <div className="text-center mb-10">
                    <h5 className="text-[#023051] font-bold tracking-widest uppercase text-sm mb-3">FLEXIBLE PRICING</h5>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-[#023051] mb-6">Invest In Your Health.</h2>
                    <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto">
                        Choose the plan that fits your goals. Transparency is our policy.
                    </p>
                </div>

                {/* Duration Toggle */}
                <div className="flex justify-center mb-12">
                    <div className="inline-flex bg-white rounded-full border border-gray-300 p-1 relative">
                        {durations.map((d) => (
                            <button
                                key={d.id}
                                onClick={() => setActiveDuration(d.id)}
                                className={`relative z-10 px-6 py-3 rounded-full cursor-pointer text-base font-bold transition-colors duration-300 ${activeDuration === d.id ? 'text-white' : 'text-[#023051] hover:text-[#023051]/80'
                                    }`}
                            >
                                {d.name}
                                {activeDuration === d.id && (
                                    <motion.div
                                        layoutId="activeDuration"
                                        className="absolute inset-0 bg-[#023051] rounded-full -z-10"
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Cards Container */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8 lg:gap-10 items-stretch max-w-7xl mx-auto">
                    {currentPlans.map((plan: any, index: number) => {
                        return (
                            <motion.div
                                key={`${activeDuration}-${plan.id || index}`} // Key change triggers animation re-mount for smooth transition
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className={`group relative overflow-hidden rounded-[32px] p-6 md:p-8 flex flex-col border transition-all duration-300 bg-transparent md:bg-white text-white md:text-[#023051] border-transparent md:border-gray-300 z-0 hover:text-white hover:border-transparent hover:shadow-xl`}
                            >
                                {/* Hover Background Image */}
                                <div className="absolute inset-0 z-[-1] opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center"
                                        style={{
                                            backgroundImage: `url(${plan.image?.startsWith('http')
                                                ? plan.image
                                                : `${(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api').replace(/\/api$/, '')}${plan.image?.startsWith('/') ? '' : '/'}${plan.image}`})`
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-[#023051]/75" />
                                </div>

                                {/* Most Popular Badge */}
                                {plan.highlighted && (
                                    <div className="absolute top-0 right-0 bg-white md:bg-[#023051] text-[#023051] md:text-white px-5 py-2 rounded-bl-xl rounded-tr-[31px] text-xs font-bold uppercase tracking-widest shadow-sm z-20 group-hover:bg-white group-hover:text-[#023051] transition-colors duration-300">
                                        MOST POPULAR
                                    </div>
                                )}

                                {/* Icon */}
                                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 bg-white/10 md:bg-[#F0F4F9] text-white md:text-[#023051] group-hover:bg-white/10 group-hover:text-white">
                                    <DynamicIcon name={plan.icon || 'Star'} className="w-6 h-6 md:w-7 md:h-7" strokeWidth={1.5} />
                                </div>

                                {/* Plan Info */}
                                <h3 className="text-2xl md:text-3xl font-extrabold mb-2 transition-colors duration-300 text-white md:text-[#023051] group-hover:text-white">{plan.name}</h3>
                                <p className="text-sm md:text-base mb-6 leading-relaxed transition-colors duration-300 text-gray-300 md:text-gray-500 group-hover:text-gray-300">
                                    {plan.description}
                                </p>

                                {/* Price */}
                                <div className="flex items-baseline mb-6">
                                    {getPriceDisplay(plan)}
                                    <span className="text-sm font-semibold transition-colors duration-300 text-gray-300 md:text-gray-400 group-hover:text-gray-300">/Monthly</span>
                                </div>

                                <hr className="mb-6 transition-colors duration-300 border-white/30 md:border-gray-200 group-hover:border-white/30" />

                                <div className="flex-grow">
                                    {/* What's Included */}
                                    {plan.features && plan.features.length > 0 && (
                                        <>
                                            <h4 className="font-bold text-base mb-4 transition-colors duration-300 text-white md:text-[#023051] group-hover:text-white">What’s Included:</h4>
                                            <ul className="space-y-3 mb-6">
                                                {plan.features.map((feature: string, idx: number) => (
                                                    <li key={idx} className="flex items-start gap-3">
                                                        <div className="rounded-full p-0.5 mt-0.5 shrink-0 transition-colors duration-300 bg-white md:bg-[#023051] text-[#023051] md:text-white group-hover:bg-white group-hover:text-[#023051]">
                                                            <Check className="w-3 h-3" strokeWidth={3} />
                                                        </div>
                                                        <span className="text-sm font-semibold leading-tight transition-colors duration-300 text-white md:text-[#023051] group-hover:text-white">
                                                            {feature}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    )}

                                    {/* Support Level */}
                                    {plan.support && plan.support.length > 0 && (
                                        <>
                                            <h4 className="font-bold text-base mb-4 transition-colors duration-300 text-white md:text-[#023051] group-hover:text-white">Support Level:</h4>
                                            <ul className="space-y-3 mb-6">
                                                {plan.support.map((item: string, idx: number) => (
                                                    <li key={idx} className="text-sm font-medium leading-tight transition-colors duration-300 text-gray-300 md:text-gray-600 group-hover:text-gray-300">
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    )}
                                </div>

                                {/* Button */}
                                <button
                                    onClick={() => handleBuyClick(plan)}
                                    className="w-full py-4 rounded-xl font-bold cursor-pointer text-sm tracking-wider uppercase transition-all duration-300 mt-auto bg-white md:bg-[#eff5fc] text-[#023051] hover:bg-gray-100 md:hover:bg-[#E2E8F0] group-hover:bg-white group-hover:text-[#023051] group-hover:hover:bg-gray-100"
                                >
                                    {plan.buttonText}
                                </button>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            <StartApplicationDialog
                isOpen={isAppOpen}
                onClose={() => setIsAppOpen(false)}
                selectedProgram={selectedProgram}
                amount={selectedAmount}
                currency={selectedCurrency}
            />
        </section>
    );
}

