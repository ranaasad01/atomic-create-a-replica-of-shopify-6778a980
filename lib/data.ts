export const APP_NAME = "Shopify";
export const APP_TAGLINE = "Commerce Platform for Every Business";
export const APP_ACCENT = "#96BF48";
export const APP_ACCENT_DARK = "#5E8E3E";

export type NavLink = {
  label: string;
  href: string;
  type: "route" | "anchor";
  children?: NavLink[];
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "/", type: "route" },
  { label: "Products", href: "/products", type: "route" },
  { label: "Cart", href: "/cart", type: "route" },
  { label: "Dashboard", href: "/dashboard", type: "route" },
];

export const footerLinks = {
  store: [
    { label: "All Products", href: "/products" },
    { label: "Cart", href: "/cart" },
    { label: "Checkout", href: "/checkout" },
  ],
  merchant: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Orders", href: "/dashboard/orders" },
    { label: "Products", href: "/dashboard/products" },
    { label: "Customers", href: "/dashboard/customers" },
    { label: "Analytics", href: "/dashboard/analytics" },
    { label: "Discounts", href: "/dashboard/discounts" },
  ],
  company: [
    { label: "About", href: "#about" },
    { label: "Blog", href: "#blog" },
    { label: "Careers", href: "#careers" },
    { label: "Press", href: "#press" },
  ],
  support: [
    { label: "Help Center", href: "#help" },
    { label: "Community", href: "#community" },
    { label: "Status", href: "#status" },
    { label: "Contact", href: "#contact" },
  ],
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  description: string;
  category: string;
  tags: string[];
  image: string;
  images: string[];
  variants: {
    color?: string[];
    size?: string[];
  };
  stock: number;
  rating: number;
  reviewCount: number;
  featured: boolean;
};

export type CartItem = {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  variant?: string;
};

export type Order = {
  id: string;
  customer: string;
  email: string;
  date: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  items: number;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  orders: number;
  spent: number;
  joined: string;
  location: string;
};