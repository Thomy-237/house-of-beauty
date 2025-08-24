
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { siteConfig } from '@/config/site.config';

interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  whatsapp: string;
}

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
}

interface PaymentMethod {
  id: string;
  name: string;
  description?: string;
}

interface SiteSettings {
  contactInfo: ContactInfo;
  socialLinks: SocialLink[];
  paymentMethods: PaymentMethod[];
  
  // Actions
  updateContactInfo: (info: Partial<ContactInfo>) => void;
  updateSocialLinks: (links: SocialLink[]) => void;
  updatePaymentMethods: (methods: PaymentMethod[]) => void;
  addSocialLink: (link: Omit<SocialLink, 'id'>) => void;
  removeSocialLink: (id: string) => void;
  addPaymentMethod: (method: Omit<PaymentMethod, 'id'>) => void;
  removePaymentMethod: (id: string) => void;
}

export const useSiteSettings = create<SiteSettings>()(
  persist(
    (set, get) => ({
      contactInfo: siteConfig.contact,
      socialLinks: siteConfig.socialLinks.map((link, index) => ({
        ...link,
        id: index.toString()
      })),
      paymentMethods: siteConfig.paymentMethods.map((method, index) => ({
        ...method,
        id: index.toString()
      })),

      updateContactInfo: (info) => {
        set(state => ({
          contactInfo: { ...state.contactInfo, ...info }
        }));
      },

      updateSocialLinks: (links) => {
        set({ socialLinks: links });
      },

      updatePaymentMethods: (methods) => {
        set({ paymentMethods: methods });
      },

      addSocialLink: (link) => {
        const newLink = { ...link, id: Date.now().toString() };
        set(state => ({
          socialLinks: [...state.socialLinks, newLink]
        }));
      },

      removeSocialLink: (id) => {
        set(state => ({
          socialLinks: state.socialLinks.filter(link => link.id !== id)
        }));
      },

      addPaymentMethod: (method) => {
        const newMethod = { ...method, id: Date.now().toString() };
        set(state => ({
          paymentMethods: [...state.paymentMethods, newMethod]
        }));
      },

      removePaymentMethod: (id) => {
        set(state => ({
          paymentMethods: state.paymentMethods.filter(method => method.id !== id)
        }));
      }
    }),
    {
      name: 'site-settings-storage',
    }
  )
);
