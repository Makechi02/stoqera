<div align="center" style="margin-top: 20px">
  <img src="./public/assets/images/stoqera-logo-mark.svg" alt="Stoqera Logo" width="150"/>

# Stoqera

A modern Inventory Management System SaaS built for businesses to efficiently track and manage their stock.
</div>

## Tech Stack

- **Framework:** Next.js
- **Database:** Supabase
- **Styling:** Tailwind CSS
- **Icons:** Heroicons

## Features

- **Location Management** - Organize inventory across multiple locations
- **Product Management** - Add, edit, and track product details
- **Categories** - Organize products with custom categories
- **Customer Management** - Maintain customer records and history
- **Sales Tracking** - Record and monitor sales transactions
- **Purchase Orders** - Manage supplier purchases and incoming stock
- **Supplier Management** - Track supplier information and relationships
- **Reports & Analytics** - Generate insights from inventory and sales data
- Real-time inventory updates
- User authentication and authorization
- Responsive design

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Supabase account and project

### Installation

1. Clone the repository
```bash
git clone https://github.com/Makechi02/stoqera.git
cd stoqera
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

Add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
stoqera/
├── app/           # Next.js app directory
├── components/    # React components
├── lib/           # Utility functions and Supabase client
├── public/        # Static assets
```

## License

MIT License - see [LICENSE](LICENSE) file for details

## Support

For issues and questions, please open an issue in the repository.