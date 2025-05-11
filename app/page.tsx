import Link from "next/link"
import Image from "next/image"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DealCard } from "@/components/deal-card"
import { CategoryFilter } from "@/components/category-filter"
import { Newsletter } from "@/components/newsletter"
import { fetchProductsFromSheet } from "@/lib/google-sheet-parser"
import { Product } from "@/types/product"
import WelcomeModal from "@/components/WelcomeModal"
import { CategoryNavigation } from "@/components/category-navigation"
import { SearchBox } from "@/components/search-box"

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const products: Product[] = await fetchProductsFromSheet();
  const currentTab = searchParams.tab as string || 'all';
  const searchQuery = searchParams.q as string || '';
  
  // Filter products based on the tab and search query
  const filteredProducts = (() => {
    // First filter by category/merchant
    let filtered = products;
    
    switch (currentTab) {
      case 'amazon':
        filtered = products.filter(p => p.merchant.toLowerCase() === 'amazon');
        break;
      case 'flipkart':
        filtered = products.filter(p => p.merchant.toLowerCase() === 'flipkart');
        break;
      case 'electronics':
        filtered = products.filter(p => p.category.toLowerCase() === 'electronics');
        break;
      case 'fashion':
        filtered = products.filter(p => p.category.toLowerCase() === 'fashion');
        break;
    }
    
    // Then apply search filter if there's a query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query) ||
        product.merchant.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  })();

  // Get the headline based on current filters
  const getHeadline = () => {
    if (searchQuery) {
      return `Search Results: "${searchQuery}"`;
    }
    
    switch (currentTab) {
      case 'all': return 'Trending Deals';
      case 'amazon': return 'Amazon Deals';
      case 'flipkart': return 'Flipkart Deals';
      case 'electronics': return 'Electronics Deals';
      case 'fashion': return 'Fashion Deals';
      default: return 'Featured Deals';
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <WelcomeModal />
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground text-sm font-bold">D</span>
              </div>
              <span className="inline-block font-bold">DealsHub</span>
            </Link>
            <CategoryNavigation />
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <SearchBox defaultValue={searchQuery} />
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="container px-4 py-8 md:px-6 md:py-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              {getHeadline()}
            </h2>
            <CategoryFilter />
          </div>
          <div className="w-full">
            <div className="space-y-4">
              {filteredProducts.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {filteredProducts.map((product) => (
                <DealCard
                      key={product.id}
                      title={product.title}
                      description={product.description}
                      originalPrice={product.originalPrice}
                      salePrice={product.salePrice}
                      discount={product.discount || ""}
                      image={product.imageUrl || "/logo.png?height=300&width=300"}
                      merchant={product.merchant}
                      category={product.category}
                      productLink={product.productLink}
                    />
                  ))}
              </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-2">No deals found</h3>
                  <p className="text-muted-foreground">
                    {searchQuery 
                      ? `We couldn't find any deals matching "${searchQuery}".` 
                      : "No deals found for this category."
                    }
                  </p>
                  {searchQuery && (
                    <Button variant="link" asChild className="mt-4">
                      <Link href={currentTab === 'all' ? '/' : `/?tab=${currentTab}`}>
                        Clear search
                      </Link>
                    </Button>
                  )}
                </div>
              )}
              {filteredProducts.length > 0 && (
              <div className="flex justify-center mt-8">
                <Button variant="outline" size="lg">
                  Load More Deals
                </Button>
              </div>
              )}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-16 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Trending Deals</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  The most popular deals our users are loving right now
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {/* Filter to get trending deals - either high rated products or from popular categories */}
              {products
                .filter(product => {
                  // Consider a product trending if rating is at least 4.5
                  const rating = parseFloat(product.rating || '0');
                  return rating >= 4.5;
                })
                .slice(0, 3) // Just show the top 3
                .map(product => (
              <DealCard
                    key={product.id}
                    title={product.title}
                    description={product.description}
                    originalPrice={product.originalPrice}
                    salePrice={product.salePrice}
                    discount={product.discount || ""}
                    image={product.imageUrl || "/logo.png?height=300&width=300"}
                    merchant={product.merchant}
                    category={product.category}
                    productLink={product.productLink}
                trending={true}
              />
                ))}
                
              {/* If we don't have 3 trending products based on rating, fill with some from the general list */}
              {products.filter(product => parseFloat(product.rating || '0') >= 4.5).length < 3 && 
                products
                  .filter(product => parseFloat(product.rating || '0') < 4.5) // Get non-trending products
                  .slice(0, 3 - products.filter(product => parseFloat(product.rating || '0') >= 4.5).length) // Fill up to 3
                  .map(product => (
              <DealCard
                      key={product.id}
                      title={product.title}
                      description={product.description}
                      originalPrice={product.originalPrice}
                      salePrice={product.salePrice}
                      discount={product.discount || ""}
                      image={product.imageUrl || "/logo.png?height=300&width=300"}
                      merchant={product.merchant}
                      category={product.category}
                      productLink={product.productLink}
                trending={true}
              />
                  ))
              }
            </div>
          </div>
        </section>
        <Newsletter />
      </main>
      <footer className="w-full border-t bg-background py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2023 DealsHub. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm font-medium hover:underline">
              Terms
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline">
              Privacy
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
