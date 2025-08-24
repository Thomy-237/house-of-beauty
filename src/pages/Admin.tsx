
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Package, 
  Tags, 
  MessageSquare, 
  Settings, 
  BarChart3, 
  Users 
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductsTab from '@/components/admin/ProductsTab';
import CategoriesTab from '@/components/admin/CategoriesTab';
import TestimonialsManagement from '@/components/admin/TestimonialsManagement';
import SiteSettingsTab from '@/components/admin/SiteSettingsTab';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('products');

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container-custom section-padding">
        <div className="mb-8">
          <h1 className="text-luxury-heading text-3xl md:text-4xl mb-2">
            Administration
          </h1>
          <p className="text-muted-foreground">
            Gérez votre site e-commerce House of Beauty
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Produits
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center gap-2">
              <Tags className="h-4 w-4" />
              Catégories
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Témoignages
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Paramètres
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Gestion des Produits
                </CardTitle>
                <CardDescription>
                  Ajoutez, modifiez ou supprimez vos produits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProductsTab />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tags className="h-5 w-5" />
                  Gestion des Catégories
                </CardTitle>
                <CardDescription>
                  Organisez vos produits par catégories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CategoriesTab />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="testimonials" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Gestion des Témoignages
                </CardTitle>
                <CardDescription>
                  Gérez les avis clients avec photos et vidéos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TestimonialsManagement />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Paramètres du Site
                </CardTitle>
                <CardDescription>
                  Configurez les informations générales de votre site
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SiteSettingsTab />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default Admin;
