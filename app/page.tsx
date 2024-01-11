/* Components */
"use client";
import { Counter } from "./components/Counter/Counter";
import { useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import Image from "next/image";
import { Accordion, AccordionItem, Button } from "@nextui-org/react";
const product = {
  name: "Basic Tee 6-Pack",
  price: "$192",
  href: "#",
  breadcrumbs: [
    { id: 1, name: "Men", href: "#" },
    { id: 2, name: "Clothing", href: "#" },
  ],
  images: [
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
      alt: "Two each of gray, white, and black shirts laying flat.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
      alt: "Model wearing plain black basic tee.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
      alt: "Model wearing plain gray basic tee.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
      alt: "Model wearing plain white basic tee.",
    },
  ],
  colors: [
    { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
    { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
    { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
  ],
  sizes: [
    { name: "XXS", inStock: false },
    { name: "XS", inStock: true },
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: true },
    { name: "2XL", inStock: true },
    { name: "3XL", inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    "Hand cut and sewn locally",
    "Dyed with our proprietary colors",
    "Pre-washed & pre-shrunk",
    "Ultra-soft 100% cotton",
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',

  care: ["Machine wash cold", "Tumble dry low"],
  materials: ["100% cotton"],
  shipping: ["Arrives in 5 to 7 days"],
  };
const reviews = { href: "#", average: 4, totalCount: 117 };

export default function IndexPage() {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[2]);

  return (
    <div className="flex flex-col">
      {/* Image gallery */}
      <section className="p-8">
        <div>
          <img
            src={product.images[0].src}
            alt={product.images[0].alt}
            width={500}
            height={500}
          />
        </div>

        <div>
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">{product.name}</h3>
            <p className="font-medium"> {product.price}</p>
          </div>

          <p>{product.description}</p>

          <Button color="success" radius="sm" size="lg" className="text-white w-full">Pay with credit card</Button>
        </div>

        <Accordion selectionMode="multiple">
          <AccordionItem title="Features">
            <ItemList items={product.highlights} />
          </AccordionItem>

          <AccordionItem title="Care">
            <ItemList items={product.care} />
          </AccordionItem>

          <AccordionItem title="Materials">
            <ItemList items={product.materials} />
          </AccordionItem>

          <AccordionItem title="Shipping">
            <ItemList items={product.shipping} />
          </AccordionItem>
        </Accordion>
      </section>
    </div>
  );

  function ItemList(props: {items: String[]}) {
    return (
      <ul className="list-disc px-4">
        {
          props.items.map((item,index) => (
            <li key={`item-${index}-${Math.random()}`}>{item}</li>
          ))
        }
      </ul>
    );
  }
}
