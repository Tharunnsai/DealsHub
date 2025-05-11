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

export default async function Home() {
  const products: Product[] = await fetchProductsFromSheet();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground text-sm font-bold">D</span>
              </div>
              <span className="inline-block font-bold">DealsHub</span>
            </Link>
            <nav className="hidden gap-6 md:flex">
              <Link
                href="#"
                className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Amazon
              </Link>
              <Link
                href="#"
                className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Flipkart
              </Link>
              <Link
                href="#"
                className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Best Offers
              </Link>
              <Link
                href="#"
                className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Trending
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search deals..."
                  className="w-full rounded-lg bg-background pl-8 md:w-[300px] lg:w-[400px]"
                />
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-16 bg-gradient-to-r from-rose-50 to-teal-50 dark:from-rose-950/20 dark:to-teal-950/20">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Discover Amazing Deals & Save Big
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Find the best offers from Amazon, Flipkart, and other top retailers all in one place.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg">Today&apos;s Top Deals</Button>
                  <Button size="lg" variant="outline">
                    Browse Categories
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[300px] w-full overflow-hidden rounded-xl md:h-[400px]">
                  <Image
                    src="/banner.png?height=400&width=800"
                    alt="Featured deals"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="container px-4 py-8 md:px-6 md:py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Today&apos;s Hottest Deals</h2>
              <p className="text-muted-foreground">Handpicked offers that you don&apos;t want to miss</p>
            </div>
            <CategoryFilter />
          </div>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Deals</TabsTrigger>
              <TabsTrigger value="amazon">Amazon</TabsTrigger>
              <TabsTrigger value="flipkart">Flipkart</TabsTrigger>
              <TabsTrigger value="electronics">Electronics</TabsTrigger>
              <TabsTrigger value="fashion">Fashion</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4">
              {products.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {products.map((product) => (
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
                <p className="text-center text-muted-foreground">No deals found. Check back later!</p>
              )}
              {products.length > 0 && (
              <div className="flex justify-center mt-8">
                <Button variant="outline" size="lg">
                  Load More Deals
                </Button>
              </div>
              )}
            </TabsContent>
            <TabsContent value="amazon" className="space-y-4">
              {products.filter(p => p.merchant.toLowerCase() === 'amazon').length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                 {products.filter(p => p.merchant.toLowerCase() === 'amazon').map((product) => (
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
                <p className="text-center text-muted-foreground">No Amazon deals found. Check back later!</p>
              )}
            </TabsContent>
            <TabsContent value="flipkart" className="space-y-4">
              {products.filter(p => p.merchant.toLowerCase() === 'flipkart').length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {products.filter(p => p.merchant.toLowerCase() === 'flipkart').map((product) => (
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
                <p className="text-center text-muted-foreground">No Flipkart deals found. Check back later!</p>
              )}
            </TabsContent>
            <TabsContent value="electronics" className="space-y-4">
              {products.filter(p => p.category.toLowerCase() === 'electronics').length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {products.filter(p => p.category.toLowerCase() === 'electronics').map((product) => (
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
                <p className="text-center text-muted-foreground">No electronics deals found. Check back later!</p>
              )}
            </TabsContent>
            <TabsContent value="fashion" className="space-y-4">
              {products.filter(p => p.category.toLowerCase() === 'fashion').length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {products.filter(p => p.category.toLowerCase() === 'fashion').map((product) => (
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
                <p className="text-center text-muted-foreground">No fashion deals found. Check back later!</p>
              )}
            </TabsContent>
          </Tabs>
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
