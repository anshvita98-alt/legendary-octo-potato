import type { Heirloom } from "@/types";
import { PlaceHolderImages } from "./placeholder-images";

const getImageUrl = (id: string) => PlaceHolderImages.find(p => p.id === id)?.imageUrl || '';
const getImageHint = (id: string) => PlaceHolderImages.find(p => p.id === id)?.imageHint || '';


export const MOCK_HEIRLOOMS: Heirloom[] = [
  {
    id: "1",
    name: "Grandfather's Pocket Watch",
    description: "A silver pocket watch from the 1920s, passed down through three generations.",
    story: "This watch was a gift to my great-grandfather upon his graduation. It has ticked through wars, weddings, and births, a constant reminder of our family's resilience and the passage of time. He carried it every day of his life.",
    imageUrl: getImageUrl('heirloom-watch'),
    imageHint: getImageHint('heirloom-watch'),
  },
  {
    id: "2",
    name: "WWII Love Letters",
    description: "A collection of letters written between my grandparents during World War II.",
    story: "Separated by an ocean and a war, my grandparents' love story unfolded on these fragile pages. Their words of longing, hope, and devotion are a testament to their unbreakable bond. They are the foundation of our family.",
    imageUrl: getImageUrl('heirloom-letter'),
    imageHint: getImageHint('heirloom-letter'),
  },
  {
    id: "3",
    name: "Grandma's Pasta Recipe",
    description: "The secret family recipe for Sunday pasta sauce, handwritten on a worn index card.",
    story: "More than just a recipe, this is the taste of home. Every Sunday, the aroma would fill the house, bringing everyone to the table. This card holds the ingredients for our most cherished family gatherings.",
    imageUrl: getImageUrl('heirloom-recipe'),
    imageHint: getImageHint('heirloom-recipe'),
  },
  {
    id: "4",
    name: "The Emigrant's Portrait",
    description: "A faded black and white portrait of my great-great-grandmother, taken just before she left Italy.",
    story: "With all her worldly possessions in a single trunk, she stared into the camera with a mix of fear and determination. This portrait captures the moment our family's American dream began. It's a reminder of the courage it took to start anew.",
    imageUrl: getImageUrl('heirloom-photo'),
    imageHint: getImageHint('heirloom-photo'),
  },
];
