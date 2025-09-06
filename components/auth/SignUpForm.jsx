'use client'

import {motion} from 'framer-motion';
import {Logo} from "@/components";
import Link from "next/link";
import {
    ArrowLeftIcon,
    BuildingOfficeIcon,
    CheckIcon,
    EnvelopeIcon,
    GlobeAltIcon,
    LockClosedIcon,
    MapPinIcon,
    PhoneIcon,
    UserIcon
} from '@heroicons/react/24/outline';
import {TogglePasswordBtn} from "@/components/ui/buttons";
import {useState} from "react";
import {fadeInUp} from "@/data/constants/animations";
import {createClient} from "@/lib/supabase/client";
import {useRouter} from "next/navigation";

export default function SignUpForm() {
    const supabase = createClient();
    const router = useRouter();

    const companySizes = [
        '1-10 employees',
        '11-50 employees',
        '51-200 employees',
        '201-500 employees',
        '500+ employees'
    ];

    const industries = [
        'Manufacturing',
        'Retail & E-commerce',
        'Healthcare',
        'Food & Beverage',
        'Technology',
        'Construction',
        'Automotive',
        'Wholesale Distribution',
        'Fashion & Apparel',
        'Electronics',
        'Other'
    ];

    const [formData, setFormData] = useState({
        // User fields
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',

        // Organization fields
        organizationName: '',
        organizationSlug: '',
        organizationEmail: '',
        phone: '',
        address: '',

        // Optional analytics fields
        companySize: '',
        industry: '',

        // Agreements
        agreeToTerms: false
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [slugAvailable, setSlugAvailable] = useState(null);

    // Auto-generate slug from organization name
    const generateSlug = (name) => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({...prev, [field]: value}));

        // Auto-generate slug when organization name changes
        if (field === 'organizationName') {
            const slug = generateSlug(value);
            setFormData(prev => ({...prev, organizationSlug: slug}));
            setSlugAvailable(null); // Reset availability check
        }

        // Clear specific error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({...prev, [field]: ''}));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // User validation
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Organization validation
        if (!formData.organizationName.trim()) {
            newErrors.organizationName = 'Organization name is required';
        }
        if (!formData.organizationSlug.trim()) {
            newErrors.organizationSlug = 'Organization URL is required';
        } else if (!/^[a-z0-9-]+$/.test(formData.organizationSlug)) {
            newErrors.organizationSlug = 'URL can only contain lowercase letters, numbers, and hyphens';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters long';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
            newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = 'You must agree to the Terms of Service';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const checkSlugAvailability = async () => {
        if (!formData.organizationSlug) return;

        // Simulate API call to check slug availability
        setTimeout(() => {
            // Mock check - in real implementation, call your API
            const unavailableSlug = ['admin', 'api', 'www', 'test', 'demo'];
            setSlugAvailable(!unavailableSlug.includes(formData.organizationSlug));
        }, 500);
    };

    const createOrganization = async (formData) => {
        const {data, error} = await supabase
            .from('organizations')
            .insert([{
                name: formData.organizationName,
                slug: formData.organizationSlug,
                email: formData.organizationEmail,
                phone: formData.phone,
                address: formData.address,
                is_active: false,
                subscription_status: 'trial',
                subscription_plan: 'basic',
                settings: {
                    company_size: formData.companySize,
                    industry: formData.industry
                }
            }])
            .select();

        if (error) {
            console.error('Error creating organization:', error);
            return;
        }

        return data[0];
    }

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setIsLoading(true);

        const {data: result, error} = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password
        });

        const organization = await createOrganization(formData);

        if (!organization) {
            console.error('Organization creation failed');
            setIsLoading(false);
            return;
        }

        if (result?.user) {
            await supabase.from('profiles').insert([{
                id: result.user.id,
                organization_id: organization.id,
                full_name: formData.fullName,
                email: formData.email,
            }]).eq('id', result.user.id);
        }

        setIsLoading(false);

        if(error) {
            console.error('Error signing up:', error);
        }

        router.push('/login');
    };

    return (
        <div className={`lg:absolute lg:left-1/2 right-0  bg-gradient-to-br from-teal-50 to-cyan-50 min-h-svh`}>
            <Header/>
            <div className={`flex items-center justify-center p-4 md:p-8`}>
                <motion.div
                    className={`w-full max-w-2xl`}
                    initial={`initial`}
                    animate={`animate`}
                    variants={fadeInUp}
                >
                    <div className={`bg-white rounded-2xl shadow-xl p-4 md:p-8`}>
                        <div className={`text-center mb-8`}>
                            <h1 className={`text-3xl font-bold text-gray-900 mb-2 font-heading`}>
                                Create Your Inventory Account
                            </h1>
                            <p className={`text-gray-600`}>
                                Start managing your inventory in under 5 minutes • No credit card required
                            </p>
                        </div>

                        <div className={`space-y-6`}>
                            {/* Personal Information Section */}
                            <div className={`bg-gray-50 rounded-lg p-6`}>
                                <h3 className={`text-lg font-semibold text-gray-900 mb-4 flex items-center`}>
                                    <UserIcon className={`size-5 mr-2 text-teal-600`}/>
                                    Personal Information
                                </h3>

                                <div className={`space-y-4`}>
                                    {/* Full Name */}
                                    <div>
                                        <label className={`auth-form-label mb-2`}>Full Name *</label>
                                        <div className={`relative`}>
                                            <UserIcon
                                                className={`absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-gray-400`}
                                            />
                                            <input
                                                type={`text`}
                                                value={formData.fullName}
                                                placeholder={`John Doe`}
                                                onChange={(e) => handleInputChange('fullName', e.target.value)}
                                                className={`auth-form-input-icon ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                                            />
                                        </div>
                                        {errors.fullName && (
                                            <p className={`mt-1 text-sm text-red-600`}>{errors.fullName}</p>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className={`auth-form-label mb-2`}>Email Address *</label>
                                        <div className={`relative`}>
                                            <EnvelopeIcon
                                                className={`absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-gray-400`}
                                            />
                                            <input
                                                type={`email`}
                                                value={formData.email}
                                                placeholder={`john@company.com`}
                                                onChange={(e) => handleInputChange('email', e.target.value)}
                                                className={`auth-form-input-icon ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                            />
                                        </div>
                                        {errors.email && (
                                            <p className={`mt-1 text-sm text-red-600`}>{errors.email}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Organization Information Section */}
                            <div className={`bg-gray-50 rounded-lg p-6`}>
                                <h3 className={`text-lg font-semibold text-gray-900 mb-4 flex items-center`}>
                                    <BuildingOfficeIcon className={`size-5 mr-2 text-teal-600`}/>
                                    Organization Details
                                </h3>

                                <div className={`space-y-4`}>
                                    {/* Organization Name */}
                                    <div>
                                        <label className={`auth-form-label mb-2`}>Organization Name *</label>
                                        <div className={`relative`}>
                                            <BuildingOfficeIcon
                                                className={`absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-gray-400`}
                                            />
                                            <input
                                                type={`text`}
                                                value={formData.organizationName}
                                                placeholder={`Acme Corporation`}
                                                onChange={(e) => handleInputChange('organizationName', e.target.value)}
                                                className={`auth-form-input-icon ${errors.organizationName ? 'border-red-500' : 'border-gray-300'}`}
                                            />
                                        </div>
                                        {errors.organizationName && (
                                            <p className={`mt-1 text-sm text-red-600`}>{errors.organizationName}</p>
                                        )}
                                    </div>

                                    {/* Organization URL/Slug */}
                                    <div>
                                        <label className={`auth-form-label mb-2`}>Organization URL *</label>
                                        <div className={`relative`}>
                                            <GlobeAltIcon
                                                className={`absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-gray-400`}
                                            />
                                            <div className={`flex`}>
                                                {/*<span*/}
                                                {/*    className={`inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm`}*/}
                                                {/*>*/}
                                                {/*    stoqera.co.ke*/}
                                                {/*</span>*/}
                                                <input
                                                    type={`text`}
                                                    value={formData.organizationSlug}
                                                    onChange={(e) => handleInputChange('organizationSlug', e.target.value)}
                                                    onBlur={checkSlugAvailability}
                                                    className={`auth-form-input-icon ${errors.organizationSlug ? 'border-red-500' : 'border-gray-300'}`}
                                                    placeholder={`acme-corp`}
                                                />
                                            </div>
                                        </div>
                                        {slugAvailable === true && (
                                            <p className={`mt-1 text-sm text-green-600 flex items-center`}>
                                                <CheckIcon className={`size-4 mr-1`}/>
                                                URL is available
                                            </p>
                                        )}
                                        {slugAvailable === false && (
                                            <p className={`mt-1 text-sm text-red-600`}>URL is not available</p>
                                        )}
                                        {errors.organizationSlug && (
                                            <p className={`mt-1 text-sm text-red-600`}>{errors.organizationSlug}</p>
                                        )}
                                    </div>

                                    {/* Organization Contact Info */}
                                    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4`}>
                                        <div>
                                            <label className={`auth-form-label mb-2`}>Organization Email</label>
                                            <div className={`relative`}>
                                                <EnvelopeIcon
                                                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-gray-400`}
                                                />
                                                <input
                                                    type={`email`}
                                                    value={formData.organizationEmail}
                                                    placeholder={`contact@acme.com`}
                                                    onChange={(e) => handleInputChange('organizationEmail', e.target.value)}
                                                    className={`auth-form-input-icon border-gray-300`}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className={`auth-form-label mb-2`}>Phone Number</label>
                                            <div className={`relative`}>
                                                <PhoneIcon
                                                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-gray-400`}
                                                />
                                                <input
                                                    type={`tel`}
                                                    value={formData.phone}
                                                    placeholder={`+254712345678`}
                                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                                    className={`auth-form-input-icon border-gray-300`}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Address */}
                                    <div>
                                        <label className={`auth-form-label mb-2`}>Business Address</label>
                                        <div className={`relative`}>
                                            <MapPinIcon className={`absolute left-3 top-3 size-5 text-gray-400`}/>
                                            <textarea
                                                value={formData.address}
                                                rows={3}
                                                onChange={(e) => handleInputChange('address', e.target.value)}
                                                placeholder={`123 Business St, City, State, ZIP`}
                                                className={`auth-form-input-icon border-gray-300 resize-none`}
                                            />
                                        </div>
                                    </div>

                                    {/* Company Size & Industry */}
                                    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4`}>
                                        <div>
                                            <label className={`auth-form-label mb-2`}>Company Size</label>
                                            <select
                                                value={formData.companySize}
                                                onChange={(e) => handleInputChange('companySize', e.target.value)}
                                                className={`auth-form-input border-gray-300`}
                                            >
                                                <option value={``}>Select size</option>
                                                {companySizes.map((size) => (
                                                    <option key={size} value={size}>{size}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className={`auth-form-label mb-2`}>Industry</label>
                                            <select
                                                value={formData.industry}
                                                onChange={(e) => handleInputChange('industry', e.target.value)}
                                                className={`auth-form-input border-gray-300`}
                                            >
                                                <option value={``}>Select industry</option>
                                                {industries.map((industry) => (
                                                    <option key={industry} value={industry}>{industry}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Password Section */}
                            <div className={`bg-gray-50 rounded-lg p-6`}>
                                <h3 className={`text-lg font-semibold text-gray-900 mb-4 flex items-center`}>
                                    <LockClosedIcon className={`size-5 mr-2 text-teal-600`}/>
                                    Security
                                </h3>

                                <div className={`grid grid-cols-1 md:grid-cols-2 gap-4`}>
                                    {/* Password */}
                                    <div>
                                        <label className={`auth-form-label mb-2`}>Password *</label>
                                        <div className={`relative`}>
                                            <LockClosedIcon
                                                className={`absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-gray-400`}/>
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                value={formData.password}
                                                placeholder={`Strong password`}
                                                onChange={(e) => handleInputChange('password', e.target.value)}
                                                className={`auth-form-input-icon ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                                            />
                                            <TogglePasswordBtn
                                                showPassword={showPassword}
                                                toggleShowPassword={() => setShowPassword(prevState => !prevState)}
                                            />
                                        </div>
                                        {errors.password && (
                                            <p className={`mt-1 text-sm text-red-600`}>{errors.password}</p>
                                        )}
                                    </div>

                                    {/* Confirm Password */}
                                    <div>
                                        <label className={`auth-form-label mb-2`}>Confirm Password *</label>
                                        <div className={`relative`}>
                                            <LockClosedIcon
                                                className={`absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-gray-400`}
                                            />
                                            <input
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                value={formData.confirmPassword}
                                                placeholder={`Confirm password`}
                                                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                                className={`auth-form-input-icon ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                                            />

                                            <TogglePasswordBtn
                                                showPassword={showConfirmPassword}
                                                toggleShowPassword={() => setShowConfirmPassword(prevState => !prevState)}
                                            />
                                        </div>
                                        {errors.confirmPassword && (
                                            <p className={`mt-1 text-sm text-red-600`}>{errors.confirmPassword}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Terms Agreement */}
                            <div className={`flex items-start`}>
                                <input
                                    type={`checkbox`}
                                    id={`terms`}
                                    checked={formData.agreeToTerms}
                                    onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                                    className={`mt-1 size-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded`}
                                />
                                <label htmlFor={`terms`} className={`ml-3 text-sm text-gray-600`}>
                                    I agree to the{' '}
                                    <Link
                                        href={`#`}
                                        className={`text-teal-600 hover:text-teal-700 underline`}
                                    >
                                        Terms of Service
                                    </Link>{' '}
                                    and{' '}
                                    <Link
                                        href={`#`}
                                        className={`text-teal-600 hover:text-teal-700 underline`}
                                    >
                                        Privacy Policy
                                    </Link>
                                </label>
                            </div>
                            {errors.agreeToTerms && (
                                <p className={`mt-1 text-sm text-red-600`}>{errors.agreeToTerms}</p>
                            )}

                            {/* Submit Button */}
                            <button
                                onClick={handleSubmit}
                                disabled={isLoading}
                                className={`w-full bg-teal-600 text-white py-4 rounded-lg font-semibold hover:bg-teal-700 focus:ring-4 focus:ring-teal-200 transition-all disabled:opacity-70 disabled:cursor-not-allowed`}
                            >
                                {isLoading ? (
                                    <div className={`flex items-center justify-center`}>
                                        <div
                                            className={`animate-spin rounded-full size-5 border-b-2 border-white mr-2`}/>
                                        Creating Your Account...
                                    </div>
                                ) : (
                                    'Create My Inventory Account'
                                )}
                            </button>

                            {/* TODO: Add Social Sign Up */}
                        </div>
                    </div>

                    {/* Security Note */}
                    <div className={`mt-6 text-center text-sm text-gray-500`}>
                        <p>🔒 Your data is encrypted and secure. We never share your information.</p>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

function SocialSignUp() {
    return (
        <div className="mt-6">
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"/>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or sign up with</span>
                </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                    type="button"
                    className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                        <path fill="#4285F4"
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853"
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05"
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335"
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span className="ml-2">Google</span>
                </button>

                <button
                    type="button"
                    className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                    <svg className="h-5 w-5" fill="#00A4EF" viewBox="0 0 24 24">
                        <path
                            d="M23.5 12c0-6.351-5.149-11.5-11.5-11.5S.5 5.649.5 12s5.149 11.5 11.5 11.5S23.5 18.351 23.5 12z"/>
                        <path fill="#FFF"
                              d="M12.5 6.5h4v3h-4v-3zm0 4h4v3h-4v-3zm0 4h4v3h-4v-3zm-5-8h4v3h-4v-3zm0 4h4v3h-4v-3zm0 4h4v3h-4v-3z"/>
                    </svg>
                    <span className="ml-2">Microsoft</span>
                </button>
            </div>
        </div>
    )
}

function Header() {
    return (
        <header className={`sticky top-0 z-10 bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8`}>
            <div className={`flex flex-wrap justify-between items-center py-4 gap-4`}>
                <div className={`flex items-center`}>
                    <div className={`bg-background rounded-full size-10`}>
                        <Logo/>
                    </div>
                    <span className={`ml-2 text-2xl font-bold text-gray-900 font-heading`}>Stoqera</span>
                </div>
                <div className={`w-full flex items-center justify-between gap-4`}>
                    <Link
                        href={`/`}
                        className={`flex items-center text-gray-600 hover:text-teal-600 transition-colors`}
                    >
                        <ArrowLeftIcon className={`size-4 mr-2`}/>
                        Back to Home
                    </Link>
                    <div className={`text-sm text-gray-600`}>
                        Already have an account?{' '}
                        <Link href={`/login`} className={`text-teal-600 hover:text-teal-700 font-medium`}>
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}