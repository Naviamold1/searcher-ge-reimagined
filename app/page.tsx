"use client"

import { FormEvent, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface Product {
  title: string
  price: number
  link: string
  thumbnail: string
  images?: string[]
}

export default function IndexPage() {
  const [data, setData] = useState<Product[]>()

  async function newSearch(data: FormData) {
    const keyword = data.get("search")?.valueOf()
    if (typeof keyword !== "string") {
      throw new Error("Invalid Keyword")
    }
    // const res = await fetch(
    //   `https://searcher-api.onrender.com/crawl.json?start_requests=true&spider_name=ee&crawl_args={"search_term":"${keyword}"}`
    // )
    const ada = await fetch(
      `http://localhost:9080/crawl.json?start_requests=true&spider_name=ada&crawl_args={"search_term":"${keyword}"}`
    )
    const ee = await fetch(
      `http://localhost:9080/crawl.json?start_requests=true&spider_name=ee&crawl_args={"search_term":"${keyword}"}`
    )
    const zoommer = await fetch(
      `http://localhost:9080/crawl.json?start_requests=true&spider_name=zoommer&crawl_args={"search_term":"${keyword}"}`
    )
    const res1 = await ada.json()
    const res2 = await ee.json()
    const res3 = await zoommer.json()
    const json = [...res1.items, ...res2.items, ...res3.items]
    setData(json)
    console.log(json)
  }

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Searcher
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Scrape products from online Georgian shops built with Next.js using
          Shadncn UI components
        </p>
      </div>
      <div className="flex gap-4">
        <form action={newSearch}>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="text" placeholder="Search..." name="search" />
            <Button type="submit">Search</Button>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-3 gap-4 md:grid-cols-3">
        {data?.map((item) => (
          <Link href={item.link} target="_blank" rel="noreferrer">
            <Card>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.price} ₾</CardDescription>
              </CardHeader>
              <CardContent>
                <Image
                  src={item.thumbnail}
                  width={500}
                  height={500}
                  alt={item.title}
                  loading="lazy"
                  className="object-cover"
                />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
