import Link from "next/link"
import Image from "next/image"
import { ExternalLink, Bookmark, Tag } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface DealCardProps {
  title: string
  description: string
  originalPrice: string
  salePrice: string
  discount: string
  image: string
  merchant: string
  category: string
  productLink?: string
  trending?: boolean
}

export function DealCard({
  title,
  description,
  originalPrice,
  salePrice,
  discount,
  image,
  merchant,
  category,
  productLink = "#",
  trending = false,
}: DealCardProps) {
  return (
    <Card className={cn("overflow-hidden transition-all hover:shadow-md", trending && "border-primary")}>
      <div className="relative">
        <div className="absolute right-2 top-2 z-10">
          <Badge variant="destructive" className="px-2 py-1">
            -{discount}
          </Badge>
        </div>
        {trending && (
          <div className="absolute left-2 top-2 z-10">
            <Badge variant="secondary" className="px-2 py-1">
              <Tag className="mr-1 h-3 w-3" />
              Trending
            </Badge>
          </div>
        )}
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
        </div>
      </div>
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <Badge variant="outline">{merchant}</Badge>
          <Badge variant="secondary">{category}</Badge>
        </div>
        <CardTitle className="line-clamp-1 text-lg">{title}</CardTitle>
        <CardDescription className="line-clamp-2 h-10">{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">{salePrice}</span>
            <span className="text-sm text-muted-foreground line-through">{originalPrice}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="flex w-full gap-2">
          <Button asChild className="w-full">
            <Link href={productLink} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Get Deal
            </Link>
          </Button>
          <Button variant="outline" size="icon">
            <Bookmark className="h-4 w-4" />
            <span className="sr-only">Save deal</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
