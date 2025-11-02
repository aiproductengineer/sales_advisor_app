# Quick Start Guide - Ethos Sales Advisor App

## 🚀 Get Running in 3 Minutes

### Step 1: Install Dependencies
```bash
cd sales-advisor-app
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Open in Browser
Navigate to `http://localhost:3000` and login with PIN: **123456**

---

## 📱 App Tour

### 1. Dashboard (Home)
**What you'll see:**
- Monthly target progress bar
- MTD sales: ₹32.5 Lakh / ₹50 Lakh
- 28 transactions with 32.5% conversion rate
- NPS score: 78, Mystery Audit: 87
- Estimated commission: ₹1.14 Lakh

**Try this:**
- Check your pending tasks alert
- View ECAL conversion rate

### 2. Customers Tab
**What you'll see:**
- 4 demo customers with different loyalty tiers
- Search bar for quick filtering

**Try this:**
1. Search for "Arjun" to find Arjun Mehta (Platinum customer)
2. Click to view his full profile
3. See his ₹28.5 Lakh LTV and purchase history
4. Check his communication preferences (all channels allowed)
5. Note his birthday (March 15) and anniversary

### 3. Products Tab
**What you'll see:**
- 6 luxury watches from brands like Rolex, Omega, TAG Heuer
- Stock levels and velocity indicators

**Try this:**
1. Search for "Omega" to find Omega Speedmaster
2. Click to view product details
3. See stock availability across 3 stores
4. Check specifications and price (₹4.85 Lakh)
5. Try the Reserve, Quote, and Share buttons

### 4. Tasks Tab
**What you'll see:**
- 4 pending tasks sorted by priority
- Birthday, follow-up, and reservation alerts

**Try this:**
1. View Priya Sharma's birthday reminder (high priority)
2. Check suggested action: "Send Birthday Wishes template"
3. Click the circle to mark a task complete
4. See task move to completed section

### 5. Communication Tab
**What you'll see:**
- 7 pre-approved message templates
- Categories: Occasion, Follow-up, Education

**Try this:**
1. Filter by "Occasion" category
2. Click "Birthday Wishes" template
3. Fill in variables: CustomerName, StoreName, AdvisorName
4. See live preview update
5. Review compliance notice
6. Click "Use Template" (demo mode)

---

## 💡 Key Features to Explore

### Customer 360
- **LTV tracking** - See customer lifetime value at a glance
- **Consent management** - Check which channels customer allows
- **Purchase history** - Review past transactions and preferences
- **Key dates** - Never miss a birthday or anniversary

### Stock Intelligence
- **Multi-store inventory** - Check stock across all locations
- **Velocity indicators** - See which products are fast/medium/slow moving
- **Distance info** - Know how far other stores are
- **Reserved stock** - Track what's already held

### Compliance First
- **Consent verification** - Only send where allowed
- **DND protection** - Automatic blocking of DND customers
- **Quiet hours** - No messages 9 PM - 9 AM
- **Audit trail** - All actions logged

### Performance Tracking
- **Real-time updates** - Dashboard refreshes hourly
- **Commission estimator** - See potential earnings
- **Conversion tracking** - Monitor your close rate
- **NPS feedback** - Customer satisfaction scores

---

## 🎨 Design Highlights

### Color Coding
- **Red border** = High priority task
- **Yellow border** = Medium priority task
- **Green badge** = In stock / Allowed / Fast moving
- **Orange badge** = Limited stock / Expiring soon
- **Purple badge** = Platinum tier customer
- **Gold badge** = Gold tier customer

### Icons Quick Reference
- 🏠 Home = Dashboard
- 👥 Users = Customers
- 📦 Package = Products
- ☑️ CheckSquare = Tasks
- 💬 MessageSquare = Communication

### Mobile-First
- Bottom navigation for easy thumb access
- Card-based scrolling
- Large touch targets
- Responsive on all screen sizes

---

## 🔐 Demo Data

### Customers
1. **Arjun Mehta** - Platinum, ₹28.5L LTV, Rolex buyer
2. **Priya Sharma** - Gold, ₹12.5L LTV, TAG Heuer fan
3. **Vikram Singh** - Platinum, ₹35L LTV, Patek Philippe collector
4. **Ananya Desai** - Silver, ₹8.5L LTV, Tissot buyer

### Products
- Rolex Day-Date 40 - ₹28.5L
- Omega Speedmaster - ₹4.85L
- TAG Heuer Carrera - ₹4.25L
- Cartier Santos - ₹6.85L
- Tissot PRX - ₹98K
- Patek Philippe Calatrava - ₹19.5L

---

## 🚧 What's Not Working (Demo Mode)

These features show placeholders:
- Reserve button (would create actual reservation)
- Quote button (would generate quote with payment link)
- Share button (would open share options)
- Template send (would select customer and send)
- Barcode scanning (requires camera access)
- Push notifications
- Backend API calls

---

## 🎯 Next Steps

### For Development Team
1. Integrate with actual backend APIs
2. Implement real authentication (HRMS SSO)
3. Add barcode scanning capability
4. Enable payment gateway integration
5. Set up WhatsApp Business API
6. Add offline mode with local storage

### For Product Team
1. Review UX flows with actual advisors
2. Validate metric calculations
3. Confirm compliance requirements
4. Test on actual devices in stores
5. Gather feedback on template wording

### For Business Team
1. Define production data sources
2. Set up access controls and permissions
3. Configure incentive calculation rules
4. Establish audit and reporting requirements
5. Plan rollout strategy (pilot → full)

---

## 📚 Learn More

- **README.md** - Full documentation
- **Sales_PRD_Enhanced.md** - Product requirements
- **src/types/index.ts** - Data model reference

---

## 🆘 Troubleshooting

**App won't start?**
- Make sure Node.js 18+ is installed
- Delete `node_modules` and run `npm install` again
- Check port 3000 is not already in use

**Images not loading?**
- Check internet connection (images from Unsplash CDN)
- Wait a few seconds for lazy loading

**Login not working?**
- Make sure you're entering **123456** (six digits)
- Try refreshing the page

---

**Happy Selling! 🎉**
